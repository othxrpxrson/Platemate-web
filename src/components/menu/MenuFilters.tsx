
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";

interface MenuFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  activeCategory: string;
  setActiveCategory: (value: string) => void;
  categories: string[];
  onClearFilters: () => void;
}

const MenuFilters = ({ 
  searchTerm, 
  setSearchTerm, 
  activeCategory, 
  setActiveCategory, 
  categories,
  onClearFilters
}: MenuFiltersProps) => {
  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <h2 className="text-2xl font-bold text-platemate-brown">Menú</h2>
        
        <div className="flex items-center gap-2">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <Input 
              type="text"
              placeholder="Buscar en el menú..."
              className="pl-10 pr-4 py-2 rounded-full border-platemate-beige focus-visible:ring-platemate-orange max-w-xs"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>
      
      <Tabs defaultValue={activeCategory} className="w-full mb-6">
        <TabsList className="bg-platemate-beige/50 mb-6">
          {categories.map(category => (
            <TabsTrigger 
              key={category}
              value={category}
              onClick={() => setActiveCategory(category)}
              className="data-[state=active]:bg-white"
            >
              {category === "all" ? "Todos" : category}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </>
  );
};

export default MenuFilters;
