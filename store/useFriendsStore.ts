import {create} from 'zustand';
import {createJSONStorage} from 'zustand/middleware';
import {persist} from 'expo-zustand-persist';
import Friend from "../models/Friend";
import secureStorage from "../secureStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
            // clearFriend:() => set(state => ({friends: []}))
        }),
        {
            name: 'friendsStore',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);

export default useFriendsStore;
