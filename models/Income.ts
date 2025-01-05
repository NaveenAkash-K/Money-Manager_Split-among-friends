// src/models/IncomeTransaction.ts

import Transaction from './Transaction';
import AccountTypes from "../types/AccountTypes";
import TransactionTypes from "../types/TransactionTypes";
import Share from "./Share";

class Income extends Transaction {
    accountType: AccountTypes;
    splitPayment: boolean;
    shares: Share[];

    constructor(
        category: string,
        name: string,
        amount: number,
        accountType: AccountTypes,
        description?: string,
        subCategory?: string,
        splitPayment: boolean = false,
        shares: Share[] = [],
    ) {
        super(category, name, amount, TransactionTypes.Income, description, subCategory);
        this.accountType = accountType;
        this.splitPayment = splitPayment;
        this.shares = shares;

    }

    summary(): string {
        return `
      Transaction: ${this.name} (Income)
      Amount: ₹${this.amount}
      Category: ${this.category}${this.subCategory ? ` > ${this.subCategory}` : ''}
      Account Type: ${this.accountType}
      Description: ${this.description || 'N/A'}
      Created At: ${this.createdAt}
    `;
    }
}

export default Income;