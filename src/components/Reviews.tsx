import React, { useState, useEffect, useRef } from 'react';
import type { Review } from '../types';
import ReviewComponent from './Review';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Right from '../assets/right.svg';
import Left from '../assets/left.svg';
import Star from '../assets/star.svg';
import { ReviewForm } from './ReviewForm';

export interface ReviewsComponentProps {
  reviews: Review[];
  pathToIcon?: string;
  classNameReview?: string;
  classNameContainer?: string;
  _ReviewComponent?: React.FC<{ review: Review }>;
  onSubmit?: (review: Review) => void;
  closeAfterSubmit?: boolean;
}

export const Reviews: React.FC<ReviewsComponentProps> = ({ reviews, pathToIcon, classNameReview, _ReviewComponent, classNameContainer, onSubmit, closeAfterSubmit = true }) => {
  let sliceLeft = useRef(0);
  let sliceRight = useRef(3);
  let [showNewReviewForm, setShowNewReviewForm] = useState(false);

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

    if (sliceLeft.current + currentRange >= reviews.length) return;

    sliceLeft.current = sliceLeft.current + currentRange;
    sliceRight.current = sliceRight.current + currentRange;

    setVisibleReviews(reviews.slice(sliceLeft.current, sliceRight.current));
  }

  let averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  return (
    <div className="text-white relative w-full">
      <h1 className='text-2xl mb-2 font-bold text-center'>Customer reviews</h1>

      <div className='flex justify-center items-center gap-2 mb-5'>
        <div className='flex gap-1'>
          {Array.from({ length: Math.floor(averageRating) }, (_, index) => (
            <img key={index} src={pathToIcon || Star} alt="star" className='max-w-[30px]' />
          ))}
        </div>
        <span>{averageRating.toFixed(1)}</span>
      </div>
      <TransitionGroup className={`flex gap-3 w-full justify-center items-center min-h-[350px] ${classNameContainer ? classNameContainer : ''}`}>
        {visibleReviews.map((review: Review) => (
          <CSSTransition key={review.id} timeout={700} classNames="review">
            {_ReviewComponent ? (
              <_ReviewComponent review={review} />
            ) : (
              <ReviewComponent review={review} pathToIcon={pathToIcon} className={classNameReview} />
            )}
          </CSSTransition>
        ))}
      </TransitionGroup>
      <div className='mt-3 flex justify-center'>
        <button
          className="text-white font-bold rounded mr-3 bg-main-light p-3"
          onClick={handlePrevClick}
        >
          <img src={Left} alt="left" className='max-w-[30px] w-[30px]' />
        </button>
        <button
          className="text-white font-bold rounded bg-main-light p-3"
          onClick={handleNextClick}
        >
          <img src={Right} alt="right" className='max-w-[30px] w-[30px]' />
        </button>
        {onSubmit ? (
          <button
            className="text-white font-bold rounded bg-main-light p-3 ml-3 mt-0"
            onClick={() => setShowNewReviewForm(!showNewReviewForm)}
          >
            {showNewReviewForm ? 'Close' : 'Add Review'}
          </button>
        ) : null}
      </div>
      {(showNewReviewForm && onSubmit) ? <div className='top-0 left-0 w-full h-full fixed flex justify-center items-center'>
        <div className='bg-main-light p-5 rounded-md'></div>
        <div className='absolute top-0 left-0 w-full h-full bg-black opacity-50' onClick={() => setShowNewReviewForm(false)}></div>
        <ReviewForm onSubmit={(review: Review) => {
          if (onSubmit) {
            onSubmit(review);
            if (closeAfterSubmit) {
              setShowNewReviewForm(false);
            }
          }
        }} className='bg-slate-900 relative z-[5] p-3 max-w-[500px] w-full'/>
      </div> : null}
    </div>
  );
};