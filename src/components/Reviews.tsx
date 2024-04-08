import React, { useState, useEffect, useRef } from 'react';
import type { Review } from '../types';
import ReviewComponent from './Review';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Right from '../assets/right.svg';
import Left from '../assets/left.svg';
import Star from '../assets/star.svg';
import '../main.css';

export interface ReviewsComponentProps {
  reviews: Review[];
  pathToIcon?: string;
  className?: string;
  classNameContainer?: string;
  _ReviewComponent?: React.FC<{ review: Review }>;
}

export const Reviews: React.FC<ReviewsComponentProps> = ({ reviews, pathToIcon, className, _ReviewComponent, classNameContainer }) => {
  let sliceLeft = useRef(0);
  let sliceRight = useRef(3);
  const [visibleReviews, setVisibleReviews] = useState<Review[]>([]);

  useEffect(() => {
    sliceLeft.current = 0;

    if (window.innerWidth >= 0 && window.innerWidth < 640) {
      sliceRight.current = 1;
    } else if (window.innerWidth >= 640 && window.innerWidth < 1200) {
      sliceRight.current = 2;
    } else if (window.innerWidth >= 1200) {
      sliceRight.current = 3;
    }

    setVisibleReviews(reviews.slice(sliceLeft.current, sliceRight.current));
  }, [reviews]);

  useEffect(() => {
    let resizeListener = () => {
      sliceLeft.current = 0

      if (window.innerWidth >= 0 && window.innerWidth < 640) {
        sliceRight.current = 1;
      } else if (window.innerWidth >= 640 && window.innerWidth < 1200) {
        sliceRight.current = 2;
      } else if (window.innerWidth >= 1200) {
        sliceRight.current = 3;
      }

      setVisibleReviews(reviews.slice(sliceLeft.current, sliceRight.current));
    }

    window.addEventListener('resize', resizeListener);
    return () => window.removeEventListener('resize', resizeListener);
  }, []);

  function handlePrevClick() {
    let currentRange = sliceRight.current - sliceLeft.current;

    sliceLeft.current = Math.max(0, sliceLeft.current - currentRange);
    sliceRight.current = Math.max(currentRange, sliceRight.current - currentRange);
    setVisibleReviews(reviews.slice(sliceLeft.current, sliceRight.current));
  }

  function handleNextClick() {
    let currentRange = sliceRight.current - sliceLeft.current;

    if( sliceLeft.current + currentRange >= reviews.length ) return;

    sliceLeft.current = sliceLeft.current + currentRange;
    sliceRight.current = sliceRight.current + currentRange;

    setVisibleReviews(reviews.slice(sliceLeft.current, sliceRight.current));
  }

  let averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  return (
    <div className="text-white relative">
      <h1 className='text-2xl mb-2 font-bold text-center'>Customer reviews</h1>
      
      <div className='flex justify-center items-center gap-2 mb-5'>
        <div className='flex gap-1'>
          {Array.from({ length: Math.floor(averageRating) }, (_, index) => (
            <img key={index} src={pathToIcon || Star} alt="star" className='max-w-[30px]' />
          ))}
        </div>
        <span>{averageRating.toFixed(1)}</span>
      </div>
      <TransitionGroup className={`flex gap-3 w-full justify-center items-center ${classNameContainer}`}>
        {visibleReviews.map((review: Review) => (
          <CSSTransition key={review.id} timeout={700} classNames="review">
            {_ReviewComponent ? (
              <_ReviewComponent review={review} />
            ) : (
              <ReviewComponent review={review} pathToIcon={pathToIcon} className={className} />
            )}
          </CSSTransition>
        ))}
      </TransitionGroup>
      <div className='text-center mt-3'>
        <button
          className=" text-white font-bold rounded mr-3 bg-blue-300 p-3"
          onClick={handlePrevClick}
        >
          <img src={Left} alt="left" className='max-w-[30px]'/>
        </button>
        <button
          className=" text-white font-bold rounded bg-blue-300 p-3"
          onClick={handleNextClick}
        >
          <img src={Right} alt="right" className='max-w-[30px]'/>
        </button>
      </div>
    </div>
  );
};