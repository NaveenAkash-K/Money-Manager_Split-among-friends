import TransactionTypes from "../types/TransactionTypes";
import Expense from "../models/Expense";
import Share from "../models/Share";
import Friend from "../models/Friend";
import Income from "../models/Income";
import Debt from "../models/Debt";
import Transfer from "../models/Transfer";
import AccountTypes from "../types/AccountTypes";
import Transaction from "../models/Transaction";

const transactionsStoreSerializer = (transactions: Transaction[]) => {
    // Clear existing global data to avoid duplication
    Expense.allExpenses = [];
    Income.allIncomes = [];
    Debt.allDebts = [];
    Transfer.allTransfers = [];

    transactions.forEach((transaction: any) => {
        if (transaction.type === TransactionTypes.Expense) {
            const expense = new Expense(
                transaction.name,
                parseFloat(transaction.amount),
                transaction.accountType as AccountTypes,
                transaction.category,
                new Date(transaction.date),
                transaction.description,
                transaction.subCategory,
                transaction.splitPayment,
                transaction.shares.map((share: any) =>
                    new Share(
                        new Friend(
                            share.friend.name,
                            share.friend.mobile,
                            share.friend.email
                        ),
                        share.amount
                    )
                )
            );
            Expense.allExpenses.push(expense);
        } else if (transaction.type === TransactionTypes.Income) {
            const income = new Income(
                transaction.name,
                parseFloat(transaction.amount),
                transaction.accountType as AccountTypes,
                transaction.category,
                new Date(transaction.date),
                transaction.description,
                transaction.subCategory,
                transaction.splitPayment,
                transaction.shares.map((share: any) =>
                    new Share(
                        new Friend(
                            share.friend.name,
                            share.friend.mobile,
                            share.friend.email
                        ),
                        share.amount
                    )
                )
            );
            Income.allIncomes.push(income);
        } else if (transaction.type === TransactionTypes.Debt) {
            const debt = new Debt(
                transaction.name,
                parseFloat(transaction.amount),
                transaction.accountType as AccountTypes,
                new Date(transaction.date),
                transaction.debtType,
                new Friend(
                    transaction.debtPerson.name,
                    transaction.debtPerson.mobile,
                    transaction.debtPerson.email
                ),
                transaction.description,
            );
            Debt.allDebts.push(debt);
        } else if (transaction.type === TransactionTypes.Transfer) {
            const transfer = new Transfer(
                transaction.name,
                parseFloat(transaction.amount),
                new Date(transaction.date),
                transaction.fromAccount,
                transaction.toAccount,
                transaction.description
            );
            Transfer.allTransfers.push(transfer);
        }
    });

};

export default transactionsStoreSerializer;