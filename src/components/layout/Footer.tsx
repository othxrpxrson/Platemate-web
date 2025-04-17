
import { Link } from "react-router-dom";
import { ChefHat, Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-platemate-brown text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-platemate-orange flex items-center justify-center mr-2">
                <ChefHat className="text-white" size={20} />
              </div>
              <span className="text-2xl font-bold text-white">
                PlateMate
              </span>
            </Link>
            <p className="text-platemate-beige/80 text-sm mb-4">
              Conectando cocineros caseros con amantes de la buena comida. Descubre sabores auténticos cerca de ti.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-platemate-orange transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-platemate-orange transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-platemate-orange transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-platemate-orange">Descubrir</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/browse" className="text-platemate-beige hover:text-white transition-colors">
                  Explorar comidas
                </Link>
              </li>
              <li>
                <Link to="/chefs" className="text-platemate-beige hover:text-white transition-colors">
                  Nuestros cocineros
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-platemate-beige hover:text-white transition-colors">
                  Categorías
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-platemate-beige hover:text-white transition-colors">
                  Eventos
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-platemate-orange">Únete</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/register/chef" className="text-platemate-beige hover:text-white transition-colors">
                  Regístrate como cocinero
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-platemate-beige hover:text-white transition-colors">
                  Regístrate como cliente
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-platemate-beige hover:text-white transition-colors">
                  Cómo funciona
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-platemate-beige hover:text-white transition-colors">
                  Preguntas frecuentes
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-platemate-orange">Ayuda</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-platemate-beige hover:text-white transition-colors">
                  Contacto
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-platemate-beige hover:text-white transition-colors">
                  Términos y condiciones
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-platemate-beige hover:text-white transition-colors">
                  Política de privacidad
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-platemate-beige hover:text-white transition-colors">
                  Soporte
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-platemate-beige/20 mt-8 pt-8 flex flex-col md:flex-row justify-between">
          <p className="text-platemate-beige/60 text-sm">
            &copy; {new Date().getFullYear()} PlateMate. Todos los derechos reservados.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/terms" className="text-platemate-beige/60 text-sm hover:text-white transition-colors">
              Términos
            </Link>
            <Link to="/privacy" className="text-platemate-beige/60 text-sm hover:text-white transition-colors">
              Privacidad
            </Link>
            <Link to="/cookies" className="text-platemate-beige/60 text-sm hover:text-white transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
