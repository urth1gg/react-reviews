/// <reference types="react" />
import type { StoryObj } from '@storybook/react';
import '../output.css';
declare let meta: {
    title: string;
    component: import("react").FC<import("../components/ReviewForm").ReviewFormComponentProps>;
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
