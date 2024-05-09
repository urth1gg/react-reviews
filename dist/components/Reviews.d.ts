import React from 'react';
import type { Review } from '../types';
export interface ReviewsComponentProps {
    reviews: Review[];
    pathToIcon?: string;
    classNameReview?: string;
    classNameContainer?: string;
    _ReviewComponent?: React.FC<{
        review: Review;
    }>;
    onSubmit?: (review: Review) => void;
    closeAfterSubmit?: boolean;
    classNameReviewsContainer?: string;
    noReviewsText?: string;
    sectionTitleText?: string;
    addReviewButtonText?: string;
    commentText?: string;
    ratingText?: string;
    authorText?: string;
    imagesText?: string;
    submitText?: string;
    onReadMoreClick?: (comment: string) => void;
}
export declare const Reviews: React.FC<ReviewsComponentProps>;
