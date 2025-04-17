
import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SubscriptionPlans from "@/components/subscription/SubscriptionPlans";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/context/LanguageContext";
import { ChefHat, Users } from "lucide-react";

const SubscriptionPage = () => {
  const [activeTab, setActiveTab] = useState<"customer" | "chef">("customer");
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-platemate-beige/30 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold text-platemate-brown mb-4">
              {t('subscriptions')}
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Selecciona el plan ideal para ti y potencia tu experiencia en PlateMate
            </p>
          </div>
        </div>
        
        <div className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Tabs 
              value={activeTab} 
              onValueChange={(value) => setActiveTab(value as "customer" | "chef")}
              className="w-full"
            >
              <TabsList className="w-full md:w-auto mb-8 bg-white">
                <TabsTrigger value="customer" className="flex-1 md:flex-initial">
                  <div className="flex items-center">
                    <Users size={16} className="mr-2" />
                    {t('customerSubscription')}
                  </div>
                </TabsTrigger>
                <TabsTrigger value="chef" className="flex-1 md:flex-initial">
                  <div className="flex items-center">
                    <ChefHat size={16} className="mr-2" />
                    {t('chefSubscription')}
                  </div>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="customer">
                <SubscriptionPlans planType="customer" />
              </TabsContent>
              
              <TabsContent value="chef">
                <SubscriptionPlans planType="chef" />
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        <div className="bg-platemate-beige/20 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-semibold text-platemate-brown mb-4">
                  Preguntas Frecuentes
                </h3>
                <div className="space-y-4">
                  <details className="group">
                    <summary className="flex items-center cursor-pointer list-none">
                      <span className="text-platemate-brown font-medium">¿Cómo funciona la suscripción?</span>
                      <span className="transition group-open:rotate-180 ml-auto">
                        <svg fill="none" height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                        </svg>
                      </span>
                    </summary>
                    <p className="text-gray-600 mt-2 text-sm">
                      Las suscripciones se renuevan automáticamente cada mes. Puedes cancelar en cualquier momento desde tu perfil.
                    </p>
                  </details>
                  <details className="group">
                    <summary className="flex items-center cursor-pointer list-none">
                      <span className="text-platemate-brown font-medium">¿Puedo cambiar de plan?</span>
                      <span className="transition group-open:rotate-180 ml-auto">
                        <svg fill="none" height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                        </svg>
                      </span>
                    </summary>
                    <p className="text-gray-600 mt-2 text-sm">
                      Sí, puedes cambiar entre planes en cualquier momento. El cambio se aplicará al inicio del siguiente ciclo de facturación.
                    </p>
                  </details>
                  <details className="group">
                    <summary className="flex items-center cursor-pointer list-none">
                      <span className="text-platemate-brown font-medium">¿Cómo cancelo mi suscripción?</span>
                      <span className="transition group-open:rotate-180 ml-auto">
                        <svg fill="none" height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                        </svg>
                      </span>
                    </summary>
                    <p className="text-gray-600 mt-2 text-sm">
                      Ve a tu perfil, selecciona "Suscripciones" y haz clic en "Cancelar". Seguirás teniendo acceso a los beneficios hasta el final del período actual.
                    </p>
                  </details>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-semibold text-platemate-brown mb-4">
                  Beneficios para Clientes
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <svg className="text-platemate-orange mr-2 h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">Entregas gratuitas ilimitadas</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="text-platemate-orange mr-2 h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">20% de descuento en todos tus pedidos</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="text-platemate-orange mr-2 h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">Acceso anticipado a nuevos cocineros</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="text-platemate-orange mr-2 h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">Atención al cliente prioritaria</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="text-platemate-orange mr-2 h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">Sin comisiones por pago con tarjeta</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-semibold text-platemate-brown mb-4">
                  Beneficios para Cocineros
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <svg className="text-platemate-orange mr-2 h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">Posicionamiento destacado en búsquedas</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="text-platemate-orange mr-2 h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">Comisión reducida del 10% (vs 15% estándar)</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="text-platemate-orange mr-2 h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">Estadísticas detalladas y análisis de mercado</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="text-platemate-orange mr-2 h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">Asistencia para marketing y promoción</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="text-platemate-orange mr-2 h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">Distintivo verificado en tu perfil</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SubscriptionPage;
