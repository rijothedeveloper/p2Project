import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const StarRating:React.FC<any> = (review:any) => {
  const [rating, setRating] = useState(review.rating);
  const [hover, setHover] = useState(0);

  return (
    <div>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;

        return (
          <label key={i}>
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