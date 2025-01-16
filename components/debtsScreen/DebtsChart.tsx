import React, {useState} from "react";
import {View, Text, StyleSheet, Dimensions} from "react-native";
import {PieChart} from "react-native-svg-charts";
import {PanGestureHandler} from "react-native-gesture-handler";
import Animated, {useSharedValue, useAnimatedStyle, withSpring} from "react-native-reanimated";
import {G, Text as SVGText} from "react-native-svg";
import useTransactionsStore from "../../store/useTransactionsStore";
import AccountTypes from "../../types/AccountTypes";

const {width: SCREEN_WIDTH} = Dimensions.get("window");

const primaryColor = "#3b5fff";
const darkerShade = "#8faeff";
const lighterShade = "#001f5b";

const AccountsChart = () => {
    const {getTotalPayableDebt, getTotalReceivableDebt} = useTransactionsStore();


    const debtData = [
        {value: getTotalPayableDebt(), svg: {fill: primaryColor}, key: "You Owe Others"},
        {value: getTotalReceivableDebt(), svg: {fill: darkerShade}, key: "Others Owes You"},
    ]


    const totalDebt = debtData.reduce((sum, item) => sum + item.value, 0);

    const pieData = debtData.map((slice, index) => ({
        ...slice,
        key: `pie-${index}`,
        labelCentroid: slice.value,
        label: `${((slice.value / totalDebt) * 100).toFixed(1)}%`,
    }));

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
        <View style={{alignItems: "center", marginBottom: 20}}>
            <View style={[styles.chartContainer]}>
                {totalDebt === 0 ? (
                    <Text style={styles.noDataText}>
                        {"No Debts"}
                    </Text>
                ) : (
                    <>
                        <PieChart style={styles.chart} data={pieData} animate>
                            <Labels/>
                        </PieChart>
                        <View>
                            <Text style={styles.title}>Debts Distribution</Text>
                            <View style={styles.legendContainer}>
                                {debtData.map((item, index) => {
                                    const percentage = ((item.value / totalDebt) * 100).toFixed(1);
                                    return (
                                        <View key={index} style={styles.legendItem}>
                                            <View
                                                style={[
                                                    styles.legendColor,
                                                    {backgroundColor: item.svg.fill},
                                                ]}
                                            />
                                            <View>
                                                <Text style={styles.legendText}>
                                                    {item.key}
                                                </Text>
                                                <Text style={[styles.legendText, {textAlign: "center"}]}>
                                                    {percentage}%
                                                </Text>
                                            </View>
                                        </View>
                                    );
                                })}
                            </View>
                        </View>
                    </>
                )}

                {/* Pagination Dots */}
            </View>
            {/*<View style={styles.paginationContainer}>*/}
            {/*    <View*/}
            {/*        style={[*/}
            {/*            styles.paginationDot,*/}
            {/*            chartType === "Expense" && styles.activeDot,*/}
            {/*        ]}*/}
            {/*    />*/}
            {/*    <View*/}
            {/*        style={[*/}
            {/*            styles.paginationDot,*/}
            {/*            chartType === "Income" && styles.activeDot,*/}
            {/*        ]}*/}
            {/*    />*/}
            {/*</View>*/}
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
    noDataText: {
        fontSize: 16,
        fontWeight: "bold",
    },
    swipeText: {
        marginTop: 10,
        fontSize: 12,
        color: "#888",
    },
    paginationContainer: {
        flexDirection: "row",
        marginTop: 10,
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#ccc",
        marginHorizontal: 5,
    },
    activeDot: {
        backgroundColor: primaryColor,
    },
});

export default AccountsChart;
