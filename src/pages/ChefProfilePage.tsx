
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  Star, 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar,
  Award,
  Clock8
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent
} from "@/components/ui/card";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useLanguage } from "@/context/LanguageContext";
import ChatButton from "@/components/chat/ChatButton";
import ChefAvailabilityToggle from "@/components/chef/ChefAvailabilityToggle";
import VideoPresentation from "@/components/chef/VideoPresentation";
import AuditBadge from "@/components/chef/AuditBadge";
import { motion } from "framer-motion";

// Mock chef data
const CHEF_DATA = {
  id: "1",
  name: "María Fernández",
  avatar: "https://images.unsplash.com/photo-1543157145-f78c636d023d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
  cover: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  rating: 4.8,
  reviewCount: 124,
  cuisine: "Peruana Tradicional",
  specialties: ["Lomo Saltado", "Ceviche", "Ají de Gallina"],
  description: "Cocinera tradicional con más de 20 años de experiencia en la gastronomía peruana. Me especializo en platos típicos de la costa y sierra, usando ingredientes frescos y orgánicos.",
  location: "Miraflores, Lima",
  phone: "+51 987 654 321",
  email: "maria@platemate.com",
  available: true,
  verified: true,
  premium: true,
  lastAudit: "2024-01-15",
  auditStatus: "approved" as const,
  joined: "2021-03-12",
  videoUrl: "https://storage.googleapis.com/webfundamentals-assets/videos/chrome.mp4"
};

// Mock menu items
const MENU_ITEMS = [
  {
    id: "1",
    name: "Lomo Saltado",
    description: "Clásico plato de la gastronomía peruana con carne de res, cebolla, tomate y papas fritas.",
    price: 25.90,
    image: "https://images.unsplash.com/photo-1633321702518-7feccafb94d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    rating: 4.9,
    reviewCount: 48,
    popular: true
  },
  {
    id: "2",
    name: "Ceviche Mixto",
    description: "Pescado fresco y mariscos marinados en limón con cebolla roja, cilantro, camote y choclo.",
    price: 32.50,
    image: "https://images.unsplash.com/photo-1559410545-0bdcd187e0a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    rating: 4.7,
    reviewCount: 36,
    popular: true
  },
  {
    id: "3",
    name: "Ají de Gallina",
    description: "Pollo desmenuzado en salsa cremosa de ají amarillo, servido con papas, arroz y huevo duro.",
    price: 21.90,
    image: "https://images.unsplash.com/photo-1562059391-49ccd8b518d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    rating: 4.8,
    reviewCount: 29
  },
  {
    id: "4",
    name: "Arroz con Mariscos",
    description: "Arroz sazonado con especias y sazonado con variedad de mariscos frescos y verduras.",
    price: 28.90,
    image: "https://images.unsplash.com/photo-1504763708973-1226db93a5c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    rating: 4.6,
    reviewCount: 22
  }
];

// Mock reviews
const REVIEWS = [
  {
    id: "1",
    userName: "Carlos Ramírez",
    userAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
    date: "2024-03-15",
    rating: {
      flavor: 5,
      presentation: 5,
      punctuality: 4,
      cleanliness: 5
    },
    comment: "Increíble experiencia. El lomo saltado estaba perfectamente preparado y la presentación era de restaurante gourmet. Definitivamente volveré a pedir."
  },
  {
    id: "2",
    userName: "Ana Méndez",
    userAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
    date: "2024-03-10",
    rating: {
      flavor: 5,
      presentation: 4,
      punctuality: 5,
      cleanliness: 5
    },
    comment: "El ceviche mixto es el mejor que he probado en mucho tiempo. Los ingredientes eran muy frescos y la entrega fue puntual."
  },
  {
    id: "3",
    userName: "Luis Pardo",
    userAvatar: "https://randomuser.me/api/portraits/men/62.jpg",
    date: "2024-03-05",
    rating: {
      flavor: 4,
      presentation: 4,
      punctuality: 3,
      cleanliness: 5
    },
    comment: "Muy buen sabor en el ají de gallina, aunque la entrega se retrasó un poco. La comida llegó caliente y bien empaquetada."
  }
];

const ChefProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const [chef, setChef] = useState(CHEF_DATA);
  const [menuItems, setMenuItems] = useState(MENU_ITEMS);
  const [reviews, setReviews] = useState(REVIEWS);
  const [activeTab, setActiveTab] = useState("menu");
  const [isCurrentUserChef, setIsCurrentUserChef] = useState(false);
  const { t } = useLanguage();
  
  // In a real app, fetch chef data based on id
  useEffect(() => {
    console.log(`Fetching chef data for ID: ${id}`);
    // Simulate API call with timeout
    const timer = setTimeout(() => {
      setChef(CHEF_DATA);
      setMenuItems(MENU_ITEMS);
      setReviews(REVIEWS);
      
      // Check if logged in user is this chef (for testing)
      if (id === "self") {
        setIsCurrentUserChef(true);
      }
    }, 300);
    
    return () => clearTimeout(timer);
  }, [id]);

  // Calculate average ratings
  const calculateAverageRating = (category: keyof typeof reviews[0]['rating']) => {
    const sum = reviews.reduce((acc, review) => acc + review.rating[category], 0);
    return (sum / reviews.length).toFixed(1);
  };

  const handleVideoChange = (url: string) => {
    setChef({...chef, videoUrl: url});
  };

  const handleDescriptionChange = (description: string) => {
    setChef({...chef, description});
  };

  const handleAvailabilityToggle = (available: boolean) => {
    setChef({...chef, available});
  };

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  const cardVariants = {
    initial: { scale: 0.95, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 15 }
    },
    hover: {
      y: -5,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { type: "spring", stiffness: 400, damping: 10 }
    }
  };

  if (!chef) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <p>Cargando información del cocinero...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <motion.main 
        className="flex-grow"
        variants={pageVariants}
        initial="initial"
        animate="animate"
      >
        {/* Cover photo */}
        <div className="h-64 w-full bg-gray-200 relative overflow-hidden">
          <motion.img 
            src={chef.cover} 
            alt={`${chef.name} cocina`}
            className="w-full h-full object-cover"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>
        
        {/* Chef info */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="flex flex-col md:flex-row md:items-end -mt-16 relative z-10 mb-8"
            variants={itemVariants}
          >
            <motion.div 
              className="flex-shrink-0 mr-4"
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <img 
                src={chef.avatar} 
                alt={chef.name}
                className="w-32 h-32 rounded-full border-4 border-white shadow-md object-cover"
              />
            </motion.div>
            
            <div className="mt-4 md:mt-0 flex-grow">
              <div className="flex flex-wrap items-center">
                <motion.h1 
                  className="text-3xl font-bold text-platemate-brown mr-2"
                  variants={itemVariants}
                >
                  {chef.name}
                </motion.h1>
                
                {chef.verified && (
                  <motion.span 
                    className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center"
                    variants={itemVariants}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                  >
                    <Award size={12} className="mr-1" />
                    {t('verified')}
                  </motion.span>
                )}
                
                {chef.premium && (
                  <motion.span 
                    className="bg-platemate-orange/20 text-platemate-orange text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center ml-2"
                    variants={itemVariants}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <Star size={12} className="mr-1" />
                    Premium
                  </motion.span>
                )}
                
                <motion.div
                  variants={itemVariants}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <AuditBadge 
                    lastAuditDate={chef.lastAudit}
                    status={chef.auditStatus}
                    size="sm"
                  />
                </motion.div>
              </div>
              
              <div className="flex flex-wrap items-center text-sm text-gray-600 mt-1">
                <motion.div 
                  className="flex items-center mr-4"
                  variants={itemVariants}
                >
                  <Star size={16} className="text-yellow-400 mr-1" />
                  <span>
                    <span className="font-semibold">{chef.rating}</span>
                    <span className="text-gray-400 mx-1">·</span>
                    <span>{chef.reviewCount} {t('reviews')}</span>
                  </span>
                </motion.div>
                <motion.div 
                  className="flex items-center mr-4"
                  variants={itemVariants}
                >
                  <MapPin size={16} className="text-gray-400 mr-1" />
                  <span>{chef.location}</span>
                </motion.div>
                <motion.div 
                  className="flex items-center"
                  variants={itemVariants}
                >
                  <Calendar size={16} className="text-gray-400 mr-1" />
                  <span>{t('since')} {new Date(chef.joined).getFullYear()}</span>
                </motion.div>
              </div>
              
              <motion.div 
                className="flex flex-wrap mt-2"
                variants={itemVariants}
              >
                <span className="bg-platemate-beige text-platemate-brown text-sm font-medium px-2.5 py-0.5 rounded mr-2 mb-2">
                  {chef.cuisine}
                </span>
                {chef.specialties.map((specialty, index) => (
                  <motion.span 
                    key={index}
                    className="bg-gray-100 text-gray-800 text-sm font-medium px-2.5 py-0.5 rounded mr-2 mb-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                  >
                    {specialty}
                  </motion.span>
                ))}
              </motion.div>
            </div>
            
            <motion.div 
              className="mt-4 md:mt-0 flex flex-col md:items-end space-y-2"
              variants={itemVariants}
            >
              <ChefAvailabilityToggle 
                initialAvailable={chef.available}
                isCurrentUserChef={isCurrentUserChef}
                onToggle={handleAvailabilityToggle}
              />
              
              <div className="flex space-x-2">
                <ChatButton 
                  chefId={chef.id}
                  chefName={chef.name}
                  chefAvatar={chef.avatar}
                />
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="default"
                    className="bg-platemate-orange hover:bg-platemate-orange/90 text-white rounded-full"
                    onClick={() => window.location.href = `/menu/${chef.id}`}
                  >
                    {t('viewFullMenu')}
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Video and Description */}
          <motion.div 
            className="mb-10"
            variants={itemVariants}
          >
            <VideoPresentation
              videoUrl={chef.videoUrl}
              description={chef.description}
              isEditable={isCurrentUserChef}
              onVideoChange={handleVideoChange}
              onDescriptionChange={handleDescriptionChange}
            />
          </motion.div>
          
          {/* Tabs */}
          <motion.div
            variants={itemVariants}
          >
            <Tabs 
              value={activeTab} 
              onValueChange={setActiveTab}
              className="mb-10"
            >
              <TabsList className="w-full sm:w-auto bg-white">
                <TabsTrigger value="menu" className="flex-1 sm:flex-none">
                  {t('featuredMenu')}
                </TabsTrigger>
                <TabsTrigger value="reviews" className="flex-1 sm:flex-none">
                  {t('reviews')}
                </TabsTrigger>
                <TabsTrigger value="info" className="flex-1 sm:flex-none">
                  {t('information')}
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="menu" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {menuItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      variants={cardVariants}
                      initial="initial"
                      animate="animate"
                      whileHover="hover"
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="overflow-hidden h-full">
                        <div className="aspect-video bg-gray-200 relative">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                          
                          {item.popular && (
                            <motion.div 
                              className="absolute top-2 left-2 bg-platemate-orange text-white text-xs px-2 py-1 rounded-full"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.5 + index * 0.1 }}
                            >
                              {t('popular')}
                            </motion.div>
                          )}
                          
                          <motion.div 
                            className="absolute bottom-2 right-2 bg-white text-platemate-brown text-sm font-bold px-2 py-1 rounded-full"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                          >
                            S/ {item.price.toFixed(2)}
                          </motion.div>
                        </div>
                        
                        <CardContent className="p-4">
                          <h3 className="font-bold text-lg text-platemate-brown mb-1">
                            {item.name}
                          </h3>
                          
                          <div className="flex items-center text-sm text-gray-600 mb-2">
                            <Star size={14} className="text-yellow-400 mr-1" />
                            <span className="font-medium">{item.rating}</span>
                            <span className="text-gray-400 mx-1">·</span>
                            <span>{item.reviewCount} {t('reviews')}</span>
                          </div>
                          
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {item.description}
                          </p>
                          
                          <div className="mt-3 flex justify-end">
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Button 
                                variant="outline"
                                className="border-platemate-orange text-platemate-orange hover:bg-platemate-orange/10"
                                size="sm"
                                onClick={() => window.location.href = `/order/${item.id}`}
                              >
                                {t('order')}
                              </Button>
                            </motion.div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
                
                <motion.div 
                  className="mt-6 text-center"
                  variants={itemVariants}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      variant="outline"
                      onClick={() => window.location.href = `/menu/${chef.id}`}
                    >
                      {t('viewFullMenu')}
                    </Button>
                  </motion.div>
                </motion.div>
              </TabsContent>
              
              <TabsContent value="reviews" className="mt-6">
                <motion.div 
                  className="bg-white p-4 rounded-lg shadow-sm mb-6"
                  variants={itemVariants}
                >
                  <h3 className="font-semibold text-lg text-platemate-brown mb-3">
                    {t('ratings')}
                  </h3>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <div className="flex items-center text-4xl font-bold text-platemate-brown mb-4 sm:mb-0 sm:mr-8">
                      {chef.rating}
                      <div className="ml-2 flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                          >
                            <Star 
                              size={24} 
                              className={`${
                                i < Math.floor(chef.rating) 
                                  ? 'text-yellow-400 fill-yellow-400' 
                                  : 'text-gray-300'
                              }`} 
                            />
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 flex-grow">
                      <motion.div
                        variants={itemVariants}
                        transition={{ delay: 0.1 }}
                      >
                        <h4 className="text-sm text-gray-500">{t('flavor')}</h4>
                        <div className="flex items-center">
                          <Star size={14} className="text-yellow-400 mr-1" />
                          <span className="font-medium">{calculateAverageRating('flavor')}</span>
                        </div>
                      </motion.div>
                      <motion.div
                        variants={itemVariants}
                        transition={{ delay: 0.2 }}
                      >
                        <h4 className="text-sm text-gray-500">{t('presentation')}</h4>
                        <div className="flex items-center">
                          <Star size={14} className="text-yellow-400 mr-1" />
                          <span className="font-medium">{calculateAverageRating('presentation')}</span>
                        </div>
                      </motion.div>
                      <motion.div
                        variants={itemVariants}
                        transition={{ delay: 0.3 }}
                      >
                        <h4 className="text-sm text-gray-500">{t('punctuality')}</h4>
                        <div className="flex items-center">
                          <Star size={14} className="text-yellow-400 mr-1" />
                          <span className="font-medium">{calculateAverageRating('punctuality')}</span>
                        </div>
                      </motion.div>
                      <motion.div
                        variants={itemVariants}
                        transition={{ delay: 0.4 }}
                      >
                        <h4 className="text-sm text-gray-500">{t('cleanliness')}</h4>
                        <div className="flex items-center">
                          <Star size={14} className="text-yellow-400 mr-1" />
                          <span className="font-medium">{calculateAverageRating('cleanliness')}</span>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
                
                <div className="space-y-4">
                  {reviews.map((review, index) => (
                    <motion.div 
                      key={review.id} 
                      className="bg-white p-4 rounded-lg shadow-sm"
                      variants={itemVariants}
                      initial="initial"
                      animate="animate"
                      transition={{ delay: 0.2 + index * 0.1 }}
                    >
                      <div className="flex items-start">
                        <img 
                          src={review.userAvatar} 
                          alt={review.userName}
                          className="w-10 h-10 rounded-full mr-3"
                        />
                        
                        <div className="flex-grow">
                          <div className="flex flex-wrap items-center">
                            <h4 className="font-medium text-platemate-brown mr-2">
                              {review.userName}
                            </h4>
                            <span className="text-xs text-gray-500">
                              {new Date(review.date).toLocaleDateString()}
                            </span>
                          </div>
                          
                          <div className="flex flex-wrap mt-1 mb-2">
                            <div className="mr-3 flex items-center">
                              <span className="text-xs text-gray-500 mr-1">{t('flavor')}:</span>
                              <div className="flex">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star 
                                    key={i} 
                                    size={12} 
                                    className={`${
                                      i < review.rating.flavor ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                                    }`} 
                                  />
                                ))}
                              </div>
                            </div>
                            <div className="mr-3 flex items-center">
                              <span className="text-xs text-gray-500 mr-1">{t('presentation')}:</span>
                              <div className="flex">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star 
                                    key={i} 
                                    size={12} 
                                    className={`${
                                      i < review.rating.presentation ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                                    }`} 
                                  />
                                ))}
                              </div>
                            </div>
                            <div className="mr-3 flex items-center">
                              <span className="text-xs text-gray-500 mr-1">{t('punctuality')}:</span>
                              <div className="flex">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star 
                                    key={i} 
                                    size={12} 
                                    className={`${
                                      i < review.rating.punctuality ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                                    }`} 
                                  />
                                ))}
                              </div>
                            </div>
                            <div className="flex items-center">
                              <span className="text-xs text-gray-500 mr-1">{t('cleanliness')}:</span>
                              <div className="flex">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star 
                                    key={i} 
                                    size={12} 
                                    className={`${
                                      i < review.rating.cleanliness ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                                    }`} 
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                          
                          <p className="text-gray-600">
                            {review.comment}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="info" className="mt-6">
                <motion.div 
                  className="bg-white p-6 rounded-lg shadow-sm"
                  variants={itemVariants}
                >
                  <h3 className="font-semibold text-lg text-platemate-brown mb-4">
                    {t('contactInformation')}
                  </h3>
                  
                  <div className="space-y-4">
                    <motion.div 
                      className="flex items-start"
                      variants={itemVariants}
                    >
                      <MapPin size={20} className="text-platemate-orange mr-3 mt-1" />
                      <div>
                        <h4 className="font-medium text-gray-700">{t('location')}</h4>
                        <p className="text-gray-600">{chef.location}</p>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="flex items-start"
                      variants={itemVariants}
                    >
                      <Phone size={20} className="text-platemate-orange mr-3 mt-1" />
                      <div>
                        <h4 className="font-medium text-gray-700">{t('phone')}</h4>
                        <p className="text-gray-600">{chef.phone}</p>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="flex items-start"
                      variants={itemVariants}
                    >
                      <Mail size={20} className="text-platemate-orange mr-3 mt-1" />
                      <div>
                        <h4 className="font-medium text-gray-700">Email</h4>
                        <p className="text-gray-600">{chef.email}</p>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="flex items-start"
                      variants={itemVariants}
                    >
                      <Clock8 size={20} className="text-platemate-orange mr-3 mt-1" />
                      <div>
                        <h4 className="font-medium text-gray-700">{t('businessHours')}</h4>
                        <p className="text-gray-600">{t('weekdays')}: 10:00 - 20:00</p>
                        <p className="text-gray-600">{t('weekends')}: 11:00 - 18:00</p>
                      </div>
                    </motion.div>
                  </div>
                  
                  <h3 className="font-semibold text-lg text-platemate-brown mt-8 mb-4">
                    {t('lastFoodSafetyAudit')}
                  </h3>
                  
                  <div className="bg-green-50 p-4 rounded-lg mb-4">
                    <div className="flex items-start">
                      <Award size={24} className="text-green-600 mr-3 mt-1" />
                      <div>
                        <h4 className="font-medium text-green-800">{t('auditApproved')}</h4>
                        <p className="text-green-700">
                          {t('date')}: {new Date(chef.lastAudit).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-green-700 mt-1">
                          {t('kitchenCompliance')}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-500 mt-4">
                    <p>
                      {t('auditFrequency')}
                    </p>
                  </div>
                </motion.div>
              </TabsContent>
            </Tabs>
          </motion.div>
          
          {/* Book this chef */}
          <motion.div 
            className="mb-12 bg-platemate-beige/20 rounded-xl p-6"
            variants={itemVariants}
            initial="initial"
            animate="animate"
            whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
            transition={{ delay: 0.9 }}
          >
            <h3 className="text-xl font-bold text-platemate-brown mb-4">
              {t('likeToTryFood').replace('{chefName}', chef.name)}
            </h3>
            <p className="text-gray-600 mb-6">
              {t('exploreMenu')}
            </p>
            <div className="flex flex-wrap gap-3">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  className="bg-platemate-orange hover:bg-platemate-orange/90 text-white rounded-full"
                  onClick={() => window.location.href = `/menu/${chef.id}`}
                >
                  {t('viewFullMenu')}
                </Button>
              </motion.div>
              <ChatButton 
                chefId={chef.id}
                chefName={chef.name}
                chefAvatar={chef.avatar}
              />
            </div>
          </motion.div>
        </div>
      </motion.main>
      
      <Footer />
    </div>
  );
};

export default ChefProfilePage;
