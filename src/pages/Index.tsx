
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  ChefHat, 
  Utensils, 
  Search, 
  Star, 
  Award, 
  Video, 
  MapPin,
  Filter,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
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
];

// Mock categories
const categories = [
  { id: "cat-1", name: "Peruana", icon: "🇵🇪" },
  { id: "cat-2", name: "Mexicana", icon: "🇲🇽" },
  { id: "cat-3", name: "Italiana", icon: "🇮🇹" },
  { id: "cat-4", name: "Postres", icon: "🍰" },
  { id: "cat-5", name: "Vegana", icon: "🥗" },
  { id: "cat-6", name: "Sin Gluten", icon: "🌾" },
  { id: "cat-7", name: "China", icon: "🇨🇳" },
  { id: "cat-8", name: "Japonesa", icon: "🇯🇵" },
];

// Mock testimonials
const testimonials = [
  {
    id: "test-1",
    name: "Laura Sánchez",
    role: "Cliente",
    content: "PlateMate ha cambiado mi forma de descubrir comida casera auténtica. Puedo probar platos increíbles que de otra manera no encontraría en mi vecindario.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "test-2",
    name: "Ricardo Flores",
    role: "Cocinero verificado",
    content: "Gracias a PlateMate puedo compartir las recetas familiares que he perfeccionado durante años y generar ingresos extra haciendo lo que más me gusta: cocinar.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  },
];

const Index = () => {
  const [searchLocation, setSearchLocation] = useState("");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero section */}
        <section className="relative bg-gradient-to-r from-platemate-cream to-platemate-beige overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1605522561233-768ad7a8fabf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-right opacity-10"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-10 md:mb-0">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-platemate-brown leading-tight mb-4 animate-fade-in">
                  Sabores caseros a <span className="text-platemate-orange">un clic</span> de distancia
                </h1>
                
                <p className="text-lg text-gray-700 mb-8 max-w-lg animate-fade-in" style={{ animationDelay: "0.2s" }}>
                  Descubre cocineros caseros cerca de ti y disfruta de comida auténtica preparada con pasión y talento.
                </p>
                
                <div className="bg-white rounded-full p-2 shadow-md flex items-center mb-6 animate-fade-in" style={{ animationDelay: "0.4s" }}>
                  <div className="bg-platemate-orange/10 rounded-full p-2 mr-2">
                    <Search size={20} className="text-platemate-orange" />
                  </div>
                  <Input
                    type="text"
                    placeholder="Ingresa tu ubicación"
                    className="border-none shadow-none flex-grow focus-visible:ring-0"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                  />
                  <Button className="bg-platemate-orange hover:bg-platemate-orange/90 text-white rounded-full">
                    Buscar
                  </Button>
                </div>
                
                <div className="flex flex-wrap gap-3 animate-fade-in" style={{ animationDelay: "0.6s" }}>
                  {categories.slice(0, 4).map((category) => (
                    <Button 
                      key={category.id}
                      variant="outline"
                      className="border-platemate-beige bg-white hover:bg-platemate-beige/20 text-platemate-brown rounded-full"
                    >
                      <span className="mr-2">{category.icon}</span>
                      {category.name}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="md:w-1/2 relative">
                <div className="relative z-10 animate-float">
                  <img 
                    src="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80" 
                    alt="Comida casera" 
                    className="rounded-2xl shadow-2xl max-w-full md:max-w-lg h-auto"
                  />
                  
                  <div className="absolute -bottom-4 -left-4 bg-white rounded-xl p-3 shadow-lg animate-bounce-light">
                    <div className="flex items-center">
                      <ChefHat size={18} className="text-platemate-orange mr-2" />
                      <span className="font-semibold text-platemate-brown">+500 cocineros</span>
                    </div>
                  </div>
                  
                  <div className="absolute -top-4 -right-4 bg-white rounded-xl p-3 shadow-lg animate-bounce-light" style={{ animationDelay: "0.5s" }}>
                    <div className="flex items-center">
                      <Star size={18} className="text-yellow-400 mr-2" />
                      <span className="font-semibold text-platemate-brown">4.8 rating</span>
                    </div>
                  </div>
                </div>
                
                <div className="absolute -z-10 top-10 right-10 w-72 h-72 bg-platemate-orange/20 rounded-full blur-3xl"></div>
                <div className="absolute -z-10 -bottom-10 -left-10 w-72 h-72 bg-platemate-brown/10 rounded-full blur-3xl"></div>
              </div>
            </div>
          </div>
        </section>
        
        {/* How it works */}
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-platemate-brown mb-4">¿Cómo funciona PlateMate?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Conectamos cocineros caseros talentosos con personas que buscan comida auténtica y deliciosa.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <div className="flex flex-col items-center text-center p-6 rounded-2xl hover:bg-platemate-beige/10 transition-colors">
                <div className="w-16 h-16 bg-platemate-orange/20 rounded-full flex items-center justify-center mb-4">
                  <Search size={24} className="text-platemate-orange" />
                </div>
                <h3 className="text-xl font-bold text-platemate-brown mb-2">Explora</h3>
                <p className="text-gray-600">
                  Descubre cocineros cercanos, explora sus menús, lee reseñas y encuentra tu próxima comida favorita.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-6 rounded-2xl hover:bg-platemate-beige/10 transition-colors">
                <div className="w-16 h-16 bg-platemate-orange/20 rounded-full flex items-center justify-center mb-4">
                  <Utensils size={24} className="text-platemate-orange" />
                </div>
                <h3 className="text-xl font-bold text-platemate-brown mb-2">Ordena</h3>
                <p className="text-gray-600">
                  Elige entre recogida o entrega y personaliza tu pedido según tus preferencias dietéticas.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-6 rounded-2xl hover:bg-platemate-beige/10 transition-colors">
                <div className="w-16 h-16 bg-platemate-orange/20 rounded-full flex items-center justify-center mb-4">
                  <Star size={24} className="text-platemate-orange" />
                </div>
                <h3 className="text-xl font-bold text-platemate-brown mb-2">Disfruta</h3>
                <p className="text-gray-600">
                  Saborea comida auténtica, califica tu experiencia y apoya a los cocineros locales.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Featured food & chefs */}
        <section className="bg-platemate-beige/30 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Tabs defaultValue="food" className="w-full">
              <div className="flex justify-between items-center mb-8">
                <TabsList className="bg-platemate-beige/50">
                  <TabsTrigger value="food" className="data-[state=active]:bg-white">
                    Comidas Destacadas
                  </TabsTrigger>
                  <TabsTrigger value="chefs" className="data-[state=active]:bg-white">
                    Cocineros Destacados
                  </TabsTrigger>
                </TabsList>
                
                <div className="flex items-center">
                  <Button 
                    variant="ghost"
                    size="sm"
                    className="text-platemate-brown hover:text-platemate-orange hover:bg-platemate-beige/20 rounded-full mr-2"
                  >
                    <Filter size={16} className="mr-2" />
                    Filtrar
                  </Button>
                  
                  <Link to="/browse">
                    <Button 
                      variant="link"
                      className="text-platemate-orange hover:text-platemate-orange/80 p-0"
                    >
                      Ver todo
                      <ArrowRight size={16} className="ml-1" />
                    </Button>
                  </Link>
                </div>
              </div>
              
              <TabsContent value="food" className="mt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {foodItems.map((food) => (
                    <FoodCard 
                      key={food.id}
                      {...food}
                    />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="chefs" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {chefItems.map((chef) => (
                    <ChefCard 
                      key={chef.id}
                      {...chef}
                    />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
        
        {/* Testimonials */}
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-platemate-brown mb-4">Lo que dicen nuestros usuarios</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Descubre por qué miles de personas confían en PlateMate para encontrar comida casera auténtica.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id}
                  className="bg-platemate-beige/20 rounded-2xl p-6 border border-platemate-beige/50"
                >
                  <div className="flex items-center mb-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4 object-cover"
                    />
                    <div>
                      <h4 className="font-bold text-platemate-brown">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 italic">"{testimonial.content}"</p>
                  <div className="mt-4 flex">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={16} 
                        className="text-yellow-400 fill-yellow-400 mr-1" 
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Become a chef CTA */}
        <section className="bg-platemate-orange text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <h2 className="text-3xl font-bold mb-4">¿Eres un cocinero talentoso?</h2>
                <p className="text-platemate-cream mb-6 max-w-lg">
                  Únete a nuestra comunidad de cocineros caseros y comparte tus creaciones con personas que buscan sabores auténticos.
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <Link to="/register/chef">
                    <Button 
                      variant="default"
                      className="bg-white text-platemate-orange hover:bg-white/90 rounded-full"
                    >
                      Regístrate como cocinero
                    </Button>
                  </Link>
                  
                  <Link to="/how-it-works">
                    <Button 
                      variant="outline"
                      className="border-white text-white hover:bg-white/10 rounded-full"
                    >
                      Saber más
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                  alt="Chef cocinando" 
                  className="rounded-2xl shadow-lg max-w-full md:max-w-md h-auto"
                />
                
                <div className="absolute top-4 right-4 flex flex-col space-y-2">
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-md">
                    <div className="flex items-center">
                      <Award size={18} className="text-platemate-orange mr-2" />
                      <span className="font-medium text-platemate-brown">Gana logros</span>
                    </div>
                  </div>
                  
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-md">
                    <div className="flex items-center">
                      <Video size={18} className="text-platemate-orange mr-2" />
                      <span className="font-medium text-platemate-brown">Haz videos en vivo</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* App download */}
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-platemate-brown mb-4">Descarga nuestra app</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Pide tu comida favorita, sigue a cocineros talentosos y recibe notificaciones en tiempo real.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mt-8">
              <Button className="bg-black hover:bg-black/90 text-white rounded-xl h-14 px-6">
                <svg viewBox="0 0 384 512" className="w-6 h-6 mr-2" fill="currentColor">
                  <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"></path>
                </svg>
                <div className="text-left">
                  <div className="text-xs">Descarga en la</div>
                  <div className="text-lg font-semibold">App Store</div>
                </div>
              </Button>
              
              <Button className="bg-black hover:bg-black/90 text-white rounded-xl h-14 px-6">
                <svg viewBox="0 0 24 24" className="w-6 h-6 mr-2" fill="currentColor">
                  <path d="M3 20.5V3.5C3 2.91 3.34 2.39 3.84 2.15L13.69 12L3.84 21.85C3.34 21.6 3 21.09 3 20.5ZM16.81 15.12L6.05 21.34L14.54 12.85L16.81 15.12ZM20.16 10.81C20.5 11.08 20.75 11.5 20.75 12C20.75 12.5 20.53 12.9 20.18 13.18L17.89 14.5L15.39 12L17.89 9.5L20.16 10.81ZM6.05 2.66L16.81 8.88L14.54 11.15L6.05 2.66Z" />
                </svg>
                <div className="text-left">
                  <div className="text-xs">Consíguelo en</div>
                  <div className="text-lg font-semibold">Google Play</div>
                </div>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
