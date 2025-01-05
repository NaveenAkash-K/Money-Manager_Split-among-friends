// src/models/Friend.ts
import uuid from 'react-native-uuid';

class Friend {
    id: string;
    name: string;
    mobile?: string;
    email?: string;

    constructor(name: string, mobile?: string, email?: string) {
        this.id = "friend_" + uuid.v4();
        this.name = name;
        this.mobile = mobile;
        this.email = email;
    }
}

export default Friend;
