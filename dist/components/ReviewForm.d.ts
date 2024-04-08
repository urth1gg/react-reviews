import React from "react";
import { Review } from "../types";
export interface ReviewFormComponentProps {
    onSubmit: (review: Review) => void;
}
export declare const ReviewForm: React.FC<ReviewFormComponentProps>;
