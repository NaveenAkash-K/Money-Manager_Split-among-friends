import Transaction from './Transaction';
import AccountTypes from "../types/AccountTypes";
import DebtTypes from "../types/DebtTypes";
import TransactionTypes from "../types/TransactionTypes";
import Friend from "./Friend";
import Settlement from "../types/Settlement";

class Debt extends Transaction {
    static allDebts: Debt[] = [];
    debtType: DebtTypes;
    accountType?: AccountTypes;
    debtPerson: Friend;
    applyToBalance: boolean;
    settled: boolean = false;
    settlements: Settlement[] = [];

    constructor(
        name: string,
        amount: number,
        date: Date,
        debtType: DebtTypes,
        debtPerson: Friend,
        applyToBalance: boolean,
        settled: boolean = false,
        accountType?: AccountTypes,
        description?: string,
    ) {
        super(name, amount, TransactionTypes.Debt, date, undefined, description);
        this.debtType = debtType;
        this.accountType = accountType;
        this.debtPerson = debtPerson;
        this.applyToBalance = applyToBalance;
        this.settled = settled;

        Debt.allDebts.push(this);
    }

    public addSettlement = (settlement: Settlement) => {
        this.settlements = [...this.settlements, settlement];
    }

    static getTotalAmountToBePayed = () => {

    }

    static getTotalAmountToGetPayed = () => {

    }

}

export default Debt;