export type Share =
    {
        readonly id: string;
        amount: number;
        userType: "self";
    }
    |
    {
        readonly id: string;
        personId: string;
        amount: number;
        userType: "other";
    };
