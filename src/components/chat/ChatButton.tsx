
import React, { useState } from 'react';
import { MessageCircle, X, Sparkles, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';
import ChatInterface from './ChatInterface';
import { motion, AnimatePresence } from 'framer-motion';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

interface ChatButtonProps {
  chefId: string;
  chefName: string;
  chefAvatar?: string;
}

const ChatButton: React.FC<ChatButtonProps> = ({ chefId, chefName, chefAvatar }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { t } = useLanguage();

  // Enhanced animation variants
  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      boxShadow: "0px 5px 15px rgba(255, 159, 69, 0.3)",
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 10 
      }
    },
    tap: { 
      scale: 0.95,
      rotate: [-1, 1, -1, 0],
      transition: { duration: 0.3 }
    },
    bounce: {
      y: [0, -10, 0],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
        repeatDelay: 2
      }
    }
  };

  const bubbleVariants = {
    hidden: { 
      scale: 0, 
      opacity: 0, 
      y: 20,
      rotateZ: -5
    },
    visible: { 
      scale: 1, 
      opacity: 1, 
      y: 0,
      rotateZ: 0,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 20,
        delay: 0.1
      }
    },
    exit: { 
      scale: 0.9, 
      opacity: 0, 
      y: 20, 
      transition: { 
        duration: 0.3 
      }
    }
  };

  const sparkleVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: [0.5, 1.2, 0.5],
      opacity: [0, 1, 0],
      transition: { 
        repeat: Infinity,
        repeatDelay: 3,
        duration: 1.5
      }
    }
  };

  const messageVariants = {
    initial: { opacity: 0, scale: 0.8, y: 10 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.8, y: 10 }
  };

  const overlayVariants = {
    hidden: { 
      opacity: 0 
    },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeInOut" 
      }
    },
    exit: { 
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const decorationVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    }
  };

  return (
    <>
      <HoverCard openDelay={200} closeDelay={100}>
        <HoverCardTrigger asChild>
          <motion.div
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            animate="bounce"
            variants={buttonVariants}
            className="relative"
          >
            <Button
              onClick={() => setIsChatOpen(true)}
              variant="outline"
              className="border-platemate-orange text-platemate-orange hover:bg-platemate-orange/10 rounded-full shadow-md transition-all duration-300 overflow-hidden"
            >
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ 
                  rotate: [0, -10, 10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  rotate: {
                    repeat: Infinity,
                    repeatDelay: 5,
                    duration: 0.5
                  },
                  scale: {
                    repeat: Infinity,
                    repeatDelay: 5,
                    duration: 0.5
                  }
                }}
                className="mr-2"
              >
                <MessageCircle size={16} />
              </motion.div>
              {t('chat')}
              
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-yellow-200 to-platemate-orange opacity-0 hover:opacity-10"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </Button>
            
            <motion.div
              className="absolute -top-1 -right-1 text-yellow-500"
              variants={sparkleVariants}
              initial="hidden"
              animate="visible"
            >
              <Sparkles size={14} />
            </motion.div>
          </motion.div>
        </HoverCardTrigger>
        <HoverCardContent className="w-56 p-2 shadow-lg border-platemate-orange/20 bg-white/90 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <p className="text-xs text-muted-foreground">{t('chatWith')}</p>
            <p className="font-medium">{chefName}</p>
            <div className="flex items-center mt-2">
              {chefAvatar && (
                <img 
                  src={chefAvatar} 
                  alt={chefName}
                  className="w-6 h-6 rounded-full mr-2 border border-platemate-orange/20"
                />
              )}
              <p className="text-xs text-muted-foreground">
                {t('quickResponseGuaranteed')}
              </p>
            </div>
          </motion.div>
        </HoverCardContent>
      </HoverCard>

      <AnimatePresence>
        {isChatOpen && (
          <motion.div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              variants={bubbleVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-full max-w-lg rounded-2xl overflow-hidden relative"
              style={{
                background: "white",
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
              }}
            >
              <motion.div
                className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-platemate-orange"
                variants={decorationVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.5 }}
              />
              <motion.div
                className="absolute -bottom-4 -right-4 w-12 h-12 rounded-full bg-platemate-orange/30"
                variants={decorationVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.6 }}
              />
              
              <motion.div
                className="absolute -top-1 right-12 w-4 h-4 rounded-full bg-yellow-300"
                variants={decorationVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.7 }}
              />
              
              <motion.div
                className="absolute top-6 -left-2 w-6 h-6 rounded-full bg-blue-300/30"
                variants={decorationVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.8 }}
              />
              
              <ChatInterface
                chefId={chefId}
                chefName={chefName}
                chefAvatar={chefAvatar}
                onClose={() => setIsChatOpen(false)}
              />
            </motion.div>
            
            <motion.button
              className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg text-platemate-brown"
              onClick={() => setIsChatOpen(false)}
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9, rotate: 0 }}
              initial={{ scale: 0, rotate: 180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <X size={24} />
            </motion.button>
            
            <motion.div
              className="absolute bottom-4 left-4 bg-white px-3 py-2 rounded-lg shadow-md text-xs flex items-center"
              variants={messageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ delay: 1.5 }}
            >
              <Send size={12} className="text-platemate-orange mr-2" />
              <span>{t('sendMessageToSolveDoubts')}</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatButton;
