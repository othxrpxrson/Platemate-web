
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe, CheckCircle2 } from 'lucide-react';
import { useLanguage, Language } from '@/context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  
  const languages = [
    { name: "Español", code: "es", flag: "🇵🇪" },
    { name: "Quechua", code: "qu", flag: "🇵🇪" },
    { name: "Aymara", code: "ay", flag: "🇵🇪" }
  ];

  const dropdownVariants = {
    hidden: { opacity: 0, scale: 0.95, y: -5 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        bounce: 0.4, 
        duration: 0.4,
        staggerChildren: 0.05
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: -5,
      transition: { 
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    },
    hover: { 
      scale: 1.03, 
      x: 3,
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 10 
      }
    },
    tap: { 
      scale: 0.97,
      transition: { duration: 0.1 }
    }
  };

  const globeVariants = {
    initial: { rotate: 0 },
    animate: { 
      rotate: 360,
      transition: {
        duration: 20,
        repeat: Infinity,
        ease: "linear"
      }
    },
    hover: {
      scale: 1.15,
      rotate: 15,
      transition: {
        scale: {
          type: "spring",
          stiffness: 400,
          damping: 10
        }
      }
    },
    tap: {
      scale: 0.9,
      rotate: -15,
      transition: {
        duration: 0.1
      }
    }
  };

  const glowVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: [0.1, 0.3, 0.1],
      scale: [1, 1.2, 1],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const checkmarkVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 15,
        delay: 0.1
      }
    }
  };

  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <DropdownMenu onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className="relative overflow-hidden group"
        >
          <motion.div
            variants={glowVariants}
            initial="initial"
            animate="animate"
            className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-20 rounded-full"
          />
          <motion.div
            variants={globeVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            whileTap="tap"
            className="relative z-10"
          >
            <Globe size={20} className="text-platemate-brown group-hover:text-platemate-orange transition-colors duration-300" />
            <motion.div 
              className="absolute -top-1 -right-1 w-2 h-2 bg-platemate-orange rounded-full"
              initial={{ scale: 0 }}
              animate={{ 
                scale: [0, 1, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3
              }}
            />
          </motion.div>
        </Button>
      </DropdownMenuTrigger>

      <AnimatePresence>
        {isOpen && (
          <DropdownMenuContent 
            align="end" 
            className="bg-white/95 backdrop-blur-md border border-gray-200 shadow-xl rounded-xl p-1 overflow-hidden"
            asChild
            forceMount
          >
            <motion.div
              variants={dropdownVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{ 
                transformOrigin: 'var(--radix-dropdown-menu-content-transform-origin)'
              }}
            >
              {languages.map((lang) => (
                <motion.div 
                  key={lang.code} 
                  variants={itemVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <DropdownMenuItem 
                    onClick={() => setLanguage(lang.code as Language)}
                    className={`
                      relative my-1 rounded-lg transition-all duration-300 
                      flex items-center px-4 py-2.5 overflow-hidden
                      ${language === lang.code 
                        ? "bg-gradient-to-r from-platemate-beige/50 to-platemate-cream text-platemate-brown font-medium" 
                        : "hover:bg-platemate-beige/20"}
                    `}
                  >
                    {language === lang.code && (
                      <motion.div 
                        className="absolute inset-0 bg-platemate-orange/5 rounded-lg"
                        initial={{ opacity: 0 }}
                        animate={{ 
                          opacity: [0.05, 0.1, 0.05],
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                        }}
                      />
                    )}
                    
                    <motion.span 
                      className="mr-3 text-xl"
                      whileHover={{ 
                        scale: 1.3, 
                        rotate: [0, 10, -10, 0],
                        transition: {
                          rotate: {
                            duration: 0.6
                          },
                          scale: {
                            type: "spring",
                            stiffness: 400
                          }
                        }
                      }}
                    >
                      {lang.flag}
                    </motion.span>
                    
                    {lang.name}
                    
                    {language === lang.code && (
                      <motion.div 
                        className="ml-auto flex items-center"
                        variants={checkmarkVariants}
                      >
                        <CheckCircle2 size={18} className="text-platemate-orange" />
                      </motion.div>
                    )}
                  </DropdownMenuItem>
                </motion.div>
              ))}
            </motion.div>
          </DropdownMenuContent>
        )}
      </AnimatePresence>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
