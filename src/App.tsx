
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AuthPage from "./pages/AuthPage";
import BrowsePage from "./pages/BrowsePage";
import ChefProfilePage from "./pages/ChefProfilePage";
import OrderPage from "./pages/OrderPage";
import CartPage from "./pages/CartPage";
import TrackingPage from "./pages/TrackingPage";
import LiveStreamsPage from "./pages/LiveStreamsPage";
import AboutPage from "./pages/AboutPage";
import MenuPage from "./pages/MenuPage";
import SubscriptionPage from "./pages/SubscriptionPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/register" element={<AuthPage />} />
            <Route path="/browse" element={<BrowsePage />} />
            <Route path="/chefs" element={<BrowsePage />} />
            <Route path="/chef/:id" element={<ChefProfilePage />} />
            <Route path="/menu/:id" element={<MenuPage />} />
            <Route path="/order/:id" element={<OrderPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/tracking" element={<TrackingPage />} />
            <Route path="/tracking/:id" element={<TrackingPage />} />
            <Route path="/live" element={<LiveStreamsPage />} />
            <Route path="/live/:id" element={<LiveStreamsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/subscriptions" element={<SubscriptionPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
