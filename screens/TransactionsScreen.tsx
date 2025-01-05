import React from "react";
import {
    StyleSheet,
    View,
    SectionList,
    Text,
    ViewStyle, Pressable, TouchableOpacity,
    TouchableNativeFeedback,
    Button
} from "react-native";
import Colors from "../constants/Colors";
import TransactionTypes from "../types/TransactionTypes";
import AccountTypes from "../types/AccountTypes";
import MiniStats from "../components/transactionsScreen/MiniStats";

const TransactionsScreen = () => {
    // Static plain object array for transactions
    const transactions = [
        {
            id: "income_1",
            category: "Salary",
            subCategory: "undefined",
            name: "Monthly Salary",
            amount: 50000,
            description: undefined,
            type: TransactionTypes.Income,
            createdAt: new Date("2025-01-04"),
            accountType: AccountTypes.Bank,
        },
        {
            id: "expense_1",
            category: "Food",
            subCategory: undefined,
            name: "Dinner at Restaurant",
            amount: 1200,
            description: "Dinner with friends",
            type: TransactionTypes.Expense,
            createdAt: new Date("2025-01-04"),
        },
        {
            id: "expense_2",
            category: "Shopping",
            subCategory: undefined,
            name: "Grocery Shopping",
            amount: 3000,
            description: "Bought groceries for the week",
            type: TransactionTypes.Expense,
            createdAt: new Date("2025-01-03"),
        },
        {
            id: "income_2",
            category: "Freelancing",
            subCategory: undefined,
            name: "Web Development Project",
            amount: 25000,
            description: "Payment for project completion",
            type: TransactionTypes.Income,
            createdAt: new Date("2025-01-03"),
            accountType: AccountTypes.PayPal,
        },
        {
            id: "expense_3",
            category: "Entertainment",
            subCategory: undefined,
            name: "Netflix Subscription",
            amount: 799,
            description: "Monthly subscription",
            type: TransactionTypes.Expense,
            createdAt: new Date("2025-01-02"),
        },
        {
            id: "expense_4",
            category: "Transport",
            subCategory: undefined,
            name: "Cab to Airport",
            amount: 1500,
            description: "Cab fare for business trip",
            type: TransactionTypes.Expense,
            createdAt: new Date("2025-01-02"),
        },
    ];

    // Helper function to group transactions by date
    const groupTransactionsByDate = () => {
        const grouped = transactions.reduce((acc, transaction) => {
            const date = transaction.createdAt.toDateString();
            if (!acc[date]) {
                acc[date] = [];
            }
            acc[date].push(transaction);
            return acc;
        }, {} as { [key: string]: typeof transactions });

        return Object.keys(grouped).map((date) => ({
            title: date,
            data: grouped[date],
        }));
    };

    const groupedTransactions = groupTransactionsByDate();

    const renderTransaction = ({item}: { item: typeof transactions[0] }) => {
        return (
            <Pressable
                android_ripple={{color: 'black', borderless: true}}
                onPress={() => {
                }}
                // background={TouchableNativeFeedback.Ripple(Colors.grey[300], true)}
                style={[styles.transactionItem, {}]}
            >

                <View style={styles.transactionDetails}>
                    {/* Left section with category and sub-category */}
                    <View style={styles.categoryContainer}>
                        <Text style={styles.category} numberOfLines={1}>
                            {item.category}
                        </Text>
                        {item.subCategory && (
                            <Text style={styles.subCategory}>{item.subCategory}</Text>
                        )}
                    </View>

                    {/* Right section with name and description */}
                    <View style={styles.nameContainer}>
                        <Text style={styles.name} numberOfLines={1}>
                            {item.name}
                        </Text>
                        {item.description && (
                            <Text style={styles.description} numberOfLines={1}>
                                {item.description}
                            </Text>
                        )}
                    </View>
                </View>

                {/* Amount section */}
                <Text
                    style={[
                        styles.amount,
                        item.type === TransactionTypes.Income ? styles.incomeText : styles.expenseText,
                    ]}
                >
                    {item.type === TransactionTypes.Income ? `₹ ${item.amount}` : `₹ ${Math.abs(item.amount)}`}
                </Text>

            </Pressable>
        );
    };

    const renderHeader = ({section}: { section: { title: string } }) => {
        return (
            <View style={styles.header}>
                <Text style={styles.headerText}>{section.title}</Text>
            </View>
        );
    };

    const renderSectionFooter = () => {
        return <View style={styles.divider}/>;
    };

    return (
        <View style={styles.transactionsScreen}>
            <MiniStats/>
            <SectionList
                sections={groupedTransactions}
                renderItem={renderTransaction}
                renderSectionHeader={renderHeader}
                renderSectionFooter={renderSectionFooter}
                keyExtractor={(item) => item.id}
                style={styles.transactionsList}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    transactionsScreen: {
        flex: 1,
        backgroundColor: Colors.background,
        paddingHorizontal: 16,
        paddingTop: 8,
    },
    transactionsList: {
        flex: 1,
        marginTop: 16,
    },
    listContent: {
        paddingBottom: 16,
    },
    transactionItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 6,
        paddingHorizontal: 8,
        borderRadius: 6,
        marginBottom: 2,
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
    header: {
        paddingVertical: 4,
        paddingHorizontal: 0,
        borderRadius: 8,
        marginBottom: 8,
    },
    headerText: {
        fontSize: 12, // Smaller font size
        fontWeight: "600", // Lighter font weight
        color: Colors.grey[800],
    },
    divider: {
        height: 1,
        backgroundColor: Colors.grey[400],
        marginVertical: 8, // Add some vertical margin for spacing after each section
    },
});

export default TransactionsScreen;
