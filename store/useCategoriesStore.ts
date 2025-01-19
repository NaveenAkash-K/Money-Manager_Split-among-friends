import {create} from 'zustand';
import {createJSONStorage} from 'zustand/middleware';
import {persist} from 'expo-zustand-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from "react-native-uuid";
import predefinedCategories from "../data/predefinedCategories";
import useSubCategoriesStore from "./useSubCategoriesStore";

interface Category {
    id: string;
    name: string;
    type: 'Income' | 'Expense';
    position?: number;
}

interface CategoriesStoreState {
    categories?: { Income?: Category[]; Expense?: Category[] };
    addCategory: (category: Category) => void;
    removeCategory: (id: string) => void;
    initializeCategories: () => void;
}

const useCategoriesStore = create(
    persist<CategoriesStoreState>(
        (set, get) => ({
            // Add a new category
            addCategory: (category) => {
                useSubCategoriesStore.getState().initializeEmptySubCategory(category.id);
                set((state) => {
                    const updatedCategories = {
                        ...state.categories,
                        [category.type]: [
                            ...state.categories![category.type]!,
                            {
                                ...category,
                                id: category.id,
                                position: state.categories![category.type]!.length + 1, // Add to the last position
                            },
                        ],
                    };

                    return {categories: updatedCategories};
                });
            },

            // Remove a category
            removeCategory: (id) => {
                set((state) => {
                    const updatedCategories = {
                        Income: state.categories!.Income!.filter((category) => category.id !== id).map((category, index) => ({
                            ...category,
                            position: index + 1, // Recalculate positions for Income
                        })),
                        Expense: state.categories!.Expense!.filter((category) => category.id !== id).map((category, index) => ({
                            ...category,
                            position: index + 1, // Recalculate positions for Expense
                        })),
                    };
                    useSubCategoriesStore.getState().deleteTotalSubCategory(id);
                    return {categories: updatedCategories};
                });
            },

            // Initialize categories (only once if empty)
            initializeCategories: () => {
                const currentCategories = get().categories;
                if (!currentCategories || (!currentCategories.Income!.length && !currentCategories.Expense!.length)) {
                    set(() => ({
                        categories: {
                            Income: predefinedCategories.Income.map((category, index) => ({
                                ...category,
                                position: index + 1, // Ensure positions are correct
                            })),
                            Expense: predefinedCategories.Expense.map((category, index) => ({
                                ...category,
                                position: index + 1, // Ensure positions are correct
                            })),
                        },
                    }));
                }
            },
        }),
        {
            name: 'categoriesStore',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);

export default useCategoriesStore;
