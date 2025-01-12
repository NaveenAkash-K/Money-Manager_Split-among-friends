// src/models/ExpenseTransaction.ts

import Transaction from './Transaction';
import AccountTypes from "../types/AccountTypes";
import TransactionTypes from "../types/TransactionTypes";
import Share from "./Share";

class Expense extends Transaction {
    static allExpenses: Expense[] = [];

    accountType: AccountTypes;
    splitPayment: boolean;
    shares: Share[];

    constructor(
        name: string,
        amount: number,
        accountType: AccountTypes,
        category: string,
        date: Date,
        description?: string,
        subCategory?: string,
        splitPayment: boolean = false,
        shares: Share[] = [],
    ) {
        super(name, amount, TransactionTypes.Expense, date, category, description, subCategory);
        this.accountType = accountType;
        this.splitPayment = splitPayment;
        this.shares = shares;

        Expense.allExpenses.push(this);
    }

    static getTotalExpense(): number {
        return this.allExpenses.reduce((total, expense) => total + expense.amount, 0);
    }
}

export default Expense