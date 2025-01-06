import Transaction from './Transaction';
import AccountTypes from "../types/AccountTypes";
import DebtTypes from "../types/DebtTypes";
import TransactionTypes from "../types/TransactionTypes";
import Friend from "./Friend";

class Debt extends Transaction {
    debtType: DebtTypes;
    accountType: AccountTypes;
    to: Friend;

    constructor(
        category: string,
        name: string,
        amount: number,
        accountType: AccountTypes,
        debtType: DebtTypes,
        to: Friend,
        description?: string,
        subCategory?: string
    ) {
        super(category, name, amount, TransactionTypes.Debt, description, subCategory);
        this.debtType = debtType;
        this.accountType = accountType;
        this.to = to;
    }

    summary(): string {
        const debtStatus = this.debtType === DebtTypes.Owe ? 'I owe' : 'Someone owes me';
        return `
      Transaction: ${this.name} (Debt)
      Amount: ₹${this.amount}
      Debt Status: ${debtStatus}
      Category: ${this.category}${this.subCategory ? ` > ${this.subCategory}` : ''}
      Description: ${this.description || 'N/A'}
      Created At: ${this.createdAt}
    `;
    }
}

export default Debt;