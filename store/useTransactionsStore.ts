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
    getTotalIncome: (transactionDate?: Date, accountType?: AccountTypes) => number;
    getTotalExpense: (transactionDate?: Date, accountType?: AccountTypes) => number;
    getTotalPayableDebt: (transactionDate?: Date, accountType?: AccountTypes) => number;
    getTotalReceivableDebt: (transactionDate?: Date, accountType?: AccountTypes) => number;
    getTotalBalanceAfterSettlement: (transactionDate?: Date) => number;
    getTotalBalance: (accountType: AccountTypes) => number;
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
            getTotalIncome: (transactionDate, accountType) => {
                const transactions = get().transactions;

                // Filter transactions based on date and account type
                const filteredTransactions = transactions.filter(transaction => {
                    const transactionDateObj = new Date(transaction.date);
                    const isDateMatch = transactionDate
                        ? transactionDateObj.toDateString() === new Date(transactionDate).toDateString()
                        : true;
                    const isAccountMatch = accountType
                        ? transaction.accountType === accountType
                        : true;
                    return isDateMatch && isAccountMatch;
                });

                return filteredTransactions
                    .filter((transaction) => transaction.type === TransactionTypes.Income)
                    .reduce((sum, income) => sum + income.amount, 0);
            },
            getTotalExpense: (transactionDate, accountType) => {
                const transactions = get().transactions;

                // Filter transactions based on date and account type
                const filteredTransactions = transactions.filter(transaction => {
                    const transactionDateObj = new Date(transaction.date);
                    const isDateMatch = transactionDate
                        ? transactionDateObj.toDateString() === new Date(transactionDate).toDateString()
                        : true;
                    const isAccountMatch = accountType
                        ? transaction.accountType === accountType
                        : true;
                    return isDateMatch && isAccountMatch;
                });

                return filteredTransactions
                    .filter((transaction) => transaction.type === TransactionTypes.Expense)
                    .reduce((sum, expense) => sum + expense.amount, 0);
            },

            getTotalPayableDebt: (transactionDate, accountType) => {
                const transactions = get().transactions;

                // Filter transactions based on date and account type
                const filteredTransactions = transactions.filter(transaction => {
                    const transactionDateObj = new Date(transaction.date);
                    const isDateMatch = transactionDate
                        ? transactionDateObj.toDateString() === new Date(transactionDate).toDateString()
                        : true;
                    const isAccountMatch = accountType
                        ? transaction.accountType === accountType
                        : true;
                    return isDateMatch && isAccountMatch;
                });

                return filteredTransactions
                    .filter(
                        (transaction) => transaction.type === TransactionTypes.Debt && transaction.debtType === DebtTypes.Owe
                    )
                    .reduce((sum, debt) => sum + debt.amount, 0);
            },

            getTotalReceivableDebt: (transactionDate, accountType) => {
                const transactions = get().transactions;

                // Filter transactions based on date and account type
                const filteredTransactions = transactions.filter(transaction => {
                    const transactionDateObj = new Date(transaction.date);
                    const isDateMatch = transactionDate
                        ? transactionDateObj.toDateString() === new Date(transactionDate).toDateString()
                        : true;
                    const isAccountMatch = accountType
                        ? transaction.accountType === accountType
                        : true;
                    return isDateMatch && isAccountMatch;
                });

                return filteredTransactions
                    .filter(
                        (transaction) => transaction.type === TransactionTypes.Debt && transaction.debtType === DebtTypes.Owes
                    )
                    .reduce((sum, debt) => sum + debt.amount, 0);
            },

            getTotalBalanceAfterSettlement: (transactionDate) => {
                const totalIncome = get().getTotalIncome(transactionDate);
                const totalExpense = get().getTotalExpense(transactionDate);
                const totalPayableDebt = get().getTotalPayableDebt(transactionDate);
                const totalReceivableDebt = get().getTotalReceivableDebt(transactionDate);

                // Calculate net balance
                return totalIncome - totalExpense - totalPayableDebt + totalReceivableDebt;
            },
            getTotalBalance: (accountType) => {
                const totalIncome = get().getTotalIncome(undefined, accountType);
                const totalExpense = get().getTotalExpense(undefined, accountType);

                // Calculate balance based on account type
                return totalIncome - totalExpense;
            },
        }),
        {
            name: "transactionsStore",
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);

export default useTransactionsStore;