import {Share} from "./Share";
import {TransactionTypes} from "./TransactionTypes";
import Settlement from "./Settlement";

export interface Expense {
    readonly id: string;
    category: string;
    subCategory?: string;
    name: string;
    amount: number;
    type: TransactionTypes.Expense;
    date: Date;
    description?: string;
    accountType: string;
    split: boolean;
    shares: Share[];
    settlements:Settlement[];
    readonly createdAt: Date;
}