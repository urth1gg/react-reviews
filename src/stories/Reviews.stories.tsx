import type { Meta, StoryObj } from '@storybook/react';
import { Reviews } from '../components/Reviews';
import '../output.css';

const meta = {
  title: 'Example/Reviews',
  component: Reviews,
} satisfies Meta<typeof Reviews>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
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