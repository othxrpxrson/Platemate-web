
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useToast } from '@/hooks/use-toast';

interface ChefAvailabilityToggleProps {
  initialAvailable?: boolean;
  isCurrentUserChef?: boolean;
  onToggle?: (available: boolean) => void;
}

const ChefAvailabilityToggle: React.FC<ChefAvailabilityToggleProps> = ({
  initialAvailable = true,
  isCurrentUserChef = false,
  onToggle
}) => {
  const [isAvailable, setIsAvailable] = useState(initialAvailable);
  const { t } = useLanguage();
  const { toast } = useToast();

  useEffect(() => {
    setIsAvailable(initialAvailable);
  }, [initialAvailable]);

  const handleToggle = () => {
    if (!isCurrentUserChef) return;
    
    const newAvailability = !isAvailable;
    setIsAvailable(newAvailability);
    
    if (onToggle) onToggle(newAvailability);
    
    toast({
      title: newAvailability ? t('availabilityEnabled') : t('availabilityDisabled'),
      description: newAvailability ? t('nowAcceptingOrders') : t('notAcceptingOrders'),
    });
  };

  // Animation variants
  const containerVariants = {
    available: { 
      backgroundColor: "#ECFDF5",
      borderColor: "#10B981",
      transition: { duration: 0.3 }
    },
    unavailable: { 
      backgroundColor: "#FEF2F2",
      borderColor: "#F87171",
      transition: { duration: 0.3 }
    }
  };

  const dotVariants = {
    available: { 
      backgroundColor: "#10B981",
      scale: [1, 1.2, 1],
      transition: { 
        duration: 0.5,
        repeat: Infinity,
        repeatDelay: 3
      }
    },
    unavailable: { 
      backgroundColor: "#F87171",
      scale: 1,
      transition: { duration: 0.3 }
    }
  };

  const textVariants = {
    available: { 
      color: "#10B981",
      transition: { duration: 0.3 }
    },
    unavailable: { 
      color: "#F87171",
      transition: { duration: 0.3 }
    }
  };

  const iconVariants = {
    available: { 
      rotate: [0, 15, 0, -15, 0],
      transition: { 
        duration: 2,
        repeat: Infinity,
        repeatDelay: 5
      }
    },
    unavailable: { 
      rotate: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      animate={isAvailable ? "available" : "unavailable"}
      className={`flex items-center px-3 py-1.5 rounded-full border border-2 ${
        isCurrentUserChef ? 'cursor-pointer' : 'cursor-default'
      }`}
      onClick={handleToggle}
      whileHover={isCurrentUserChef ? { scale: 1.05 } : {}}
      whileTap={isCurrentUserChef ? { scale: 0.95 } : {}}
    >
      <motion.div
        variants={dotVariants}
        animate={isAvailable ? "available" : "unavailable"}
        className="w-2 h-2 rounded-full mr-2"
      />
      
      <motion.div
        variants={textVariants}
        animate={isAvailable ? "available" : "unavailable"}
        className="text-sm font-medium mr-1"
      >
        {isAvailable ? t('available') : t('unavailable')}
      </motion.div>
      
      <motion.div
        variants={iconVariants}
        animate={isAvailable ? "available" : "unavailable"}
        className={isAvailable ? "text-green-500" : "text-red-400"}
      >
        <Clock size={14} />
      </motion.div>
    </motion.div>
  );
};

export default ChefAvailabilityToggle;
