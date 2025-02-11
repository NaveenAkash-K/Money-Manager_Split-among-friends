import React, {useState} from "react";
import {View, Text, StyleSheet, Dimensions} from "react-native";
import {PieChart} from "react-native-svg-charts";
import {G, Text as SVGText} from "react-native-svg";
import {PanGestureHandler} from "react-native-gesture-handler";
import Animated, {useSharedValue, useAnimatedStyle, withSpring} from "react-native-reanimated";
import Colors from "../constants/Colors";
import useTransactionsStore from "../store/useTransactionsStore";
import AccountTypes from "../types/AccountTypes";
import StatsRow from "../components/common/StatsRow";
import AccountsChart from "../components/accountsScreen/AccountsChart";

const {width: SCREEN_WIDTH} = Dimensions.get("window");

const primaryColor = "#3b5fff";
const darkerShade = "#8faeff";
const lighterShade = "#001f5b";

const AccountsScreen = () => {
    const [chartType, setChartType] = useState("Expense"); // Track current chart type
    const {getTotalIncome, getTotalExpense, getTotalBalance} = useTransactionsStore();
    const translateX = useSharedValue(0);

    console.log(getTotalIncome(undefined, AccountTypes.Cash))

    return (
        <View>
            <AccountsChart/>
            <View style={{borderTopWidth: 1, borderTopColor: "#B0BEC5"}}>
                {/* Card Account */}
                <View style={{marginBottom: 20}}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: '600',
                        marginBottom: 10,
                        paddingVertical: 5,
                        paddingHorizontal: 15,
                        backgroundColor: Colors.grey["200"]
                    }}>Card</Text>
                    <StatsRow
                        totalIncome={getTotalIncome(undefined, AccountTypes.Card)}
                        totalExpense={getTotalExpense(undefined, AccountTypes.Card)}
                        cashflow={parseFloat((getTotalIncome(undefined, AccountTypes.Card) - getTotalExpense(undefined, AccountTypes.Card)).toFixed(1))}
                        totalBalance={getTotalBalance(AccountTypes.Card)}
                    />
                </View>

                {/* Cash Account */}
                <View style={{marginBottom: 20}}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: '600',
                        marginBottom: 10,
                        paddingVertical: 5,
                        paddingHorizontal: 15,
                        backgroundColor: Colors.grey["200"]
                    }}>Cash</Text>
                    <StatsRow
                        totalIncome={getTotalIncome(undefined, AccountTypes.Cash)}
                        totalExpense={getTotalExpense(undefined, AccountTypes.Cash)}
                        cashflow={parseFloat((getTotalIncome(undefined, AccountTypes.Cash) - getTotalExpense(undefined, AccountTypes.Cash)).toFixed(1))}
                        totalBalance={getTotalBalance(AccountTypes.Cash)}
                    />
                </View>

                {/* Account Account */}
                <View style={{marginBottom: 20}}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: '600',
                        marginBottom: 10,
                        paddingVertical: 5,
                        paddingHorizontal: 15,
                        backgroundColor: Colors.grey["200"]
                    }}>Accounts</Text>
                    <StatsRow
                        totalIncome={getTotalIncome(undefined, AccountTypes.Account)}
                        totalExpense={getTotalExpense(undefined, AccountTypes.Account)}
                        cashflow={parseFloat((getTotalIncome(undefined, AccountTypes.Account) - getTotalExpense(undefined, AccountTypes.Account)).toFixed(1))}
                        totalBalance={getTotalBalance(AccountTypes.Account)}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    chartContainer: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        height: 250,
        gap: 20,
    },
    chart: {
        height: 200,
        width: 200,
    },
    title: {
        marginTop: 20,
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
    legendContainer: {
        marginTop: 20,
        width: "100%",
    },
    legendItem: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    legendColor: {
        width: 16,
        height: 16,
        borderRadius: 8,
        marginRight: 10,
    },
    legendText: {
        fontSize: 14,
        color: "#333",
    },
});

export default AccountsScreen;
