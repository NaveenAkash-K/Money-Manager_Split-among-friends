import Transaction from './Transaction';
import AccountTypes from "../types/AccountTypes";
import DebtTypes from "../types/DebtTypes";
import TransactionTypes from "../types/TransactionTypes";
import Friend from "./Friend";

class Debt extends Transaction {
    static allDebts: Debt[] = [];
    debtType: DebtTypes;
    accountType: AccountTypes;
    debtPerson: Friend;

    constructor(
        name: string,
        amount: number,
        accountType: AccountTypes,
        date: Date,
        debtType: DebtTypes,
        debtPerson: Friend,
        description?: string,
    ) {
        super(name, amount, TransactionTypes.Debt, date, undefined, description);
        this.debtType = debtType;
        this.accountType = accountType;
        this.debtPerson = debtPerson;

        Debt.allDebts.push(this);
    }

    static getTotalAmountToBePayed = () => {

    }

    static getTotalAmountToGetPayed = () => {

    }

}

export default Debt;