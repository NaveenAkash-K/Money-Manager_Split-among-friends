import TransactionTypes from "../types/TransactionTypes";
import uuid from "react-native-uuid";

class Transaction {
    id: string;
    category: string;
    subCategory?: string;
    name: string;
    amount: number;
    description?: string;
    type: TransactionTypes;
    createdAt: Date;

    constructor(
        category: string,
        name: string,
        amount: number,
        type: TransactionTypes,
        description?: string,
        subCategory?: string
    ) {
        this.category = category;
        this.subCategory = subCategory;
        this.name = name;
        this.amount = amount;
        this.type = type;
        this.description = description;
        this.createdAt = new Date();
        this.id = this.getId(type);
    }

    private getId(type: TransactionTypes): string {
        if (type === TransactionTypes.Debt) return "debt_" + uuid.v4()
        else if (type === TransactionTypes.Income) return "income_" + uuid.v4()
        else if (type === TransactionTypes.Expense) return "expense_" + uuid.v4()
        else return "transfer_" + uuid.v4()
    }

    summary(): string {
        return `
      Transaction: ${this.name}
      Amount: ₹${this.amount}
      Category: ${this.category}${this.subCategory ? ` > ${this.subCategory}` : ''}
      Transaction Type: ${this.type}
      Description: ${this.description || 'N/A'}
      Created At: ${this.createdAt}
    `;
    }
}

export default Transaction;
