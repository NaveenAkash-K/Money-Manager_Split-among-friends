import TransactionTypes from "../types/TransactionTypes";
import uuid from "react-native-uuid";

class Transaction {
    static allTransactions: Transaction[] = [];

    id: string;
    category?: string;
    subCategory?: string;
    name: string;
    amount: number;
    date: Date;
    description?: string;
    type: TransactionTypes;
    createdAt: Date;

    constructor(
        name: string,
        amount: number,
        type: TransactionTypes,
        date: Date,
        category?: string,
        description?: string,
        subCategory?: string
    ) {
        this.category = category;
        this.subCategory = subCategory;
        this.name = name;
        this.amount = amount;
        this.date = date;
        this.type = type;
        this.description = description;
        this.createdAt = new Date();
        this.id = this.getId(type);
        Transaction.allTransactions.push(this);
    }

    private getId(type: TransactionTypes): string {
        if (type === TransactionTypes.Debt) return "debt_" + uuid.v4()
        else if (type === TransactionTypes.Income) return "income_" + uuid.v4()
        else if (type === TransactionTypes.Expense) return "expense_" + uuid.v4()
        else return "transfer_" + uuid.v4()
    }

}

export default Transaction;
