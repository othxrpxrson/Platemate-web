
import { useNavigate } from "react-router-dom";
import { 
  Star, 
  MapPin, 
  Utensils, 
  Award,
  ArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChefHeaderProps {
  chef: {
    id: string;
    name: string;
    image: string;
    coverImage: string;
    rating: number;
    reviewCount: number;
    badges: string[];
    distance: number;
    ordersCompleted: number;
  };
}

const ChefHeader = ({ chef }: ChefHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="relative">
      <div className="h-64 sm:h-80 w-full">
        <img 
          src={chef.coverImage} 
          alt={`${chef.name} cover`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-end gap-4">
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white overflow-hidden -mt-12 sm:-mt-16 z-10 bg-white">
            <img 
              src={chef.image} 
              alt={chef.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex-grow">
            <h1 className="text-2xl sm:text-3xl font-bold mb-1">{chef.name}</h1>
            
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <div className="flex items-center">
                <Star size={16} className="text-yellow-400 mr-1" />
                <span className="font-medium">{chef.rating}</span>
                <span className="text-white/80 ml-1">({chef.reviewCount} reseñas)</span>
              </div>
              
              <div className="flex items-center">
                <MapPin size={14} className="mr-1" />
                <span>{chef.distance} km</span>
              </div>
              
              <div className="flex items-center">
                <Utensils size={14} className="mr-1" />
                <span>{chef.ordersCompleted} pedidos</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {chef.badges.map((badge, index) => (
                <div 
                  key={index}
                  className="flex items-center bg-white/20 backdrop-blur-sm text-xs px-2 py-1 rounded-full"
                >
                  <Award size={12} className="text-yellow-400 mr-1" />
                  <span>{badge}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-auto">
            <Button
              onClick={() => navigate(-1)}
              variant="outline"
              className="bg-white/20 backdrop-blur-sm border-white text-white hover:bg-white hover:text-platemate-brown"
            >
              <ArrowLeft size={16} className="mr-2" />
              Volver
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChefHeader;
