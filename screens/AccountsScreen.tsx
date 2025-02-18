import React, {useState} from "react";
import {View, Text, StyleSheet, Dimensions} from "react-native";
// import {G, Text as SVGText} from "react-native-svg";
// import {PanGestureHandler} from "react-native-gesture-handler";
import Animated, {useSharedValue, useAnimatedStyle, withSpring} from "react-native-reanimated";
import Colors from "../constants/Colors";
import useTransactionsStore from "../store/useTransactionsStore";
import AccountTypes from "../types/AccountTypes";
import StatsRow from "../components/common/StatsRow";
import AccountsChart from "../components/accountsScreen/AccountsChart";
import useBalanceStore from "../store/useBalanceStore";

const {width: SCREEN_WIDTH} = Dimensions.get("window");

const primaryColor = "#3b5fff";
const darkerShade = "#8faeff";
const lighterShade = "#001f5b";

const AccountsScreen = () => {
    const [chartType, setChartType] = useState("Expense"); // Track current chart type
    const {getTotalIncome, getTotalExpense, getTotalBalance} = useTransactionsStore();
    const {Cash, Card, Account} = useBalanceStore()
    const translateX = useSharedValue(0);


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
                        totalIncome={Card.income}
                        totalExpense={Card.expense}
                        cashflow={Card.cashflow}
                        totalBalance={Card.balance}
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
                        totalIncome={Cash.income}
                        totalExpense={Cash.expense}
                        cashflow={Cash.cashflow}
                        totalBalance={Cash.balance}
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
                        totalIncome={Account.income}
                        totalExpense={Account.expense}
                        cashflow={Account.cashflow}
                        totalBalance={Account.balance}
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
