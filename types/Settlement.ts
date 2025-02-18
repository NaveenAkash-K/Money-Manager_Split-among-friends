import {TransactionTypes} from "./TransactionTypes";

interface Settlement {
    id: string;            // Unique identifier for the settlement
    transactionId: string;     // Links the settlement to the original expense
    type: TransactionTypes,
    personId: string;      // The person who is settling the split amount
    amount: number;        // Amount being settled (partial or full)
    description?: string;  // Optional notes about the settlement
    createdAt: Date;       // Timestamp of when settlement happened
}

export default Settlement;
