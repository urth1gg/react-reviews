import React from 'react';
type StarsComponentProps = {
    initialRating?: number;
    pathToIcon?: string;
    pathToEmptyIcon?: string;
    maxStars?: number;
    showEmptyStars?: boolean;
    onStarClick?: (rating: number) => void;
};
export declare const Stars: React.FC<StarsComponentProps>;
export {};
