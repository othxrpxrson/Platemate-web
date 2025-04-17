
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  ChefHat, 
  Mail, 
  Lock, 
  User, 
  Phone, 
  ArrowLeft, 
  Camera,
  FileCheck,
  FileText,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Registration steps
const STEPS = {
  TYPE: 0,
  BASIC_INFO: 1,
  CHEF_TEST: 2,
  CHEF_DOCS: 3,
  COMPLETE: 4
};

// Mock chef test questions
const chefTestQuestions = [
  {
    id: "q1",
    question: "¿Cuál es la temperatura interna segura para cocinar pollo?",
    options: [
      { id: "q1a", text: "63°C (145°F)" },
      { id: "q1b", text: "74°C (165°F)" },
      { id: "q1c", text: "57°C (135°F)" },
      { id: "q1d", text: "82°C (180°F)" }
    ],
    correctAnswer: "q1b"
  },
  {
    id: "q2",
    question: "¿Cuál es la manera correcta de descongelar carnes?",
    options: [
      { id: "q2a", text: "A temperatura ambiente" },
      { id: "q2b", text: "En agua caliente" },
      { id: "q2c", text: "En el refrigerador" },
      { id: "q2d", text: "En el microondas a máxima potencia" }
    ],
    correctAnswer: "q2c"
  },
  {
    id: "q3",
    question: "Para prevenir la contaminación cruzada, debes:",
    options: [
      { id: "q3a", text: "Usar la misma tabla para todos los alimentos" },
      { id: "q3b", text: "Usar diferentes tablas para diferentes tipos de alimentos" },
      { id: "q3c", text: "Lavar la tabla solo al final del día" },
      { id: "q3d", text: "Usar la misma tabla pero limpiarla con agua" }
    ],
    correctAnswer: "q3b"
  },
  {
    id: "q4",
    question: "¿Cuál es el rango de temperatura de la 'zona de peligro' para alimentos?",
    options: [
      { id: "q4a", text: "0°C a 4°C (32°F a 40°F)" },
      { id: "q4b", text: "4°C a 16°C (40°F a 60°F)" },
      { id: "q4c", text: "4°C a 60°C (40°F a 140°F)" },
      { id: "q4d", text: "60°C a 74°C (140°F a 165°F)" }
    ],
    correctAnswer: "q4c"
  },
  {
    id: "q5",
    question: "¿Cuánto tiempo pueden permanecer los alimentos perecederos a temperatura ambiente?",
    options: [
      { id: "q5a", text: "No más de 2 horas" },
      { id: "q5b", text: "Hasta 4 horas" },
      { id: "q5c", text: "Hasta 6 horas" },
      { id: "q5d", text: "Depende del tipo de alimento" }
    ],
    correctAnswer: "q5a"
  }
];

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [registrationType, setRegistrationType] = useState<"customer" | "chef">("customer");
  const [step, setStep] = useState(STEPS.TYPE);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    isChef: false
  });
  const [testAnswers, setTestAnswers] = useState<Record<string, string>>({});
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [testScore, setTestScore] = useState(0);
  const [documents, setDocuments] = useState({
    kitchen: [] as string[],
    id: "",
    selfie: "",
    certificates: [] as string[]
  });
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Inicio de sesión exitoso",
      description: "Bienvenido de vuelta a PlateMate",
    });
    navigate("/");
  };

  const handleNextStep = () => {
    // Validate current step
    if (step === STEPS.BASIC_INFO) {
      if (!userInfo.name || !userInfo.email || !userInfo.password || !userInfo.phone) {
        toast({
          title: "Información incompleta",
          description: "Por favor completa todos los campos",
          variant: "destructive"
        });
        return;
      }
      
      if (!agreeTerms) {
        toast({
          title: "Términos y condiciones",
          description: "Debes aceptar los términos y condiciones para continuar",
          variant: "destructive"
        });
        return;
      }
    }
    
    if (step === STEPS.CHEF_TEST) {
      // Calculate test score
      let score = 0;
      chefTestQuestions.forEach(q => {
        if (testAnswers[q.id] === q.correctAnswer) {
          score++;
        }
      });
      
      setTestScore(score);
      
      if (score < 3) { // 60% pass rate
        toast({
          title: "Test no aprobado",
          description: `Obtuviste ${score} de 5 respuestas correctas. Necesitas al menos 3 para continuar.`,
          variant: "destructive"
        });
        return;
      }
    }
    
    if (step === STEPS.CHEF_DOCS) {
      if (documents.kitchen.length < 3 || !documents.id || !documents.selfie) {
        toast({
          title: "Documentos incompletos",
          description: "Por favor sube todas las fotos y documentos requeridos",
          variant: "destructive"
        });
        return;
      }
    }
    
    // Move to next step
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleRegistrationType = (type: "customer" | "chef") => {
    setRegistrationType(type);
    setUserInfo(prev => ({ ...prev, isChef: type === "chef" }));
    setStep(STEPS.BASIC_INFO);
  };

  const handleAnswerSelect = (questionId: string, answerId: string) => {
    setTestAnswers(prev => ({ ...prev, [questionId]: answerId }));
  };

  const handleFileUpload = (type: keyof typeof documents, multiple: boolean = false) => {
    // Simulate file upload
    if (type === "kitchen" && multiple) {
      setDocuments(prev => ({
        ...prev,
        kitchen: [...prev.kitchen, `kitchen-photo-${prev.kitchen.length + 1}.jpg`]
      }));
    } else if (type === "certificates" && multiple) {
      setDocuments(prev => ({
        ...prev,
        certificates: [...prev.certificates, `certificate-${prev.certificates.length + 1}.pdf`]
      }));
    } else {
      setDocuments(prev => ({
        ...prev,
        [type]: `${type}-photo-1.jpg`
      }));
    }
    
    toast({
      title: "Archivo subido",
      description: "Tu documento ha sido subido correctamente",
    });
  };

  const completeRegistration = () => {
    toast({
      title: "¡Registro exitoso!",
      description: userInfo.isChef 
        ? "Tu cuenta de cocinero ha sido creada. Revisaremos tu información pronto."
        : "Tu cuenta ha sido creada. ¡Bienvenido a PlateMate!",
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {isLogin ? (
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="md:flex">
                <div className="relative md:w-1/2 bg-platemate-orange p-8 text-white">
                  <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80')] bg-cover"></div>
                  
                  <div className="relative z-10">
                    <Link to="/" className="flex items-center mb-8">
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mr-2">
                        <ChefHat className="text-platemate-orange" size={20} />
                      </div>
                      <span className="text-2xl font-bold">
                        PlateMate
                      </span>
                    </Link>
                    
                    <h2 className="text-3xl font-bold mb-4">¡Bienvenido de vuelta!</h2>
                    <p className="mb-6">
                      Inicia sesión para descubrir nuevos sabores caseros, seguir a tus cocineros favoritos y más.
                    </p>
                    
                    <p className="text-sm opacity-80">
                      ¿Aún no tienes cuenta?
                    </p>
                    <Button 
                      variant="outline" 
                      className="border-white text-white hover:bg-white/20"
                      onClick={() => setIsLogin(false)}
                    >
                      Regístrate
                    </Button>
                  </div>
                </div>
                
                <div className="md:w-1/2 p-8">
                  <h2 className="text-2xl font-bold text-platemate-brown mb-6">
                    Iniciar sesión
                  </h2>
                  
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Correo electrónico
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <Input 
                          type="email" 
                          placeholder="correo@ejemplo.com"
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Contraseña
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <Input 
                          type="password" 
                          placeholder="••••••••"
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Checkbox id="remember" />
                        <label 
                          htmlFor="remember" 
                          className="ml-2 text-sm text-gray-600"
                        >
                          Recordarme
                        </label>
                      </div>
                      <a 
                        href="#" 
                        className="text-sm text-platemate-orange hover:underline"
                      >
                        ¿Olvidaste tu contraseña?
                      </a>
                    </div>
                    
                    <Button 
                      type="submit"
                      className="w-full bg-platemate-orange hover:bg-platemate-orange/90 text-white"
                    >
                      Iniciar sesión
                    </Button>
                    
                    <div className="relative flex items-center justify-center mt-6">
                      <div className="border-t border-gray-300 absolute w-full"></div>
                      <div className="text-sm bg-white px-4 relative text-gray-500">O continúa con</div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <Button 
                        type="button"
                        variant="outline"
                        className="w-full"
                      >
                        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                          <path
                            fill="currentColor"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          />
                          <path
                            fill="currentColor"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          />
                          <path
                            fill="currentColor"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          />
                          <path
                            fill="currentColor"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          />
                        </svg>
                        Google
                      </Button>
                      <Button 
                        type="button"
                        variant="outline"
                        className="w-full"
                      >
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"
                          ></path>
                        </svg>
                        Twitter
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {step === STEPS.TYPE && (
                <div className="p-8 text-center">
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-platemate-orange/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <ChefHat className="text-platemate-orange" size={24} />
                    </div>
                    <h2 className="text-2xl font-bold text-platemate-brown">
                      ¿Cómo te gustaría unirte a PlateMate?
                    </h2>
                    <p className="text-gray-600 mt-2">
                      Elige el tipo de cuenta que deseas crear
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg mx-auto">
                    <button
                      onClick={() => handleRegistrationType("customer")}
                      className="bg-white border-2 border-platemate-beige hover:border-platemate-orange rounded-xl p-6 text-left transition-colors"
                    >
                      <User size={24} className="text-platemate-orange mb-3" />
                      <h3 className="text-lg font-semibold text-platemate-brown mb-1">
                        Soy un Cliente
                      </h3>
                      <p className="text-sm text-gray-600">
                        Quiero descubrir y ordenar comida casera
                      </p>
                    </button>
                    
                    <button
                      onClick={() => handleRegistrationType("chef")}
                      className="bg-white border-2 border-platemate-beige hover:border-platemate-orange rounded-xl p-6 text-left transition-colors"
                    >
                      <ChefHat size={24} className="text-platemate-orange mb-3" />
                      <h3 className="text-lg font-semibold text-platemate-brown mb-1">
                        Soy un Cocinero
                      </h3>
                      <p className="text-sm text-gray-600">
                        Quiero compartir y vender mis creaciones
                      </p>
                    </button>
                  </div>
                  
                  <div className="mt-8">
                    <p className="text-sm text-gray-600 mb-2">
                      ¿Ya tienes una cuenta?
                    </p>
                    <Button 
                      variant="outline" 
                      className="border-platemate-orange text-platemate-orange"
                      onClick={() => setIsLogin(true)}
                    >
                      Iniciar sesión
                    </Button>
                  </div>
                </div>
              )}
              
              {step === STEPS.BASIC_INFO && (
                <div className="p-8">
                  <button
                    onClick={handlePreviousStep}
                    className="flex items-center text-platemate-brown hover:text-platemate-orange mb-6"
                  >
                    <ArrowLeft size={16} className="mr-1" />
                    <span>Volver</span>
                  </button>
                  
                  <h2 className="text-2xl font-bold text-platemate-brown mb-6">
                    Información básica
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Nombre completo
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                          <Input 
                            type="text" 
                            name="name"
                            placeholder="Tu nombre completo"
                            className="pl-10"
                            value={userInfo.name}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Correo electrónico
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                          <Input 
                            type="email" 
                            name="email"
                            placeholder="correo@ejemplo.com"
                            className="pl-10"
                            value={userInfo.email}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Contraseña
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                          <Input 
                            type="password" 
                            name="password"
                            placeholder="••••••••"
                            className="pl-10"
                            value={userInfo.password}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Número de teléfono
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                          <Input 
                            type="tel" 
                            name="phone"
                            placeholder="+51 999 999 999"
                            className="pl-10"
                            value={userInfo.phone}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <Checkbox 
                          id="terms" 
                          checked={agreeTerms} 
                          onCheckedChange={(checked) => setAgreeTerms(checked as boolean)} 
                          required
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="terms" className="text-gray-600">
                          Acepto los <a href="#" className="text-platemate-orange hover:underline">Términos y Condiciones</a> y la <a href="#" className="text-platemate-orange hover:underline">Política de Privacidad</a>
                        </label>
                      </div>
                    </div>
                    
                    <Button 
                      onClick={handleNextStep}
                      className="w-full bg-platemate-orange hover:bg-platemate-orange/90 text-white"
                    >
                      {userInfo.isChef ? "Continuar al test" : "Completar registro"}
                    </Button>
                    
                    <div className="relative flex items-center justify-center mt-4">
                      <div className="border-t border-gray-300 absolute w-full"></div>
                      <div className="text-sm bg-white px-4 relative text-gray-500">O regístrate con</div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <Button 
                        type="button"
                        variant="outline"
                        className="w-full"
                      >
                        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                          <path
                            fill="currentColor"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          />
                          <path
                            fill="currentColor"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          />
                          <path
                            fill="currentColor"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          />
                          <path
                            fill="currentColor"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          />
                        </svg>
                        Google
                      </Button>
                      <Button 
                        type="button"
                        variant="outline"
                        className="w-full"
                      >
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"
                          ></path>
                        </svg>
                        Twitter
                      </Button>
                    </div>
                  </div>
                </div>
              )}
              
              {step === STEPS.CHEF_TEST && (
                <div className="p-8">
                  <button
                    onClick={handlePreviousStep}
                    className="flex items-center text-platemate-brown hover:text-platemate-orange mb-6"
                  >
                    <ArrowLeft size={16} className="mr-1" />
                    <span>Volver</span>
                  </button>
                  
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-platemate-brown mb-2">
                      Test de salubridad
                    </h2>
                    <p className="text-gray-600">
                      Para garantizar estándares de calidad, todos nuestros cocineros deben completar este test básico de salubridad alimentaria.
                    </p>
                  </div>
                  
                  <div className="space-y-8">
                    {chefTestQuestions.map((question, index) => (
                      <div key={question.id} className="bg-platemate-beige/10 rounded-xl p-6">
                        <h3 className="font-semibold text-platemate-brown mb-4">
                          {index + 1}. {question.question}
                        </h3>
                        
                        <div className="space-y-3">
                          {question.options.map((option) => (
                            <label 
                              key={option.id}
                              className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                                testAnswers[question.id] === option.id 
                                  ? "bg-platemate-orange/10 border-platemate-orange" 
                                  : "bg-white border-gray-200 hover:border-platemate-beige"
                              }`}
                            >
                              <input 
                                type="radio" 
                                name={question.id}
                                value={option.id}
                                checked={testAnswers[question.id] === option.id}
                                onChange={() => handleAnswerSelect(question.id, option.id)}
                                className="sr-only"
                              />
                              <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
                                testAnswers[question.id] === option.id 
                                  ? "border-platemate-orange" 
                                  : "border-gray-300"
                              }`}>
                                {testAnswers[question.id] === option.id && (
                                  <div className="w-3 h-3 rounded-full bg-platemate-orange"></div>
                                )}
                              </div>
                              <span className="text-gray-800">{option.text}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8">
                    <Button 
                      onClick={handleNextStep}
                      className="w-full bg-platemate-orange hover:bg-platemate-orange/90 text-white"
                    >
                      Enviar respuestas y continuar
                    </Button>
                  </div>
                </div>
              )}
              
              {step === STEPS.CHEF_DOCS && (
                <div className="p-8">
                  <button
                    onClick={handlePreviousStep}
                    className="flex items-center text-platemate-brown hover:text-platemate-orange mb-6"
                  >
                    <ArrowLeft size={16} className="mr-1" />
                    <span>Volver</span>
                  </button>
                  
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-platemate-brown mb-2">
                      Sube tus documentos
                    </h2>
                    <p className="text-gray-600">
                      Para verificar tu identidad y garantizar la seguridad, necesitamos que subas los siguientes documentos.
                    </p>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-platemate-brown mb-2">
                        Fotos de tu cocina (3 mínimo)
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        Sube fotos claras que muestren el estado general de tu cocina, el área de preparación y tu refrigerador.
                      </p>
                      
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-2">
                        {documents.kitchen.map((photo, index) => (
                          <div key={index} className="h-24 bg-platemate-beige/20 rounded-lg flex items-center justify-center relative">
                            <div className="absolute inset-0 bg-platemate-orange/10 rounded-lg flex items-center justify-center">
                              <Check size={24} className="text-green-600" />
                            </div>
                            <span className="text-xs text-green-600 font-medium">Foto {index + 1}</span>
                          </div>
                        ))}
                        
                        {documents.kitchen.length < 3 && (
                          <button
                            onClick={() => handleFileUpload("kitchen", true)}
                            className="h-24 bg-platemate-beige/20 rounded-lg border-2 border-dashed border-platemate-beige hover:border-platemate-orange flex flex-col items-center justify-center transition-colors"
                          >
                            <Camera size={24} className="text-platemate-brown mb-2" />
                            <span className="text-xs text-gray-600">Añadir foto</span>
                          </button>
                        )}
                      </div>
                      
                      <p className="text-xs text-gray-500">
                        {documents.kitchen.length}/3 fotos subidas
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-semibold text-platemate-brown mb-2">
                          Documento de identidad
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">
                          DNI, pasaporte u otro documento oficial.
                        </p>
                        
                        {documents.id ? (
                          <div className="h-24 bg-platemate-beige/20 rounded-lg flex items-center justify-center relative">
                            <div className="absolute inset-0 bg-platemate-orange/10 rounded-lg flex items-center justify-center">
                              <Check size={24} className="text-green-600" />
                            </div>
                            <span className="text-xs text-green-600 font-medium">Documento subido</span>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleFileUpload("id")}
                            className="h-24 w-full bg-platemate-beige/20 rounded-lg border-2 border-dashed border-platemate-beige hover:border-platemate-orange flex flex-col items-center justify-center transition-colors"
                          >
                            <FileCheck size={24} className="text-platemate-brown mb-2" />
                            <span className="text-xs text-gray-600">Subir documento</span>
                          </button>
                        )}
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-platemate-brown mb-2">
                          Foto personal
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">
                          Una foto clara de tu rostro para tu perfil.
                        </p>
                        
                        {documents.selfie ? (
                          <div className="h-24 bg-platemate-beige/20 rounded-lg flex items-center justify-center relative">
                            <div className="absolute inset-0 bg-platemate-orange/10 rounded-lg flex items-center justify-center">
                              <Check size={24} className="text-green-600" />
                            </div>
                            <span className="text-xs text-green-600 font-medium">Foto subida</span>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleFileUpload("selfie")}
                            className="h-24 w-full bg-platemate-beige/20 rounded-lg border-2 border-dashed border-platemate-beige hover:border-platemate-orange flex flex-col items-center justify-center transition-colors"
                          >
                            <Camera size={24} className="text-platemate-brown mb-2" />
                            <span className="text-xs text-gray-600">Subir foto</span>
                          </button>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-platemate-brown mb-2">
                        Certificados (opcional)
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        Sube cualquier certificado de cocina, manipulación de alimentos u otros que tengas.
                      </p>
                      
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-2">
                        {documents.certificates.map((cert, index) => (
                          <div key={index} className="h-20 bg-platemate-beige/20 rounded-lg flex items-center justify-center relative">
                            <div className="absolute inset-0 bg-platemate-orange/10 rounded-lg flex items-center justify-center">
                              <Check size={24} className="text-green-600" />
                            </div>
                            <span className="text-xs text-green-600 font-medium">Certificado {index + 1}</span>
                          </div>
                        ))}
                        
                        <button
                          onClick={() => handleFileUpload("certificates", true)}
                          className="h-20 bg-platemate-beige/20 rounded-lg border-2 border-dashed border-platemate-beige hover:border-platemate-orange flex flex-col items-center justify-center transition-colors"
                        >
                          <FileText size={20} className="text-platemate-brown mb-1" />
                          <span className="text-xs text-gray-600">Añadir certificado</span>
                        </button>
                      </div>
                      
                      <p className="text-xs text-gray-500">
                        {documents.certificates.length} certificados subidos
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <Button 
                      onClick={handleNextStep}
                      className="w-full bg-platemate-orange hover:bg-platemate-orange/90 text-white"
                    >
                      Finalizar registro
                    </Button>
                  </div>
                </div>
              )}
              
              {step === STEPS.COMPLETE && (
                <div className="p-8 text-center">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check size={36} className="text-green-600" />
                  </div>
                  
                  <h2 className="text-2xl font-bold text-platemate-brown mb-4">
                    {userInfo.isChef 
                      ? "¡Tu registro como cocinero está completo!" 
                      : "¡Tu registro está completo!"}
                  </h2>
                  
                  <p className="text-gray-600 mb-8 max-w-md mx-auto">
                    {userInfo.isChef 
                      ? "Revisaremos tu información y aprobaremos tu cuenta en las próximas 24-48 horas. Te notificaremos por correo electrónico." 
                      : "¡Bienvenido a PlateMate! Ya puedes comenzar a explorar deliciosas comidas caseras."}
                  </p>
                  
                  <Button 
                    onClick={completeRegistration}
                    className="bg-platemate-orange hover:bg-platemate-orange/90 text-white"
                  >
                    Ir al inicio
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AuthPage;
