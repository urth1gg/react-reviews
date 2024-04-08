import React from 'react';
import type { Review } from '../types/Review';
import moment from 'moment';
import { Stars } from './Stars';

type ReviewComponentProps = {
    review: Review;
    pathToIcon?: string;
    className?: string;
}

const ReviewComponent: React.FC<ReviewComponentProps> = ({ review, pathToIcon, className }) => {
    return (
        <div className={`text-white w-full md:w-6/12 max-w-[400px] bg-main-light ${className} p-5 min-h-[350px] relative`}>
            <Stars initialRating={review.rating} pathToIcon={pathToIcon} />
            <h3 className='mt-1'><span className="font-bold">{review.author}</span> - <span className='font-italic'>{moment(review.date, "YYYY-MM-DD").fromNow()}</span></h3>
            <p className='mt-0'>{review.productName}</p>
            <hr className='mt-4'/>
            <p className='mt-4'>{review.comment}</p>
            <p className='absolute bottom-1 left-1'>{ }</p>
        </div>
    );
}

export default ReviewComponent;

export {
    Stars
}