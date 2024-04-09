type Review = {
    id?: number;
    author: string;
    rating: number;
    comment: string;
    date: string;
    productName?: string;
    images?: File[] | string[];
};
export type { Review };
