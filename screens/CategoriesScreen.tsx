import React from "react";
import {Text, View, StyleSheet, ScrollView} from "react-native";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import useCategoriesStore from "../store/useCategoriesStore";
import useSubCategoriesStore from "../store/useSubCategoriesStore";
import Colors from "../constants/Colors";

const Tab = createMaterialTopTabNavigator();

const CategorySection = ({categoryType}: { categoryType: string; }) => {
    const {categories} = useCategoriesStore();
    const {subCategories} = useSubCategoriesStore();

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.categoryTitle}>{categoryType}</Text>
                {categories?.[categoryType]?.map((category) => (
                    <View key={category.id} style={styles.categoryCard}>
                        <Text style={styles.categoryName}>{category.name}</Text>
                        <View style={styles.subCategoryList}>
                            {subCategories[category.id]?.map((subCategory) => (
                                <Text key={subCategory.id} style={styles.subCategory}>
                                    {subCategory.name}
                                </Text>
                            ))}
                        </View>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

const CategoriesScreen = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarLabelStyle: {fontWeight: "bold"},
                tabBarActiveTintColor: "#3b5fff",
                tabBarInactiveTintColor: Colors.grey["700"]
            }}
        >
            <Tab.Screen name="Expense" component={() => <CategorySection categoryType="Expense"/>}/>
            <Tab.Screen name="Income" component={() => <CategorySection categoryType="Income"/>}/>
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f9f9f9",
        padding: 16,
    },
    categoryTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 8,
    },
    categoryCard: {
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 16,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    categoryName: {
        fontSize: 16,
        fontWeight: "600",
        color: "#333",
    },
    subCategoryList: {
        marginTop: 8,
    },
    subCategory: {
        fontSize: 14,
        color: "#666",
        marginVertical: 4,
    },
});

export default CategoriesScreen;
