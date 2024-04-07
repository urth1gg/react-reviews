import { FC } from 'react';
import type { Review } from '../types/Review';
type ReviewComponentProps = {
    review: Review;
    pathToIcon?: string;
    className?: string;
};
declare const ReviewComponent: FC<ReviewComponentProps>;
export default ReviewComponent;
