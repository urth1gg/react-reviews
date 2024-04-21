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
  classNameReviewsContainer?: string;
}

export const Reviews: React.FC<ReviewsComponentProps> = ({
  reviews,
  pathToIcon,
  _ReviewComponent,
  onSubmit,
  closeAfterSubmit = true,
  classNameReviewsContainer = '',
  classNameContainer = '',
  classNameReview = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sliceLeft = useRef(0);
  const sliceRight = useRef(3);
  const [showNewReviewForm, setShowNewReviewForm] = useState(false);
  const [visibleReviews, setVisibleReviews] = useState<Review[]>([]);
  const [direction, setDirection] = useState<'left' | 'right'>('right');

  useEffect(() => {
    const updateVisibleReviews = () => {
      const containerWidth = containerRef.current?.getBoundingClientRect().width || 0;

      if (containerWidth < 640) {
        sliceRight.current = 1;
      } else if (containerWidth < 1200) {
        sliceRight.current = 2;
      } else {
        sliceRight.current = 3;
      }

      setVisibleReviews(reviews.slice(sliceLeft.current, sliceRight.current));
    };

    sliceLeft.current = 0;
    updateVisibleReviews();

    const resizeListener = () => {
      sliceLeft.current = 0;
      updateVisibleReviews();
    };

    window.addEventListener('resize', resizeListener);
    return () => window.removeEventListener('resize', resizeListener);
  }, [reviews]);

  const handlePrevClick = () => {
    const currentRange = sliceRight.current - sliceLeft.current;
    sliceLeft.current = Math.max(0, sliceLeft.current - currentRange);
    sliceRight.current = Math.max(currentRange, sliceRight.current - currentRange);
    setVisibleReviews(reviews.slice(sliceLeft.current, sliceRight.current));
    setDirection('left');
  };

  const handleNextClick = () => {
    const currentRange = sliceRight.current - sliceLeft.current;
    if (sliceLeft.current + currentRange >= reviews.length) return;
    sliceLeft.current += currentRange;
    sliceRight.current += currentRange;
    setVisibleReviews(reviews.slice(sliceLeft.current, sliceRight.current));
    setDirection('right');
  };

  const averageRating = reviews.length ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length : 0;

  return (
    <div ref={containerRef} className={`text-white relative w-full ml-auto mr-auto ${classNameContainer}`}>
      <h1 className="text-2xl mb-2 font-bold text-center">Customer reviews</h1>

      {reviews.length > 0 && (
        <div className="flex justify-center items-center gap-2 mb-5">
          <div className="flex gap-1">
            {[...Array(Math.floor(averageRating))].map((_, index) => (
              <img key={index} src={pathToIcon || Star} alt="star" className="max-w-[30px]" />
            ))}
          </div>
          <span>{averageRating.toFixed(1)}</span>
        </div>
      )}

      {reviews.length > 0 ? (
        <TransitionGroup
          className={`flex gap-3 w-full justify-center items-center min-h-[350px] ${classNameReviewsContainer}`}
          style={{
            '--enter-transform': direction === 'left' ? '-50%' : '50%',
            '--exit-transform': direction === 'left' ? '50%' : '-50%',
          } as React.CSSProperties}
        >
          {visibleReviews.map((review) => (
            <CSSTransition key={review.id} timeout={700} classNames="review">
              {_ReviewComponent ? (
                <_ReviewComponent review={review} />
              ) : (
                <ReviewComponent review={review} pathToIcon={pathToIcon} className={classNameReview} />
              )}
            </CSSTransition>
          ))}
        </TransitionGroup>
      ) : (
        <div className="flex justify-center items-center w-full h-full">
          <h1 className="text-2xl">No reviews yet.</h1>
        </div>
      )}

      <div className="mt-3 flex justify-center">
        {reviews.length > 0 && (
          <>
            <button className="text-white font-bold rounded mr-3 bg-main-light p-3" onClick={handlePrevClick}>
              <img src={Left} alt="left" className="max-w-[30px] w-[30px]" />
            </button>
            <button className="text-white font-bold rounded bg-main-light p-3" onClick={handleNextClick}>
              <img src={Right} alt="right" className="max-w-[30px] w-[30px]" />
            </button>
          </>
        )}
        {onSubmit && (
          <button
            className="text-white font-bold rounded bg-main-light p-3 ml-3 mt-0"
            onClick={() => setShowNewReviewForm(!showNewReviewForm)}
          >
            {showNewReviewForm ? 'Close' : 'Add Review'}
          </button>
        )}
      </div>

      {showNewReviewForm && onSubmit && (
        <div className="top-0 left-0 w-full h-full fixed flex justify-center items-center z-[5]">
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50" onClick={() => setShowNewReviewForm(false)}></div>
          <ReviewForm
            onSubmit={(review) => {
              onSubmit(review);
              if (closeAfterSubmit) {
                setShowNewReviewForm(false);
              }
            }}
            className="bg-slate-900 relative z-[5] p-3 max-w-[500px] w-full"
          />
        </div>
      )}
    </div>
  );
};