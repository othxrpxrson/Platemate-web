
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MapPin } from "lucide-react";

interface ChefAboutProps {
  chef: {
    name: string;
    bio: string;
    specialties: string[];
    location: string;
  };
}

const ChefAbout = ({ chef }: ChefAboutProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
      <h2 className="text-xl font-semibold text-platemate-brown mb-4">Sobre {chef.name}</h2>
      <p className="text-gray-600 mb-6">{chef.bio}</p>
      
      <Separator className="my-4" />
      
      <h3 className="font-medium text-platemate-brown mb-2">Especialidades</h3>
      <div className="flex flex-wrap gap-2 mb-6">
        {chef.specialties.map((specialty, index) => (
          <Badge 
            key={index}
            variant="secondary"
            className="bg-platemate-beige/50 text-platemate-brown"
          >
            {specialty}
          </Badge>
        ))}
      </div>
      
      <Separator className="my-4" />
      
      <h3 className="font-medium text-platemate-brown mb-2">Ubicación</h3>
      <div className="flex items-center text-gray-600">
        <MapPin size={16} className="mr-2 text-platemate-orange" />
        <span>{chef.location}</span>
      </div>
    </div>
  );
};

export default ChefAbout;
