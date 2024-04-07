/// <reference types="react" />
import type { StoryObj } from '@storybook/react';
import '../output.css';
declare const meta: {
    title: string;
    component: import("react").FC<import("../components/Reviews").ReviewsComponentProps>;
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const withPathToIcon: Story;
export declare const withBackground: Story;