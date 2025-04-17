import { useState } from "react";
import { 
  Video, 
  Users, 
  Star, 
  ChefHat, 
  Clock,
  Search,
  Filter,
  SlidersHorizontal
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion, AnimatePresence } from "framer-motion";

const liveStreams = [
  {
    id: "stream-1",
    title: "Preparando Ceviche Clásico Peruano",
    chef: {
      id: "chef-1",
      name: "María Rodriguez",
      image: "https://images.unsplash.com/photo-1583394293214-28ded15ee548?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    },
    thumbnail: "https://images.unsplash.com/photo-1535399831218-d5bd36d1a6b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    viewers: 120,
    status: "live",
    category: "Peruana",
    duration: 35,
    isPopular: true
  },
  {
    id: "stream-2",
    title: "Secretos para Tacos Perfectos",
    chef: {
      id: "chef-2",
      name: "Carlos Méndez",
      image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    },
    thumbnail: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    viewers: 89,
    status: "upcoming",
    category: "Mexicana",
    duration: 0,
    startsIn: "15 min",
    isPopular: false
  },
  {
    id: "stream-3",
    title: "Postres Italianos: Tiramisu desde Cero",
    chef: {
      id: "chef-3",
      name: "Lucía Peralta",
      image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    },
    thumbnail: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    viewers: 230,
    status: "live",
    category: "Italiana",
    duration: 50,
    isPopular: true
  },
  {
    id: "stream-4",
    title: "Arepas Venezolanas: Receta Tradicional",
    chef: {
      id: "chef-4",
      name: "Pablo García",
      image: "https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    },
    thumbnail: "https://images.unsplash.com/photo-1599040757302-fc2cbc3a9694?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    viewers: 56,
    status: "live",
    category: "Venezolana",
    duration: 20,
    isPopular: false
  },
  {
    id: "stream-5",
    title: "Sushi Paso a Paso: Técnicas Japonesas",
    chef: {
      id: "chef-5",
      name: "Akira Tanaka",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    },
    thumbnail: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    viewers: 310,
    status: "upcoming",
    category: "Japonesa",
    duration: 0,
    startsIn: "1 hr",
    isPopular: true
  },
  {
    id: "stream-6",
    title: "Pasta Casera: Secretos Italianos",
    chef: {
      id: "chef-6",
      name: "Sofia Moretti",
      image: "https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    },
    thumbnail: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    viewers: 142,
    status: "live",
    category: "Italiana",
    duration: 45,
    isPopular: false
  }
];

const categories = [
  "Todas", "Peruana", "Mexicana", "Italiana", "Japonesa", "Venezolana", "Tailandesa"
];

const LiveStreamsPage = () => {
  const [activeTab, setActiveTab] = useState<"live" | "upcoming" | "popular">("live");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [sortBy, setSortBy] = useState("trending");
  
  const filteredStreams = liveStreams.filter(stream => {
    if (activeTab === "live" && stream.status !== "live") return false;
    if (activeTab === "upcoming" && stream.status !== "upcoming") return false;
    if (activeTab === "popular" && !stream.isPopular) return false;
    
    if (searchTerm && 
        !stream.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !stream.chef.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !stream.category.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    if (selectedCategory !== "Todas" && stream.category !== selectedCategory) {
      return false;
    }
    
    return true;
  });
  
  const sortedStreams = [...filteredStreams].sort((a, b) => {
    if (sortBy === "trending") {
      return b.viewers - a.viewers;
    }
    if (sortBy === "newest") {
      return b.duration - a.duration;
    }
    return 0;
  });
  
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  return (
    <motion.div 
      className="min-h-screen flex flex-col"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <Navbar />
      
      <main className="flex-grow">
        <motion.div 
          className="bg-platemate-beige/30 py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="flex flex-col md:flex-row md:items-center justify-between mb-6"
              variants={fadeIn}
            >
              <div>
                <motion.h1 
                  className="text-3xl font-bold text-platemate-brown mb-2 flex items-center"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <motion.span
                    animate={{ rotate: [0, -10, 0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: "loop", repeatDelay: 2 }}
                  >
                    <Video className="mr-2 text-platemate-orange" />
                  </motion.span>
                  Transmisiones en Vivo
                </motion.h1>
                <motion.p 
                  className="text-gray-600"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  Observa a nuestros cocineros preparando platos deliciosos en tiempo real
                </motion.p>
              </div>
              
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  className="bg-platemate-orange hover:bg-platemate-orange/90 text-white rounded-full mt-4 md:mt-0"
                >
                  <Video className="mr-2" size={16} />
                  Iniciar Transmisión
                </Button>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="flex flex-col md:flex-row md:items-center justify-between mb-6"
              variants={fadeIn}
              transition={{ delay: 0.5 }}
            >
              <Tabs 
                value={activeTab} 
                onValueChange={(v) => setActiveTab(v as "live" | "upcoming" | "popular")}
                className="w-full md:w-auto"
              >
                <TabsList className="w-full md:w-auto bg-white">
                  <TabsTrigger value="live" className="flex-1 md:flex-initial">
                    <motion.div 
                      className="flex items-center"
                      whileHover={{ scale: 1.05 }}
                    >
                      <motion.div 
                        className="w-2 h-2 rounded-full bg-red-500 mr-2"
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      ></motion.div>
                      En Vivo
                    </motion.div>
                  </TabsTrigger>
                  <TabsTrigger value="upcoming" className="flex-1 md:flex-initial">
                    <motion.div 
                      className="flex items-center"
                      whileHover={{ scale: 1.05 }}
                    >
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                      >
                        <Clock size={14} className="mr-2" />
                      </motion.span>
                      Próximos
                    </motion.div>
                  </TabsTrigger>
                  <TabsTrigger value="popular" className="flex-1 md:flex-initial">
                    <motion.div 
                      className="flex items-center"
                      whileHover={{ scale: 1.05 }}
                    >
                      <motion.span
                        animate={{ scale: [1, 1.2, 1], rotate: [0, 5, 0, -5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Star size={14} className="mr-2" />
                      </motion.span>
                      Populares
                    </motion.div>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              
              <motion.div 
                className="flex space-x-2 mt-4 md:mt-0"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className="relative flex-grow md:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <Input 
                    type="text"
                    placeholder="Buscar transmisiones..."
                    className="pl-10 pr-4 py-2 rounded-full border-platemate-beige focus-visible:ring-platemate-orange"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon" className="rounded-full">
                        <Filter size={18} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <div className="p-2">
                        <h4 className="font-medium mb-2">Categoría</h4>
                        <DropdownMenuRadioGroup value={selectedCategory} onValueChange={setSelectedCategory}>
                          {categories.map(category => (
                            <DropdownMenuRadioItem key={category} value={category}>
                              {category}
                            </DropdownMenuRadioItem>
                          ))}
                        </DropdownMenuRadioGroup>
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon" className="rounded-full">
                        <SlidersHorizontal size={18} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                      <div className="p-2">
                        <h4 className="font-medium mb-2">Ordenar por</h4>
                        <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
                          <DropdownMenuRadioItem value="trending">
                            Tendencia
                          </DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value="newest">
                            Más recientes
                          </DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </motion.div>
              </motion.div>
            </motion.div>
            
            <AnimatePresence mode="wait">
              {sortedStreams.length === 0 ? (
                <motion.div 
                  key="empty"
                  className="text-center py-16 bg-white rounded-2xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    animate={{ 
                      y: [0, -10, 0],
                      rotate: [0, 5, 0, -5, 0]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Video size={48} className="text-gray-300 mx-auto mb-4" />
                  </motion.div>
                  <motion.h2 
                    className="text-xl font-semibold text-platemate-brown mb-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    No hay transmisiones disponibles
                  </motion.h2>
                  <motion.p 
                    className="text-gray-500 mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    No se encontraron transmisiones con los filtros aplicados
                  </motion.p>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      onClick={() => {
                        setSearchTerm("");
                        setSelectedCategory("Todas");
                      }}
                      variant="outline"
                      className="border-platemate-orange text-platemate-orange hover:bg-platemate-orange/10"
                    >
                      Limpiar filtros
                    </Button>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  key="grid"
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                >
                  {sortedStreams.map((stream) => (
                    <motion.div
                      key={stream.id}
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 }
                      }}
                      whileHover={{ 
                        y: -5,
                        transition: { duration: 0.2 }
                      }}
                    >
                      <Link 
                        to={`/live/${stream.id}`}
                        className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow platemate-card block"
                      >
                        <div className="relative aspect-video">
                          <img 
                            src={stream.thumbnail} 
                            alt={stream.title}
                            className="w-full h-full object-cover"
                          />
                          
                          {stream.status === "live" ? (
                            <motion.div 
                              className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full flex items-center"
                              animate={{ 
                                backgroundColor: ["rgb(239, 68, 68)", "rgb(248, 113, 113)", "rgb(239, 68, 68)"]
                              }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            >
                              <motion.div 
                                className="w-2 h-2 rounded-full bg-white mr-1"
                                animate={{ opacity: [1, 0.4, 1] }}
                                transition={{ duration: 1, repeat: Infinity }}
                              ></motion.div>
                              EN VIVO
                            </motion.div>
                          ) : (
                            <div className="absolute top-2 left-2 bg-gray-800/70 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full flex items-center">
                              <motion.span
                                animate={{ rotate: 360 }}
                                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                              >
                                <Clock size={12} className="mr-1" />
                              </motion.span>
                              Comienza en {stream.startsIn}
                            </div>
                          )}
                          
                          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full flex items-center">
                            <Users size={12} className="mr-1" />
                            {stream.viewers}
                          </div>
                          
                          {stream.status === "live" && (
                            <motion.div 
                              className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.2 }}
                            >
                              {stream.duration} min
                            </motion.div>
                          )}
                        </div>
                        
                        <div className="p-4">
                          <h3 className="font-bold text-platemate-brown line-clamp-1 mb-2">
                            {stream.title}
                          </h3>
                          
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                              <img 
                                src={stream.chef.image} 
                                alt={stream.chef.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <p className="text-sm text-platemate-brown font-medium">
                                {stream.chef.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {stream.category}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </main>
      
      <Footer />
    </motion.div>
  );
};

export default LiveStreamsPage;
