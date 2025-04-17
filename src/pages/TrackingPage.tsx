import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DeliveryMap from "@/components/tracking/DeliveryMap";
import OrderTimeline from "@/components/tracking/OrderTimeline";
import ChatButton from "@/components/chat/ChatButton";
import OrderRatingForm from "@/components/reviews/OrderRatingForm";
import ReviewNotification from "@/components/reviews/ReviewNotification";
import { useLanguage } from "@/context/LanguageContext";
import { toast } from "@/hooks/use-toast";
import { MapPin, ChefHat, Clock, ChevronUp, ChevronDown, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';

// Mock order timeline data
const TIMELINE_STEPS = [
  {
    id: "order-placed",
    label: "Pedido realizado",
    completed: true,
    time: "10:30 AM"
  },
  {
    id: "order-confirmed",
    label: "Pedido confirmado",
    completed: true,
    time: "10:35 AM"
  },
  {
    id: "order-preparing",
    label: "Preparando tu comida",
    completed: true,
    time: "10:45 AM"
  },
  {
    id: "order-ready",
    label: "Pedido listo para entrega",
    completed: true,
    time: "11:20 AM"
  },
  {
    id: "order-delivering",
    label: "En camino",
    completed: false,
    time: null
  },
  {
    id: "order-delivered",
    label: "Entregado",
    completed: false,
    time: null
  }
];

// Mock order data
const ORDER_DATA = {
  id: "ORD-12345",
  status: "delivering",
  chef: {
    id: "chef-123",
    name: "María Fernández",
    avatar: "https://images.unsplash.com/photo-1543157145-f78c636d023d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
    phone: "+51 987 654 321"
  },
  customer: {
    name: "Carlos Pérez",
    address: "Av. Larco 1234, Miraflores, Lima",
    phone: "+51 999 888 777"
  },
  delivery: {
    estimatedTime: "11:45 AM",
    distance: "1.8 km",
    driver: {
      name: "Jorge Quispe",
      phone: "+51 955 123 456",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg"
    }
  },
  items: [
    {
      id: "item-1",
      name: "Lomo Saltado",
      quantity: 2,
      price: 25.90
    },
    {
      id: "item-2",
      name: "Ceviche Mixto",
      quantity: 1,
      price: 32.50
    },
    {
      id: "item-3",
      name: "Chicha Morada",
      quantity: 3,
      price: 7.50
    }
  ],
  paymentMethod: "Tarjeta de crédito",
  subTotal: 99.30,
  deliveryFee: 5.00,
  discount: 0,
  total: 104.30,
  createdAt: "2024-04-08T10:30:00Z"
};

const TrackingPage = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState(ORDER_DATA);
  const [timelineSteps, setTimelineSteps] = useState(TIMELINE_STEPS);
  const [showDetails, setShowDetails] = useState(true);
  const [showRating, setShowRating] = useState(false);
  const [timeUntilRating, setTimeUntilRating] = useState<number | null>(null);
  const { t } = useLanguage();
  
  // Current and destination locations (mock data)
  const currentLocation = { lat: -12.1191, lng: -77.0349 };
  const destination = { 
    lat: -12.1111, 
    lng: -77.0315,
    address: order.customer.address
  };

  // In a real app, fetch order data based on id
  useEffect(() => {
    console.log(`Fetching order data for ID: ${id || 'latest'}`);
    // Simulate API call
  }, [id]);

  // Simulate order progress updates
  useEffect(() => {
    // Simulate delivery progress
    const interval = setInterval(() => {
      if (timelineSteps[4].completed && !timelineSteps[5].completed) {
        // Order is being delivered, simulate delivery completion
        setTimelineSteps(prev => {
          const updated = [...prev];
          updated[5].completed = true;
          updated[5].time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          return updated;
        });
        
        // Set timer for rating prompt (30 min)
        setTimeUntilRating(30 * 60);
        
        toast({
          title: "¡Pedido entregado!",
          description: "Tu pedido ha sido entregado. ¡Disfruta tu comida!"
        });
        
        clearInterval(interval);
      } else if (!timelineSteps[4].completed && timelineSteps[3].completed) {
        // Order is ready, simulate delivery start
        setTimelineSteps(prev => {
          const updated = [...prev];
          updated[4].completed = true;
          updated[4].time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          return updated;
        });
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [timelineSteps]);

  // Countdown to rating prompt
  useEffect(() => {
    if (timeUntilRating === null) return;
    
    const interval = setInterval(() => {
      setTimeUntilRating(prev => {
        if (prev === null || prev <= 0) {
          clearInterval(interval);
          // Show rating prompt
          setShowRating(true);
          toast({
            title: t('rateYourOrder'),
            description: "¡Tu opinión es importante para nosotros!"
          });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // For demo purposes, show rating after 5 seconds instead of 30 minutes
    const demoTimeout = setTimeout(() => {
      setShowRating(true);
      toast({
        title: t('rateYourOrder'),
        description: "¡Tu opinión es importante para nosotros!"
      });
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(demoTimeout);
    };
  }, [timeUntilRating, t]);

  const handleRatingSubmit = (rating: any) => {
    console.log("Rating submitted:", rating);
    setShowRating(false);
    
    toast({
      title: "¡Calificación enviada!",
      description: "Gracias por tu opinión, nos ayuda a mejorar el servicio."
    });
  };

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 300
      }
    }
  };

  const staggerContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const detailsVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: { 
      height: "auto", 
      opacity: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 300
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <motion.div 
            className="flex flex-col md:flex-row gap-6"
            variants={staggerContainerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Order timeline and details */}
            <motion.div 
              className="w-full md:w-1/3 lg:w-1/4"
              variants={cardVariants}
            >
              <motion.div 
                className="bg-white rounded-lg shadow-sm p-4 mb-6"
                whileHover={{ boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-platemate-brown">
                    Pedido #{order.id}
                  </h2>
                  <motion.span 
                    className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full"
                    animate={{ 
                      scale: [1, 1.05, 1],
                      backgroundColor: ['rgb(219, 234, 254)', 'rgb(191, 219, 254)', 'rgb(219, 234, 254)']
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      repeatType: "reverse" 
                    }}
                  >
                    {order.status === 'delivering' ? 'En camino' : 'Entregado'}
                  </motion.span>
                </div>
                
                <OrderTimeline steps={timelineSteps} />
                
                <motion.div 
                  className="mt-6 pt-4 border-t border-gray-200"
                  variants={staggerContainerVariants}
                >
                  <motion.div 
                    className="flex items-start mb-4"
                    variants={cardVariants}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <motion.div 
                      className="w-10 h-10 rounded-full bg-platemate-orange/20 flex items-center justify-center mr-3"
                      whileHover={{ 
                        scale: 1.1,
                        backgroundColor: "rgba(255, 138, 60, 0.3)"
                      }}
                    >
                      <motion.div
                        animate={{ 
                          rotate: [0, 10, -10, 0]
                        }}
                        transition={{ 
                          duration: 5,
                          repeat: Infinity,
                          repeatType: "loop"
                        }}
                      >
                        <ChefHat size={20} className="text-platemate-orange" />
                      </motion.div>
                    </motion.div>
                    <div>
                      <h3 className="font-medium text-platemate-brown">Cocinero</h3>
                      <p className="text-gray-600">{order.chef.name}</p>
                      <div className="mt-1">
                        <ChatButton 
                          chefId={order.chef.id}
                          chefName={order.chef.name}
                          chefAvatar={order.chef.avatar}
                        />
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-start mb-4"
                    variants={cardVariants}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <motion.div 
                      className="w-10 h-10 rounded-full bg-platemate-orange/20 flex items-center justify-center mr-3"
                      whileHover={{ 
                        scale: 1.1,
                        backgroundColor: "rgba(255, 138, 60, 0.3)"
                      }}
                    >
                      <motion.div
                        animate={{ 
                          rotate: 360
                        }}
                        transition={{ 
                          duration: 10,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      >
                        <Clock size={20} className="text-platemate-orange" />
                      </motion.div>
                    </motion.div>
                    <div>
                      <h3 className="font-medium text-platemate-brown">Tiempo estimado</h3>
                      <p className="text-gray-600">Llegada: {order.delivery.estimatedTime}</p>
                      <p className="text-gray-600">Distancia: {order.delivery.distance}</p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-start"
                    variants={cardVariants}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <motion.div 
                      className="w-10 h-10 rounded-full bg-platemate-orange/20 flex items-center justify-center mr-3"
                      whileHover={{ 
                        scale: 1.1,
                        backgroundColor: "rgba(255, 138, 60, 0.3)"
                      }}
                    >
                      <motion.div
                        animate={{ 
                          y: [0, -3, 0, 3, 0]
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          repeatType: "loop"
                        }}
                      >
                        <MapPin size={20} className="text-platemate-orange" />
                      </motion.div>
                    </motion.div>
                    <div>
                      <h3 className="font-medium text-platemate-brown">Dirección de entrega</h3>
                      <p className="text-gray-600">{order.customer.address}</p>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
              
              {/* Order details (collapsible) */}
              <motion.div 
                className="bg-white rounded-lg shadow-sm overflow-hidden"
                whileHover={{ 
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.button 
                  className="w-full px-4 py-3 flex justify-between items-center bg-gray-50"
                  onClick={() => setShowDetails(!showDetails)}
                  whileHover={{ backgroundColor: "rgb(243, 244, 246)" }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="font-medium text-platemate-brown">Detalles del pedido</span>
                  <motion.div
                    animate={{ rotate: showDetails ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {showDetails ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </motion.div>
                </motion.button>
                
                <AnimatePresence>
                  {showDetails && (
                    <motion.div 
                      className="p-4"
                      variants={detailsVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                    >
                      <motion.div 
                        className="divide-y divide-gray-200"
                        variants={staggerContainerVariants}
                      >
                        {order.items.map((item) => (
                          <motion.div 
                            key={item.id} 
                            className="py-2 flex justify-between"
                            variants={cardVariants}
                            whileHover={{ x: 5, backgroundColor: "rgba(243, 244, 246, 0.5)" }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <div>
                              <span className="text-gray-800">{item.quantity}x </span>
                              <span className="text-gray-600">{item.name}</span>
                            </div>
                            <span className="text-gray-800">
                              S/ {(item.price * item.quantity).toFixed(2)}
                            </span>
                          </motion.div>
                        ))}
                      </motion.div>
                      
                      <motion.div 
                        className="mt-4 pt-4 border-t border-gray-200"
                        variants={cardVariants}
                      >
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-600">Subtotal</span>
                          <span className="text-gray-800">S/ {order.subTotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-600">Envío</span>
                          <span className="text-gray-800">S/ {order.deliveryFee.toFixed(2)}</span>
                        </div>
                        {order.discount > 0 && (
                          <div className="flex justify-between mb-1">
                            <span className="text-green-600">Descuento</span>
                            <span className="text-green-600">-S/ {order.discount.toFixed(2)}</span>
                          </div>
                        )}
                        <motion.div 
                          className="flex justify-between mt-2 pt-2 border-t border-gray-200 font-semibold"
                          whileHover={{ scale: 1.02 }}
                        >
                          <span className="text-platemate-brown">Total</span>
                          <motion.span 
                            className="text-platemate-brown"
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            S/ {order.total.toFixed(2)}
                          </motion.span>
                        </motion.div>
                      </motion.div>
                      
                      <motion.div 
                        className="mt-4 pt-4 border-t border-gray-200 text-sm text-gray-600"
                        variants={cardVariants}
                      >
                        <p>Método de pago: {order.paymentMethod}</p>
                        <p className="mt-1">Fecha: {new Date(order.createdAt).toLocaleDateString()}</p>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
            
            {/* Map and live tracking */}
            <motion.div 
              className="w-full md:w-2/3 lg:w-3/4"
              variants={cardVariants}
            >
              <motion.div 
                className="bg-white rounded-lg shadow-sm overflow-hidden"
                whileHover={{ boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.15)" }}
                transition={{ duration: 0.3 }}
              >
                <div className="h-[500px]">
                  <DeliveryMap 
                    status="onTheWay"
                    currentLocation={currentLocation}
                    destination={destination}
                  />
                </div>
              </motion.div>
              
              {/* Rating section */}
              <AnimatePresence>
                {showRating && (
                  <motion.div 
                    className="mt-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ 
                      type: "spring",
                      damping: 20,
                      stiffness: 300
                    }}
                  >
                    <OrderRatingForm 
                      orderId={order.id}
                      chefId={order.chef.id}
                      onSubmit={handleRatingSubmit}
                      onCancel={() => setShowRating(false)}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
      
      {/* Review notification after delivery (for demo purposes) */}
      {timelineSteps[5].completed && !showRating && (
        <ReviewNotification
          orderId={order.id}
          chefId={order.chef.id}
          chefName={order.chef.name}
          onClose={() => {}}
        />
      )}
    </div>
  );
};

export default TrackingPage;
