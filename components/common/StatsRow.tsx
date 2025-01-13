import {Text, View} from "react-native";
import Colors from "../../constants/Colors";
import AccountTypes from "../../types/AccountTypes";
import React from "react";

const StatsRow = (props: { totalIncome: number; totalExpense: number; cashflow: number; totalBalance: number; }) => {
    return <View style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    }}>
        <View style={{
            // paddingVertical: 10,
            paddingTop: 10,
            paddingHorizontal: 15,
            alignItems: 'center',
        }}>
            <Text style={{
                fontSize: 13,
                color: '#7f8c8d',
                marginBottom: 4,
            }}>Income</Text>
            <Text
                style={[{
                    fontSize: 14,
                    fontWeight: '500',
                    color: '#2c3e50',
                }, {color: Colors.income.main}]}>{`₹ ${props.totalIncome}`}</Text>
        </View>
        <View style={{
            // paddingVertical: 10,
            paddingTop: 10,
            paddingHorizontal: 15,
            alignItems: 'center',
        }}>
            <Text style={{
                fontSize: 13,
                color: '#7f8c8d',
                marginBottom: 4,
            }}>Expenses</Text>
            <Text
                style={[{
                    fontSize: 14,
                    fontWeight: '500',
                    color: '#2c3e50',
                }, {color: Colors.expense.main}]}>{`₹ ${props.totalExpense}`}</Text>
        </View>
        <View style={{
            // paddingVertical: 10,
            paddingTop: 10,
            paddingHorizontal: 15,
            alignItems: 'center',
        }}>
            <Text style={{
                fontSize: 13,
                color: '#7f8c8d',
                marginBottom: 4,
            }}>Cashflow</Text>
            <Text
                style={[{
                    fontSize: 14,
                    fontWeight: '500',
                    color: '#2c3e50',
                }, (props.cashflow < 0) ? {color: Colors.expense.main} : {color: Colors.income.main}]}>{`₹ ${Math.abs(props.cashflow)}`}
            </Text>
        </View>
        <View style={{
            height: '90%',
            width: 1,
            backgroundColor: Colors.grey["300"],
            borderRadius: 100,
        }}/>
        <View style={{
            // paddingVertical: 10,
            paddingTop: 10,
            paddingHorizontal: 15,
            alignItems: 'center',
        }}>
            <Text style={{
                fontSize: 13,
                color: '#7f8c8d',
                marginBottom: 4,
            }}>Total Balance</Text>
            <Text style={{
                fontSize: 14,
                fontWeight: '500',
                color: '#2c3e50',
            }}>{"₹ " + (props.totalBalance)}</Text>
        </View>
    </View>
}

export default StatsRow;