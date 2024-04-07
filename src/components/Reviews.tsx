import React, { useState, useEffect, useRef } from 'react';
import type { Review } from '../types';
import ReviewComponent from './Review';
import '../main.css';

export interface ReviewsComponentProps {
  reviews: Review[];
  pathToIcon?: string;
  className?: string;
}

export const Reviews: React.FC<ReviewsComponentProps> = ({ reviews, pathToIcon, className }) => {
  let sliceLeft = useRef(0);
  let sliceRight = useRef(3);
  const [visibleReviews, setVisibleReviews] = useState<Review[]>([]);

  useEffect(() => {
    setVisibleReviews(reviews.slice(sliceLeft.current, sliceRight.current));
  }, [reviews]);

  return (
    <div className="text-black ">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => {
          sliceLeft.current = Math.max(0, sliceLeft.current - 3);
          sliceRight.current = Math.max(3, sliceRight.current - 3);
          setVisibleReviews(reviews.slice(sliceLeft.current, sliceRight.current));
        }}
      >
        &lt;
      </button>
      <div className="flex gap-3 w-full">
        {visibleReviews.map((review: Review) => (
          <ReviewComponent key={review.id} review={review} pathToIcon={pathToIcon} className={className}/>
        ))}
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => {
          sliceLeft.current = Math.min(reviews.length - 3, sliceLeft.current + 3);
          sliceRight.current = Math.min(reviews.length, sliceRight.current + 3);
          setVisibleReviews(reviews.slice(sliceLeft.current, sliceRight.current));
        }}
      >
        &gt;
      </button>
    </div>
  );
};