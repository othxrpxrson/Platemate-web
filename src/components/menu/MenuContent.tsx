
import FoodCard from "@/components/ui/FoodCard";
import EmptyMenuState from "@/components/menu/EmptyMenuState";
import { FoodItem } from "@/types/food";

interface MenuContentProps {
  filteredFoodItems: FoodItem[];
  onClearFilters: () => void;
}

const MenuContent = ({ filteredFoodItems, onClearFilters }: MenuContentProps) => {
  if (filteredFoodItems.length === 0) {
    return <EmptyMenuState onClearFilters={onClearFilters} />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {filteredFoodItems.map(food => (
        <FoodCard 
          key={food.id}
          {...food}
        />
      ))}
    </div>
  );
};

export default MenuContent;
