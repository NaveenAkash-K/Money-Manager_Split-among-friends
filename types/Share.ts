import {Friend} from "./Friends";

export interface Share {
    id: string;
    friend: Friend;
    amount: number;
}