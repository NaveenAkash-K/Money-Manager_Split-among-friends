import {create} from 'zustand';
import AccountTypes from "../types/AccountTypes";
import Share from "../models/Share";
import Friend from "../models/Friend";
import DebtTypes from "../types/DebtTypes";
import TransactionTypes from "../types/TransactionTypes";

interface TransactionFormState {
    selectedTransactionType: TransactionTypes;

    //Income and Expense
    name?: string;
    category?: string;
    subCategory?: string;
    amount?: string;
    accountType?: AccountTypes;
    description?: string;
    splitPayment?: boolean;
    shares?: Share[];
    date: Date;

    //Debt
    debtPerson?: Friend;
    debtType?: DebtTypes;
    applyToBalance: boolean;

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
        selectedTransactionType: TransactionTypes.Expense,
        applyToBalance: false,

        setValue: (payload: { field: string, value: any }) =>
            set((state) => ({
                ...state,
                [payload.field]: payload.value,
            })),

        clearForm: () =>
            set(() => ({
                selectedTransactionType: TransactionTypes.Expense,
                name: undefined,
                category: undefined,
                subCategory: undefined,
                amount: undefined,
                accountType: undefined,
                description: undefined,
                splitPayment: false,
                shares: undefined,
                debtPerson: undefined,
                debtType: undefined,
                fromAccount: undefined,
                toAccount: undefined,
                date: new Date(),
                applyToBalance: false
            })),

    }),
)


export default useTransactionFormStore;
