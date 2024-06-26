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
  },
  {
    id: 5,
    author: 'Long Comment',
    comment: "It is a great shirt, and the print quality was almost perfect (I am not sure if this is a result of the printing, but the edges were slightly soft in one direction, making me think the back-and-forth printing started and stopped in a certain direction.).The shirt feels slightly tighter than other shirts of the same size. I think the Bella + Canvas 3001 is very true to size but leaning towards smaller. Washing might shrink things up slightly, which makes it feel a tad tighter. If you want a good fitted feel but not super tight, I might suggest going up in size.It is a great shirt, and the print quality was almost perfect (I am not sure if this is a result of the printing, but the edges were slightly soft in one direction, making me think the back-and-forth printing started and stopped in a certain direction.).The shirt feels slightly tighter than other shirts of the same size. I think the Bella + Canvas 3001 is very true to size but leaning towards smaller. Washing might shrink things up slightly, which makes it feel a tad tighter. If you want a good fitted feel but not super tight, I might suggest going up in size.",
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

const ReviewComponent = ({ review }: { review: Review }) => {
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
      {
        id: 5,
        author: 'Long Comment',
        comment: "It is a great shirt, and the print quality was almost perfect (I am not sure if this is a result of the printing, but the edges were slightly soft in one direction, making me think the back-and-forth printing started and stopped in a certain direction.).The shirt feels slightly tighter than other shirts of the same size. I think the Bella + Canvas 3001 is very true to size but leaning towards smaller. Washing might shrink things up slightly, which makes it feel a tad tighter. If you want a good fitted feel but not super tight, I might suggest going up in size.",
        rating: 4,
        date: '2021-01-01',
      }
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

let images = [
  'https://cdn-icons-png.flaticon.com/512/616/616490.png', 'https://cdn-icons-png.flaticon.com/512/616/616490.png', 'https://cdn-icons-png.flaticon.com/512/616/616490.png',
  'https://cdn-icons-png.flaticon.com/512/616/616490.png', 'https://cdn-icons-png.flaticon.com/512/616/616490.png', 'https://cdn-icons-png.flaticon.com/512/616/616490.png', 'https://cdn-icons-png.flaticon.com/512/616/616490.png', 'https://cdn-icons-png.flaticon.com/512/616/616490.png',
  'https://cdn-icons-png.flaticon.com/512/616/616490.png', 'https://cdn-icons-png.flaticon.com/512/616/616490.png'
]
export const withImages: Story = {
  args: {
    reviews: [
      {
        id: 1,
        author: 'John Doe',
        comment: 'This is a great product!',
        rating: 4,
        date: '2021-01-01',
        images: images.slice(0, 3)
      },
      {
        id: 2,
        author: 'John Doe',
        comment: 'This is a great product!',
        rating: 4,
        date: '2021-01-01',
        images: images.slice(0, 5)
      },
      {
        id: 2,
        author: 'John Doe',
        comment: "It is a great shirt, and the print quality was almost perfect (I am not sure if this is a result of the printing, but the edges were slightly soft in one direction, making me think the back-and-forth printing started and stopped in a certain direction.).The shirt feels slightly tighter than other shirts of the same size. I think the Bella + Canvas 3001 is very true to size but leaning towards smaller. Washing might shrink things up slightly, which makes it feel a tad tighter. If you want a good fitted feel but not super tight, I might suggest going up in size.",
        rating: 4,
        date: '2021-01-01',
        productName: 'Bella + Canvas 3001',
        images: images.slice(0, 5)
      }
    ]
  }
}

export const withContainerWidth: Story = {
  args: {
    reviews: reviewsData,
    classNameContainer: 'w-[663px]'
  }
}
