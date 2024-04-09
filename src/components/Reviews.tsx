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

  let sliceLeft = useRef(0);
  let sliceRight = useRef(3);
  let [showNewReviewForm, setShowNewReviewForm] = useState(false);

  const [visibleReviews, setVisibleReviews] = useState<Review[]>([]);

  useEffect(() => {
    sliceLeft.current = 0;
    const containerWidth = containerRef.current?.getBoundingClientRect().width || 0;

    if (containerWidth >= 0 && containerWidth < 640) {
      sliceRight.current = 1;
    } else if (containerWidth >= 640 && containerWidth < 1200) {
      sliceRight.current = 2;
    } else if (containerWidth >= 1200) {
      sliceRight.current = 3;
    }

    setVisibleReviews(reviews.slice(sliceLeft.current, sliceRight.current));
  }, [reviews]);

  useEffect(() => {
    const resizeListener = () => {
      sliceLeft.current = 0;
      const containerWidth = containerRef.current?.getBoundingClientRect().width || 0;

      if (containerWidth >= 0 && containerWidth < 640) {
        sliceRight.current = 1;
      } else if (containerWidth >= 640 && containerWidth < 1200) {
        sliceRight.current = 2;
      } else if (containerWidth >= 1200) {
        sliceRight.current = 3;
      }

      setVisibleReviews(reviews.slice(sliceLeft.current, sliceRight.current));
    };

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
    <div ref={containerRef} className={`text-white relative w-full ml-auto mr-auto ${classNameContainer ? classNameContainer : ''}`}>
      <h1 className='text-2xl mb-2 font-bold text-center'>Customer reviews</h1>

      {reviews.length !== 0 ? <div className='flex justify-center items-center gap-2 mb-5'>
        <div className='flex gap-1'>
          {Array.from({ length: Math.floor(averageRating) }, (_, index) => (
            <img key={index} src={pathToIcon || Star} alt="star" className='max-w-[30px]' />
          ))}
        </div>
        <span>{averageRating.toFixed(1)}</span>
      </div> : <></>}
      {reviews.length !== 0 ?
        <TransitionGroup className={`flex gap-3 w-full justify-center items-center min-h-[350px] ${classNameReviewsContainer ? classNameReviewsContainer : ''}`}>
          {visibleReviews.map((review: Review) => (
            <CSSTransition key={review.id} timeout={700} classNames="review">
              {_ReviewComponent ? (
                <_ReviewComponent review={review} />
              ) : (
                <ReviewComponent review={review} pathToIcon={pathToIcon} className={classNameReview} />
              )}
            </CSSTransition>
          ))}
        </TransitionGroup> :
        <div className='flex justify-center items-center w-full h-full'>
          <h1 className='text-2xl'>No reviews yet.</h1>
        </div>
      }

      <div className='mt-3 flex justify-center'>
        {reviews.length !== 0 ? <>
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
        </> : <></>}
        {onSubmit ? (
          <button
            className="text-white font-bold rounded bg-main-light p-3 ml-3 mt-0"
            onClick={() => setShowNewReviewForm(!showNewReviewForm)}
          >
            {showNewReviewForm ? 'Close' : 'Add Review'}
          </button>
        ) : null}
      </div>
      {
        (showNewReviewForm && onSubmit) ? <div className='top-0 left-0 w-full h-full fixed flex justify-center items-center z-[5]'>
          <div className='absolute top-0 left-0 w-full h-full bg-black opacity-50' onClick={() => setShowNewReviewForm(false)}></div>
          <ReviewForm onSubmit={(review: Review) => {
            if (onSubmit) {
              onSubmit(review);
              if (closeAfterSubmit) {
                setShowNewReviewForm(false);
              }
            }
          }} className='bg-slate-900 relative z-[5] p-3 max-w-[500px] w-full' />
        </div> : null
      }
    </div>
  );
};