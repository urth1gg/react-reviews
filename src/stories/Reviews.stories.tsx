import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Reviews } from '../components/Reviews';
import '../output.css';
import { Review } from '../types';
import { Stars } from '../components/Review';

const meta = {
  title: 'Example/Reviews',
  component: Reviews,
} satisfies Meta<typeof Reviews>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    pathToIcon: "/assets/star.svg",
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
      {
        id: 5,
        author: 'John Doe',
        comment: 'This is a great product!',
        rating: 4,
        date: '2021-01-01',
      }
    ],
  },
};

export const withPathToIcon: Story = {
  args: {
    pathToIcon: 'https://cdn-icons-png.flaticon.com/512/616/616490.png',
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
    className: 'bg-red-500',
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

export const withComponent: Story = {
  args: {
    _ReviewComponent: ReviewComponent,
    className: 'bg-red-500',
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