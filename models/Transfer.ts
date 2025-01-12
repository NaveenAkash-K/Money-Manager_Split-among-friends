// src/models/TransferTransaction.ts

import Transaction from './Transaction';
import AccountTypes from "../types/AccountTypes";
import TransactionTypes from "../types/TransactionTypes";

class Transfer extends Transaction {
    static allTransfers:Transfer[] = [];
    fromAccount: AccountTypes;
    toAccount: AccountTypes;

    constructor(
        name: string,
        amount: number,
        date: Date,
        fromAccount: AccountTypes,
        toAccount: AccountTypes,
        description?: string,
    ) {
        super(name, amount, TransactionTypes.Transfer, date, description);
        this.fromAccount = fromAccount;
        this.toAccount = toAccount;
        this.description = description;
        Transfer.allTransfers.push(this);
    }
}

export default Transfer
