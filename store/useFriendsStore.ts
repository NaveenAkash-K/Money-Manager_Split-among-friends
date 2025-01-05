import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import Friend from "../models/Friend";

interface FriendsStore {
    friends: Friend[];
    addFriend: (friend: Friend) => void;
    removeFriend: (id: string) => void;
}

const useFriendsStore = create(
    persist<FriendsStore>(
        (set) => ({
            // Properties
            friends: [],

            // Functions
            addFriend: (friend: Friend) => set((state) => ({friends: [...state.friends, friend]})),
            removeFriend: (id: string) => set((state) => ({friends: state.friends.filter(friend => friend.id !== id)})),
        }),
        {
            name: 'friendsStore',
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export default useFriendsStore;
