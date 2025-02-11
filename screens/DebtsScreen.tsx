import React, {useMemo, useState} from "react";
import {View, Text, StyleSheet, FlatList, ScrollView, Pressable} from "react-native";
import useTransactionsStore from "../store/useTransactionsStore";
import useFriendsStore from "../store/useFriendsStore";
import DebtsChart from "../components/debtsScreen/DebtsChart";
import Colors from "../constants/Colors";
import StatsRow from "../components/common/StatsRow";
import AccountTypes from "../types/AccountTypes";
import TransactionTypes from "../types/TransactionTypes";
import {Octicons} from "@expo/vector-icons";

const DebtsScreen = () => {
    const {
        getTotalBalanceAfterSettlement,
        getTotalPayableDebt,
        getTotalReceivableDebt,
        getTotalBalance,
        transactions,
    } = useTransactionsStore();
    const {friends} = useFriendsStore();

    const debtTransactions = transactions.filter(transaction => transaction.type === TransactionTypes.Debt);

    const debtFriends = friends.filter(friend => {
        return debtTransactions.map(debt => debt.debtPerson.id).includes(friend.id);
    })

    const [payableDebtSort, setPayableDebtSort] = useState(null);
    const [receivableDebtSort, setReceivableDebtSort] = useState(null);
    const [totalDebtSort, setTotalDebtSort] = useState("desc");

    const sortedDebtFriends = useMemo(() => {
        let sorted = [...debtFriends];
        if (payableDebtSort) {
            sorted.sort((a, b) => {
                const aDebt = getTotalPayableDebt(undefined, undefined, a.id);
                const bDebt = getTotalPayableDebt(undefined, undefined, b.id);
                return payableDebtSort === "asc" ? aDebt - bDebt : bDebt - aDebt;
            });
        } else if (receivableDebtSort) {
            sorted.sort((a, b) => {
                const aDebt = getTotalReceivableDebt(undefined, undefined, a.id);
                const bDebt = getTotalReceivableDebt(undefined, undefined, b.id);
                return receivableDebtSort === "asc" ? aDebt - bDebt : bDebt - aDebt;
            });
        } else if (totalDebtSort) {
            sorted.sort((a, b) => {
                const aTotal =
                    getTotalReceivableDebt(undefined, undefined, a.id) -
                    getTotalPayableDebt(undefined, undefined, a.id);
                const bTotal =
                    getTotalReceivableDebt(undefined, undefined, b.id) -
                    getTotalPayableDebt(undefined, undefined, b.id);
                return totalDebtSort === "asc" ? aTotal - bTotal : bTotal - aTotal;
            });
        }
        return sorted;
    }, [debtFriends, payableDebtSort, receivableDebtSort, totalDebtSort, getTotalPayableDebt, getTotalReceivableDebt]);

    return (
        <ScrollView>
            <View style={styles.container}>
                <DebtsChart/>
                <View style={{marginBottom: 10,}}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: '600',
                        marginBottom: 10,
                        paddingVertical: 5,
                        paddingHorizontal: 15,
                        backgroundColor: Colors.grey["200"]
                    }}>Total Debts</Text>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                    }}>
                        <View style={{
                            flex: 1,
                            alignItems: 'center',
                        }}>
                            <Text style={{
                                fontSize: 12,
                                color: '#7f8c8d',
                                marginBottom: 4,
                            }}>Others owes you</Text>
                            <Text
                                style={[{
                                    fontSize: 14,
                                    fontWeight: '500',
                                    color: '#2c3e50',
                                }, {color: Colors.income.main}]}>₹ {getTotalReceivableDebt()}</Text>
                        </View>
                        <View style={{
                            flex: 1,
                            alignItems: 'center',
                        }}>
                            <Text style={{
                                fontSize: 12,
                                color: '#7f8c8d',
                                marginBottom: 4,
                            }}>{"You owe others"}</Text>
                            <Text
                                style={[{
                                    fontSize: 14,
                                    fontWeight: '500',
                                    color: '#2c3e50',
                                }, {color: Colors.expense.main}]}>₹ {getTotalPayableDebt()}</Text>
                        </View>
                        <View style={{
                            flex: 1,
                            alignItems: 'center',
                        }}>
                            <Text style={{
                                fontSize: 12,
                                color: '#7f8c8d',
                                marginBottom: 4,
                            }}>{"Current\nBalance"}</Text>
                            <Text
                                style={[{
                                    fontSize: 14,
                                    fontWeight: '500',
                                    color: '#2c3e50',
                                }, {color: getTotalBalance() < 0 ? Colors.expense.main : Colors.expense.main}]}>₹ {getTotalBalance()}</Text>
                        </View>
                        <View style={{
                            flex: 1,
                            alignItems: 'center',
                        }}>
                            <Text style={{
                                fontSize: 12,
                                color: '#7f8c8d',
                                marginBottom: 4,
                            }}>Total Balance</Text>
                            <Text style={{
                                fontSize: 14,
                                fontWeight: '500',
                                color: '#2c3e50',
                            }}>₹ {getTotalBalanceAfterSettlement()}</Text>
                            <Text style={{
                                fontSize: 10,
                                color: '#95a5a6',
                                marginBottom: 4,
                            }}>(After settlement)</Text>
                        </View>
                    </View>
                </View>
                <Text style={{
                    fontSize: 16,
                    fontWeight: '600',
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                    backgroundColor: Colors.grey["200"],
                }}>Debts Distribution Among Friends</Text>
                <View style={styles.tableHeader}>
                    <Text style={[styles.tableCell, styles.headerText, styles.nameColumn]}>Friends</Text>
                    <Pressable android_ripple={{color: Colors.rippleColor}}
                               style={styles.sortableHeader}
                               onPress={() => {
                                   setReceivableDebtSort(null)
                                   setTotalDebtSort(null);
                                   if (payableDebtSort === null) {
                                       setPayableDebtSort("desc")
                                   } else if (payableDebtSort === "desc") {
                                       setPayableDebtSort("asc")
                                   } else if (payableDebtSort === "asc") {
                                       setPayableDebtSort(null)
                                   }
                               }}>
                        <Text style={styles.sortableText}>{"Payable\nDebt"}</Text>
                        <Octicons
                            name={payableDebtSort === "asc" ? "sort-asc" : payableDebtSort === "desc" ? "sort-desc" : "list-unordered"}
                            size={18} color="black"/>
                    </Pressable>
                    <Pressable android_ripple={{color: Colors.rippleColor}} style={styles.sortableHeader}
                               onPress={() => {
                                   setPayableDebtSort(null)
                                   setTotalDebtSort(null);
                                   if (receivableDebtSort === null) {
                                       setReceivableDebtSort("desc")
                                   } else if (receivableDebtSort === "desc") {
                                       setReceivableDebtSort("asc")
                                   } else if (receivableDebtSort === "asc") {
                                       setReceivableDebtSort(null)
                                   }
                               }}>
                        <Text style={styles.sortableText}>{"Receivable\nDebt"}</Text>
                        <Octicons
                            name={receivableDebtSort === "asc" ? "sort-asc" : receivableDebtSort === "desc" ? "sort-desc" : "list-unordered"}
                            size={18} color="black"/>
                    </Pressable>
                    <Pressable android_ripple={{color: Colors.rippleColor}} style={styles.sortableHeader}
                               onPress={() => {
                                   setPayableDebtSort(null)
                                   setReceivableDebtSort(null)
                                   if (totalDebtSort === null) {
                                       setTotalDebtSort("desc")
                                   } else if (totalDebtSort === "desc") {
                                       setTotalDebtSort("asc")
                                   } else if (totalDebtSort === "asc") {
                                       setTotalDebtSort(null)
                                   }
                               }}>
                        <Text style={styles.sortableText}>Total</Text>
                        <Octicons
                            name={totalDebtSort === "asc" ? "sort-asc" : totalDebtSort === "desc" ? "sort-desc" : "list-unordered"}
                            size={18} color="black"/>
                    </Pressable>
                </View>
                {(getTotalReceivableDebt() === 0 && getTotalPayableDebt() === 0) ?
                    <Text style={{textAlign: "center", fontWeight: "600", marginTop: 50}}>
                        No Debts</Text> :
                    sortedDebtFriends.map(friend => {
                        return <Pressable android_ripple={{color: Colors.rippleColor}} style={styles.tableRow}
                                          key={friend.id}>
                            <Text style={[styles.tableCell, styles.nameColumn, {flex: 2}]}>{friend.name}</Text>
                            <Text style={[styles.tableCell, {color: Colors.expense.main, flex: 1, marginRight: 25}]}>
                                {getTotalPayableDebt(undefined, undefined, friend.id)}
                            </Text>
                            <Text style={[styles.tableCell, {color: Colors.income.main, flex: 1, marginRight: 25}]}>
                                {getTotalReceivableDebt(undefined, undefined, friend.id)}
                            </Text>
                            <Text
                                style={[styles.tableCell, {
                                    flex: 1,
                                    marginRight: 25
                                }, (getTotalReceivableDebt(undefined, undefined, friend.id) - getTotalPayableDebt(undefined, undefined, friend.id)) < 0 ? {color: Colors.expense.main} : {color: Colors.income.main}]}>
                                {Math.abs(getTotalReceivableDebt(undefined, undefined, friend.id) - getTotalPayableDebt(undefined, undefined, friend.id))}
                            </Text>
                        </Pressable>
                    })}
            </View>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tableHeader: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: Colors.grey["300"],
        backgroundColor: Colors.grey["200"],
        alignItems: "center",
    },
    tableRow: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#eaeaea",
        alignItems: "center",
    },
    tableCell: {
        paddingVertical: 15,
        textAlign: "center",
        fontSize: 14,
        color: "#333",
    },
    nameColumn: {
        flex: 1,
        textAlign: "left",
        paddingLeft: 10,
    },
    headerText: {
        fontWeight: "600",
        fontSize: 14,
        color: "#2c3e50",
    },
    sortableHeader: {
        // flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 5
    },
    sortableText: {
        fontWeight: "600",
        fontSize: 14,
        color: "#2c3e50",
        marginRight: 5, // Add some space between text and icon
    },
});

export default DebtsScreen;