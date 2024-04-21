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
  classNameReview = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showNewReviewForm, setShowNewReviewForm] = useState(false);
  const [visibleReviews, setVisibleReviews] = useState<Review[]>([]);
  const [direction, setDirection] = useState<'left' | 'right'>('right');

  const updateVisibleReviews = (containerWidth: number) => {
    const sliceRight = containerWidth < 640 ? 1 : containerWidth < 1200 ? 2 : 3;
    setVisibleReviews(reviews.slice(0, sliceRight));
  };

  useEffect(() => {
    const containerWidth = containerRef.current?.getBoundingClientRect().width || 0;
    updateVisibleReviews(containerWidth);

    const handleResize = () => {
      const containerWidth = containerRef.current?.getBoundingClientRect().width || 0;
      updateVisibleReviews(containerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [reviews]);

  const handleNavigate = (direction: 'left' | 'right') => {
    if (reviews.length === 0) return;

    const currentIndex = reviews.findIndex((review) => review.id === visibleReviews[0].id);
    const newIndex =
      direction === 'left'
        ? Math.max(0, currentIndex - visibleReviews.length)
        : Math.min(reviews.length - visibleReviews.length, currentIndex + visibleReviews.length);
    setVisibleReviews(reviews.slice(newIndex, newIndex + visibleReviews.length));
    setDirection(direction);
  };

  const averageRating = reviews.length ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length : 0;

  return (
    <div ref={containerRef} className={`text-white relative w-full ml-auto mr-auto ${classNameContainer}`}>
      <h1 className="text-2xl mb-2 font-bold text-center">Customer reviews</h1>

      {reviews.length > 0 && (
        <>
          <div className="flex justify-center items-center gap-2 mb-5">
            <div className="flex gap-1">
              {[...Array(Math.floor(averageRating))].map((_, index) => (
                <img key={index} src={pathToIcon || Star} alt="star" className="max-w-[30px]" />
              ))}
            </div>
            <span>{averageRating.toFixed(1)}</span>
          </div>

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

          <div className="mt-3 flex justify-center">
            <button
              className="reviews-btn text-white font-bold rounded mr-3 bg-main-light p-3"
              onClick={() => handleNavigate('left')}
              disabled={reviews.length === 0 || visibleReviews[0]?.id === reviews[0]?.id}
            >
              <img src={Left} alt="left" className="max-w-[30px] w-[30px]" />
            </button>
            <button
              className="reviews-btn text-white font-bold rounded bg-main-light p-3"
              onClick={() => handleNavigate('right')}
              disabled={reviews.length === 0 || visibleReviews[visibleReviews.length - 1]?.id === reviews[reviews.length - 1]?.id}
            >
              <img src={Right} alt="right" className="max-w-[30px] w-[30px]" />
            </button>
          </div>
        </>
      )}

      {reviews.length === 0 && <p className="text-center text-xl">No reviews yet.</p>}

      {onSubmit && (
        <button
          className="text-white font-bold rounded bg-main-light p-3 mt-3 mx-auto block"
          onClick={() => setShowNewReviewForm(!showNewReviewForm)}
        >
          {showNewReviewForm ? 'Close' : 'Add Review'}
        </button>
      )}

      {showNewReviewForm && onSubmit && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50">
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50" onClick={() => setShowNewReviewForm(false)} />
          <ReviewForm
            onSubmit={(review) => {
              onSubmit(review);
              closeAfterSubmit && setShowNewReviewForm(false);
            }}
            className="bg-slate-900 relative z-10 p-3 max-w-[500px] w-full"
          />
        </div>
      )}
    </div>
  );
};