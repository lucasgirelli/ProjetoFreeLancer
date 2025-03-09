
import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  onChange?: (rating: number) => void;
  readOnly?: boolean;
}

const StarRating: React.FC<StarRatingProps> = ({
  value,
  max = 5,
  size = 'md',
  onChange,
  readOnly = false,
}) => {
  const [hoverValue, setHoverValue] = React.useState<number | null>(null);

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const starSize = sizeClasses[size];

  const handleClick = (rating: number) => {
    if (!readOnly && onChange) {
      onChange(rating);
    }
  };

  return (
    <div className="flex items-center space-x-1">
      {Array.from({ length: max }).map((_, index) => {
        const rating = index + 1;
        const isActive = rating <= (hoverValue !== null ? hoverValue : value);
        
        return (
          <button
            key={`star-${index}`}
            type="button"
            className={cn(
              "focus:outline-none transition-colors",
              !readOnly && "cursor-pointer hover:scale-110",
              readOnly && "cursor-default"
            )}
            onClick={() => handleClick(rating)}
            onMouseEnter={() => !readOnly && setHoverValue(rating)}
            onMouseLeave={() => !readOnly && setHoverValue(null)}
            disabled={readOnly}
            aria-label={`${rating} de ${max} estrelas`}
          >
            <Star
              className={cn(
                starSize,
                isActive 
                  ? "fill-yellow-400 text-yellow-400" 
                  : "text-gray-300 dark:text-gray-600"
              )}
            />
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
