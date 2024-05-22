import { BsStar, BsStarFill } from "react-icons/bs";

export const DisplayStars: React.FC<{rating: number, outOf?: number}> = ({rating, outOf=5}) => {

    const fullStars = Math.round(rating);
    const emptyStars = outOf - fullStars;

    return (
        <div className="fs-5">
            {Array.from({length: fullStars}).map((_, idx) => {
                return (
                    <BsStarFill key={`full-${idx}`} className="text-warning me-1" />
                );
            })}
            {Array.from({length: emptyStars}).map((_, idx) => {
                return (
                    <BsStar key={`empty-${idx}`} className="text-warning me-1" />
                );
            })}
        </div>
    )
} 