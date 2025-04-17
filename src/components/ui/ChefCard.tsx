
import { Link, useNavigate } from "react-router-dom";
import { Star, Award, Video, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface ChefCardProps {
  id: string;
  name: string;
  image: string;
  specialties: string[];
  rating: number;
  reviewCount: number;
  badges: string[];
  distance: number;
  isLive: boolean;
  className?: string;
}

const ChefCard = ({
  id,
  name,
  image,
  specialties,
  rating,
  reviewCount,
  badges,
  distance,
  isLive,
  className
}: ChefCardProps) => {
  const navigate = useNavigate();

  const handleViewMenu = () => {
    navigate(`/menu/${id}`);
  };

  return (
    <div className={cn("platemate-card bg-white overflow-hidden", className)}>
      <div className="relative">
        <img 
          src={image} 
          alt={name}
          className="w-full h-48 object-cover"
        />
        
        {isLive && (
          <div className="absolute top-3 right-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full flex items-center animate-pulse">
            <Video size={12} className="mr-1" />
            <span>EN VIVO</span>
          </div>
        )}
        
        <div className="absolute bottom-3 left-3 flex space-x-1">
          {badges.map((badge, index) => (
            <div 
              key={index}
              className="flex items-center bg-white/90 backdrop-blur-sm text-xs px-2 py-1 rounded-full shadow-sm"
            >
              <Award size={12} className="text-platemate-orange mr-1" />
              <span className="text-platemate-brown font-medium">{badge}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-center">
          <Link to={`/chef/${id}`} className="group">
            <h3 className="font-bold text-lg text-platemate-brown group-hover:text-platemate-orange transition-colors">
              {name}
            </h3>
          </Link>
          
          <div className="flex items-center">
            <Star size={16} className="text-yellow-400 mr-1" />
            <span className="font-medium">{rating}</span>
            <span className="text-gray-500 text-sm ml-1">({reviewCount})</span>
          </div>
        </div>
        
        <div className="flex items-center mt-1 text-sm text-gray-500">
          <MapPin size={14} className="mr-1" />
          <span>{distance} km de distancia</span>
        </div>
        
        <div className="mt-3 flex flex-wrap gap-1">
          {specialties.map((specialty, index) => (
            <Badge 
              key={index}
              variant="secondary"
              className="bg-platemate-beige/50 text-platemate-brown"
            >
              {specialty}
            </Badge>
          ))}
        </div>
        
        <div className="mt-4">
          <Button 
            variant="default"
            className="bg-platemate-orange hover:bg-platemate-orange/90 text-white rounded-full w-full"
            onClick={handleViewMenu}
          >
            Ver menú
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChefCard;
