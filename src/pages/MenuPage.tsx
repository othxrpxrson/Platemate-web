import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ChefHeader from "@/components/chef/ChefHeader";
import ChefAbout from "@/components/chef/ChefAbout";
import MenuFilters from "@/components/menu/MenuFilters";
import MenuContent from "@/components/menu/MenuContent";

// Mock chef data
const chefs = [
  {
    id: "chef-1",
    name: "María Rodriguez",
    image: "https://images.unsplash.com/photo-1583394293214-28ded15ee548?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    coverImage: "https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    bio: "Chef con más de 15 años de experiencia especializada en comida peruana tradicional. Aprendí a cocinar con mi abuela en Lima y he perfeccionado mis técnicas en restaurantes de renombre.",
    specialties: ["Comida Peruana", "Mariscos", "Postres"],
    rating: 4.8,
    reviewCount: 124,
    badges: ["Rey de Puntualidad", "Especialista en Mariscos"],
    distance: 1.2,
    isLive: true,
    location: "Miraflores, Lima",
    ordersCompleted: 567
  },
  {
    id: "chef-2",
    name: "Carlos Méndez",
    image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    coverImage: "https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    bio: "Apasionado por la auténtica comida mexicana callejera. Mi especialidad son los tacos de diferentes regiones de México, preparados con ingredientes frescos y técnicas tradicionales.",
    specialties: ["Tacos", "Comida Mexicana", "Picante"],
    rating: 4.6,
    reviewCount: 98,
    badges: ["Maestro del Sabor"],
    distance: 2.5,
    isLive: false,
    location: "Condesa, CDMX",
    ordersCompleted: 432
  },
  {
    id: "chef-3",
    name: "Lucía Peralta",
    image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    coverImage: "https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    bio: "Pastelera profesional especializada en postres italianos y opciones sin gluten. Mi filosofía es que todos merecen disfrutar de postres deliciosos, sin importar sus restricciones dietéticas.",
    specialties: ["Postres Italianos", "Pastelería", "Sin Gluten"],
    rating: 4.9,
    reviewCount: 156,
    badges: ["Creatividad Culinaria"],
    distance: 3.7,
    isLive: false,
    location: "Palermo, Buenos Aires",
    ordersCompleted: 289
  }
];

// Mock food items data
const allFoodItems = [
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
    reservable: true,
    category: "Entradas"
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
    reservable: false,
    category: "Platos Principales"
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
    reservable: true,
    category: "Postres"
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
    reservable: false,
    category: "Postres"
  },
  {
    id: "food-9",
    name: "Lomo Saltado",
    image: "https://images.unsplash.com/photo-1633321702518-7feccafb94d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    price: 18.50,
    description: "Clásico plato peruano con tiras de lomo fino, cebolla, tomate, papas fritas y arroz. Una fusión perfecta chino-peruana.",
    chef: {
      id: "chef-1",
      name: "María Rodriguez",
      rating: 4.8,
      verified: true
    },
    distance: 1.2,
    time: 40,
    rating: 4.9,
    dietary: [],
    reservable: true,
    category: "Platos Principales"
  },
  {
    id: "food-10",
    name: "Causa Limeña",
    image: "https://images.unsplash.com/photo-1599043513900-ed6fe01d3833?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    price: 11.25,
    description: "Terrina fría de papa amarilla sazonada con ají amarillo y limón, rellena de pollo y aguacate. Servido con salsa criolla.",
    chef: {
      id: "chef-1",
      name: "María Rodriguez",
      rating: 4.8,
      verified: true
    },
    distance: 1.2,
    time: 30,
    rating: 4.7,
    dietary: ["Sin Gluten"],
    reservable: true,
    category: "Entradas"
  }
];

const MenuPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  
  // Find the chef based on the ID from the URL
  const chef = chefs.find(c => c.id === id);
  
  // Filter food items that belong to this chef
  const chefFoodItems = allFoodItems.filter(food => food.chef.id === id);
  
  // Get unique categories from this chef's menu
  const categories = ["all", ...Array.from(new Set(chefFoodItems.map(item => item.category)))];
  
  // Filter based on search and category
  const filteredFoodItems = chefFoodItems.filter(food => {
    const matchesSearch = !searchTerm || 
      food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      food.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = activeCategory === "all" || food.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Handler to clear filters
  const handleClearFilters = () => {
    setSearchTerm("");
    setActiveCategory("all");
  };
  
  const handleAddToCart = (foodId: string) => {
    const foodItem = allFoodItems.find(food => food.id === foodId);
    if (foodItem) {
      toast({
        title: "Añadido al carrito",
        description: `${foodItem.name} ha sido añadido a tu carrito`,
        variant: "default",
      });
    }
  };
  
  if (!chef) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-platemate-brown mb-2">
              Chef no encontrado
            </h2>
            <p className="text-gray-500 mb-4">No pudimos encontrar el chef que estás buscando.</p>
            <button 
              onClick={() => navigate("/browse")}
              className="bg-platemate-orange hover:bg-platemate-orange/90 text-white px-4 py-2 rounded-md"
            >
              Explorar Cocineros
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Chef Cover and Profile */}
        <ChefHeader chef={chef} />
        
        {/* Menu Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <ChefAbout chef={chef} />
            </div>
            
            <div className="md:col-span-2">
              <MenuFilters 
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                categories={categories}
                onClearFilters={handleClearFilters}
              />
              
              <MenuContent 
                filteredFoodItems={filteredFoodItems} 
                onClearFilters={handleClearFilters}
              />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MenuPage;
