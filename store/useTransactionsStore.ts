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
import transaction from "../models/Transaction";
import {plainToClass, plainToInstance} from "class-transformer";
import useBalanceStore from "./useBalanceStore";
import transactionTypes from "../types/TransactionTypes";

interface TransactionState {
    transactions: Transaction[];
    addTransaction: (transaction: any) => void;
    removeTransaction: (transactionId: string) => void;
    getTotalIncome: (transactionDate?: Date, accountType?: AccountTypes) => number;
    getTotalExpense: (transactionDate?: Date, accountType?: AccountTypes) => number;
    getTotalPayableDebt: (transactionDate?: Date, accountType?: AccountTypes, friendId?: string) => number;
    getTotalReceivableDebt: (transactionDate?: Date, accountType?: AccountTypes, friendId?: string) => number;
    getTotalBalanceAfterSettlement: (transactionDate?: Date) => number;
    getTotalBalance: (accountType?: AccountTypes) => number;
}

const useTransactionsStore = create<TransactionState>()(
    persist(
        (set, get) => ({
            transactions: [],

            // Add Transaction
            addTransaction: (transaction) => {
                const {updateBalance} = useBalanceStore.getState();
                updateBalance(transaction.accountType, transaction.type, transaction.amount);
                set((state) => ({
                    transactions: [...state.transactions, transaction],
                }))
            },
            removeTransaction: (transactionId) => {
                const {updateBalance} = useBalanceStore.getState();

                set((state) => {
                    const transactionToRemove = state.transactions.find(
                        (transaction) => transaction.id === transactionId
                    );

                    if (!transactionToRemove) return state; // If transaction not found, return the current state

                    const {accountType, type, amount} = transactionToRemove;

                    // Reverse the transaction effect to restore the balance
                    updateBalance(accountType, type, amount);

                    return {
                        transactions: state.transactions.filter(
                            (transaction) => transaction.id !== transactionId
                        ),
                    };
                });
            },

            getTotalIncome: (transactionDate, accountType) => {
                const transactions = get().transactions;

                // Filter transactions based on date and account type
                const filteredTransactions = transactions.filter(transaction => {
                    const transactionDateObj = new Date(transaction.date);
                    const isMonthMatch = transactionDate
                        ? transactionDateObj.getMonth() === new Date(transactionDate).getMonth()
                        : true;
                    const isAccountMatch = accountType
                        ? transaction.accountType === accountType
                        : true;
                    return isMonthMatch && isAccountMatch;
                });

                const incomingTransfers = get().transactions.filter(transaction => (transaction.type === TransactionTypes.Transfer && transaction.toAccount === accountType));

                const incomeTransferAmount = incomingTransfers.reduce((acc, transfer) => transfer.amount, 0);

                const debtTransactions = get().transactions.filter(transaction => {
                    const isAccountMatch = accountType
                        ? transaction.accountType === accountType
                        : true;

                    return (isAccountMatch && transaction.type === TransactionTypes.Debt && transaction.debtType === DebtTypes.Owe && transaction.applyToBalance)
                });

                const debtAmountToBeAdded = debtTransactions.reduce((acc, debt) => debt.amount + acc, 0);

                const incomeAmount = filteredTransactions
                    .filter((transaction) => transaction.type === TransactionTypes.Income)
                    .reduce((sum, income) => sum + income.amount, 0);

                return incomeAmount + incomeTransferAmount + debtAmountToBeAdded
                // return incomeAmount + incomeTransferAmount
            },
            getTotalExpense: (transactionDate, accountType) => {
                const transactions = get().transactions;

                // Filter transactions based on date and account type
                const filteredTransactions = transactions.filter(transaction => {
                    const transactionDateObj = new Date(transaction.date);
                    const isMonthMatch = transactionDate
                        ? transactionDateObj.getMonth() === new Date(transactionDate).getMonth()
                        : true;
                    const isAccountMatch = accountType
                        ? transaction.accountType === accountType
                        : true;
                    return isMonthMatch && isAccountMatch;
                });

                const outgoingTransfers = get().transactions.filter(transaction => (transaction.type === TransactionTypes.Transfer && transaction.fromAccount === accountType));
                const outgoingTransferAmount = outgoingTransfers.reduce((acc, transfer) => transfer.amount, 0);

                const debtTransactions = get().transactions.filter(transaction => {
                    const isAccountMatch = accountType
                        ? transaction.accountType === accountType
                        : true;
                    return (isAccountMatch && transaction.type === TransactionTypes.Debt && transaction.debtType === DebtTypes.Owes && transaction.applyToBalance)
                });

                const debtAmountToBeDeducted = debtTransactions.reduce((acc, debt) => debt.amount + acc, 0);

                const expenseAmount = filteredTransactions
                    .filter((transaction) => transaction.type === TransactionTypes.Expense)
                    .reduce((sum, expense) => sum + expense.amount, 0) + outgoingTransferAmount;

                return expenseAmount + outgoingTransferAmount + debtAmountToBeDeducted;
            },

            getTotalPayableDebt: (transactionDate?: Date, accountType?: AccountTypes, friendId?: string) => {
                const transactions = get().transactions;

                // Filter transactions based on date, account type, and friend (if provided)
                const debtTransactions = transactions.filter((transaction) => transaction.type === TransactionTypes.Debt);

                const filteredTransactions = debtTransactions.filter((transaction) => {
                    const transactionDateObj = new Date(transaction.date);
                    const isMonthMatch = transactionDate
                        ? transactionDateObj.getMonth() === new Date(transactionDate).getMonth()
                        : true;
                    const isAccountMatch = accountType
                        ? transaction.accountType === accountType
                        : true;
                    const isFriendMatch = friendId
                        ? transaction.debtPerson.id === friendId // Match friend ID if provided
                        : true;
                    return isMonthMatch && isAccountMatch && isFriendMatch;
                });

                return filteredTransactions
                    .filter(
                        (transaction) => transaction.debtType === DebtTypes.Owe
                    )
                    .reduce((sum, debt) => sum + debt.amount, 0);
            },

            getTotalReceivableDebt: (
                transactionDate?: Date,
                accountType?: AccountTypes,
                friendId?: string,
            ) => {
                const transactions = get().transactions;
                const debtTransactions = transactions.filter((transaction) => transaction.type === TransactionTypes.Debt);

                // Filter transactions based on date, account type, and friend (if provided)
                const filteredTransactions = debtTransactions.filter((transaction) => {
                    const transactionDateObj = new Date(transaction.date);
                    const isMonthMatch = transactionDate
                        ? transactionDateObj.getMonth() === new Date(transactionDate).getMonth()
                        : true;
                    const isAccountMatch = accountType
                        ? transaction.accountType === accountType
                        : true;
                    const isFriendMatch = friendId
                        ? transaction.debtPerson.id === friendId // Match friend ID if provided
                        : true;
                    return isMonthMatch && isAccountMatch && isFriendMatch;
                });

                return filteredTransactions
                    .filter(
                        (transaction) => transaction.debtType === DebtTypes.Owes
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
                return (totalIncome - totalExpense);
            },
        }),
        {
            name: "transactionsStore",
            storage: createJSONStorage(() => AsyncStorage)
            // storage: {
            //     getItem: async (name) => {
            //         const json = await AsyncStorage.getItem(name);
            //         if (json) {
            //             const plainArray = JSON.parse(json);
            //             const transformedArray = plainArray.state.transactions.map((obj: any) => {
            //                 if (obj.type === TransactionTypes.Debt) {
            //                     return plainToInstance(Debt, obj)
            //                 } else if (obj.type === TransactionTypes.Transfer) {
            //                     return plainToInstance(Transfer, obj)
            //                 } else if (obj.type === TransactionTypes.Income) {
            //                     return plainToInstance(Income, obj)
            //                 } else if (obj.type === TransactionTypes.Expense) {
            //                     return plainToInstance(Expense, obj)
            //                 }
            //             });
            //             return {"state": {"transactions": transformedArray}};
            //         }
            //         return {"state": {"transactions": []}};
            //     },
            //     setItem: AsyncStorage.setItem,
            //     removeItem: AsyncStorage.removeItem
            // },
        }
    )
);


export default useTransactionsStore;