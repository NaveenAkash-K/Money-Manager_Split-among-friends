import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import Transaction from "../models/Transaction";
import secureStorage from "../secureStorage";
import Expense from "../models/Expense";
// import transactionsStoreSerializer from "../utils/transactionsStoreSerializer";
import AccountTypes from "../types/AccountTypes";
import Income from "../models/Income";
import Debt from "../models/Debt";
import DebtTypes from "../types/DebtTypes";
import Friend from "../models/Friend";
import Transfer from "../models/Transfer";
import TransactionTypes from "../types/TransactionTypes";
import Share from "../models/Share";
import transactionsStoreSerializer from "../utils/transactionsStoreSerializer";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface TransactionState {
    transactions: Transaction[];
    addTransaction: (transaction: any) => void;
    removeTransaction: (transactionId: string) => void;
    getTotalIncome: () => number;
    getTotalExpense: () => number;
}

const useTransactionsStore = create<TransactionState>()(
    persist(
        (set, get) => ({
            transactions: [],

            // Add Transaction
            addTransaction: (transaction) =>
                set((state) => ({
                    transactions: [...state.transactions, transaction],
                })),
            removeTransaction: (transactionId) =>
                set((state) => ({
                    transactions: state.transactions.filter(
                        (transaction) => transaction.id !== transactionId
                    ),
                })),
            getTotalIncome: () => {
                return get()
                    .transactions.filter((transaction) => transaction.type === TransactionTypes.Income)
                    .reduce((sum, income) => sum + income.amount, 0);
            },
            getTotalExpense: () => {
                return get()
                    .transactions.filter((transaction) => transaction.type === TransactionTypes.Expense)
                    .reduce((sum, expense) => sum + expense.amount, 0);
            },
        }),
        {
            name: "transactionsStore",
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);

export default useTransactionsStore;