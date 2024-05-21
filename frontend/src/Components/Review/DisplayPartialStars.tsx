import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";

export const DisplayPartialStars: React.FC<{rating: number, outOf?: number}> = ({rating, outOf=5}) => {

    const roundedRating = Math.round(rating * 2) / 2;
    const fullStars = Math.floor(roundedRating);
    const halfStar = roundedRating % 1 !== 0;
    const emptyStars = outOf - fullStars - (halfStar ? 1 : 0);

    return (
        <div>
            {Array.from({length: fullStars}).map((_, idx) => {
                return (
                    <BsStarFill key={`full-${idx}`} className="text-warning" />
                );
            })}
            {halfStar && <BsStarHalf className="text-warning" />}
            {Array.from({length: emptyStars}).map((_, idx) => {
                return (
                    <BsStar key={`empty-${idx}`} className="text-warning" />
                );
            })}
        </div>
    );
};