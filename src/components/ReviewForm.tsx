import React, { useState } from "react";
import { Review } from "../types";
import { Stars } from "./Stars";

export interface ReviewFormComponentProps {
    onSubmit: (review: Review) => void;
    className?: string;
}

export const ReviewForm: React.FC<ReviewFormComponentProps> = ({ onSubmit, className }) => {
    const [author, setAuthor] = useState<string>("");
    const [rating, setRating] = useState<number>(0);
    const [comment, setComment] = useState<string>("");
    const [images, setImages] = useState<File[]>([]);
    function onStarClick(selectedRating: number) {
        setRating(selectedRating);
        console.log(selectedRating);
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        onSubmit({
            author,
            rating,
            comment,
            date: new Date().toISOString(),
            images,
        });
        setAuthor("");
        setRating(0);
        setComment("");
    }

    return (
        <form onSubmit={handleSubmit} className={`max-w-md mx-auto ${className}`}>
            <div className="mb-4">
                <label htmlFor="rating" className="block text-white font-bold mb-2">
                    Rating
                </label>
                <Stars initialRating={3} maxStars={5} showEmptyStars={true} onStarClick={onStarClick} />
            </div>
            <div className="mb-4">
                <label htmlFor="author" className="block text-white font-bold mb-2">
                    Author
                </label>
                <input
                    type="text"
                    id="author"
                    value={author}
                    onChange={(event) => setAuthor(event.target.value)}
                    className="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-white bg-slate-800"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="comment" className="block text-white font-bold mb-2">
                    Comment
                </label>
                <textarea
                    id="comment"
                    value={comment}
                    onChange={(event) => setComment(event.target.value)}
                    className="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-white bg-slate-800"
                    required
                ></textarea>
            </div>
            <div className="mb-4">
                <label htmlFor="comment" className="block text-white font-bold mb-2">
                    Images
                </label>
                <input
                    type="file"
                    id="images"
                    className="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-main-light file:text-white file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-white bg-slate-800"
                    multiple
                    onChange={(event) => {
                        if (event.target.files) {
                            setImages(Array.from(event.target.files));
                            console.log(Array.from(event.target.files));
                        }
                    }}
                />
            </div>
            <button
                type="submit"
                className="w-[250px] px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
                Submit
            </button>
        </form>
    );
};
