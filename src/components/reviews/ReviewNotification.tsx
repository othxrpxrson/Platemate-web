
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';
import OrderRatingForm from './OrderRatingForm';
import { useToast } from '@/hooks/use-toast';

interface ReviewNotificationProps {
  orderId: string;
  chefId: string;
  chefName: string;
  onClose: () => void;
}

const ReviewNotification: React.FC<ReviewNotificationProps> = ({
  orderId,
  chefId, 
  chefName,
  onClose
}) => {
  const [showForm, setShowForm] = useState(false);
  const { t } = useLanguage();
  const { toast } = useToast();

  const handleSubmitReview = (rating: any) => {
    // In a real app, this would submit the rating to your backend
    console.log('Submitted rating:', rating);
    
    toast({
      title: t('reviewSubmitted'),
      description: t('thankYouForReview'),
    });
    
    onClose();
  };

  // Animation variants
  const containerVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 20 
      }
    },
    exit: { 
      y: 50, 
      opacity: 0,
      transition: { 
        duration: 0.3 
      }
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      transition: { type: "spring", stiffness: 400, damping: 10 }
    },
    tap: { scale: 0.95 }
  };

  const starVariants = {
    initial: { rotate: 0, scale: 1 },
    animate: { 
      rotate: [0, 15, -15, 0],
      scale: [1, 1.2, 1],
      transition: { 
        duration: 1.5,
        repeat: Infinity,
        repeatDelay: 3
      }
    }
  };

  // New enhanced animation variants
  const shimmerVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: [0, 0.1, 0.3, 0.1, 0],
      x: 100,
      transition: {
        repeat: Infinity,
        duration: 2,
        ease: "easeInOut",
        repeatDelay: 1
      }
    }
  };

  const closeButtonVariants = {
    initial: { scale: 1, rotate: 0 },
    hover: { 
      scale: 1.1, 
      rotate: 90,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 10 
      }
    },
    tap: { scale: 0.9 }
  };

  const formButtonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        delay: 0.2,
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: 0.1,
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    }
  };

  const descriptionVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: 0.2,
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <motion.div 
          className="bg-white rounded-xl overflow-hidden max-w-md w-full shadow-2xl relative"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Animated background effect */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-platemate-orange/10 to-transparent pointer-events-none"
            variants={shimmerVariants}
            initial="hidden"
            animate="visible"
          />

          {!showForm ? (
            <div className="relative p-6">
              <motion.button 
                onClick={onClose}
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors"
                variants={closeButtonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
              >
                <X size={20} />
              </motion.button>
              
              <div className="flex flex-col items-center text-center">
                <motion.div
                  variants={starVariants}
                  initial="initial"
                  animate="animate"
                  className="text-yellow-400 mb-4"
                >
                  <Star size={48} fill="currentColor" />
                </motion.div>
                
                <motion.h3 
                  className="text-xl font-bold text-platemate-brown mb-2"
                  variants={titleVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {t('rateYourExperience')}
                </motion.h3>
                
                <motion.p 
                  className="text-gray-600 mb-6"
                  variants={descriptionVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {t('reviewPrompt').replace('{chefName}', chefName)}
                </motion.p>
                
                <div className="flex space-x-3">
                  <motion.div
                    variants={buttonVariants}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Button 
                      variant="outline"
                      onClick={onClose}
                      className="border-gray-300"
                    >
                      {t('later')}
                    </Button>
                  </motion.div>
                  
                  <motion.div
                    variants={buttonVariants}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Button 
                      onClick={() => setShowForm(true)}
                      className="bg-platemate-orange hover:bg-platemate-orange/90 text-white"
                    >
                      <motion.div
                        className="mr-2"
                        animate={{
                          rotate: [0, 15, -15, 0],
                        }}
                        transition={{
                          repeat: Infinity,
                          repeatDelay: 2,
                          duration: 0.5
                        }}
                      >
                        <MessageSquare size={16} />
                      </motion.div>
                      {t('leaveReview')}
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>
          ) : (
            <motion.div 
              className="p-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between items-center p-3 border-b">
                <motion.h3 
                  className="font-semibold text-platemate-brown"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                >
                  {t('rateYourOrder')}
                </motion.h3>
                <motion.button 
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  variants={closeButtonVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                >
                  <X size={18} />
                </motion.button>
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                <OrderRatingForm 
                  orderId={orderId}
                  chefId={chefId}
                  onSubmit={handleSubmitReview}
                  onCancel={() => setShowForm(false)}
                />
              </motion.div>
            </motion.div>
          )}

          {/* Decorative corner elements */}
          <motion.div 
            className="absolute top-0 left-0 w-16 h-16 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <div className="absolute top-0 left-0 w-2 h-8 bg-platemate-orange/20 rounded-r-md"></div>
            <div className="absolute top-0 left-0 w-8 h-2 bg-platemate-orange/20 rounded-b-md"></div>
          </motion.div>

          <motion.div 
            className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <div className="absolute bottom-0 right-0 w-2 h-8 bg-platemate-orange/20 rounded-l-md"></div>
            <div className="absolute bottom-0 right-0 w-8 h-2 bg-platemate-orange/20 rounded-t-md"></div>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ReviewNotification;
