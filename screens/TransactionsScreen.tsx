import React, {useEffect, useState} from "react";
import {SectionList, StyleSheet, Text, View} from "react-native";
import Colors from "../constants/Colors";
import AccountTypes from "../types/AccountTypes";
import MiniStats from "../components/transactionsScreen/MiniStats";
import TransactionListItem from "../components/transactionsScreen/TransactionListItem";
import {FAB} from 'react-native-paper';
import TransactionModal from "../components/transactionsScreen/TransactionModal";
import Expense from "../models/Expense";
import useTransactionsStore from "../store/useTransactionsStore";
import useTransactionFormStore from "../store/useTransactionFormStore";
import DateChanger from "../components/transactionsScreen/DateChanger";
import useNonPersistStore from "../store/useNonPersistStore";
import filterTransactions from "../utils/filterTransactions";
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useBalanceStore from "../store/useBalanceStore";

const TransactionsScreen = () => {
    // Static plain object array for transactions
    const [isTransactionModalVisible, setIsTransactionModalVisible] = useState(false)
    const {transactionDate} = useNonPersistStore()
    const {transactions} = useTransactionsStore();
    const {clearForm} = useTransactionFormStore();
    const [filteredTransactions, setFilteredTransactions] = useState(transactions);


    const {Card, Account, Cash} = useBalanceStore();

    useEffect(() => {
        console.log(Cash)
        console.log(Account)
        console.log(Card)
    }, [Cash, Account, Card]);

    useEffect(() => {
        const filtered = filterTransactions(transactions, transactionDate);
        setFilteredTransactions(filtered);
    }, [transactionDate, transactions]);

    // Helper function to group transactions by date
    const groupTransactionsByDate = () => {
        const grouped = filteredTransactions.reduce((acc, transaction) => {
            const date = new Date(transaction.date).toDateString(); // Group by date (date without time)
            if (!acc[date]) {
                acc[date] = [];
            }
            acc[date].push(transaction);
            return acc;
        }, {} as { [key: string]: typeof transactions });

        // Sort transactions within each group by time
        Object.keys(grouped).forEach((date) => {
            grouped[date].sort((a, b) => {
                return new Date(a.date).getTime() - new Date(b.date).getTime()
            }); // Sorting by time
        });

        // Convert grouped transactions to array of sections
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
            {isTransactionModalVisible && <TransactionModal isVisible={isTransactionModalVisible} onClose={() => {
                setIsTransactionModalVisible(false)
            }}/>}


            <MiniStats/>

            {groupedTransactions.length <= 0 ?
                <View style={{
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 1
                }}>
                    <Text style={{
                        fontWeight: "bold",
                        fontSize: 16, textAlign: "center"
                    }}>No Transactions</Text>
                </View> :
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
                />}

            <FAB
                icon="plus"
                color="white"
                style={styles.fab}
                onPress={() => {
                    // clearForm()
                    // AsyncStorage.clear()
                    // console.log(getTotalIncome(transactionDate))
                    setIsTransactionModalVisible(true)
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    transactionsScreen: {
        flex: 1,
        // backgroundColor: Colors.background,
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
        paddingVertical: 6,
        paddingHorizontal: 18,
        marginBottom: 8,
        backgroundColor: Colors.grey["300"]
    },
    headerText: {
        fontSize: 14, // Smaller font size
        fontWeight: "600", // Lighter font weight
        color: Colors.grey[800],
    },
    divider: {
        height: 1,
        backgroundColor: Colors.grey[400],
        marginTop: 8, // Add some vertical margin for spacing after each section
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: "#3b5fff"
    },
});

export default TransactionsScreen;
