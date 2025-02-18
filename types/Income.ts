import {TransactionTypes} from "./TransactionTypes";

export interface Income {
    id: string;
    category: object;
    subCategory: object;
    name: string;
    amount: number;
    type: "income";
    date: Date;
    description: string;
    account: string;
    createdAt: Date;
}