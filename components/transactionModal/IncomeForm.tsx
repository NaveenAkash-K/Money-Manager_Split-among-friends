import {Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View, Switch, ScrollView} from "react-native";
import Colors from "../../constants/Colors";
import React, {useState} from "react";
import useTransactionFormStore from "../../store/useTransactionFormStore";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import {Feather, Ionicons} from "@expo/vector-icons";
// import {Switch} from 'react-native-paper';
// import {Dropdown} from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import {SelectList} from 'react-native-dropdown-select-list'
import AccountTypes from "../../types/AccountTypes";

const data = [
    {key: '1', value: 'Mobiles',},
    {key: '2', value: 'Appliances'},
    {key: '3', value: 'Cameras'},
    {key: '4', value: 'Computers',},
    {key: '5', value: 'Vegetables'},
    {key: '6', value: 'Diary Products'},
    {key: '7', value: 'Drinks'},
]

const IncomeForm = () => {
    const {
        name,
        category,
        subCategory,
        amount,
        accountType,
        description,
        splitPayment,
        shares,
        date,
        time,
        setValue,
        clearForm
    } = useTransactionFormStore();
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    return <View style={{flex: 1}}>
        {show && (
            <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={false}
                onChange={(event, selectedDate) => {
                    const currentDate = selectedDate;
                    setShow(false);
                    setValue({field: "date", value: currentDate})
                }}
            />
        )}
        <ScrollView style={{flex: 1}}>
            <View style={{flexDirection: "row", gap: 15, marginBottom: 10, flex: 1}}>
                <Pressable
                    onPress={() => {
                        setShow(true);
                        setMode("date");
                    }}
                    android_ripple={{color: Colors.grey["200"]}}
                    style={{
                        flex: 1,
                        backgroundColor: Colors.grey["100"],
                        borderRadius: 6,
                        paddingVertical: 10,
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 5,
                    }}>
                    <Feather name="calendar" size={22} color="black"/>
                    <Text style={{textAlign: "center", fontWeight: "bold"}}>{moment(date).format("DD MMM YYYY")}</Text>
                </Pressable>
                <Pressable
                    onPress={() => {
                        setShow(true);
                        setMode("time");
                    }}
                    android_ripple={{color: Colors.grey["200"]}}
                    style={{
                        width: "50%",
                        backgroundColor: Colors.grey["100"],
                        borderRadius: 6,
                        paddingVertical: 10,
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 5,
                    }}>
                    <Feather name="clock" size={22} color="black"/>
                    <Text style={{textAlign: "center", fontWeight: "bold"}}>{moment(date).format("hh:mm A")}</Text>
                </Pressable>
            </View>
            <TextInput
                style={styles.input}
                placeholder="Enter Expense Name"
                placeholderTextColor={Colors.grey["500"]}
                value={name}
                onChangeText={(text) => {
                    setValue({field: "name", value: text})
                }}
            />
            <TextInput
                style={styles.input}
                placeholder="Enter amount"
                placeholderTextColor={Colors.grey["500"]}
                keyboardType="numeric"
                value={amount?.toString()}
                onChangeText={(text) => {
                    setValue({field: "amount", value: text})
                }}
            />
            <TextInput
                style={[styles.input]}
                placeholder="Add description"
                placeholderTextColor={Colors.grey["500"]}
                value={description}
                onChangeText={(text) => {
                    setValue({field: "description", value: text})
                }}
            />
            <SelectList
                setSelected={(val: string) => {
                    console.log(val)
                    setValue({field: "category", value: val})
                }}
                boxStyles={styles.dropdown}
                inputStyles={{color: Colors.grey["800"], fontSize: 14}}
                placeHolderStyle={{color: Colors.grey["500"]}}
                dropdownTextStyles={{color: Colors.grey["600"]}}
                closeicon={<Ionicons name="close" size={18} color={Colors.grey["500"]}/>}
                placeholder={"Select Category"}
                data={data}
                searchicon={<Feather name="search" size={18} color={Colors.grey["500"]} style={{marginRight: 10}}/>}
                searchPlaceholder={"Search Category"}
                save="value"
            />
            <SelectList
                setSelected={(val: string) => {
                    console.log(val)
                    setValue({field: "subCategory", value: val})
                }}
                boxStyles={styles.dropdown}
                inputStyles={{color: Colors.grey["800"], fontSize: 14}}
                placeHolderStyle={{color: Colors.grey["500"]}}
                dropdownTextStyles={{color: Colors.grey["600"]}}
                closeicon={<Ionicons name="close" size={18} color={Colors.grey["500"]}/>}
                placeholder={"Select Sub Category"}
                data={data}
                searchicon={<Feather name="search" size={18} color={Colors.grey["500"]} style={{marginRight: 10}}/>}
                searchPlaceholder={"Search Sub Category"}
                save="value"
            />
            <SelectList
                setSelected={(val: string) => {
                    console.log(val)
                    setValue({field: "accountType", value: val})
                }}
                boxStyles={styles.dropdown}
                inputStyles={{color: Colors.grey["800"], fontSize: 14}}
                placeHolderStyle={{color: Colors.grey["500"]}}
                dropdownTextStyles={{color: Colors.grey["600"]}}
                closeicon={<Ionicons name="close" size={18} color={Colors.grey["500"]}/>}
                placeholder={"Select Account Type"}
                data={[{key: "Cash", value: AccountTypes.Cash},
                    {key: "Account", value: AccountTypes.Account},
                    {key: "Card", value: AccountTypes.Card}]}
                searchicon={<Feather name="search" size={18} color={Colors.grey["500"]} style={{marginRight: 10}}/>}
                searchPlaceholder={"Search Sub Category"}
                save="value"
            />
            <View style={{backgroundColor: Colors.grey["600"], height: 1, width: "100%"}}/>
            <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                <Text style={{fontSize: 18, fontWeight: "500"}}>Split Payment</Text>
                <Switch style={{}} value={splitPayment} onChange={() => {
                    setValue({field: "splitPayment", value: !splitPayment})
                }}/>
            </View>
        </ScrollView>
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, styles.addButton]}>
                <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
        </View>
    </View>
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: Colors.grey["100"],
        backgroundColor: Colors.grey["100"],
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingVertical: 10,
        fontSize: 14,
        color: Colors.grey["800"],
        marginBottom: 10,
    },
    textArea: {
        height: 80,
        textAlignVertical: "top",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    button: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: "center",
        marginHorizontal: 5,
    },
    cancelButton: {
        backgroundColor: Colors.grey["300"],
    },
    addButton: {
        backgroundColor: Colors.income.main,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
    },
    dropdown: {
        marginBottom: 10,
        backgroundColor: Colors.grey["100"],
        borderRadius: 8,
        padding: 12,
        borderWidth: 0,
        color: Colors.grey["400"],
        fontSize: 16,
    }
})

export default IncomeForm