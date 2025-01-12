import * as SecureStore from 'expo-secure-store';

// Create a wrapper for zustand
const secureStorage = {
    // Serialize value before storing it as a JSON string
    setItem: async (key: string, value: any): Promise<void> => {
        const serializedValue = JSON.stringify(value);  // Serialize the value to a string
        await SecureStore.setItemAsync(key, serializedValue);
    },

    // Deserialize value after getting it from storage
    getItem: async (key: string): Promise<any | null> => {
        const value = await SecureStore.getItemAsync(key);
        if (value) {
            try {
                return JSON.parse(value);  // Parse the string back to the original object
            } catch (error) {
                console.error("Error parsing stored value:", error);
                return null;
            }
        }
        return null; // Return null if no value is found
    },

    // Remove item from secure storage
    removeItem: async (key: string): Promise<void> => {
        await SecureStore.deleteItemAsync(key);
    },
};

export default secureStorage;
