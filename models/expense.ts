import {Category} from '@/models/category';

export interface Expense {
    id: number;
    amount: number;
    name: string;
    date: string;
    category: Category;
}
