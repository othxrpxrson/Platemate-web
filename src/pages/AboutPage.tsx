
import { useState } from "react";
import { ChefHat, Video, BookOpen, Users, Star, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  Card, 
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Tutorial data for chefs
const chefTutorials = [
  {
    id: "chef-tutorial-1",
    title: "Cómo empezar a vender como cocinero",
    thumbnail: "https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    duration: "10 min",
    level: "Principiante",
    description: "Aprende cómo configurar tu perfil, subir fotos de tus platos y comenzar a vender tus creaciones culinarias en PlateMate."
  },
  {
    id: "chef-tutorial-2",
    title: "Secretos para fotos perfectas de comida",
    thumbnail: "https://images.unsplash.com/photo-1576402187878-974f70c890a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    duration: "15 min",
    level: "Intermedio",
    description: "Descubre técnicas para tomar fotografías profesionales de tus platos que atraerán más clientes a tu perfil."
  },
  {
    id: "chef-tutorial-3",
    title: "Cómo hacer transmisiones en vivo exitosas",
    thumbnail: "https://images.unsplash.com/photo-1596979240348-7c5d83e5402a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    duration: "20 min",
    level: "Avanzado",
    description: "Aprende a configurar tu equipo, interactuar con tus espectadores y realizar transmisiones en vivo que aumenten tus ventas."
  },
  {
    id: "chef-tutorial-4",
    title: "Estrategias de precios para tus platos",
    thumbnail: "https://images.unsplash.com/photo-1553546895-531931aa1aa8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    duration: "12 min",
    level: "Intermedio",
    description: "Consejos para establecer precios competitivos que maximicen tus ganancias sin ahuyentar a los clientes potenciales."
  },
  {
    id: "chef-tutorial-5",
    title: "Gestión de pedidos y entregas eficientes",
    thumbnail: "https://images.unsplash.com/photo-1559941727-6fb446e7e8ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    duration: "18 min",
    level: "Intermedio",
    description: "Organiza tu cocina y gestiona múltiples pedidos de manera eficiente para aumentar tus ventas y mejorar la satisfacción del cliente."
  },
  {
    id: "chef-tutorial-6",
    title: "Marketing gastronómico para cocineros",
    thumbnail: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    duration: "25 min",
    level: "Avanzado",
    description: "Estrategias de marketing digital para promocionar tus platos y construir una base de clientes fieles en PlateMate."
  }
];

// Tutorial data for clients
const clientTutorials = [
  {
    id: "client-tutorial-1",
    title: "Cómo encontrar los mejores cocineros cerca de ti",
    thumbnail: "https://images.unsplash.com/photo-1484980972926-edee96e0960d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    duration: "8 min",
    level: "Principiante",
    description: "Guía paso a paso para usar los filtros y encontrar cocineros que se adapten a tus preferencias culinarias y ubicación."
  },
  {
    id: "client-tutorial-2",
    title: "Cómo leer reseñas y calificaciones",
    thumbnail: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    duration: "7 min",
    level: "Principiante",
    description: "Aprende a interpretar las calificaciones y reseñas para tomar decisiones informadas al elegir un cocinero o un plato."
  },
  {
    id: "client-tutorial-3",
    title: "Seguimiento de pedidos en tiempo real",
    thumbnail: "https://images.unsplash.com/photo-1526367790999-0150786686a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    duration: "10 min",
    level: "Intermedio",
    description: "Descubre cómo utilizar el sistema de seguimiento en tiempo real para monitorear la preparación y entrega de tu pedido."
  },
  {
    id: "client-tutorial-4",
    title: "Cómo ver transmisiones en vivo de cocineros",
    thumbnail: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    duration: "12 min",
    level: "Intermedio",
    description: "Guía para acceder a transmisiones en vivo, interactuar con cocineros y hacer preguntas mientras preparan sus platos."
  },
  {
    id: "client-tutorial-5",
    title: "Reservas anticipadas y pedidos personalizados",
    thumbnail: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    duration: "15 min",
    level: "Avanzado",
    description: "Aprende a hacer reservas anticipadas para ocasiones especiales y solicitar modificaciones personalizadas a tus platos favoritos."
  },
  {
    id: "client-tutorial-6",
    title: "Cómo reportar problemas y solicitar reembolsos",
    thumbnail: "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    duration: "9 min",
    level: "Intermedio",
    description: "Guía para resolver problemas con tu pedido, comunicarte con soporte al cliente y solicitar reembolsos cuando sea necesario."
  }
];

// FAQ data
const faqItems = [
  {
    question: "¿Cómo funciona PlateMate?",
    answer: "PlateMate conecta a cocineros caseros y profesionales con personas que buscan comida casera recién preparada. Los cocineros suben sus platos a la plataforma, los clientes eligen lo que les gusta, realizan pedidos, y los cocineros preparan y entregan la comida o coordinan la recogida."
  },
  {
    question: "¿Cómo me registro como cocinero?",
    answer: "Para registrarte como cocinero, crea una cuenta en PlateMate y selecciona la opción 'Quiero vender mi comida'. Completa tu perfil con información sobre tu cocina, especialidades y fotos de tus platos. Nuestro equipo revisará tu solicitud y te notificará cuando sea aprobada."
  },
  {
    question: "¿Cuánto cuesta usar PlateMate?",
    answer: "Para los clientes, descargar y usar la app es completamente gratis. Solo pagas por la comida que ordenas y las tarifas de entrega. Para los cocineros, cobramos una comisión del 15% sobre cada venta realizada a través de la plataforma."
  },
  {
    question: "¿Cómo se garantiza la calidad de la comida?",
    answer: "Todos los cocineros pasan por un proceso de verificación antes de unirse a PlateMate. Además, implementamos un sistema de calificaciones y reseñas que permite a los clientes evaluar su experiencia. Los cocineros con bajas calificaciones son revisados y pueden ser removidos de la plataforma."
  },
  {
    question: "¿Puedo ver cómo preparan mi comida?",
    answer: "¡Sí! Muchos cocineros realizan transmisiones en vivo mientras preparan los pedidos. Puedes unirte a estas transmisiones, hacer preguntas y ver el proceso de preparación en tiempo real. También ofrecemos la función de seguimiento en tiempo real una vez que tu pedido está en camino."
  },
  {
    question: "¿Cuáles son los métodos de pago aceptados?",
    answer: "Aceptamos tarjetas de crédito/débito, PayPal, y en algunas regiones, pagos en efectivo contra entrega. Todas las transacciones en línea están cifradas y son procesadas de manera segura a través de nuestros proveedores de pago."
  },
  {
    question: "¿Cómo puedo cancelar o modificar mi pedido?",
    answer: "Puedes cancelar o modificar tu pedido dentro de los primeros 5 minutos después de realizarlo, o antes de que el cocinero confirme que ha comenzado la preparación. Para hacerlo, ve a 'Mis Pedidos' en tu perfil y selecciona la opción correspondiente."
  },
  {
    question: "¿PlateMate está disponible en mi ciudad?",
    answer: "Actualmente estamos operando en más de 50 ciudades en América Latina y seguimos expandiéndonos. Para verificar si el servicio está disponible en tu área, ingresa tu dirección en la página principal de la app o sitio web."
  }
];

const AboutPage = () => {
  const [activeTab, setActiveTab] = useState<"info" | "chef" | "client" | "faq">("info");
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero section */}
        <div className="bg-platemate-beige/30 py-12 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-platemate-brown mb-4">
              Acerca de PlateMate
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
              Conectamos cocineros apasionados con amantes de la comida casera,
              creando una comunidad donde la auténtica gastronomía se comparte y celebra.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                className="bg-platemate-orange hover:bg-platemate-orange/90 text-white rounded-full"
                onClick={() => setActiveTab("chef")}
              >
                <ChefHat size={16} className="mr-2" />
                Tutoriales para Cocineros
              </Button>
              <Button 
                variant="outline"
                className="border-platemate-orange text-platemate-orange hover:bg-platemate-orange/10 rounded-full"
                onClick={() => setActiveTab("client")}
              >
                <Users size={16} className="mr-2" />
                Tutoriales para Clientes
              </Button>
            </div>
          </div>
        </div>
        
        {/* Main content */}
        <div className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Tabs 
              value={activeTab} 
              onValueChange={(v) => setActiveTab(v as "info" | "chef" | "client" | "faq")}
              className="w-full"
            >
              <TabsList className="w-full md:w-auto mb-8 bg-white">
                <TabsTrigger value="info" className="flex-1 md:flex-initial">
                  <div className="flex items-center">
                    <BookOpen size={16} className="mr-2" />
                    Información
                  </div>
                </TabsTrigger>
                <TabsTrigger value="chef" className="flex-1 md:flex-initial">
                  <div className="flex items-center">
                    <ChefHat size={16} className="mr-2" />
                    Para Cocineros
                  </div>
                </TabsTrigger>
                <TabsTrigger value="client" className="flex-1 md:flex-initial">
                  <div className="flex items-center">
                    <Users size={16} className="mr-2" />
                    Para Clientes
                  </div>
                </TabsTrigger>
                <TabsTrigger value="faq" className="flex-1 md:flex-initial">
                  <div className="flex items-center">
                    <div className="mr-2">?</div>
                    FAQ
                  </div>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="info" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
                  <div>
                    <h2 className="text-3xl font-bold text-platemate-brown mb-4">
                      Nuestra Misión
                    </h2>
                    <p className="text-gray-600 mb-6">
                      En PlateMate, nuestra misión es democratizar el acceso a comida casera auténtica y de alta calidad, mientras creamos oportunidades económicas para cocineros talentosos de todas las culturas y orígenes.
                    </p>
                    <p className="text-gray-600 mb-6">
                      Creemos que cada barrio alberga talentos culinarios excepcionales, y queremos ayudarlos a compartir sus creaciones con el mundo, preservando tradiciones gastronómicas y fomentando la innovación.
                    </p>
                    <div className="flex items-center text-platemate-orange">
                      <ChefHat size={24} className="mr-2" />
                      <span className="text-xl font-semibold">+5,000 cocineros registrados</span>
                    </div>
                  </div>
                  <div className="rounded-2xl overflow-hidden shadow-lg">
                    <img 
                      src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                      alt="Cocinero preparando comida"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                <div className="mb-16">
                  <h2 className="text-3xl font-bold text-platemate-brown mb-8 text-center">
                    Cómo Funciona
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <Card className="bg-white shadow-sm">
                      <CardHeader className="text-center pb-2">
                        <div className="w-16 h-16 rounded-full bg-platemate-orange/20 flex items-center justify-center mx-auto mb-4">
                          <ChefHat size={32} className="text-platemate-orange" />
                        </div>
                        <CardTitle className="text-platemate-brown">Para Cocineros</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-gray-600">
                          <li className="flex items-start">
                            <span className="text-platemate-orange mr-2">1.</span>
                            Regístrate y crea tu perfil de cocinero
                          </li>
                          <li className="flex items-start">
                            <span className="text-platemate-orange mr-2">2.</span>
                            Sube fotos y descripciones de tus platos
                          </li>
                          <li className="flex items-start">
                            <span className="text-platemate-orange mr-2">3.</span>
                            Recibe pedidos y prepara comida fresca
                          </li>
                          <li className="flex items-start">
                            <span className="text-platemate-orange mr-2">4.</span>
                            Entrega o coordina la recogida de pedidos
                          </li>
                          <li className="flex items-start">
                            <span className="text-platemate-orange mr-2">5.</span>
                            Recibe pagos semanales y construye tu reputación
                          </li>
                        </ul>
                      </CardContent>
                      <CardFooter>
                        <Button 
                          variant="outline"
                          className="w-full border-platemate-orange text-platemate-orange hover:bg-platemate-orange/10 rounded-full"
                          onClick={() => setActiveTab("chef")}
                        >
                          Ver Tutoriales
                        </Button>
                      </CardFooter>
                    </Card>
                    
                    <Card className="bg-white shadow-sm border-platemate-orange">
                      <CardHeader className="text-center pb-2">
                        <div className="w-16 h-16 rounded-full bg-platemate-orange flex items-center justify-center mx-auto mb-4">
                          <Video size={32} className="text-white" />
                        </div>
                        <CardTitle className="text-platemate-brown">Transmisiones en Vivo</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-gray-600">
                          <li className="flex items-start">
                            <span className="text-platemate-orange mr-2">1.</span>
                            Los cocineros transmiten la preparación en vivo
                          </li>
                          <li className="flex items-start">
                            <span className="text-platemate-orange mr-2">2.</span>
                            Los clientes pueden ver el proceso completo
                          </li>
                          <li className="flex items-start">
                            <span className="text-platemate-orange mr-2">3.</span>
                            Interacción directa con preguntas y comentarios
                          </li>
                          <li className="flex items-start">
                            <span className="text-platemate-orange mr-2">4.</span>
                            Mayor transparencia y confianza en el proceso
                          </li>
                          <li className="flex items-start">
                            <span className="text-platemate-orange mr-2">5.</span>
                            Oportunidad de aprender técnicas culinarias
                          </li>
                        </ul>
                      </CardContent>
                      <CardFooter>
                        <Button 
                          className="w-full bg-platemate-orange hover:bg-platemate-orange/90 text-white rounded-full"
                          onClick={() => window.location.href = "/live"}
                        >
                          Ver Transmisiones
                        </Button>
                      </CardFooter>
                    </Card>
                    
                    <Card className="bg-white shadow-sm">
                      <CardHeader className="text-center pb-2">
                        <div className="w-16 h-16 rounded-full bg-platemate-orange/20 flex items-center justify-center mx-auto mb-4">
                          <Users size={32} className="text-platemate-orange" />
                        </div>
                        <CardTitle className="text-platemate-brown">Para Clientes</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-gray-600">
                          <li className="flex items-start">
                            <span className="text-platemate-orange mr-2">1.</span>
                            Explora cocineros y platos cercanos a ti
                          </li>
                          <li className="flex items-start">
                            <span className="text-platemate-orange mr-2">2.</span>
                            Filtra por tipo de cocina, precios o preferencias
                          </li>
                          <li className="flex items-start">
                            <span className="text-platemate-orange mr-2">3.</span>
                            Realiza pedidos y paga de forma segura
                          </li>
                          <li className="flex items-start">
                            <span className="text-platemate-orange mr-2">4.</span>
                            Sigue la preparación en tiempo real
                          </li>
                          <li className="flex items-start">
                            <span className="text-platemate-orange mr-2">5.</span>
                            Recibe comida fresca y califica tu experiencia
                          </li>
                        </ul>
                      </CardContent>
                      <CardFooter>
                        <Button 
                          variant="outline"
                          className="w-full border-platemate-orange text-platemate-orange hover:bg-platemate-orange/10 rounded-full"
                          onClick={() => setActiveTab("client")}
                        >
                          Ver Tutoriales
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                </div>
                
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold text-platemate-brown mb-8">
                    Nuestros Valores
                  </h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm">
                      <div className="w-12 h-12 rounded-full bg-platemate-orange/20 flex items-center justify-center mx-auto mb-4">
                        <Award size={24} className="text-platemate-orange" />
                      </div>
                      <h3 className="font-semibold text-lg text-platemate-brown mb-2">Calidad</h3>
                      <p className="text-gray-600 text-sm">
                        Promovemos altos estándares en cada plato, con ingredientes frescos y auténticas recetas.
                      </p>
                    </div>
                    
                    <div className="bg-white p-6 rounded-2xl shadow-sm">
                      <div className="w-12 h-12 rounded-full bg-platemate-orange/20 flex items-center justify-center mx-auto mb-4">
                        <div className="text-platemate-orange text-xl font-bold">✓</div>
                      </div>
                      <h3 className="font-semibold text-lg text-platemate-brown mb-2">Transparencia</h3>
                      <p className="text-gray-600 text-sm">
                        Creemos en procesos claros y visibles, desde la preparación hasta la entrega de cada pedido.
                      </p>
                    </div>
                    
                    <div className="bg-white p-6 rounded-2xl shadow-sm">
                      <div className="w-12 h-12 rounded-full bg-platemate-orange/20 flex items-center justify-center mx-auto mb-4">
                        <div className="text-platemate-orange text-xl font-bold">❤</div>
                      </div>
                      <h3 className="font-semibold text-lg text-platemate-brown mb-2">Comunidad</h3>
                      <p className="text-gray-600 text-sm">
                        Construimos una comunidad donde cocineros y comensales comparten pasión por la gastronomía.
                      </p>
                    </div>
                    
                    <div className="bg-white p-6 rounded-2xl shadow-sm">
                      <div className="w-12 h-12 rounded-full bg-platemate-orange/20 flex items-center justify-center mx-auto mb-4">
                        <div className="text-platemate-orange text-xl font-bold">🌱</div>
                      </div>
                      <h3 className="font-semibold text-lg text-platemate-brown mb-2">Sostenibilidad</h3>
                      <p className="text-gray-600 text-sm">
                        Incentivamos prácticas sostenibles, reduciendo desperdicios y usando empaques ecológicos.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-platemate-beige/30 rounded-2xl p-8 text-center">
                  <h2 className="text-2xl font-bold text-platemate-brown mb-4">
                    ¿Listo para empezar?
                  </h2>
                  <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                    Ya sea que quieras compartir tus creaciones culinarias o descubrir platos caseros auténticos cerca de ti, PlateMate te ofrece una experiencia gastronómica única.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <Button 
                      className="bg-platemate-orange hover:bg-platemate-orange/90 text-white rounded-full"
                      onClick={() => window.location.href = "/register"}
                    >
                      Regístrate Ahora
                    </Button>
                    <Button 
                      variant="outline"
                      className="border-platemate-orange text-platemate-orange hover:bg-platemate-orange/10 rounded-full"
                      onClick={() => window.location.href = "/browse"}
                    >
                      Explorar Comidas
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="chef" className="mt-0">
                <h2 className="text-2xl font-bold text-platemate-brown mb-6">
                  Tutoriales para Cocineros
                </h2>
                <p className="text-gray-600 mb-8">
                  Aprende todo lo que necesitas para tener éxito como cocinero en PlateMate con nuestros tutoriales detallados.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {chefTutorials.map((tutorial) => (
                    <Link 
                      key={tutorial.id} 
                      to={`/tutorial/${tutorial.id}`}
                      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow platemate-card"
                    >
                      <div className="relative aspect-video">
                        <img 
                          src={tutorial.thumbnail} 
                          alt={tutorial.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                          {tutorial.duration}
                        </div>
                        <div className="absolute bottom-2 left-2 bg-platemate-orange text-white text-xs px-2 py-1 rounded-full">
                          {tutorial.level}
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <h3 className="font-bold text-platemate-brown mb-2">
                          {tutorial.title}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {tutorial.description}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
                
                <div className="mt-10 bg-platemate-beige/20 p-6 rounded-2xl">
                  <h3 className="font-semibold text-lg text-platemate-brown mb-3">
                    ¿No encuentras lo que buscas?
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Consulta nuestra documentación completa para cocineros o contáctanos directamente para obtener asistencia personalizada.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="outline" className="border-platemate-brown text-platemate-brown hover:bg-platemate-beige/40">
                      <BookOpen size={16} className="mr-2" />
                      Documentación Completa
                    </Button>
                    <Button variant="outline" className="border-platemate-orange text-platemate-orange hover:bg-platemate-orange/10">
                      Contactar Soporte
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="client" className="mt-0">
                <h2 className="text-2xl font-bold text-platemate-brown mb-6">
                  Tutoriales para Clientes
                </h2>
                <p className="text-gray-600 mb-8">
                  Descubre cómo aprovechar al máximo la plataforma PlateMate con estos tutoriales diseñados especialmente para clientes.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {clientTutorials.map((tutorial) => (
                    <Link 
                      key={tutorial.id} 
                      to={`/tutorial/${tutorial.id}`}
                      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow platemate-card"
                    >
                      <div className="relative aspect-video">
                        <img 
                          src={tutorial.thumbnail} 
                          alt={tutorial.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                          {tutorial.duration}
                        </div>
                        <div className="absolute bottom-2 left-2 bg-platemate-orange text-white text-xs px-2 py-1 rounded-full">
                          {tutorial.level}
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <h3 className="font-bold text-platemate-brown mb-2">
                          {tutorial.title}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {tutorial.description}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
                
                <div className="mt-10 bg-platemate-beige/20 p-6 rounded-2xl">
                  <h3 className="font-semibold text-lg text-platemate-brown mb-3">
                    Primeros pasos con PlateMate
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Si eres nuevo en la plataforma, te recomendamos seguir estos sencillos pasos para comenzar tu experiencia gastronómica.
                  </p>
                  <ol className="space-y-2 text-gray-600 mb-4">
                    <li className="flex items-start">
                      <span className="text-platemate-orange font-bold mr-2">1.</span>
                      <span>Explora cocineros cercanos a tu ubicación y revisa sus menús</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-platemate-orange font-bold mr-2">2.</span>
                      <span>Lee las reseñas y calificaciones para tomar decisiones informadas</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-platemate-orange font-bold mr-2">3.</span>
                      <span>Observa transmisiones en vivo para ver cómo se preparan los platos</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-platemate-orange font-bold mr-2">4.</span>
                      <span>Realiza tu pedido y sigue la preparación y entrega en tiempo real</span>
                    </li>
                  </ol>
                  <Button className="bg-platemate-orange hover:bg-platemate-orange/90 text-white rounded-full">
                    Comenzar a Explorar
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="faq" className="mt-0">
                <h2 className="text-2xl font-bold text-platemate-brown mb-6">
                  Preguntas Frecuentes
                </h2>
                <p className="text-gray-600 mb-8">
                  Encuentra respuestas a las preguntas más comunes sobre PlateMate y cómo funciona nuestra plataforma.
                </p>
                
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-8">
                  <Accordion type="single" collapsible className="w-full">
                    {faqItems.map((item, index) => (
                      <AccordionItem key={index} value={`item-${index}`} className="border-b last:border-b-0 border-platemate-beige/50">
                        <AccordionTrigger className="px-6 py-4 text-platemate-brown font-medium hover:text-platemate-orange hover:no-underline">
                          {item.question}
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-4 text-gray-600">
                          {item.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
                
                <div className="text-center bg-platemate-beige/20 p-6 rounded-2xl">
                  <h3 className="font-semibold text-lg text-platemate-brown mb-3">
                    ¿No encuentras respuesta a tu pregunta?
                  </h3>
                  <p className="text-gray-600 mb-4 max-w-2xl mx-auto">
                    Contacta a nuestro equipo de soporte para recibir asistencia personalizada con cualquier consulta o problema que puedas tener.
                  </p>
                  <Button className="bg-platemate-orange hover:bg-platemate-orange/90 text-white rounded-full">
                    Contactar Soporte
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutPage;
