import {create} from "zustand";
import {persist, createJSONStorage} from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {TransactionTypes} from "../types/TransactionTypes";

// Define the Account type
interface Account {
    id: string;
    name: string;
    [TransactionTypes.Income]: number;
    [TransactionTypes.Expense]: number;
    balance: number;
    cashFlow: number;
}

// Initial accounts (only used on first launch)
const initialAccounts: Record<string, Account> = {
    cash: {
        id: "cash",
        name: "Cash",
        [TransactionTypes.Income]: 0,
        [TransactionTypes.Expense]: 0,
        balance: 0,
        cashFlow: 0
    },
    bank: {
        id: "bank",
        name: "Bank Account",
        [TransactionTypes.Income]: 0,
        [TransactionTypes.Expense]: 0,
        balance: 0,
        cashFlow: 0
    },
    savings: {
        id: "savings",
        name: "Savings Account",
        [TransactionTypes.Income]: 0,
        [TransactionTypes.Expense]: 0,
        balance: 0,
        cashFlow: 0
    },
    credit_card: {
        id: "credit_card",
        name: "Credit Card",
        [TransactionTypes.Income]: 0,
        [TransactionTypes.Expense]: 0,
        balance: 0,
        cashFlow: 0
    },
};

// Zustand Store
interface AccountState {
    accounts: Record<string, Account>;
    addAccount: (account: Account) => void;
    deleteAccount: (id: string) => void;
}

export const useAccountStore = create<AccountState>()(
    persist(
        (set, get) => ({
            accounts: initialAccounts, // Will only be used on the first run

            // Add a new account
            addAccount: (account) =>
                set((state) => ({
                    accounts: {...state.accounts, [account.id]: account},
                })),

            // Delete an account
            deleteAccount: (id) =>
                set((state) => {
                    const newAccounts = {...state.accounts};
                    delete newAccounts[id];
                    return {accounts: newAccounts};
                }),
        }),
        {
            name: "accountsStore", // Key for AsyncStorage
            storage: createJSONStorage(() => AsyncStorage), // Use AsyncStorage
        }
    )
);
