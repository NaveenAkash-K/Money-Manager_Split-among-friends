// src/models/TransferTransaction.ts

import Transaction from './Transaction';
import AccountTypes from "../types/AccountTypes";
import TransactionTypes from "../types/TransactionTypes";

class Transfer extends Transaction {
    fromAccount: AccountTypes;
    toAccount: AccountTypes;

    constructor(
        category: string,
        name: string,
        amount: number,
        fromAccount: AccountTypes,
        toAccount: AccountTypes,
        description?: string,
        subCategory?: string
    ) {
        super(category, name, amount, TransactionTypes.Transfer, description, subCategory);
        this.fromAccount = fromAccount;
        this.toAccount = toAccount;
    }

    summary(): string {
        return `
      Transaction: ${this.name} (Transfer)
      Amount: ₹${this.amount}
      Category: ${this.category}${this.subCategory ? ` > ${this.subCategory}` : ''}
      From Account: ${this.fromAccount}
      To Account: ${this.toAccount}
      Description: ${this.description || 'N/A'}
      Created At: ${this.createdAt}
    `;
    }
}

export default Transfer
