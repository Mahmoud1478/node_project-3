import { Product } from '../products/types';

export type Order = {
    id: number;
    status: 'closed' | 'current';
    prducts: Product[];
};
