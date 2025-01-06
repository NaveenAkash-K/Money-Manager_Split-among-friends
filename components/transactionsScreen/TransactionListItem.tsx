import Colors from "../../constants/Colors";
import {Pressable, StyleSheet, Text, View} from "react-native";
import TransactionTypes from "../../types/TransactionTypes";
import React from "react";
import { FAB } from 'react-native-paper';

const TransactionListItem = (props: {
    data: {
        category: string | undefined;
        subCategory: string | undefined;
        name: string;
        description: string | undefined;
        type: TransactionTypes;
        amount: number;
    };
}) => {
    return <Pressable
        android_ripple={{color: Colors.grey["300"]}}
        onPress={() => {
        }}
        // background={TouchableNativeFeedback.Ripple(Colors.grey[300], true)}
        style={[styles.transactionItem, {}]}
    >

        <View style={styles.transactionDetails}>
            {/* Left section with category and sub-category */}
            <View style={styles.categoryContainer}>
                <Text style={styles.category} numberOfLines={1}>
                    {props.data.category}
                </Text>
                {props.data.subCategory && (
                    <Text style={styles.subCategory}>{props.data.subCategory}</Text>
                )}
            </View>

            {/* Right section with name and description */}
            <View style={styles.nameContainer}>
                <Text style={styles.name} numberOfLines={1}>
                    {props.data.name}
                </Text>
                {props.data.description && (
                    <Text style={styles.description} numberOfLines={1}>
                        {props.data.description}
                    </Text>
                )}
            </View>
        </View>

        {/* Amount section */}
        <Text
            style={[
                styles.amount,
                props.data.type === TransactionTypes.Income ? styles.incomeText : styles.expenseText,
            ]}
        >
            {props.data.type === TransactionTypes.Income ? `₹ ${props.data.amount}` : `₹ ${Math.abs(props.data.amount)}`}
        </Text>

    </Pressable>
}

// @ts-ignore
const styles = StyleSheet.create({
    transactionItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 6,
        paddingHorizontal: 18,
        borderRadius: 6,
        // marginBottom: 2,
    },
    transactionDetails: {
        flex: 1,
        flexDirection: "row",
        marginRight: 8,
    },
    categoryContainer: {
        justifyContent: "center",
        marginRight: 12, // Add some space between category and name
        width: 80, // Fixed width for category
    },
    nameContainer: {
        justifyContent: "center",
        flex: 1, // Ensure text fits and adjusts based on screen width
    },
    category: {
        fontSize: 12,
        color: Colors.grey[600],
        fontWeight: "500",
        overflow: "hidden", // Prevent text overflow
        textOverflow: "ellipsis", // Ellipsis for long category names
    },
    subCategory: {
        fontSize: 10,
        color: Colors.grey[500],
        fontWeight: "400",
        marginTop: 2,
    },
    name: {
        fontSize: 12,
        fontWeight: "600",
        color: Colors.onSurface,
    },
    description: {
        fontSize: 12,
        color: Colors.grey[500],
        marginTop: 2,
    },
    amount: {
        fontSize: 12,
        fontWeight: "500",
        textAlign: "right", // Align amount to the right
    },
    incomeText: {
        color: Colors.income.main,
    },
    expenseText: {
        color: Colors.expense.main,
    },
})

export default TransactionListItem;