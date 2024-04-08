import React from 'react';
import type { Review } from '../types';
import '../main.css';
export interface ReviewsComponentProps {
    reviews: Review[];
    pathToIcon?: string;
    className?: string;
    classNameContainer?: string;
    _ReviewComponent?: React.FC<{
        review: Review;
    }>;
}
export declare const Reviews: React.FC<ReviewsComponentProps>;
