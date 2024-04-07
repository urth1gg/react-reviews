import React, { FC } from 'react';
import type { Review } from '../types/Review';
import Star from '../assets/star.svg';

type ReviewComponentProps = {
    review: Review;
    pathToIcon?: string;
    className?: string;
}

type StarsComponentProps = {
    rating: number;
    pathToIcon?: string;
}

const Stars: FC<StarsComponentProps> = ({ rating, pathToIcon }) => {
    let starsAmount = Math.floor(rating);

    return (
        <div className="flex">
            {Array.from({ length: starsAmount }, (_, index) => (
                <span key={index}>
                    <div className='max-w-[50px]'>
                        <img src={pathToIcon || Star} alt="star" className='max-w-[50px]' />
                    </div>
                </span>
            ))}
        </div>
    )
}
const ReviewComponent: FC<ReviewComponentProps> = ({ review, pathToIcon, className }) => {
    return (
        <div className={`text-white bg-main-light ${className} p-3`}>
            <h3>{review.author}</h3>
            <Stars rating={review.rating} pathToIcon={pathToIcon}/>
            <p>{review.comment}</p>
            <p>{review.date}</p>
        </div>
    );
}

export default ReviewComponent;