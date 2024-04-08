import React from 'react';
import type { Review } from '../types/Review';
import { Stars } from './Stars';
type ReviewComponentProps = {
    review: Review;
    pathToIcon?: string;
    className?: string;
};
declare const ReviewComponent: React.FC<ReviewComponentProps>;
export default ReviewComponent;
export { Stars };
