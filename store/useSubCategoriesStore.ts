import {create} from 'zustand';
import {createJSONStorage} from 'zustand/middleware';
import {persist} from 'expo-zustand-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import predefinedSubCategories from "../data/predefinedSubCategories";

interface SubCategory {
    id: string;
    name: string;
    parentCategoryId: string;
    position?: number;
}

interface SubCategoriesStoreState {
    subCategories: Record<string, SubCategory[]>;
    addSubCategory: (parentCategoryId: string, subCategory: SubCategory) => void;
    removeSubCategory: (parentCategoryId: string, subCategoryId: string) => void;
    initializeEmptySubCategory: (parentCategoryId: string) => void;
    deleteTotalSubCategory: (parentCategoryId: string) => void;
    initializeSubCategories: () => void;
}

const useSubCategoriesStore = create(
    persist<SubCategoriesStoreState>(
        (set, get) => ({
            subCategories: predefinedSubCategories, // Initialize with predefined subcategories

            initializeEmptySubCategory: (parentCategoryId) => {
                set((state) => {
                    const updatedSubCategories = {...state.subCategories};
                    updatedSubCategories[parentCategoryId] = [];
                    return {subCategories: updatedSubCategories};
                });
            },

            deleteTotalSubCategory: (parentCategoryId) => {
                set((state) => {
                    const updatedSubCategories = { ...state.subCategories };

                    // Delete all subcategories associated with the parentCategoryId
                    delete updatedSubCategories[parentCategoryId];

                    return { subCategories: updatedSubCategories };
                });
            },

            // Add a subcategory to an existing category or create a new category if needed
            addSubCategory: (parentCategoryId, subCategory) => {
                set((state) => {
                    const updatedSubCategories = { ...state.subCategories };

                    // Check if the category exists, if not create it
                    if (!updatedSubCategories[parentCategoryId]) {
                        updatedSubCategories[parentCategoryId] = [];
                    }

                    // Set the position of the new subcategory to the last position
                    const newSubCategory = { ...subCategory, position: updatedSubCategories[parentCategoryId].length + 1 };

                    // Add the new subcategory to the category
                    updatedSubCategories[parentCategoryId].push(newSubCategory);

                    return { subCategories: updatedSubCategories };
                });
            },

            // Remove a subcategory from a specific category
            removeSubCategory: (parentCategoryId, subCategoryId) => {
                set((state) => {
                    const updatedSubCategories = { ...state.subCategories };

                    // Filter out the subcategory by its ID
                    updatedSubCategories[parentCategoryId] = updatedSubCategories[parentCategoryId].filter(
                        (subCategory) => subCategory.id !== subCategoryId
                    );

                    // Recalculate the positions of remaining subcategories
                    updatedSubCategories[parentCategoryId] = updatedSubCategories[parentCategoryId].map(
                        (subCategory, index) => ({
                            ...subCategory,
                            position: index + 1, // Recalculate position starting from 1
                        })
                    );

                    return { subCategories: updatedSubCategories };
                });
            },

            // Initialize subcategories (only once if empty)
            initializeSubCategories: () => {
                const currentSubCategories = get().subCategories;
                if (Object.keys(currentSubCategories).length === 0) {
                    set(() => ({subCategories: predefinedSubCategories}));
                }
            },
        }),
        {
            name: 'subCategoriesStore',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);

export default useSubCategoriesStore;
