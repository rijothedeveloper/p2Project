import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import ReviewList from '../Dashboard/ReviewList';
import { ReviewInterface } from '../../Interfaces/ReviewInterface';


/*
This component lets the user chose the rating using stars
@param review - the review the component is used for
@param handleRatingChange - function from parent to let it handle the rating change at the parent level
*/
const StarRating:React.FC<{
  review: ReviewInterface
  handleRatingChange: (rating: number) => void
}> = ({review, handleRatingChange}) => {

  // console.log(`INCOMING REVIEW IN STA: ${JSON.stringify(review)}`)
  const [rating, setRating] = useState(review.rating as number);
  const [hover, setHover] = useState(0);

  const handleRatingButtonClick = () => {  
    console.log(`RATING FROM STAR RATING: ${rating}`)
    setRating(hover)
    handleRatingChange(hover)
  }


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
              hidden= {true}
              onClick={handleRatingButtonClick}
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