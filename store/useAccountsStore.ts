import {create} from "zustand";
import {persist, createJSONStorage} from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define the Account type
interface Account {
    id: string;
    name: string;
    income: number;
    expenses: number;
    balance: number;
    cashFlow: number;
}

// Initial accounts (only used on first launch)
const initialAccounts: Record<string, Account> = {
    cash: {id: "cash", name: "Cash", income: 0, expenses: 0, balance: 0, cashFlow: 0},
    bank: {id: "bank", name: "Bank Account", income: 0, expenses: 0, balance: 0, cashFlow: 0},
    savings: {id: "savings", name: "Savings Account", income: 0, expenses: 0, balance: 0, cashFlow: 0},
    credit_card: {id: "credit_card", name: "Credit Card", income: 0, expenses: 0, balance: 0, cashFlow: 0},
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
