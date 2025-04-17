
import { useState } from "react";
import { 
  Filter, 
  ChevronDown, 
  Search, 
  MapPin, 
  Clock, 
  XCircle,
  Grid,
  List,
  ChefHat,
  Video,
  Award
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger, 
  SheetFooter
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FoodCard from "@/components/ui/FoodCard";
import ChefCard from "@/components/ui/ChefCard";

// Mock data for foods
const foodItems = [
  {
    id: "food-1",
    name: "Ceviche Peruano",
    image: "https://images.unsplash.com/photo-1535399831218-d5bd36d1a6b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    price: 15.99,
    description: "Pescado fresco marinado en limón con cebolla, cilantro y ají. Servido con camote y maíz chulpi.",
    chef: {
      id: "chef-1",
      name: "María Rodriguez",
      rating: 4.8,
      verified: true
    },
    distance: 1.2,
    time: 35,
    rating: 4.7,
    dietary: ["Sin Gluten"],
    reservable: true
  },
  {
    id: "food-2",
    name: "Tacos de Carnitas",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    price: 12.50,
    description: "Tacos de cerdo confitado sobre tortillas de maíz hechas a mano con cilantro, cebolla y salsa verde.",
    chef: {
      id: "chef-2",
      name: "Carlos Méndez",
      rating: 4.6,
      verified: true
    },
    distance: 2.5,
    time: 25,
    rating: 4.9,
    dietary: ["Sin Lácteos"],
    reservable: false
  },
  {
    id: "food-3",
    name: "Tiramisu Casero",
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    price: 8.99,
    description: "Postre italiano clásico con capas de bizcocho, café, mascarpone y cacao. Receta familiar.",
    chef: {
      id: "chef-3",
      name: "Lucía Peralta",
      rating: 4.9,
      verified: false
    },
    distance: 3.7,
    time: 15,
    rating: 4.8,
    dietary: ["Vegetariano"],
    reservable: true
  },
  {
    id: "food-4",
    name: "Arepas Venezolanas",
    image: "https://images.unsplash.com/photo-1599040757302-fc2cbc3a9694?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    price: 10.25,
    description: "Arepas rellenas de pollo mechado, aguacate, queso y plátano maduro. Auténtica receta venezolana.",
    chef: {
      id: "chef-4",
      name: "Pablo García",
      rating: 4.7,
      verified: true
    },
    distance: 1.8,
    time: 30,
    rating: 4.6,
    dietary: [],
    reservable: false
  },
  {
    id: "food-5",
    name: "Sushi Rolls Mixtos",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    price: 18.75,
    description: "Selección de rolls de sushi con salmón, atún, langostino y vegetales. Incluye salsa de soya y wasabi.",
    chef: {
      id: "chef-5",
      name: "Akira Tanaka",
      rating: 4.9,
      verified: true
    },
    distance: 4.2,
    time: 40,
    rating: 4.9,
    dietary: ["Sin Lácteos"],
    reservable: true
  },
  {
    id: "food-6",
    name: "Lasaña Vegetariana",
    image: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    price: 14.50,
    description: "Lasaña artesanal con capas de berenjena, calabacín, espinacas y queso ricotta. Horneada con salsa de tomate casera.",
    chef: {
      id: "chef-6",
      name: "Sofia Moretti",
      rating: 4.7,
      verified: true
    },
    distance: 2.1,
    time: 35,
    rating: 4.6,
    dietary: ["Vegetariano"],
    reservable: false
  },
  {
    id: "food-7",
    name: "Pollo al Curry Tailandés",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    price: 16.99,
    description: "Pollo tierno en salsa de curry rojo tailandés con leche de coco, bambú y vegetales. Servido con arroz jazmín.",
    chef: {
      id: "chef-7",
      name: "Somchai Wijit",
      rating: 4.8,
      verified: false
    },
    distance: 3.4,
    time: 30,
    rating: 4.7,
    dietary: ["Sin Gluten"],
    reservable: true
  },
  {
    id: "food-8",
    name: "Brownies de Chocolate",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    price: 5.99,
    description: "Brownies artesanales con trozos de chocolate amargo y nueces. Textura húmeda por dentro y crujiente por fuera.",
    chef: {
      id: "chef-3",
      name: "Lucía Peralta",
      rating: 4.9,
      verified: false
    },
    distance: 3.7,
    time: 20,
    rating: 4.9,
    dietary: ["Vegetariano"],
    reservable: false
  },
];

// Mock data for chefs
const chefItems = [
  {
    id: "chef-1",
    name: "María Rodriguez",
    image: "https://images.unsplash.com/photo-1583394293214-28ded15ee548?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    specialties: ["Comida Peruana", "Mariscos", "Postres"],
    rating: 4.8,
    reviewCount: 124,
    badges: ["Rey de Puntualidad"],
    distance: 1.2,
    isLive: true
  },
  {
    id: "chef-2",
    name: "Carlos Méndez",
    image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    specialties: ["Tacos", "Comida Mexicana", "Picante"],
    rating: 4.6,
    reviewCount: 98,
    badges: ["Maestro del Sabor"],
    distance: 2.5,
    isLive: false
  },
  {
    id: "chef-3",
    name: "Lucía Peralta",
    image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    specialties: ["Postres Italianos", "Pastelería", "Sin Gluten"],
    rating: 4.9,
    reviewCount: 156,
    badges: ["Creatividad Culinaria"],
    distance: 3.7,
    isLive: false
  },
  {
    id: "chef-4",
    name: "Pablo García",
    image: "https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    specialties: ["Comida Venezolana", "Arepas", "Platos Criollos"],
    rating: 4.7,
    reviewCount: 89,
    badges: ["Tradición Culinaria"],
    distance: 1.8,
    isLive: true
  },
  {
    id: "chef-5",
    name: "Akira Tanaka",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    specialties: ["Sushi", "Ramen", "Cocina Japonesa"],
    rating: 4.9,
    reviewCount: 207,
    badges: ["Excelencia Culinaria", "Rey de Puntualidad"],
    distance: 4.2,
    isLive: false
  },
  {
    id: "chef-6",
    name: "Sofia Moretti",
    image: "https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    specialties: ["Pasta Casera", "Cocina Italiana", "Vegetariano"],
    rating: 4.7,
    reviewCount: 113,
    badges: ["Tradición Familiar"],
    distance: 2.1,
    isLive: false
  },
];

// Filter options
const dietaryOptions = [
  { id: "vegetarian", label: "Vegetariano" },
  { id: "vegan", label: "Vegano" },
  { id: "gluten-free", label: "Sin Gluten" },
  { id: "dairy-free", label: "Sin Lácteos" },
  { id: "keto", label: "Keto" },
  { id: "low-carb", label: "Bajo en Carbohidratos" },
];

const cuisineOptions = [
  { id: "peruvian", label: "Peruana" },
  { id: "mexican", label: "Mexicana" },
  { id: "italian", label: "Italiana" },
  { id: "japanese", label: "Japonesa" },
  { id: "thai", label: "Tailandesa" },
  { id: "venezuelan", label: "Venezolana" },
  { id: "chinese", label: "China" },
  { id: "american", label: "Americana" },
];

const BrowsePage = () => {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [maxDistance, setMaxDistance] = useState(10);
  const [maxTime, setMaxTime] = useState(60);
  const [minRating, setMinRating] = useState(4);
  const [viewType, setViewType] = useState<"grid" | "list">("grid");
  const [activeBrowseTab, setActiveBrowseTab] = useState<"food" | "chefs">("food");
  
  const toggleFilter = (filter: string) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter(f => f !== filter));
    } else {
      setActiveFilters([...activeFilters, filter]);
    }
  };
  
  const clearFilters = () => {
    setActiveFilters([]);
    setMaxDistance(10);
    setMaxTime(60);
    setMinRating(4);
  };
  
  // Filter foods based on active filters
  const filteredFood = foodItems.filter(food => {
    // Check search term
    if (searchTerm && !food.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !food.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !food.chef.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Check dietary filters
    if (activeFilters.length > 0) {
      const hasDietary = food.dietary.some(dietary => 
        activeFilters.some(filter => dietary.toLowerCase().includes(filter.toLowerCase()))
      );
      
      if (!hasDietary) return false;
    }
    
    // Check distance
    if (food.distance > maxDistance) return false;
    
    // Check time
    if (food.time > maxTime) return false;
    
    // Check rating
    if (food.rating < minRating) return false;
    
    return true;
  });
  
  // Filter chefs based on active filters
  const filteredChefs = chefItems.filter(chef => {
    // Check search term
    if (searchTerm && !chef.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !chef.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))) {
      return false;
    }
    
    // Check distance
    if (chef.distance > maxDistance) return false;
    
    // Check rating
    if (chef.rating < minRating) return false;
    
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-platemate-beige/30 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
              <h1 className="text-3xl font-bold text-platemate-brown mb-4 md:mb-0">
                {activeBrowseTab === "food" ? "Explorar Comidas" : "Explorar Cocineros"}
              </h1>
              
              <div className="flex flex-wrap items-center gap-2">
                <div className="relative flex-grow max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <Input 
                    type="text"
                    placeholder={activeBrowseTab === "food" ? "Buscar comidas, ingredientes..." : "Buscar cocineros, especialidades..."}
                    className="pl-10 pr-4 py-2 rounded-full border-platemate-beige focus-visible:ring-platemate-orange"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <Sheet>
                  <SheetTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="border-platemate-beige hover:border-platemate-orange hover:bg-platemate-beige/20 text-platemate-brown rounded-full flex items-center gap-2"
                    >
                      <Filter size={16} />
                      <span>Filtros</span>
                      {activeFilters.length > 0 && (
                        <span className="bg-platemate-orange text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {activeFilters.length}
                        </span>
                      )}
                    </Button>
                  </SheetTrigger>
                  
                  <SheetContent className="w-full sm:max-w-md overflow-y-auto">
                    <SheetHeader>
                      <SheetTitle>Filtros</SheetTitle>
                    </SheetHeader>
                    
                    <div className="py-4 space-y-6">
                      <Accordion type="single" collapsible className="w-full">
                        {activeBrowseTab === "food" && (
                          <AccordionItem value="item-1">
                            <AccordionTrigger className="text-platemate-brown font-medium">
                              Preferencias Dietéticas
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="grid grid-cols-2 gap-2 pt-2">
                                {dietaryOptions.map((option) => (
                                  <label 
                                    key={option.id}
                                    className="flex items-start space-x-2 cursor-pointer"
                                  >
                                    <Checkbox 
                                      id={option.id}
                                      checked={activeFilters.includes(option.id)}
                                      onCheckedChange={() => toggleFilter(option.id)}
                                      className="data-[state=checked]:bg-platemate-orange data-[state=checked]:border-platemate-orange mt-0.5"
                                    />
                                    <span className="text-sm">{option.label}</span>
                                  </label>
                                ))}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        )}
                        
                        {activeBrowseTab === "food" && (
                          <AccordionItem value="item-2">
                            <AccordionTrigger className="text-platemate-brown font-medium">
                              Tipo de Cocina
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="grid grid-cols-2 gap-2 pt-2">
                                {cuisineOptions.map((option) => (
                                  <label 
                                    key={option.id}
                                    className="flex items-start space-x-2 cursor-pointer"
                                  >
                                    <Checkbox 
                                      id={option.id}
                                      checked={activeFilters.includes(option.id)}
                                      onCheckedChange={() => toggleFilter(option.id)}
                                      className="data-[state=checked]:bg-platemate-orange data-[state=checked]:border-platemate-orange mt-0.5"
                                    />
                                    <span className="text-sm">{option.label}</span>
                                  </label>
                                ))}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        )}
                        
                        <AccordionItem value="item-3">
                          <AccordionTrigger className="text-platemate-brown font-medium">
                            Distancia
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4 pt-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm flex items-center gap-1">
                                  <MapPin size={14} className="text-platemate-orange" />
                                  Máximo {maxDistance} km
                                </span>
                              </div>
                              
                              <Slider
                                defaultValue={[maxDistance]}
                                max={20}
                                step={1}
                                value={[maxDistance]}
                                onValueChange={(values) => setMaxDistance(values[0])}
                                className="py-4"
                              />
                              
                              <div className="flex justify-between text-xs text-gray-500">
                                <span>1 km</span>
                                <span>10 km</span>
                                <span>20 km</span>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                        
                        {activeBrowseTab === "food" && (
                          <AccordionItem value="item-4">
                            <AccordionTrigger className="text-platemate-brown font-medium">
                              Tiempo de Entrega
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="space-y-4 pt-2">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm flex items-center gap-1">
                                    <Clock size={14} className="text-platemate-orange" />
                                    Máximo {maxTime} minutos
                                  </span>
                                </div>
                                
                                <Slider
                                  defaultValue={[maxTime]}
                                  max={90}
                                  step={5}
                                  value={[maxTime]}
                                  onValueChange={(values) => setMaxTime(values[0])}
                                  className="py-4"
                                />
                                
                                <div className="flex justify-between text-xs text-gray-500">
                                  <span>15 min</span>
                                  <span>45 min</span>
                                  <span>90 min</span>
                                </div>
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        )}
                        
                        <AccordionItem value="item-5">
                          <AccordionTrigger className="text-platemate-brown font-medium">
                            Calificación
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4 pt-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm">
                                  {minRating}★ o más
                                </span>
                              </div>
                              
                              <Slider
                                defaultValue={[minRating]}
                                min={1}
                                max={5}
                                step={0.5}
                                value={[minRating]}
                                onValueChange={(values) => setMinRating(values[0])}
                                className="py-4"
                              />
                              
                              <div className="flex justify-between text-xs text-gray-500">
                                <span>1★</span>
                                <span>3★</span>
                                <span>5★</span>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                    
                    <SheetFooter className="sm:justify-start space-x-2 pt-2 border-t">
                      <Button 
                        variant="outline"
                        className="border-red-300 text-red-500 hover:bg-red-50"
                        onClick={clearFilters}
                      >
                        <XCircle size={16} className="mr-2" />
                        Limpiar filtros
                      </Button>
                      
                      <Button className="bg-platemate-orange hover:bg-platemate-orange/90 text-white">
                        Aplicar filtros
                      </Button>
                    </SheetFooter>
                  </SheetContent>
                </Sheet>
                
                <div className="flex space-x-1 rounded-lg overflow-hidden border border-platemate-beige">
                  <Button 
                    variant="ghost"
                    size="icon"
                    className={`rounded-none ${viewType === 'grid' ? 'bg-platemate-beige/30' : ''}`}
                    onClick={() => setViewType('grid')}
                  >
                    <Grid size={18} />
                  </Button>
                  <Button 
                    variant="ghost"
                    size="icon"
                    className={`rounded-none ${viewType === 'list' ? 'bg-platemate-beige/30' : ''}`}
                    onClick={() => setViewType('list')}
                  >
                    <List size={18} />
                  </Button>
                </div>
              </div>
            </div>
            
            <Tabs 
              defaultValue="food"
              value={activeBrowseTab}
              onValueChange={(value) => setActiveBrowseTab(value as "food" | "chefs")}
              className="w-full"
            >
              <TabsList className="bg-platemate-beige/50 mb-6">
                <TabsTrigger 
                  value="food" 
                  className="data-[state=active]:bg-white flex items-center gap-2"
                >
                  <ChefHat size={16} />
                  <span>Comidas</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="chefs" 
                  className="data-[state=active]:bg-white flex items-center gap-2"
                >
                  <ChefHat size={16} />
                  <span>Cocineros</span>
                </TabsTrigger>
              </TabsList>
              
              {activeFilters.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {activeFilters.map(filter => {
                    const dietaryOption = dietaryOptions.find(o => o.id === filter);
                    const cuisineOption = cuisineOptions.find(o => o.id === filter);
                    const label = dietaryOption?.label || cuisineOption?.label || filter;
                    
                    return (
                      <div 
                        key={filter}
                        className="bg-platemate-orange/10 text-platemate-orange text-sm rounded-full px-3 py-1 flex items-center"
                      >
                        <span>{label}</span>
                        <button onClick={() => toggleFilter(filter)} className="ml-2">
                          <XCircle size={14} />
                        </button>
                      </div>
                    );
                  })}
                  
                  <button 
                    onClick={clearFilters}
                    className="text-sm text-platemate-orange underline"
                  >
                    Limpiar todos
                  </button>
                </div>
              )}
              
              <TabsContent value="food" className="mt-0">
                {filteredFood.length > 0 ? (
                  viewType === 'grid' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {filteredFood.map((food) => (
                        <FoodCard 
                          key={food.id}
                          {...food}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {filteredFood.map((food) => (
                        <div 
                          key={food.id}
                          className="platemate-card bg-white flex flex-col md:flex-row overflow-hidden"
                        >
                          <div className="md:w-1/3 h-48 md:h-auto relative">
                            <img 
                              src={food.image} 
                              alt={food.name}
                              className="w-full h-full object-cover"
                            />
                            {food.dietary.length > 0 && (
                              <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                                {food.dietary.map((diet) => (
                                  <div 
                                    key={diet} 
                                    className="bg-white/80 backdrop-blur-sm text-platemate-brown text-xs py-1 px-2 rounded-full shadow-sm"
                                  >
                                    {diet}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                          
                          <div className="p-4 md:w-2/3 flex flex-col">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-bold text-lg text-platemate-brown">{food.name}</h3>
                              <span className="font-bold text-platemate-orange">${food.price.toFixed(2)}</span>
                            </div>
                            
                            <div className="flex items-center mb-2">
                              <ChefHat size={14} className="text-platemate-brown mr-1" />
                              <span className="text-sm text-platemate-brown">
                                {food.chef.name}
                              </span>
                              {food.chef.verified && (
                                <div className="ml-2 py-0.5 px-1.5 bg-blue-50 text-blue-600 text-xs rounded-full border border-blue-200">
                                  Verificado
                                </div>
                              )}
                            </div>
                            
                            <p className="text-sm text-gray-600 mb-auto">{food.description}</p>
                            
                            <div className="flex items-center justify-between mt-4">
                              <div className="flex items-center space-x-4 text-xs text-gray-500">
                                <div className="flex items-center">
                                  <MapPin size={12} className="mr-1" />
                                  <span>{food.distance} km</span>
                                </div>
                                <div className="flex items-center">
                                  <Clock size={12} className="mr-1" />
                                  <span>{food.time} min</span>
                                </div>
                                <div className="flex items-center text-yellow-500">
                                  <span className="font-medium mr-1">{food.rating}</span>
                                  <span>★</span>
                                </div>
                              </div>
                              
                              <div className="flex gap-2">
                                <Button 
                                  variant="default" 
                                  className="bg-platemate-orange hover:bg-platemate-orange/90 text-white rounded-full text-sm"
                                >
                                  Ordenar
                                </Button>
                                
                                {food.reservable && (
                                  <Button 
                                    variant="outline"
                                    className="border-platemate-orange text-platemate-orange hover:bg-platemate-orange/10 rounded-full text-sm"
                                  >
                                    Reservar
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )
                ) : (
                  <div className="text-center py-12">
                    <div className="mx-auto w-16 h-16 mb-4 text-gray-300">
                      <ChefHat size={48} className="mx-auto" />
                    </div>
                    <h3 className="text-lg font-medium text-platemate-brown mb-1">No se encontraron comidas</h3>
                    <p className="text-sm text-gray-500">Intenta ajustar tus filtros o buscar algo diferente</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="chefs" className="mt-0">
                {filteredChefs.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredChefs.map((chef) => (
                      <ChefCard 
                        key={chef.id}
                        {...chef}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="mx-auto w-16 h-16 mb-4 text-gray-300">
                      <ChefHat size={48} className="mx-auto" />
                    </div>
                    <h3 className="text-lg font-medium text-platemate-brown mb-1">No se encontraron cocineros</h3>
                    <p className="text-sm text-gray-500">Intenta ajustar tus filtros o buscar algo diferente</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BrowsePage;
