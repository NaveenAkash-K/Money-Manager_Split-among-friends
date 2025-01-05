// src/models/Share.ts
import Friend from './Friend';
import uuid from "react-native-uuid";

class Share {
    id: string;
    friend: Friend;
    amount: number;

    constructor(friend: Friend, amount: number) {
        this.id = "share_" + uuid.v4();
        this.friend = friend;
        this.amount = amount;
    }
}

export default Share;
