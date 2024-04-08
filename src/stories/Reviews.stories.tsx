import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Reviews } from '../components/Reviews';
import '../assets/output.css';
import { Review } from '../types';
import { Stars } from '../components/Review';

let reviewsData = [
  {
    id: 1,
    author: 'John Doe',
    comment: 'This is a great product!',
    rating: 4,
    date: '2021-01-01',
  },
  {
    id: 2,
    author: 'Jane Smith',
    comment: 'I highly recommend this product.',
    rating: 5,
    date: '2021-01-02',
  },
  {
    id: 3,
    author: 'John Doe',
    comment: 'This is a great product!',
    rating: 4,
    date: '2021-01-01',
  },
  {
    id: 4,
    author: 'Jane Smith',
    comment: 'I highly recommend this product.',
    rating: 5,
    date: '2021-01-02',
  },
  {
    id: 5,
    author: 'John Doe',
    comment: 'This is a great product!',
    rating: 4,
    date: '2021-01-01',
  }
];

const meta = {
  title: 'Example/Reviews',
  component: Reviews,
} satisfies Meta<typeof Reviews>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    pathToIcon: "/assets/star.svg",
    reviews: reviewsData
  },
};

export const withPathToIcon: Story = {
  args: {
    pathToIcon: 'https://cdn-icons-png.flaticon.com/512/616/616490.png',
    reviews: reviewsData
  },
};

const ReviewComponent = ({ review } : { review: Review}) => {
  return (
    <div className="text-white bg-main-light p-3">
      <h3>{review.author}</h3>
      <Stars initialRating={review.rating} />
      <p>{review.comment}</p>
      <p>{review.date}</p>
    </div>
  );
}
export const withBackground: Story = {
  args: {
    classNameReview: 'bg-red-500',
    reviews: reviewsData
  },
};

export const withComponent: Story = {
  args: {
    _ReviewComponent: ReviewComponent,
    reviews: [
      {
        id: 1,
        author: 'John Doe',
        comment: 'This is a great product!',
        rating: 4,
        date: '2021-01-01',
      },
      {
        id: 2,
        author: 'Jane Smith',
        comment: 'I highly recommend this product.',
        rating: 5,
        date: '2021-01-02',
      },
      {
        id: 3,
        author: 'John Doe',
        comment: 'This is a great product!',
        rating: 4,
        date: '2021-01-01',
      },
      {
        id: 4,
        author: 'Jane Smith',
        comment: 'I highly recommend this product.',
        rating: 5,
        date: '2021-01-02',
      },
    ],
  },
};

export const withSubmit: Story = {
  args: {
    onSubmit: (review: Review) => console.log(review),
    reviews: reviewsData
  },
};

export const withNoReviews: Story = {
  args: {
    onSubmit: f => f,
    reviews: []
  }
}