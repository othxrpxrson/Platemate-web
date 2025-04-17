
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShoppingBag,
  ChevronLeft as ChevronLeftIcon,
  MapPin,
  Clock,
  Trash2,
  CreditCard,
  ChefHat,
  Truck,
  Check,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { toast } from "@/hooks/use-toast";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  chef: {
    id: string;
    name: string;
  };
  notes?: string;
}

// Mock data for cart items
const initialCartItems: CartItem[] = [
  {
    id: "food-1",
    name: "Ceviche Peruano",
    price: 15.99,
    quantity: 2,
    image: "https://images.unsplash.com/photo-1535399831218-d5bd36d1a6b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    chef: {
      id: "chef-1",
      name: "María Rodriguez"
    }
  },
  {
    id: "food-3",
    name: "Tiramisu Casero",
    price: 8.99,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    chef: {
      id: "chef-3",
      name: "Lucía Peralta"
    },
    notes: "Con extra chocolate por favor"
  }
];

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
    toast({
      title: "Producto eliminado",
      description: "El producto ha sido eliminado de tu carrito",
      variant: "default",
    });
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = 3.99;
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + deliveryFee + tax;

  const handleCheckout = () => {
    setIsLoading(true);
    
    // Simulate API request
    setTimeout(() => {
      setIsLoading(false);
      navigate("/tracking");
      toast({
        title: "¡Pedido realizado con éxito!",
        description: "Tu pedido está en proceso y puedes seguirlo en tiempo real",
        variant: "default",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-platemate-brown mb-6 flex items-center">
            <ShoppingBag className="mr-2" />
            Tu Carrito
          </h1>
          
          {cartItems.length === 0 ? (
            <div className="text-center py-16">
              <div className="bg-platemate-beige/20 rounded-full h-24 w-24 mx-auto flex items-center justify-center mb-4">
                <ShoppingBag size={32} className="text-platemate-orange" />
              </div>
              <h2 className="text-xl font-semibold text-platemate-brown mb-2">Tu carrito está vacío</h2>
              <p className="text-gray-500 mb-6">Añade algunos deliciosos platos de nuestros cocineros</p>
              <Button 
                onClick={() => navigate("/browse")} 
                className="bg-platemate-orange hover:bg-platemate-orange/90 text-white"
              >
                Explorar Comidas
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
                  <h2 className="text-xl font-semibold text-platemate-brown mb-4">Productos ({cartItems.length})</h2>
                  
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex border-b border-platemate-beige/50 pb-4 last:border-0 last:pb-0">
                        <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="ml-4 flex-grow">
                          <div className="flex justify-between">
                            <h3 className="font-semibold text-platemate-brown">{item.name}</h3>
                            <span className="font-semibold text-platemate-orange">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                          
                          <p className="text-sm text-gray-500 mb-2">
                            <ChefHat size={14} className="inline mr-1" />
                            {item.chef.name}
                          </p>
                          
                          {item.notes && (
                            <p className="text-sm italic text-gray-500 mb-2">
                              "{item.notes}"
                            </p>
                          )}
                          
                          <div className="flex justify-between items-center mt-2">
                            <div className="flex items-center border border-platemate-beige rounded-full">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-platemate-orange"
                              >
                                -
                              </button>
                              <span className="mx-2 min-w-[20px] text-center">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-platemate-orange"
                              >
                                +
                              </button>
                            </div>
                            
                            <button 
                              onClick={() => removeItem(item.id)}
                              className="text-red-500 hover:text-red-600"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Button 
                  variant="outline"
                  onClick={() => navigate("/browse")}
                  className="w-full border-platemate-beige text-platemate-brown hover:bg-platemate-beige/10"
                >
                  <ChevronLeftIcon size={16} className="mr-2" />
                  Continuar Comprando
                </Button>
              </div>
              
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
                  <h2 className="text-xl font-semibold text-platemate-brown mb-4">Resumen del Pedido</h2>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Costo de envío</span>
                      <span>${deliveryFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Impuestos</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <Separator className="my-3" />
                    <div className="flex justify-between font-semibold">
                      <span className="text-platemate-brown">Total</span>
                      <span className="text-platemate-orange">${total.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <Accordion type="single" collapsible className="w-full mb-6">
                    <AccordionItem value="item-1" className="border-b-0">
                      <AccordionTrigger className="py-3 text-platemate-brown font-medium">
                        Dirección de entrega
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="bg-platemate-beige/10 p-3 rounded-lg text-sm">
                          <p className="font-medium">Casa</p>
                          <p className="text-gray-600">Av. Siempre Viva 742</p>
                          <p className="text-gray-600">Springfield, OR 97403</p>
                          <div className="mt-2">
                            <Button variant="link" className="h-auto p-0 text-platemate-orange">
                              Cambiar
                            </Button>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-2" className="border-b-0">
                      <AccordionTrigger className="py-3 text-platemate-brown font-medium">
                        Método de pago
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="bg-platemate-beige/10 p-3 rounded-lg text-sm">
                          <p className="font-medium flex items-center">
                            <CreditCard size={16} className="mr-2" />
                            Tarjeta terminada en 4242
                          </p>
                          <div className="mt-2">
                            <Button variant="link" className="h-auto p-0 text-platemate-orange">
                              Cambiar
                            </Button>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  
                  <Button 
                    onClick={handleCheckout}
                    disabled={isLoading}
                    className="w-full bg-platemate-orange hover:bg-platemate-orange/90 text-white rounded-full"
                  >
                    {isLoading ? "Procesando..." : "Completar Pedido"}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CartPage;
