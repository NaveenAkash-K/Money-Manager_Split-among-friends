import React, {useState} from "react";
import {Pressable, View, Text, StyleSheet} from "react-native";
import {Entypo} from "@expo/vector-icons";
import moment from "moment";
import Colors from "../../constants/Colors";
import MonthPicker from "../common/MonthPicker.js";
import useNonPersistStore from "../../store/useNonPersistStore";

const DateChanger = () => {

    const {transactionDate, setTransactionDate} = useNonPersistStore();

    // Handle Year and Month Changes
    const changeMonth = (increment: number) => {
        const newDate = new Date(transactionDate);
        newDate.setMonth(transactionDate.getMonth() + increment); // Change the month
        setTransactionDate(newDate); // Update the date
    };

    return (
        <View style={styles.container}>
            <View style={styles.iconWrapper}>
                <Pressable
                    android_ripple={{color: Colors.rippleColor}}
                    style={styles.iconButton}
                    onPress={() => changeMonth(-1)}
                >
                    <Entypo name="chevron-left" size={18} color="black"/>
                </Pressable>
            </View>
            <MonthPicker
                selectedDate={transactionDate}
                setSelectedDate={setTransactionDate}
            />
            <View style={styles.iconWrapper}>
                <Pressable
                    android_ripple={{color: Colors.rippleColor}}
                    style={styles.iconButton}
                    onPress={() => changeMonth(1)}
                >
                    <Entypo name="chevron-right" size={18} color="black"/>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 5,
    },
    iconWrapper: {
        borderRadius: 200,
        overflow: "hidden",
    },
    iconButton: {
        padding: 10,
    },
});

export default DateChanger;
