
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { Truck, MapPin, Home, Navigation, Utensils } from "lucide-react";

interface Coordinate {
  lat: number;
  lng: number;
}

interface DeliveryMapProps {
  restaurantLocation?: Coordinate;
  customerLocation?: Coordinate;
  courierLocation?: Coordinate;
  estimatedDeliveryTime?: string;
  status: "preparing" | "ready" | "onTheWay" | "arrived" | "delivered";
  // Also support older interface with currentLocation and destination
  currentLocation?: Coordinate;
  destination?: {
    lat: number;
    lng: number;
    address: string;
  };
}

const DEFAULT_COORDINATES = {
  restaurant: { lat: -12.0464, lng: -77.0428 }, // Lima, Peru
  customer: { lat: -12.1464, lng: -77.0228 }, // Near Lima
};

const cloudVariants = {
  initial: { x: "100%", opacity: 0 },
  animate: { x: "-100%", opacity: [0, 1, 1, 0], transition: { duration: 15, repeat: Infinity } },
};

const DeliveryMap: React.FC<DeliveryMapProps> = ({
  restaurantLocation = DEFAULT_COORDINATES.restaurant,
  customerLocation = DEFAULT_COORDINATES.customer,
  courierLocation,
  estimatedDeliveryTime,
  status = "onTheWay",
  // Handle the older interface properties
  currentLocation,
  destination,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [map, setMap] = useState<any>(null);
  const [markers, setMarkers] = useState<any[]>([]);
  const [directionsService, setDirectionsService] = useState<any>(null);
  const [directionsRenderer, setDirectionsRenderer] = useState<any>(null);
  const [animated, setAnimated] = useState(false);
  const { t } = useLanguage();

  // Support legacy props by mapping them to new props
  useEffect(() => {
    if (currentLocation) {
      courierLocation = currentLocation;
    }
    if (destination && destination.lat && destination.lng) {
      customerLocation = { lat: destination.lat, lng: destination.lng };
    }
  }, [currentLocation, destination]);

  // Calculate progress based on status
  useEffect(() => {
    switch (status) {
      case "preparing":
        setProgress(10);
        break;
      case "ready":
        setProgress(25);
        break;
      case "onTheWay":
        setProgress(60);
        break;
      case "arrived":
        setProgress(90);
        break;
      case "delivered":
        setProgress(100);
        break;
      default:
        setProgress(0);
    }
  }, [status]);

  const renderSimpleMap = () => {
    const getProgressPosition = () => {
      // This is a simplified calculation, just for the animation
      if (!mapContainerRef.current) return { x: 0, y: 0 };
      
      const containerWidth = mapContainerRef.current.offsetWidth;
      const startX = containerWidth * 0.2; // 20% from the left
      const endX = containerWidth * 0.8; // 80% from the left
      
      const x = startX + ((endX - startX) * progress) / 100;
      return { x, y: mapContainerRef.current.offsetHeight / 2 };
    };
    
    const truckPosition = getProgressPosition();

    return (
      <div ref={mapContainerRef} className="relative w-full h-full bg-gradient-to-b from-sky-300 to-sky-500 overflow-hidden">
        {/* Animated clouds */}
        <div className="absolute inset-0 pointer-events-none">
          {[1, 2, 3, 4].map((cloud) => (
            <motion.div
              key={cloud}
              className="absolute"
              style={{
                top: `${cloud * 15}%`,
                left: `${cloud * 20}%`,
              }}
              variants={cloudVariants}
              initial="initial"
              animate="animate"
              custom={cloud}
            >
              <div className="bg-white rounded-full w-16 h-8 blur-sm opacity-80"></div>
            </motion.div>
          ))}
        </div>
        
        {/* Ground/road */}
        <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gray-800">
          <div className="absolute top-0 left-0 right-0 h-2 bg-yellow-400"></div>
          <div className="absolute top-1/2 left-0 right-0 h-4 flex">
            <div className="w-10 h-full bg-yellow-400"></div>
            <div className="w-10 h-full bg-transparent"></div>
            <div className="w-10 h-full bg-yellow-400"></div>
            <div className="w-10 h-full bg-transparent"></div>
            <div className="w-10 h-full bg-yellow-400"></div>
            <div className="w-10 h-full bg-transparent"></div>
            <div className="w-10 h-full bg-yellow-400"></div>
            <div className="w-10 h-full bg-transparent"></div>
            <div className="w-10 h-full bg-yellow-400"></div>
            <div className="w-10 h-full bg-transparent"></div>
            <div className="w-10 h-full bg-yellow-400"></div>
            <div className="w-10 h-full bg-transparent"></div>
            <div className="w-10 h-full bg-yellow-400"></div>
            <div className="w-10 h-full bg-transparent"></div>
            <div className="w-10 h-full bg-yellow-400"></div>
            <div className="w-10 h-full bg-transparent"></div>
            <div className="w-10 h-full bg-yellow-400"></div>
            <div className="w-10 h-full bg-transparent"></div>
            <div className="w-10 h-full bg-yellow-400"></div>
            <div className="w-10 h-full bg-transparent"></div>
          </div>
        </div>
        
        {/* Restaurant marker */}
        <div className="absolute bottom-1/4 left-[20%] transform -translate-x-1/2 translate-y-1/2">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="flex flex-col items-center"
            whileHover={{ scale: 1.1 }}
          >
            <div className="bg-platemate-orange p-2 rounded-full text-white mb-1">
              <Utensils size={20} />
            </div>
            <div className="bg-white px-2 py-1 rounded text-xs font-medium shadow-md">
              {t('restaurant')}
            </div>
          </motion.div>
        </div>
        
        {/* Destination marker */}
        <div className="absolute bottom-1/4 left-[80%] transform -translate-x-1/2 translate-y-1/2">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, type: "spring" }}
            className="flex flex-col items-center"
            whileHover={{ scale: 1.1 }}
          >
            <div className="bg-green-500 p-2 rounded-full text-white mb-1">
              <Home size={20} />
            </div>
            <div className="bg-white px-2 py-1 rounded text-xs font-medium shadow-md">
              {t('yourLocation')}
            </div>
          </motion.div>
        </div>
        
        {/* Delivery Truck */}
        <motion.div
          className="absolute pointer-events-none"
          style={{
            left: truckPosition.x,
            top: truckPosition.y,
          }}
          initial={{ scale: 0, rotate: 0 }}
          animate={{
            scale: 1, 
            x: status === "delivered" ? 20 : 0,
            rotate: status === "delivered" ? 10 : 0
          }}
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
        >
          <motion.div 
            className="flex flex-col items-center"
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: "easeInOut",
            }}
          >
            <div className="bg-blue-600 p-3 rounded-full text-white mb-1 shadow-lg">
              <Truck size={24} />
            </div>
            <div className="bg-white px-2 py-1 rounded text-xs font-medium shadow-md">
              {status === "delivered" ? t('delivered') : t('onTheWay')}
            </div>
          </motion.div>
        </motion.div>
        
        {/* Progress bar */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-gray-200 h-2 rounded-full overflow-hidden">
            <motion.div
              className="bg-platemate-orange h-full rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ 
                type: "spring", 
                stiffness: 100, 
                damping: 15 
              }}
            />
          </div>
          <div className="flex justify-between mt-1 text-xs font-medium">
            <span className="text-white">{t('restaurant')}</span>
            <span className="text-white">{estimatedDeliveryTime || "30 min"}</span>
            <span className="text-white">{t('destination')}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <motion.div 
      className="w-full h-80 md:h-96 rounded-xl overflow-hidden shadow-lg relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
    >
      {renderSimpleMap()}
    </motion.div>
  );
};

export default DeliveryMap;
