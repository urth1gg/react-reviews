import React from 'react';
import type { Review } from '../types';
import '../main.css';
export interface ReviewsComponentProps {
    reviews: Review[];
    pathToIcon?: string;
    className?: string;
}
export declare const Reviews: React.FC<ReviewsComponentProps>;
