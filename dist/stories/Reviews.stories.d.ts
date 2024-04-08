import React from 'react';
import type { StoryObj } from '@storybook/react';
import '../output.css';
declare const meta: {
    title: string;
    component: React.FC<import("../components/Reviews").ReviewsComponentProps>;
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const withPathToIcon: Story;
export declare const withBackground: Story;
export declare const withComponent: Story;
export declare const withSubmit: Story;
