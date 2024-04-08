import type { Meta, StoryObj } from '@storybook/react';
import { ReviewForm } from '../components/ReviewForm';
import { Review } from '../types';
import '../assets/output.css';

let meta = {
    title: 'Example/ReviewForm2',
    component: ReviewForm,
} satisfies Meta<typeof ReviewForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        onSubmit: (review: Review) => {
            console.log(review);
        }
    }
};
