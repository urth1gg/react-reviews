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

    let imagesLength = review.images ? review.images.length : 0;
    let imageWidthClass = '';
    if (imagesLength > 0 && imagesLength <= 3) {
        imageWidthClass = 'w-3/12';
    } else if (imagesLength > 3) {
        imageWidthClass = 'w-2/12';
    }


    return (
        <div
            className={`text-white max-w-[400px] w-full bg-main-light ${className} p-5 min-h-[350px] h-auto flex flex-col`}
        >
            <Stars initialRating={review.rating} pathToIcon={pathToIcon} />
            <h3 className='mt-1'>
                <span className="font-bold">{review.author}</span> -{' '}
                <span className='font-italic'>{moment(review.date, "YYYY-MM-DD").fromNow()}</span>
            </h3>
            <p className='mt-0'>{review.productName}</p>
            <hr className='mt-4' />
            <p className='mt-4'>{review.comment}</p>
            <div className='mt-auto flex flex-wrap w-full'>
                {Array.isArray(review.images) ? (
                    review.images.map((image: File | string, index: number) => (
                        typeof image === 'string' ? (
                            <a key={index} href={image} target="_blank" rel="noreferrer" className={`${imageWidthClass}`}>
                                <img
                                    key={index}
                                    src={image}
                                    alt="review"
                                    className="w-full"
                                />
                            </a>
                        ) : null
                    ))
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
}

export default ReviewComponent;

export {
    Stars
}