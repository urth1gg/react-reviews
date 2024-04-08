import React, { useState } from 'react';
import Star from '../assets/star.svg';
import StarEmpty from '../assets/star-empty.svg';

type StarsComponentProps = {
    initialRating?: number;
    pathToIcon?: string;
    pathToEmptyIcon?: string;
    maxStars?: number;
    showEmptyStars?: boolean;
    onStarClick?: (rating: number) => void;
};

export const Stars: React.FC<StarsComponentProps> = ({
    initialRating = 0,
    pathToIcon,
    pathToEmptyIcon,
    maxStars = 5,
    showEmptyStars = false,
    onStarClick,
}) => {
    const [rating, setRating] = useState(initialRating);

    const handleStarClick = (selectedRating: number) => {
        if (onStarClick) {
            setRating(selectedRating);
            onStarClick(selectedRating);
        }
    };

    return (
        <div className="flex">
            {Array.from({ length: maxStars }, (_, index) => {
                const starRating = index + 1;
                const isFilled = starRating <= rating;

                if (isFilled || showEmptyStars) {
                    return (
                        <span
                            key={`star-${index}`}
                            className="cursor-pointer"
                            onClick={() => handleStarClick(starRating)}
                        >
                            <div className="max-w-[30px] mr-1">
                                <img
                                    src={isFilled ? (pathToIcon || Star) : (pathToEmptyIcon || StarEmpty)}
                                    alt={isFilled ? 'Filled Star' : 'Empty Star'}
                                    className="max-w-[30px]"
                                />
                            </div>
                        </span>
                    );
                }

                return null;
            })}
        </div>
    );
};