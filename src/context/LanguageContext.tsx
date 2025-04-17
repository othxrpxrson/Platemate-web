
import React, { createContext, useContext, useState, useEffect } from 'react';

// Define available languages
export type Language = 'es' | 'qu' | 'ay';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

// Create context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: 'es',
  setLanguage: () => {},
  t: (key: string) => key,
});

// Translations for all supported languages
const translations: Record<Language, Record<string, string>> = {
  es: {
    // Common
    "explore": "Explorar",
    "chefs": "Cocineros",
    "about": "Acerca de",
    "login": "Ingresar",
    "search": "Buscar...",
    "cart": "Carrito",
    "profile": "Perfil",
    
    // Chef Status
    "available": "Disponible",
    "unavailable": "No Disponible",
    "changeStatus": "Cambiar Estado",
    
    // Payments
    "paymentMethods": "Métodos de Pago",
    "creditCard": "Tarjeta de Crédito",
    "yape": "Yape",
    "plin": "Plin",
    "cash": "Efectivo",
    
    // Subscriptions
    "subscriptions": "Suscripciones",
    "customerSubscription": "Suscripción Cliente",
    "chefSubscription": "Suscripción Cocinero",
    "subscribe": "Suscribirse",
    "freeDelivery": "Entregas gratuitas",
    "discount": "20% de descuento",
    "priorityAccess": "Acceso prioritario",
    "featuredVisibility": "Visibilidad destacada",
    "advancedStats": "Estadísticas avanzadas",
    "premiumSupport": "Soporte premium",
    
    // Audit
    "lastAudit": "Última auditoría",
    "approved": "Aprobada",
    
    // Reviews
    "rateYourOrder": "Califica tu pedido",
    "flavor": "Sabor",
    "presentation": "Presentación",
    "punctuality": "Puntualidad",
    "cleanliness": "Limpieza",
    "leaveComment": "Deja tu comentario (10-300 caracteres)",
    
    // Chat
    "chat": "Chat",
    "sendMessage": "Enviar mensaje",
    "typeMessage": "Escribe tu mensaje...",
    "noMessages": "No hay mensajes aún. ¡Comienza la conversación!",
    
    // Chef Profile
    "videoPresentation": "Video de presentación",
    "addVideo": "Agregar video",
    "description": "Descripción",
    "addDescription": "Agregar descripción"
  },
  qu: {
    // Common
    "explore": "Maskhanay",
    "chefs": "Wayk'uqkuna",
    "about": "Imamanta",
    "login": "Yaykuy",
    "search": "Maskhanay...",
    "cart": "Rantikunapaq",
    "profile": "Nuqamanta",
    
    // Chef Status
    "available": "Kanmi",
    "unavailable": "Mana Kanchu",
    "changeStatus": "Sutiy Tikray",
    
    // Payments
    "paymentMethods": "Pagana Ñankuna",
    "creditCard": "Kredit Tarjeta",
    "yape": "Yape",
    "plin": "Plin",
    "cash": "Qullqi",
    
    // Subscriptions
    "subscriptions": "Qatipaykunata",
    "customerSubscription": "Rantiq Qatipay",
    "chefSubscription": "Wayk'uq Qatipay",
    "subscribe": "Qatipay",
    "freeDelivery": "Mana Pagana Apachiy",
    "discount": "20% Pisichay",
    "priorityAccess": "Ñawpaq Yaykuy",
    "featuredVisibility": "Rikuynin Qawachiy",
    "advancedStats": "Allin Yupaykunata",
    "premiumSupport": "Allin Yanapay",
    
    // Audit
    "lastAudit": "Qhipa Qhawarina",
    "approved": "Allin Nisqa",
    
    // Reviews
    "rateYourOrder": "Kamachisqaykita Chaninchay",
    "flavor": "Misk'i Kay",
    "presentation": "Rikuykachiynin",
    "punctuality": "Puntual Kay",
    "cleanliness": "Ch'uya Kay",
    "leaveComment": "Rimaykuy (10-300 sanampakuna)",
    
    // Chat
    "chat": "Rimay",
    "sendMessage": "Willata Apachiy",
    "typeMessage": "Willata qillqay...",
    "noMessages": "Manaraqmi willakuna kanchu. ¡Rimayta qallariy!",
    
    // Chef Profile
    "videoPresentation": "Video Rikuchiy",
    "addVideo": "Video Yapay",
    "description": "Willakuy",
    "addDescription": "Willakuy Yapay"
  },
  ay: {
    // Common
    "explore": "Thaqhaña",
    "chefs": "Phayiririnaka",
    "about": "Ukankata",
    "login": "Mantaña",
    "search": "Thaqhaña...",
    "cart": "Alakirinaka",
    "profile": "Nayankiri",
    
    // Chef Status
    "available": "Utjasi",
    "unavailable": "Jani Utjkiti",
    "changeStatus": "Mayjt'aña",
    
    // Payments
    "paymentMethods": "Paguiri Thakhinaka",
    "creditCard": "Kredit Tarjeta",
    "yape": "Yape",
    "plin": "Plin",
    "cash": "Qullqi",
    
    // Subscriptions
    "subscriptions": "Arkatañanaka",
    "customerSubscription": "Alaña Arkatataña",
    "chefSubscription": "Phayiri Arkatataña",
    "subscribe": "Arkatataña",
    "freeDelivery": "Jani Paguaña Apayaña",
    "discount": "20% Jisk'achaña",
    "priorityAccess": "Nayra Mantaña",
    "featuredVisibility": "Uñacht'ayiri Uñjataña",
    "advancedStats": "Suma Jakhuwinaka",
    "premiumSupport": "Suma Yanapt'aña",
    
    // Audit
    "lastAudit": "Qhipa Uñakipaña",
    "approved": "Suma Sata",
    
    // Reviews
    "rateYourOrder": "Amtawima Chaninchama",
    "flavor": "Muxsa Kankañapa",
    "presentation": "Uñacht'ayawipa",
    "punctuality": "Puntual Kankañapa",
    "cleanliness": "Q'uma Kankañapa",
    "leaveComment": "Arsuña (10-300 chimpu)",
    
    // Chat
    "chat": "Parlaña",
    "sendMessage": "Apayaña",
    "typeMessage": "Qillqaña...",
    "noMessages": "Janiwa yatiyawinaka utjkiti. ¡Parliriñaxa qalltama!",
    
    // Chef Profile
    "videoPresentation": "Video Uñacht'ayawi",
    "addVideo": "Video Yapaña",
    "description": "Yatiyawi",
    "addDescription": "Yatiyawi Yapaña"
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('es');

  useEffect(() => {
    // Load language preference from localStorage if available
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && Object.keys(translations).includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  // Translation function
  const translate = (key: string): string => {
    if (translations[language] && translations[language][key]) {
      return translations[language][key];
    }
    // Fallback to Spanish if translation not found
    if (translations.es && translations.es[key]) {
      return translations.es[key];
    }
    // Return the key itself if no translation found
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, t: translate }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook for using the language context
export const useLanguage = () => useContext(LanguageContext);
