import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import {Income} from "../types/Income";
import {Expense} from "../types/Expense";
import {TransactionTypes} from "../types/TransactionTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface TransactionState {
    incomes: Income[];
    expenses: Expense[];
    addTransaction: (transaction: any) => void;
    removeTransaction: (type: TransactionTypes, id: string) => void;
}

const useTransactionsStore = create<TransactionState>()(
    persist(
        (set, get) => ({
            incomes: [],
            expenses: [],

            // Add Transaction
            addTransaction: (transaction) => {
                if (transaction.type === "income") {
                    set((state) => ({
                        incomes: [...state.incomes, transaction],
                    }))
                } else if (transaction.type === "expense") {
                    set((state) => ({
                        expenses: [...state.expenses, transaction],
                    }))
                }
            },
            removeTransaction: (type, id) => {
                if (type === "income") {
                    set((state) => {
                        const incomeToRemove = state.incomes.find(
                            (income) => income.id === id
                        );

                        if (!incomeToRemove) return state;

                        return {
                            incomes: state.incomes.filter(
                                (income) => income.id !== id
                            ),
                        };
                    });

                } else if (type === "expense") {
                    set((state) => {
                        const expenseToRemove = state.expenses.find(
                            (expense) => expense.id === id
                        );

                        if (!expenseToRemove) return state;

                        return {
                            expenses: state.expenses.filter(
                                (expense) => expense.id !== id
                            ),
                        };
                    });
                }

            },

        }),
        {
            name: "transactionsStore",
            storage: createJSONStorage(() => AsyncStorage)
        }
    )
);


export default useTransactionsStore;