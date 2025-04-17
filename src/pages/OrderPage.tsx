
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  ChefHat, 
  Clock, 
  Calendar, 
  MapPin, 
  Star, 
  Plus, 
  Minus, 
  CreditCard,
  Check,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Mock food data (in real app, would fetch from API based on ID)
const mockFoodItems = [
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
      verified: true,
      image: "https://images.unsplash.com/photo-1583394293214-28ded15ee548?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    },
    distance: 1.2,
    time: 35,
    rating: 4.7,
    dietary: ["Sin Gluten"],
    ingredients: [
      "Pescado blanco fresco",
      "Limón",
      "Cebolla morada",
      "Cilantro",
      "Ají limo",
      "Camote",
      "Maíz chulpi"
    ],
    reservable: true,
    availableDates: [
      "2025-04-10",
      "2025-04-11",
      "2025-04-12",
      "2025-04-13"
    ]
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
      verified: true,
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    },
    distance: 4.2,
    time: 40,
    rating: 4.9,
    dietary: ["Sin Lácteos"],
    ingredients: [
      "Arroz para sushi",
      "Nori (alga marina)",
      "Salmón fresco",
      "Atún fresco",
      "Langostinos",
      "Aguacate",
      "Pepino",
      "Zanahoria",
      "Salsa de soya",
      "Wasabi",
      "Jengibre encurtido"
    ],
    reservable: true,
    availableDates: [
      "2025-04-08",
      "2025-04-09",
      "2025-04-10",
      "2025-04-11" 
    ]
  }
];

// Available time slots for reservations
const timeSlots = [
  "12:00", "12:30", "13:00", "13:30", "14:00", 
  "19:00", "19:30", "20:00", "20:30", "21:00"
];

const OrderPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Find the food item based on the ID
  const foodItem = mockFoodItems.find(item => item.id === id);
  
  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [orderType, setOrderType] = useState<"delivery" | "reservation">("delivery");
  
  // Reservation state
  const [reservationDate, setReservationDate] = useState("");
  const [reservationTime, setReservationTime] = useState("");
  const [guests, setGuests] = useState(2);
  
  // Order confirmation state
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [address, setAddress] = useState("");
  
  useEffect(() => {
    if (!foodItem) {
      toast({
        title: "Plato no encontrado",
        description: "No se pudo encontrar el plato solicitado",
        variant: "destructive"
      });
      navigate("/browse");
    }
  }, [foodItem, navigate, toast]);
  
  if (!foodItem) {
    return null;
  }
  
  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  
  const subtotal = foodItem.price * quantity;
  const deliveryFee = 2.5;
  const serviceFee = subtotal * 0.05;
  const total = subtotal + (orderType === "delivery" ? deliveryFee + serviceFee : 0);
  
  const handleSubmitOrder = () => {
    if (orderType === "delivery" && !address) {
      toast({
        title: "Dirección requerida",
        description: "Por favor ingresa una dirección de entrega",
        variant: "destructive"
      });
      return;
    }
    
    if (orderType === "reservation" && (!reservationDate || !reservationTime)) {
      toast({
        title: "Fecha y hora requeridas",
        description: "Por favor selecciona una fecha y hora para tu reserva",
        variant: "destructive"
      });
      return;
    }
    
    setShowConfirmation(true);
  };
  
  const confirmOrder = () => {
    toast({
      title: "¡Pedido realizado con éxito!",
      description: orderType === "delivery" 
        ? "Tu comida está en preparación. Te notificaremos cuando esté en camino." 
        : "Tu reserva ha sido confirmada. ¡Esperamos verte pronto!",
    });
    
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-platemate-beige/20 py-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Left column - Food details */}
              <div className="md:w-7/12">
                <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-6">
                  <div className="relative h-64 sm:h-80">
                    <img 
                      src={foodItem.image} 
                      alt={foodItem.name}
                      className="w-full h-full object-cover"
                    />
                    {foodItem.dietary.length > 0 && (
                      <div className="absolute top-4 left-4 flex flex-wrap gap-1">
                        {foodItem.dietary.map((diet) => (
                          <div 
                            key={diet} 
                            className="bg-white/80 backdrop-blur-sm text-platemate-brown text-xs py-1 px-3 rounded-full shadow-sm"
                          >
                            {diet}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h1 className="text-2xl md:text-3xl font-bold text-platemate-brown">{foodItem.name}</h1>
                      <div className="text-xl font-bold text-platemate-orange">${foodItem.price.toFixed(2)}</div>
                    </div>
                    
                    <div className="flex items-center mb-4">
                      <img 
                        src={foodItem.chef.image} 
                        alt={foodItem.chef.name}
                        className="w-8 h-8 rounded-full object-cover mr-2"
                      />
                      <div>
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-platemate-brown">{foodItem.chef.name}</span>
                          {foodItem.chef.verified && (
                            <div className="ml-2 py-0.5 px-2 bg-blue-50 text-blue-600 text-xs rounded-full border border-blue-200">
                              Verificado
                            </div>
                          )}
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                          <Star size={12} className="text-yellow-400 mr-1" />
                          <span>{foodItem.chef.rating} · </span>
                          <MapPin size={10} className="mx-1" />
                          <span>{foodItem.distance} km · </span>
                          <Clock size={10} className="mx-1" />
                          <span>{foodItem.time} min</span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-6">{foodItem.description}</p>
                    
                    <div className="mb-6">
                      <h3 className="font-semibold text-platemate-brown mb-2">Ingredientes:</h3>
                      <ul className="grid grid-cols-2 gap-x-4 gap-y-1">
                        {foodItem.ingredients.map((ingredient, index) => (
                          <li key={index} className="text-sm text-gray-600 flex items-center">
                            <Check size={14} className="text-green-500 mr-2" />
                            {ingredient}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-sm text-center">
                      <div className="bg-platemate-beige/20 rounded-lg p-3">
                        <div className="flex justify-center mb-1">
                          <Star size={16} className="text-yellow-500" />
                        </div>
                        <div className="font-medium text-platemate-brown">{foodItem.rating}</div>
                        <div className="text-xs text-gray-500">Calificación</div>
                      </div>
                      <div className="bg-platemate-beige/20 rounded-lg p-3">
                        <div className="flex justify-center mb-1">
                          <Clock size={16} className="text-platemate-orange" />
                        </div>
                        <div className="font-medium text-platemate-brown">{foodItem.time} min</div>
                        <div className="text-xs text-gray-500">Tiempo</div>
                      </div>
                      <div className="bg-platemate-beige/20 rounded-lg p-3">
                        <div className="flex justify-center mb-1">
                          <MapPin size={16} className="text-platemate-orange" />
                        </div>
                        <div className="font-medium text-platemate-brown">{foodItem.distance} km</div>
                        <div className="text-xs text-gray-500">Distancia</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right column - Order form */}
              <div className="md:w-5/12">
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <h2 className="text-xl font-bold text-platemate-brown mb-6">Realizar pedido</h2>
                  
                  <Tabs 
                    defaultValue="delivery" 
                    value={orderType}
                    onValueChange={(value) => setOrderType(value as "delivery" | "reservation")}
                    className="mb-6"
                  >
                    <TabsList className="grid grid-cols-2 mb-4">
                      <TabsTrigger value="delivery" className="data-[state=active]:bg-platemate-orange data-[state=active]:text-white">
                        Ordenar ahora
                      </TabsTrigger>
                      {foodItem.reservable && (
                        <TabsTrigger value="reservation" className="data-[state=active]:bg-platemate-orange data-[state=active]:text-white">
                          Reservar
                        </TabsTrigger>
                      )}
                    </TabsList>
                    
                    <TabsContent value="delivery" className="space-y-4">
                      <div>
                        <Label htmlFor="quantity" className="font-medium text-platemate-brown">
                          Cantidad
                        </Label>
                        <div className="flex items-center mt-1">
                          <Button 
                            variant="outline" 
                            size="icon"
                            onClick={decreaseQuantity}
                            className="h-9 w-9 rounded-full"
                          >
                            <Minus size={16} />
                          </Button>
                          <div className="w-12 text-center font-medium">
                            {quantity}
                          </div>
                          <Button 
                            variant="outline" 
                            size="icon"
                            onClick={increaseQuantity}
                            className="h-9 w-9 rounded-full"
                          >
                            <Plus size={16} />
                          </Button>
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="address" className="font-medium text-platemate-brown">
                          Dirección de entrega
                        </Label>
                        <Input 
                          id="address"
                          placeholder="Ingresa tu dirección completa"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          className="mt-1"
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="instructions" className="font-medium text-platemate-brown">
                          Instrucciones especiales (opcional)
                        </Label>
                        <Textarea 
                          id="instructions"
                          placeholder="Alguna preferencia o alergia que debamos saber"
                          value={specialInstructions}
                          onChange={(e) => setSpecialInstructions(e.target.value)}
                          className="mt-1 resize-none"
                          rows={3}
                        />
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="reservation" className="space-y-4">
                      <div>
                        <Label htmlFor="date" className="font-medium text-platemate-brown">
                          Fecha de reserva
                        </Label>
                        <Select 
                          value={reservationDate}
                          onValueChange={setReservationDate}
                        >
                          <SelectTrigger id="date" className="mt-1">
                            <SelectValue placeholder="Selecciona una fecha" />
                          </SelectTrigger>
                          <SelectContent>
                            {foodItem.availableDates.map(date => {
                              const formattedDate = new Date(date).toLocaleDateString('es-ES', {
                                weekday: 'long',
                                day: 'numeric',
                                month: 'long'
                              });
                              
                              return (
                                <SelectItem key={date} value={date}>
                                  {formattedDate}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="time" className="font-medium text-platemate-brown">
                          Hora de reserva
                        </Label>
                        <Select 
                          value={reservationTime}
                          onValueChange={setReservationTime}
                        >
                          <SelectTrigger id="time" className="mt-1">
                            <SelectValue placeholder="Selecciona una hora" />
                          </SelectTrigger>
                          <SelectContent>
                            {timeSlots.map(time => (
                              <SelectItem key={time} value={time}>
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="guests" className="font-medium text-platemate-brown">
                          Número de personas
                        </Label>
                        <div className="flex items-center mt-1">
                          <Button 
                            variant="outline" 
                            size="icon"
                            onClick={() => setGuests(prev => (prev > 1 ? prev - 1 : 1))}
                            className="h-9 w-9 rounded-full"
                          >
                            <Minus size={16} />
                          </Button>
                          <div className="w-12 text-center font-medium">
                            {guests}
                          </div>
                          <Button 
                            variant="outline" 
                            size="icon"
                            onClick={() => setGuests(prev => prev + 1)}
                            className="h-9 w-9 rounded-full"
                          >
                            <Plus size={16} />
                          </Button>
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="special-requests" className="font-medium text-platemate-brown">
                          Solicitudes especiales (opcional)
                        </Label>
                        <Textarea 
                          id="special-requests"
                          placeholder="Alguna preferencia o alergia que debamos saber"
                          value={specialInstructions}
                          onChange={(e) => setSpecialInstructions(e.target.value)}
                          className="mt-1 resize-none"
                          rows={3}
                        />
                      </div>
                    </TabsContent>
                  </Tabs>
                  
                  <div className="border-t border-gray-200 pt-4 space-y-2 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">${subtotal.toFixed(2)}</span>
                    </div>
                    
                    {orderType === "delivery" && (
                      <>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Envío</span>
                          <span className="font-medium">${deliveryFee.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Comisión de servicio</span>
                          <span className="font-medium">${serviceFee.toFixed(2)}</span>
                        </div>
                      </>
                    )}
                    
                    <div className="flex justify-between text-base pt-2 border-t border-gray-100">
                      <span className="font-medium text-platemate-brown">Total</span>
                      <span className="font-bold text-platemate-orange">${total.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full bg-platemate-orange hover:bg-platemate-orange/90 text-white"
                    onClick={handleSubmitOrder}
                  >
                    {orderType === "delivery" ? "Realizar pedido" : "Reservar ahora"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Order confirmation dialog/drawer */}
      {window.innerWidth >= 768 ? (
        <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Confirmar {orderType === "delivery" ? "pedido" : "reserva"}</DialogTitle>
              <DialogDescription>
                Por favor revisa los detalles y confirma tu {orderType === "delivery" ? "pedido" : "reserva"}.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="flex items-center gap-4">
                <img 
                  src={foodItem.image} 
                  alt={foodItem.name}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div>
                  <h3 className="font-medium text-platemate-brown">{foodItem.name}</h3>
                  <p className="text-sm text-gray-500">{orderType === "delivery" ? `Cantidad: ${quantity}` : `Personas: ${guests}`}</p>
                  {orderType === "reservation" && (
                    <p className="text-sm text-gray-500">
                      {new Date(reservationDate).toLocaleDateString('es-ES', { 
                        day: 'numeric',
                        month: 'long'
                      })} a las {reservationTime}
                    </p>
                  )}
                </div>
              </div>
              
              {orderType === "delivery" && (
                <div>
                  <Label className="text-sm font-medium text-platemate-brown">Método de pago</Label>
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <button
                      className={`flex items-center justify-center gap-2 border rounded-lg p-2 text-sm ${
                        paymentMethod === "card" 
                          ? "border-platemate-orange bg-platemate-orange/5 text-platemate-orange"
                          : "border-gray-200 text-gray-600"
                      }`}
                      onClick={() => setPaymentMethod("card")}
                    >
                      <CreditCard size={16} />
                      <span>Tarjeta</span>
                    </button>
                    <button
                      className={`flex items-center justify-center gap-2 border rounded-lg p-2 text-sm ${
                        paymentMethod === "cash" 
                          ? "border-platemate-orange bg-platemate-orange/5 text-platemate-orange"
                          : "border-gray-200 text-gray-600"
                      }`}
                      onClick={() => setPaymentMethod("cash")}
                    >
                      <span>Efectivo</span>
                    </button>
                  </div>
                </div>
              )}
              
              <div className="text-sm text-gray-600">
                <div className="flex justify-between mb-1">
                  <span>Total:</span>
                  <span className="font-medium">${total.toFixed(2)}</span>
                </div>
                {orderType === "delivery" && (
                  <div className="flex justify-between">
                    <span>Dirección:</span>
                    <span className="font-medium">{address}</span>
                  </div>
                )}
              </div>
            </div>
            
            <DialogFooter className="flex flex-col sm:flex-row gap-2">
              <Button 
                variant="outline" 
                onClick={() => setShowConfirmation(false)}
                className="sm:w-full"
              >
                <X size={16} className="mr-2" />
                Cancelar
              </Button>
              <Button 
                onClick={confirmOrder}
                className="sm:w-full bg-platemate-orange hover:bg-platemate-orange/90 text-white"
              >
                <Check size={16} className="mr-2" />
                Confirmar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer open={showConfirmation} onOpenChange={setShowConfirmation}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Confirmar {orderType === "delivery" ? "pedido" : "reserva"}</DrawerTitle>
              <DrawerDescription>
                Por favor revisa los detalles y confirma tu {orderType === "delivery" ? "pedido" : "reserva"}.
              </DrawerDescription>
            </DrawerHeader>
            
            <div className="p-4 space-y-4">
              <div className="flex items-center gap-4">
                <img 
                  src={foodItem.image} 
                  alt={foodItem.name}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div>
                  <h3 className="font-medium text-platemate-brown">{foodItem.name}</h3>
                  <p className="text-sm text-gray-500">{orderType === "delivery" ? `Cantidad: ${quantity}` : `Personas: ${guests}`}</p>
                  {orderType === "reservation" && (
                    <p className="text-sm text-gray-500">
                      {new Date(reservationDate).toLocaleDateString('es-ES', { 
                        day: 'numeric',
                        month: 'long'
                      })} a las {reservationTime}
                    </p>
                  )}
                </div>
              </div>
              
              {orderType === "delivery" && (
                <div>
                  <Label className="text-sm font-medium text-platemate-brown">Método de pago</Label>
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <button
                      className={`flex items-center justify-center gap-2 border rounded-lg p-2 text-sm ${
                        paymentMethod === "card" 
                          ? "border-platemate-orange bg-platemate-orange/5 text-platemate-orange"
                          : "border-gray-200 text-gray-600"
                      }`}
                      onClick={() => setPaymentMethod("card")}
                    >
                      <CreditCard size={16} />
                      <span>Tarjeta</span>
                    </button>
                    <button
                      className={`flex items-center justify-center gap-2 border rounded-lg p-2 text-sm ${
                        paymentMethod === "cash" 
                          ? "border-platemate-orange bg-platemate-orange/5 text-platemate-orange"
                          : "border-gray-200 text-gray-600"
                      }`}
                      onClick={() => setPaymentMethod("cash")}
                    >
                      <span>Efectivo</span>
                    </button>
                  </div>
                </div>
              )}
              
              <div className="text-sm text-gray-600">
                <div className="flex justify-between mb-1">
                  <span>Total:</span>
                  <span className="font-medium">${total.toFixed(2)}</span>
                </div>
                {orderType === "delivery" && (
                  <div className="flex justify-between">
                    <span>Dirección:</span>
                    <span className="font-medium">{address}</span>
                  </div>
                )}
              </div>
            </div>
            
            <DrawerFooter className="flex flex-col gap-2">
              <Button 
                variant="outline" 
                onClick={() => setShowConfirmation(false)}
              >
                <X size={16} className="mr-2" />
                Cancelar
              </Button>
              <Button 
                onClick={confirmOrder}
                className="bg-platemate-orange hover:bg-platemate-orange/90 text-white"
              >
                <Check size={16} className="mr-2" />
                Confirmar
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
      
      <Footer />
    </div>
  );
};

export default OrderPage;
