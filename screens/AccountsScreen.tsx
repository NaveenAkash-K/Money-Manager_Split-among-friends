import React, {useState} from "react";
import {View, Text, StyleSheet} from "react-native";
import {PieChart} from "react-native-svg-charts";
import {G, Text as SVGText} from "react-native-svg";
import Colors from "../constants/Colors";
import useTransactionsStore from "../store/useTransactionsStore";
import AccountTypes from "../types/AccountTypes";
import StatsRow from "../components/common/StatsRow";

const primaryColor = "#3b5fff";
const darkerShade = "#8faeff";
const lighterShade = "#001f5b";

const AccountsScreen = () => {
    const [selectedSlice, setSelectedSlice] = useState(null);
    const {getTotalIncome, getTotalExpense, getTotalBalance} = useTransactionsStore()
    const totalValue = 98 + 30 + 20;
    const data = [
        {value: 98, svg: {fill: primaryColor}, key: "Cash"},
        {value: 30, svg: {fill: lighterShade}, key: "Account"},
        {value: 20, svg: {fill: darkerShade}, key: "Card"},
    ];

    // Pie Data with percentage and touch events
    const pieData = data.map((slice, index) => ({
        ...slice,
        // arc: {outerRadius: "100%", innerRadius: "60%"},
        key: `pie-${index}`,
        labelCentroid: slice.value, // For positioning labels correctly
        label: `${((slice.value / totalValue) * 100).toFixed(1)}%`, // Percentage
        onPress: () => setSelectedSlice(slice), // Handle slice tap
    }));

    // Custom Labels Component
    const Labels = ({slices}) => {
        return slices.map((slice, index) => {
            const {pieCentroid, data} = slice;
            return (
                <SVGText
                    key={index}
                    x={pieCentroid[0]}
                    y={pieCentroid[1]}
                    fill="white"
                    textAnchor="middle"
                    alignmentBaseline="middle"
                    fontSize={14}
                    style={{fontWeight: "bold"}}
                >
                    {data.label}
                </SVGText>
            );
        });
    };

    return (
        <View>
            <View style={{
                flexDirection: "row",
                gap: 25,
                marginTop: 20,
                marginBottom: 20,
                alignItems: "center",
                justifyContent: "center"
            }}>
                <PieChart
                    style={styles.chart}
                    data={pieData}
                    animate
                >
                    {/* Render custom labels */}
                    <Labels/>
                </PieChart>
                <View>
                    <Text style={styles.title}>Account Distribution</Text>
                    <View style={styles.legendContainer}>
                        {data.map((item, index) => (
                            <View key={index} style={styles.legendItem}>
                                <View
                                    style={[
                                        styles.legendColor,
                                        {backgroundColor: item.svg.fill},
                                    ]}
                                />
                                <Text style={styles.legendText}>{item.key}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </View>
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
        width: "60%",
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
    detailContainer: {
        position: "absolute",
        top: "50%",
        alignItems: "center",
        width: "100%",
    },
    detailText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
});

export default AccountsScreen;
