
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  ChefHat, 
  ShoppingBag, 
  User, 
  Search, 
  Menu, 
  X, 
  Globe 
} from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLanguage } from "@/context/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  const { t } = useLanguage();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="sticky top-0 z-50 bg-platemate-cream bg-opacity-95 backdrop-blur-sm border-b border-platemate-beige/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-platemate-orange flex items-center justify-center mr-2">
                <ChefHat className="text-white" size={20} />
              </div>
              <span className="text-2xl font-bold text-platemate-brown animate-bounce-light">
                PlateMate
              </span>
            </Link>
          </div>

          {!isMobile && (
            <div className="hidden md:flex items-center space-x-4">
              <Link 
                to="/browse" 
                className="text-platemate-brown hover-underline font-medium"
              >
                {t('explore')}
              </Link>
              <Link 
                to="/chefs" 
                className="text-platemate-brown hover-underline font-medium"
              >
                {t('chefs')}
              </Link>
              <Link 
                to="/about" 
                className="text-platemate-brown hover-underline font-medium"
              >
                {t('about')}
              </Link>
              <Link
                to="/subscriptions"
                className="text-platemate-brown hover-underline font-medium"
              >
                {t('subscriptions')}
              </Link>
              
              <div className="relative rounded-full bg-white px-2 py-1 flex items-center border border-platemate-beige/50 shadow-sm">
                <Search size={16} className="text-platemate-brown mr-2" />
                <input
                  type="text"
                  placeholder={t('search')}
                  className="bg-transparent border-none outline-none text-sm w-32"
                />
              </div>
              
              <LanguageSwitcher />
              
              <Link to="/cart">
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="relative animated-icon"
                >
                  <ShoppingBag size={20} className="text-platemate-brown" />
                  <span className="absolute top-0 right-0 bg-platemate-orange text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    2
                  </span>
                </Button>
              </Link>
              
              <Link to="/login">
                <Button 
                  variant="default"
                  className="bg-platemate-orange hover:bg-platemate-orange/90 text-white rounded-full"
                >
                  {t('login')}
                </Button>
              </Link>
            </div>
          )}

          {isMobile && (
            <div className="flex items-center">
              <Link to="/cart">
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="relative mr-2"
                >
                  <ShoppingBag size={20} className="text-platemate-brown" />
                  <span className="absolute top-0 right-0 bg-platemate-orange text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    2
                  </span>
                </Button>
              </Link>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleMenu}
              >
                {isOpen ? (
                  <X size={24} className="text-platemate-brown" />
                ) : (
                  <Menu size={24} className="text-platemate-brown" />
                )}
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {isMobile && isOpen && (
        <div className="md:hidden bg-white border-b border-platemate-beige animate-slide-up">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <div className="relative rounded-full bg-platemate-beige/20 px-3 py-2 flex items-center mb-3">
              <Search size={16} className="text-platemate-brown mr-2" />
              <input
                type="text"
                placeholder={t('search')}
                className="bg-transparent border-none outline-none text-sm w-full"
              />
            </div>
            <Link 
              to="/browse" 
              className="block px-3 py-2 rounded-md text-base font-medium text-platemate-brown hover:bg-platemate-beige/20"
              onClick={() => setIsOpen(false)}
            >
              {t('explore')}
            </Link>
            <Link 
              to="/chefs" 
              className="block px-3 py-2 rounded-md text-base font-medium text-platemate-brown hover:bg-platemate-beige/20"
              onClick={() => setIsOpen(false)}
            >
              {t('chefs')}
            </Link>
            <Link 
              to="/about" 
              className="block px-3 py-2 rounded-md text-base font-medium text-platemate-brown hover:bg-platemate-beige/20"
              onClick={() => setIsOpen(false)}
            >
              {t('about')}
            </Link>
            <Link 
              to="/subscriptions" 
              className="block px-3 py-2 rounded-md text-base font-medium text-platemate-brown hover:bg-platemate-beige/20"
              onClick={() => setIsOpen(false)}
            >
              {t('subscriptions')}
            </Link>
            
            <div className="border-t border-platemate-beige/50 pt-2 mt-2">
              <div className="flex justify-between items-center px-3 py-2">
                <span className="text-platemate-brown font-medium">Idioma</span>
                <select 
                  value={useLanguage().language}
                  onChange={(e) => useLanguage().setLanguage(e.target.value as any)}
                  className="bg-platemate-beige/20 rounded px-2 py-1 text-sm"
                >
                  <option value="es">Español</option>
                  <option value="qu">Quechua</option>
                  <option value="ay">Aymara</option>
                </select>
              </div>
            </div>
            
            <div className="pt-2">
              <Link 
                to="/login" 
                className="block w-full"
                onClick={() => setIsOpen(false)}
              >
                <Button 
                  variant="default"
                  className="bg-platemate-orange hover:bg-platemate-orange/90 text-white rounded-full w-full"
                >
                  {t('login')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
