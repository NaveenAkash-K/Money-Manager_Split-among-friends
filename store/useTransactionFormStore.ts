import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import Income from "../models/Income";
import Transaction from "../models/Transaction";
import AccountTypes from "../types/AccountTypes";
import Share from "../models/Share";
import Friend from "../models/Friend";
import DebtTypes from "../types/DebtTypes";

interface TransactionFormState {
    //Income and Expense
    name?: string;
    category?: string;
    subCategory?: string
    amount?: number;
    accountType?: AccountTypes;
    description?: string;
    splitPayment?: boolean;
    shares?: Share[];
    date: Date;
    time: Date;

    //Debt
    to?: Friend;
    debtType?: DebtTypes;

    //Transfer
    fromAccount?: AccountTypes;
    toAccount?: AccountTypes;

    //Functions
    setValue: (payload: { field: string, value: any }) => void;
    clearForm: () => void;
}

const useTransactionFormStore = create<TransactionFormState>()(
    //Properties
    (set) => ({
        splitPayment: false,
        date: new Date(),
        time: new Date(),

        setValue: (payload: { field: string, value: any }) =>
            set((state) => ({
                ...state,
                [payload.field]: payload.value,
            })),

        clearForm: () =>
            set(() => ({
                name: undefined,
                category: undefined,
                subCategory: undefined,
                amount: undefined,
                accountType: undefined,
                description: undefined,
                splitPayment: false,
                shares: undefined,
                to: undefined,
                debtType: undefined,
                fromAccount: undefined,
                toAccount: undefined,
                date: new Date(),
                time: new Date(),
            })),

    }),
)


export default useTransactionFormStore;
