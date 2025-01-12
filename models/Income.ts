// src/models/IncomeTransaction.ts

import Transaction from './Transaction';
import AccountTypes from "../types/AccountTypes";
import TransactionTypes from "../types/TransactionTypes";
import Share from "./Share";

class Income extends Transaction {
    static allIncomes: Income[] = [];

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
        super(name, amount, TransactionTypes.Income, date, category, description, subCategory);
        this.accountType = accountType;
        this.splitPayment = splitPayment;
        this.shares = shares;

        Income.allIncomes.push(this);
    }

    // Static method to calculate the total income
    static getTotalIncome(): number {
        return Income.allIncomes.reduce((total, income) => total + income.amount, 0);
    }
}

export default Income;