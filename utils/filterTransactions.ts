import Transaction from "../models/Transaction";

const filterTransactions = (transactions: Transaction[], transactionDate: Date) => {
    if (!transactionDate) return transactions; // If no date is provided, return all transactions

    // Filter transactions based on the provided transactionDate
    return transactions.filter(transaction => {
        const transactionDateObj = new Date(transaction.date);
        return transactionDateObj.getMonth() === new Date(transactionDate).getMonth();
    });
};

export default filterTransactions;