import {Share} from "./Share";

export interface Expense {
    id: string;
    category: object;
    subCategory: object;
    name: string;
    amount: number;
    type: "expense";
    date: Date;
    description: string;
    accountType: string;
    split: boolean;
    shares: Share[];
    createdAt: Date;
}