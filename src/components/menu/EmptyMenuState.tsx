
import { Button } from "@/components/ui/button";

interface EmptyMenuStateProps {
  onClearFilters: () => void;
}

const EmptyMenuState = ({ onClearFilters }: EmptyMenuStateProps) => {
  return (
    <div className="text-center py-12 bg-white rounded-2xl shadow-sm">
      <div className="text-6xl mb-4 animated-icon">🍽️</div>
      <h3 className="text-xl font-semibold text-platemate-brown mb-2">No se encontraron platillos</h3>
      <p className="text-gray-500 mb-4">Intenta con otra búsqueda o categoría</p>
      <Button 
        onClick={onClearFilters}
        variant="outline"
        className="border-platemate-orange text-platemate-orange hover:bg-platemate-orange/10"
      >
        Limpiar filtros
      </Button>
    </div>
  );
};

export default EmptyMenuState;
