
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Heart, 
  Clock, 
  Star, 
  ChefHat, 
  MapPin,
  Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface FoodCardProps {
  id: string;
  name: string;
  image: string;
  price: number;
  description: string;
  chef: {
    id: string;
    name: string;
    rating: number;
    verified: boolean;
  };
  distance: number;
  time: number;
  rating: number;
  dietary: string[];
  reservable?: boolean;
  className?: string;
}

const FoodCard = ({
  id,
  name,
  image,
  price,
  description,
  chef,
  distance,
  time,
  rating,
  dietary,
  reservable = false,
  className
}: FoodCardProps) => {
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();

  const handleOrder = () => {
    navigate(`/order/${id}`);
  };

  return (
    <div className={cn("food-card platemate-card", className)}>
      <div className="relative overflow-hidden aspect-[4/3]">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover"
        />
        <button 
          className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors"
          onClick={() => setLiked(!liked)}
        >
          <Heart 
            size={18} 
            className={cn(
              "transition-colors", 
              liked ? "fill-red-500 text-red-500" : "text-gray-500"
            )} 
          />
        </button>
        
        {dietary.length > 0 && (
          <div className="absolute top-3 left-3 flex flex-wrap gap-1">
            {dietary.map((diet) => (
              <Badge 
                key={diet} 
                variant="secondary"
                className="bg-white/80 backdrop-blur-sm text-platemate-brown text-[10px] font-medium"
              >
                {diet}
              </Badge>
            ))}
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start">
          <Link to={`/food/${id}`} className="hover:underline">
            <h3 className="font-bold text-lg text-platemate-brown">{name}</h3>
          </Link>
          <span className="font-bold text-platemate-orange">${price.toFixed(2)}</span>
        </div>
        
        <Link to={`/chef/${chef.id}`} className="flex items-center mt-2 group">
          <div className="flex items-center">
            <ChefHat size={14} className="text-platemate-brown mr-1" />
            <span className="text-sm text-platemate-brown group-hover:text-platemate-orange transition-colors">
              {chef.name}
            </span>
          </div>
          {chef.verified && (
            <Badge variant="outline" className="ml-2 py-0 h-5 bg-blue-50 text-blue-600 text-[10px] border-blue-200">
              Verificado
            </Badge>
          )}
        </Link>
        
        <p className="text-sm text-gray-600 mt-2 line-clamp-2">{description}</p>
        
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center space-x-3 text-xs text-gray-500">
            <div className="flex items-center">
              <MapPin size={12} className="mr-1" />
              <span>{distance} km</span>
            </div>
            <div className="flex items-center">
              <Clock size={12} className="mr-1" />
              <span>{time} min</span>
            </div>
            <div className="flex items-center">
              <Star size={12} className="mr-1 text-yellow-400" />
              <span>{rating}</span>
            </div>
          </div>
        </div>
        
        <div className="mt-4 flex justify-between items-center gap-2">
          <Button 
            variant="default" 
            className="bg-platemate-orange hover:bg-platemate-orange/90 text-white rounded-full flex-1"
            onClick={handleOrder}
          >
            Ordenar
          </Button>
          
          {reservable && (
            <Button 
              variant="outline" 
              className="border-platemate-orange text-platemate-orange hover:bg-platemate-orange/10 rounded-full flex items-center gap-1"
              onClick={handleOrder}
            >
              <Calendar size={16} />
              <span>Reservar</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
