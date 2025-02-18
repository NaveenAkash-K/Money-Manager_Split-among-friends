import {create} from 'zustand';
import {createJSONStorage} from 'zustand/middleware';
import {persist} from 'expo-zustand-persist';
import AsyncStorage from "@react-native-async-storage/async-storage";
import TransactionTypes from "../types/TransactionTypes";
import AccountTypes from "../types/AccountTypes";

interface Balance {
    income: number;
    expense: number;
    cashflow: number;
    balance: number;
}

interface BalanceStoreState {
    Card: Balance;
    Cash: Balance;
    Account: Balance;
    updateBalance: (accountType: AccountTypes, transactionType: TransactionTypes, amount: number) => void;
    resetBalances: () => void;
}

const initialBalance: Balance = {
    income: 0,
    expense: 0,
    cashflow: 0,
    balance: 0,
};

const useBalanceStore = create(
    persist<BalanceStoreState>(
        (set) => ({
            Card: {...initialBalance},
            Cash: {...initialBalance},
            Account: {...initialBalance},

            updateBalance: (accountType: AccountTypes, transactionType: TransactionTypes, amount: number) => {
                set((state) => {
                    const currentBalance = state[accountType]; // Get the current balance of the specified account type

                    const updated = {
                        income: transactionType === 'Income' ? currentBalance.income + amount : currentBalance.income,
                        expense: transactionType === 'Expense' ? currentBalance.expense + amount : currentBalance.expense,
                        cashflow: (transactionType === 'Income' ? currentBalance.income + amount : currentBalance.income) -
                            (transactionType === 'Expense' ? currentBalance.expense + amount : currentBalance.expense),
                        balance: transactionType === 'Income' ? currentBalance.balance + amount : currentBalance.balance - amount,
                    };

                    return {[accountType]: updated};
                });
            },


            resetBalances: () => {
                set({
                    Card: {...initialBalance},
                    Cash: {...initialBalance},
                    Account: {...initialBalance},
                });
            },
        }),
        {
            name: 'balanceStore',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);

export default useBalanceStore;
