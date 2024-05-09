import React from 'react';
import type { Review } from '../types/Review';
import { Stars } from './Stars';
type ReviewComponentProps = {
    review: Review;
    pathToIcon?: string;
    className?: string;
    onReadMoreClick?: (comment: string) => void;
};
declare const ReviewComponent: React.FC<ReviewComponentProps>;
export default ReviewComponent;
export { Stars };
