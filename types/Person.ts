export interface Person {
    id: string;
    name: string;
    mobile?: string;
    email?: string;
    createdAt: Date;
    deleted?: boolean;
}