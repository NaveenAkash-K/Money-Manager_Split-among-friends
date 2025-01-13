import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Animated} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import Colors from "../../constants/Colors";
import useTransactionsStore from "../../store/useTransactionsStore";
import Income from "../../models/Income";
import Expense from "../../models/Expense";
import useNonPersistStore from "../../store/useNonPersistStore"; // Make sure to install this package

const MiniStats = () => {
    const [expanded, setExpanded] = useState(false); // State to track whether the debt details are expanded
    const [heightAnim] = useState(new Animated.Value(0)); // Initial height for animating
    const {
        getTotalIncome,
        getTotalExpense,
        getTotalBalanceAfterSettlement,
        getTotalPayableDebt,
        getTotalReceivableDebt
    } = useTransactionsStore();

    const {transactionDate} = useNonPersistStore()

    const toggleDebtDetails = () => {
        setExpanded(!expanded);
        // Animate the expansion and collapse
        Animated.timing(heightAnim, {
            toValue: expanded ? 0 : 90, // Adjust height for expanded state
            duration: 300,
            useNativeDriver: false,
        }).start();
    };

    return (
        <View style={styles.miniStats}>
            <View style={styles.topRow}>
                <View style={styles.statCard}>
                    <Text style={styles.statTitle}>Income</Text>
                    <Text
                        style={[styles.statValue, {color: Colors.income.main}]}>{`₹ ${getTotalIncome(transactionDate)}`}</Text>
                </View>
                <View style={styles.statCard}>
                    <Text style={styles.statTitle}>Expenses</Text>
                    <Text
                        style={[styles.statValue, {color: Colors.expense.main}]}>{`₹ ${getTotalExpense(transactionDate)}`}</Text>
                </View>
                <View style={styles.statCard}>
                    <Text style={styles.statTitle}>Cashflow</Text>
                    <Text
                        style={[styles.statValue, (getTotalIncome(transactionDate) - getTotalExpense(transactionDate) < 0) ? {color: Colors.expense.main} : {color: Colors.income.main}]}>{`₹ ${Math.abs(getTotalIncome(transactionDate) - getTotalExpense(transactionDate)).toFixed(1)}`}</Text>
                </View>
                <View style={styles.divider}/>
                <View style={styles.statCard}>
                    <Text style={styles.statTitle}>Total Balance</Text>
                    <Text style={styles.statValue}>{"₹ " + (getTotalIncome() - getTotalExpense())}</Text>
                </View>
            </View>

            <View style={styles.detailsContainer}>
                <Animated.View style={[styles.debtDetails, {height: heightAnim}]}>
                    <Text style={styles.debtTitle}>Total Debts</Text>
                    <View style={styles.debtRow}>
                        <View style={styles.debtItem}>
                            <Text style={styles.debtLabel}>Others owes you</Text>
                            <Text
                                style={[styles.debtValue, {color: Colors.income.light}]}>₹ {getTotalReceivableDebt()}</Text>
                        </View>
                        <View style={styles.debtItem}>
                            <Text style={styles.debtLabel}>You owe others</Text>
                            <Text
                                style={[styles.debtValue, {color: Colors.expense.light}]}>₹ {getTotalPayableDebt()}</Text>
                        </View>
                        <View style={styles.debtItem}>
                            <Text style={styles.debtLabel}>Total Balance</Text>
                            <Text style={styles.debtValue}>₹ {getTotalBalanceAfterSettlement()}</Text>
                            <Text style={styles.debtSubLabel}>(After settlement)</Text>
                        </View>
                    </View>
                </Animated.View>

                <TouchableOpacity onPress={toggleDebtDetails} style={styles.arrowButtonContainer}>
                    <MaterialIcons
                        name={expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                        size={24}
                        color="black"
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    miniStats: {
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        backgroundColor: '#fff',
        elevation: 4,
        shadowOffset: {width: 0, height: 10},
        borderColor: Colors.grey["400"],
        shadowColor: Colors.grey["400"],
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    statCard: {
        // paddingVertical: 10,
        paddingTop: 10,
        paddingHorizontal: 15,
        alignItems: 'center',
    },
    statTitle: {
        fontSize: 12,
        color: '#7f8c8d',
        marginBottom: 4,
    },
    statValue: {
        fontSize: 14,
        fontWeight: '500',
        color: '#2c3e50',
    },
    divider: {
        height: '90%',
        width: 1,
        backgroundColor: Colors.grey["300"],
        borderRadius: 100,
    },
    detailsContainer: {
        width: '100%',
        marginTop: 10,
    },
    debtDetails: {
        overflow: 'hidden',
        paddingHorizontal: 10,
        marginTop: 10,
    },
    debtTitle: {
        textAlign: 'center',
        fontSize: 14,
        fontWeight: '500',
        color: '#34495e',
        marginBottom: 5,
    },
    debtRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    debtItem: {
        flex: 1,
        alignItems: 'center',
    },
    debtLabel: {
        fontSize: 12,
        color: '#7f8c8d',
        marginBottom: 4,
    },
    debtSubLabel: {
        fontSize: 10,
        color: '#95a5a6',
        marginBottom: 4,
    },
    debtValue: {
        fontSize: 14,
        fontWeight: '500',
        color: '#2c3e50',
    },
    arrowButtonContainer: {
        alignItems: 'center',
        // marginTop: 10,
        // backgroundColor:"blue",
        paddingBottom: 5,
    },
});

export default MiniStats;
