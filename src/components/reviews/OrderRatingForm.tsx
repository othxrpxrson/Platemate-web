
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { useLanguage } from '@/context/LanguageContext';
import { Star } from 'lucide-react';

interface OrderRatingFormProps {
  orderId: string;
  chefId: string;
  onSubmit?: (rating: OrderRating) => void;
  onCancel?: () => void;
}

interface OrderRating {
  orderId: string;
  chefId: string;
  flavor: number;
  presentation: number;
  punctuality: number;
  cleanliness: number;
  comment: string;
}

const OrderRatingForm: React.FC<OrderRatingFormProps> = ({
  orderId,
  chefId,
  onSubmit,
  onCancel
}) => {
  const [ratings, setRatings] = useState({
    flavor: 0,
    presentation: 0,
    punctuality: 0,
    cleanliness: 0
  });
  const [comment, setComment] = useState('');
  const [hoverRatings, setHoverRatings] = useState({
    flavor: 0,
    presentation: 0,
    punctuality: 0,
    cleanliness: 0
  });
  
  const { t } = useLanguage();

  const handleRatingChange = (category: keyof typeof ratings, value: number) => {
    setRatings(prev => ({
      ...prev,
      [category]: value
    }));
  };

  const handleHoverChange = (category: keyof typeof hoverRatings, value: number) => {
    setHoverRatings(prev => ({
      ...prev,
      [category]: value
    }));
  };

  const handleSubmitRating = () => {
    // Check if all categories are rated
    const allRated = Object.values(ratings).every(rating => rating > 0);
    if (!allRated) {
      toast({
        title: "Calificación incompleta",
        description: "Por favor califica todas las categorías",
        variant: "destructive"
      });
      return;
    }

    // Check comment length
    if (comment.length < 10) {
      toast({
        title: "Comentario demasiado corto",
        description: "Por favor escribe un comentario de al menos 10 caracteres",
        variant: "destructive"
      });
      return;
    }

    if (comment.length > 300) {
      toast({
        title: "Comentario demasiado largo",
        description: "El comentario no debe exceder los 300 caracteres",
        variant: "destructive"
      });
      return;
    }

    const rating: OrderRating = {
      orderId,
      chefId,
      ...ratings,
      comment
    };

    if (onSubmit) onSubmit(rating);

    toast({
      title: "Gracias por tu calificación",
      description: "Tu opinión nos ayuda a mejorar el servicio",
    });
  };

  // Render stars for a category
  const renderStars = (category: keyof typeof ratings) => {
    return Array.from({ length: 5 }).map((_, index) => {
      const ratingValue = index + 1;
      const filled = ratingValue <= (hoverRatings[category] || ratings[category]);
      
      return (
        <Star
          key={`${category}-star-${index}`}
          size={24}
          className={`cursor-pointer transition-colors ${
            filled ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
          }`}
          onClick={() => handleRatingChange(category, ratingValue)}
          onMouseEnter={() => handleHoverChange(category, ratingValue)}
          onMouseLeave={() => handleHoverChange(category, 0)}
        />
      );
    });
  };

  return (
    <div className="space-y-6 p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-platemate-brown">
        {t('rateYourOrder')}
      </h3>
      
      <div className="space-y-4">
        {/* Flavor Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('flavor')}
          </label>
          <div className="flex gap-1">
            {renderStars('flavor')}
          </div>
        </div>
        
        {/* Presentation Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('presentation')}
          </label>
          <div className="flex gap-1">
            {renderStars('presentation')}
          </div>
        </div>
        
        {/* Punctuality Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('punctuality')}
          </label>
          <div className="flex gap-1">
            {renderStars('punctuality')}
          </div>
        </div>
        
        {/* Cleanliness Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('cleanliness')}
          </label>
          <div className="flex gap-1">
            {renderStars('cleanliness')}
          </div>
        </div>
        
        {/* Comment */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('leaveComment')}
          </label>
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full min-h-[100px]"
            placeholder="Comparte tu experiencia con este pedido..."
          />
          <p className="text-xs text-gray-500 mt-1">
            {comment.length}/300 caracteres
          </p>
        </div>
      </div>
      
      <div className="flex justify-end space-x-2">
        {onCancel && (
          <Button variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
        )}
        <Button 
          className="bg-platemate-orange hover:bg-platemate-orange/90 text-white"
          onClick={handleSubmitRating}
        >
          Enviar calificación
        </Button>
      </div>
    </div>
  );
};

export default OrderRatingForm;
