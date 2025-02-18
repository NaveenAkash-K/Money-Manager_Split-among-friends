interface Settlement {
    id: string;
    amount: number;
    description?: string;
    createdAt: Date;
}

export default Settlement