import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import Income from "../models/Income";
import Transaction from "../models/Transaction";

interface TransactionState {
    transactions: Transaction[];
    addTransaction: (transaction: any) => void;
    removeTransaction: (transactionId: string) => void;
}

const useTransactionsStore = create<TransactionState>()(
    persist(
        (set) => ({
            // Properties
            transactions: [],

            // Functions
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
        }),
        {
            name: 'transactionsStore',
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export default useTransactionsStore;