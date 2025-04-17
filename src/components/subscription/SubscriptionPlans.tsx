
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Star, CreditCard, TrendingUp, BadgeCheck, Clock, Sparkles, Zap } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { toast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';

interface SubscriptionPlan {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  icon?: React.ReactNode;
}

interface SubscriptionPlansProps {
  planType: 'customer' | 'chef';
  onSubscribe?: (planId: string) => void;
}

const SubscriptionPlans: React.FC<SubscriptionPlansProps> = ({
  planType,
  onSubscribe
}) => {
  const { t } = useLanguage();
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);
  
  const customerPlans: SubscriptionPlan[] = [
    {
      id: 'customer-free',
      name: 'Básico',
      price: 'Gratis',
      description: 'Disfruta de PlateMate sin costo',
      features: [
        'Acceso a todos los cocineros',
        'Pedidos ilimitados',
        'Calificaciones y reseñas',
        'Chat con cocineros'
      ],
      icon: <Clock size={20} />
    },
    {
      id: 'customer-premium',
      name: 'Premium',
      price: 'S/14.99/mes',
      description: 'La mejor experiencia para foodies',
      features: [
        t('freeDelivery'),
        t('discount'),
        t('priorityAccess'),
        'Soporte prioritario',
        'Sin comisiones por pagos'
      ],
      isPopular: true,
      icon: <Sparkles size={20} />
    }
  ];
  
  const chefPlans: SubscriptionPlan[] = [
    {
      id: 'chef-free',
      name: 'Básico',
      price: 'Gratis',
      description: 'Comienza a vender tus platos',
      features: [
        'Perfil de cocinero',
        'Hasta 10 platos en tu menú',
        'Estadísticas básicas',
        'Chat con clientes'
      ],
      icon: <CreditCard size={20} />
    },
    {
      id: 'chef-premium',
      name: 'Premium',
      price: 'S/29.99/mes',
      description: 'Impulsa tu negocio culinario',
      features: [
        t('featuredVisibility'),
        t('advancedStats'),
        t('premiumSupport'),
        'Menú ilimitado',
        'Comisión reducida (10%)',
        'Distintivo verificado',
      ],
      isPopular: true,
      icon: <TrendingUp size={20} />
    }
  ];
  
  const plans = planType === 'customer' ? customerPlans : chefPlans;
  
  const handleSubscribe = (planId: string) => {
    if (onSubscribe) {
      onSubscribe(planId);
    } else {
      // Simulate subscription process
      toast({
        title: "Procesando suscripción",
        description: "Redirigiendo al método de pago...",
      });
      
      // In a real app, this would redirect to a payment gateway
      setTimeout(() => {
        toast({
          title: "Suscripción exitosa",
          description: "¡Gracias por suscribirte a PlateMate Premium!",
        });
      }, 2000);
    }
  };

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
        ease: "easeOut"
      }
    }),
    hover: { 
      y: -10,
      boxShadow: "0px 10px 25px -5px rgba(0, 0, 0, 0.1)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    },
    tap: {
      y: -5,
      boxShadow: "0px 5px 15px -5px rgba(0, 0, 0, 0.1)",
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 15
      }
    }
  };

  const featureItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.3 + (i * 0.1),
        duration: 0.3,
        ease: "easeOut"
      }
    })
  };

  const popularBadgeVariants = {
    initial: { scale: 0 },
    animate: { 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
        delay: 0.5
      }
    },
    pulse: {
      scale: [1, 1.1, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: { scale: 0.95 },
    premium: { 
      backgroundImage: "linear-gradient(45deg, #FF9F45, #FF7D45)",
      transition: {
        duration: 0.5
      }
    }
  };

  const glowVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: [0, 0.5, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const iconVariants = {
    initial: { rotate: 0 },
    animate: { 
      rotate: [0, 15, -15, 0],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    hover: {
      scale: 1.2,
      rotate: 15,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10
      }
    }
  };

  return (
    <div className="space-y-6">
      <motion.h2 
        className="text-2xl font-bold text-platemate-brown"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {planType === 'customer' 
          ? t('customerSubscription') 
          : t('chefSubscription')}
        <motion.div 
          className="relative bg-platemate-orange/20 h-1 mt-2 w-20 rounded-full overflow-hidden"
          initial={{ width: 0 }}
          animate={{ width: "3rem" }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <motion.div 
            className="absolute inset-0 bg-platemate-orange"
            animate={{ 
              x: ["-100%", "100%"]
            }}
            transition={{ 
              repeat: Infinity,
              duration: 1.5,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </motion.h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.id}
            custom={index}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            whileTap="tap"
            onHoverStart={() => setHoveredPlan(plan.id)}
            onHoverEnd={() => setHoveredPlan(null)}
          >
            <Card className={`relative ${
              plan.isPopular ? 'border-platemate-orange shadow-md overflow-hidden' : 'overflow-hidden'
            }`}>
              {plan.isPopular && (
                <>
                  <motion.div
                    className="absolute top-0 right-0 transform translate-x-2 -translate-y-2"
                    variants={popularBadgeVariants}
                    initial="initial"
                    animate="animate"
                    whileHover="pulse"
                  >
                    <span className="bg-platemate-orange text-white text-xs px-2 py-1 rounded-full flex items-center">
                      <Star size={12} className="mr-1" />
                      Popular
                    </span>
                  </motion.div>
                  
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-platemate-orange/5 to-transparent pointer-events-none"
                    variants={glowVariants}
                    initial="initial"
                    animate="animate"
                  />
                </>
              )}
              
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <motion.div
                    className={`p-2 rounded-full ${plan.isPopular ? 'bg-platemate-orange text-white' : 'bg-gray-100 text-gray-600'}`}
                    variants={iconVariants}
                    initial="initial"
                    animate="animate"
                    whileHover="hover"
                  >
                    {plan.icon}
                  </motion.div>
                  <CardTitle>{plan.name}</CardTitle>
                </div>
                
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-2">
                  <motion.span 
                    className="text-2xl font-bold text-platemate-brown"
                    animate={
                      hoveredPlan === plan.id && plan.isPopular 
                        ? { scale: [1, 1.1, 1], color: ["#654321", "#FF9F45", "#654321"] }
                        : {}
                    }
                    transition={{ 
                      duration: 0.5,
                      ease: "easeInOut"
                    }}
                  >
                    {plan.price}
                  </motion.span>
                </div>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-2">
                  {plan.features.map((feature, i) => (
                    <motion.li 
                      key={i} 
                      className="flex items-start"
                      custom={i}
                      variants={featureItemVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <motion.div 
                        className="text-green-500 mr-2 mt-1 flex-shrink-0"
                        whileHover={{ scale: 1.2, rotate: 10 }}
                      >
                        <Check size={16} />
                      </motion.div>
                      <span className="text-gray-600">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
              
              <CardFooter>
                <AnimatePresence>
                  <motion.div className="w-full" layout>
                    <motion.div
                      className="w-full"
                      variants={buttonVariants}
                      initial="initial"
                      whileHover="hover"
                      whileTap="tap"
                      animate={plan.isPopular ? "premium" : "initial"}
                    >
                      <Button 
                        className={`w-full ${
                          plan.price === 'Gratis' 
                            ? 'bg-gray-100 text-gray-800 hover:bg-gray-200' 
                            : 'bg-platemate-orange hover:bg-platemate-orange/90 text-white'
                        }`}
                        onClick={() => handleSubscribe(plan.id)}
                      >
                        <AnimatePresence mode="wait">
                          {hoveredPlan === plan.id && plan.price !== 'Gratis' ? (
                            <motion.div
                              key="subscribe-hover"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="flex items-center"
                            >
                              <Zap size={16} className="mr-2" />
                              {t('subscribe')} Ahora
                            </motion.div>
                          ) : (
                            <motion.div
                              key="subscribe-normal"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                            >
                              {plan.price === 'Gratis' ? 'Plan Actual' : t('subscribe')}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </Button>
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </CardFooter>
              
              {/* Background decorative circles */}
              <motion.div
                className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-blue-50 opacity-50 z-0"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 45, 0],
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="absolute -top-10 -left-10 w-28 h-28 rounded-full bg-platemate-orange/5 opacity-50 z-0"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, -45, 0],
                }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              />
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionPlans;
