import React, {useState} from "react";
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
import TransactionListItem from "../components/transactionsScreen/TransactionListItem";
import {FAB} from 'react-native-paper';
import TransactionModal from "../components/transactionsScreen/TransactionModal";

const TransactionsScreen = () => {
    // Static plain object array for transactions
    const [isTransactionModalVisible, setIsTransactionModalVisible] = useState(false)

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
            accountType: AccountTypes.Account,
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
            accountType: AccountTypes.Cash,
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
        return <TransactionListItem data={item}/>
    };

    return (
        <View style={styles.transactionsScreen}>
            <TransactionModal isVisible={isTransactionModalVisible} onClose={() => {
                setIsTransactionModalVisible(false)
            }}/>

            <MiniStats/>
            <SectionList
                sections={groupedTransactions}
                renderItem={renderTransaction}
                renderSectionHeader={({section}) => <View style={styles.header}>
                    <Text style={styles.headerText}>{section.title}</Text>
                </View>}
                renderSectionFooter={() => <View style={styles.divider}/>}
                keyExtractor={(item) => item.id}
                style={styles.transactionsList}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />
            <FAB
                icon="plus"
                style={styles.fab}
                onPress={() => setIsTransactionModalVisible(true)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    transactionsScreen: {
        flex: 1,
        backgroundColor: Colors.background,
        // paddingHorizontal: 16,
        // paddingTop: 8,
    },
    transactionsList: {
        flex: 1,
        marginTop: 16,
    },
    listContent: {
        paddingBottom: 16,
    },
    header: {
        paddingVertical: 4,
        paddingHorizontal: 18,
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
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
});

export default TransactionsScreen;
