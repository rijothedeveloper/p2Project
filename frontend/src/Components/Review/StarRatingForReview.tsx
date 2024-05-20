import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

interface StarRatingProps {
  rating:number
  onRatingChange: (rating: number) => void;
}
//Star rating to add a rating to a review
const StarRating:React.FC<StarRatingProps> = ({rating, onRatingChange}) => {
  const [hover, setHover] = useState(0);

  return (
    <div>
      {[...Array(5)].map((star, i) => {
        
        const ratingValue = i + 1;
        
        return (
          <label key={i}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => onRatingChange(ratingValue)}
            />
            <FaStar
              className="star"
              color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
              size={20}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(0)}
            />
          </label>
        );
      })}
    </div>
  );
};

export default StarRating;