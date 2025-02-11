import {Pressable, ScrollView, StyleSheet, Switch, Text, TextInput, View} from "react-native";
import Colors from "../../constants/Colors";
import React, {useEffect, useState} from "react";
import useTransactionFormStore from "../../store/useTransactionFormStore";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import {Feather} from "@expo/vector-icons";
// import {Switch} from 'react-native-paper';
// import {Dropdown} from 'react-native-element-dropdown';
import AccountTypes from "../../types/AccountTypes";
import TransactionTypes from "../../types/TransactionTypes";
import DebtTypes from "../../types/DebtTypes";
import Expense from "../../models/Expense";
import useTransactionsStore from "../../store/useTransactionsStore";
import Income from "../../models/Income";
import Transfer from "../../models/Transfer";
import Debt from "../../models/Debt";
import Dropdown from "../common/Dropdown";
import useFriendsStore from "../../store/useFriendsStore";
import {Snackbar} from "react-native-paper";
import useCategoriesStore from "../../store/useCategoriesStore";
import useSubCategoriesStore from "../../store/useSubCategoriesStore";

const data = [
    {key: '1', value: 'Mobiles',},
    {key: '2', value: 'Appliances'},
    {key: '3', value: 'Cameras'},
    {key: '4', value: 'Computers',},
    {key: '5', value: 'Vegetables'},
    {key: '6', value: 'Diary Products'},
    {key: '7', value: 'Drinks'},
]

const TransactionForm = (props: { onClose: () => void; }) => {
    const {
        name,
        category,
        subCategory,
        amount,
        accountType,
        description,
        splitPayment,
        shares,
        debtPerson,
        debtType,
        fromAccount,
        toAccount,
        date,
        selectedTransactionType,
        setValue,
        clearForm,
        applyToBalance
    } = useTransactionFormStore();

    const {categories} = useCategoriesStore()
    const {subCategories} = useSubCategoriesStore()

    const {addTransaction} = useTransactionsStore();
    const [isSnackBarVisible, setIsSnackBarVisible] = useState(false)
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [debtTypeLabel, setDebtTypeLabel] = useState<string | undefined>();

    const [isNameError, setIsNameError] = useState(false)
    const [isAmountError, setIsAmountError] = useState(false)
    const [isCategoryError, setIsCategoryError] = useState(false)
    const [isAccountTypeError, setIsAccountTypeError] = useState(false)

    const [isFromAccountError, setIsFromAccountError] = useState(false)
    const [isToAccountError, setIsToAccountError] = useState(false)

    const [isFriendError, setIsFriendError] = useState(false)
    const [isDebtTypeError, setIsDebtTypeError] = useState(false)

    useEffect(() => {
        if (debtType === DebtTypes.Owe) {
            setDebtTypeLabel(debtPerson ? amount ? ("I Owe " + debtPerson.name + " ₹" + amount.toString()) : "I Owe " + debtPerson.name : amount ? ("I Owe Friend" + " ₹" + amount.toString()) : "I Owe Friend");
        } else {
            setDebtTypeLabel(debtPerson ? amount ? (debtPerson.name + " Owes Me" + " ₹" + amount.toString()) : debtPerson.name + " Owes Me" : amount ? "Friend Owes Me" + " ₹" + amount.toString() : "Friend Owes Me")
        }
    }, [debtTypeLabel, debtType, debtPerson, amount]);

    const {friends} = useFriendsStore();

    const handleAddTransaction = () => {
        let isValid = true;

        setIsSnackBarVisible(true);

        // Reset all errors initially
        setIsNameError(false);
        setIsAmountError(false);
        setIsCategoryError(false);
        setIsAccountTypeError(false);
        setIsFromAccountError(false);
        setIsToAccountError(false);
        setIsFriendError(false);
        setIsDebtTypeError(false);

        if (!name) {
            setIsNameError(true);
            isValid = false;
        }

        if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
            setIsAmountError(true);
            isValid = false;
        }

        if (selectedTransactionType === TransactionTypes.Expense) {
            if (!category) {
                setIsCategoryError(true);
                isValid = false;
            }
            if (!accountType) {
                setIsAccountTypeError(true);
                isValid = false;
            }
        } else if (selectedTransactionType === TransactionTypes.Income) {
            if (!category) {
                setIsCategoryError(true);
                isValid = false;
            }
            if (!accountType) {
                setIsAccountTypeError(true);
                isValid = false;
            }
        } else if (selectedTransactionType === TransactionTypes.Transfer) {
            if (!fromAccount) {
                setIsFromAccountError(true);
                isValid = false;
            }
            if (!toAccount) {
                setIsToAccountError(true);
                isValid = false;
            }
        } else if (selectedTransactionType === TransactionTypes.Debt) {
            if (applyToBalance) {
                if (!accountType) {
                    setIsAccountTypeError(true);
                    isValid = false;
                }
            }
            if (!debtPerson) {
                setIsFriendError(true);
                isValid = false;
            }
            if (!debtType) {
                setIsDebtTypeError(true);
                isValid = false;
            }
        }

        if (!isValid) {
            console.log("Validation Failed");
            return; // Stop the function if validation fails
        }

        // Add the transaction if validation passes
        if (selectedTransactionType === TransactionTypes.Expense) {
            addTransaction(
                new Expense(
                    name,
                    parseFloat(amount),
                    accountType,
                    category,
                    date,
                    description,
                    subCategory,
                    splitPayment,
                    shares
                )
            );
        } else if (selectedTransactionType === TransactionTypes.Income) {
            addTransaction(
                new Income(
                    name,
                    parseFloat(amount),
                    accountType,
                    category,
                    date,
                    description,
                    subCategory,
                    splitPayment,
                    shares
                )
            );
        } else if (selectedTransactionType === TransactionTypes.Transfer) {
            addTransaction(
                new Transfer(name, parseFloat(amount), date, fromAccount, toAccount, description)
            );
        } else if (selectedTransactionType === TransactionTypes.Debt) {
            addTransaction(
                new Debt(
                    name,
                    parseFloat(amount),
                    date,
                    debtType,
                    debtPerson,
                    applyToBalance,
                    false,
                    accountType,
                    description,
                )
            );
        }

        console.log("Added Successfully");
        clearForm();
        props.onClose();
    };


    return <View style={{flex: 1}}>
        {show && (
            <DateTimePicker
                testID="dateTimePicker"
                value={date}
                // @ts-ignore
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
                    android_ripple={{color: Colors.rippleColor}}
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
                    android_ripple={{color: Colors.rippleColor}}
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
                style={[styles.input, isNameError ? {borderColor: "#ff5d5d"} : {}]}
                placeholder={selectedTransactionType === "Expense" ? "Enter Expense Name" : selectedTransactionType === "Income" ? "Enter Income Name" : selectedTransactionType === "Debt" ? "Enter Debt Name" : "Enter Transfer Name"}
                placeholderTextColor={Colors.grey["500"]}
                value={name}
                onChangeText={(text) => {
                    setValue({field: "name", value: text})
                }}
            />
            <TextInput
                style={[styles.input, isAmountError ? {borderColor: "#ff5d5d"} : {}]}
                placeholder="Enter amount"
                placeholderTextColor={Colors.grey["500"]}
                keyboardType="number-pad"
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
            {(selectedTransactionType === TransactionTypes.Expense || selectedTransactionType === TransactionTypes.Income) && <>
                <Dropdown
                    // items={[
                    //     {label: "Food", value: "Food"},
                    //     {label: "Transport", value: "Transport"},
                    //     {label: "Entertainment", value: "Entertainment"},
                    //     {label: "Shopping", value: "Shopping"}
                    // ]}
                    items={categories![selectedTransactionType]!.map(category => {
                        return {label: category.name, value: category.id}
                    })}
                    selectedValue={category}
                    onSelect={(item) => setValue({field: "category", value: item.value})}
                    placeholder="Select Category"
                    showTitle
                    title="Choose a Category"
                    error={isCategoryError}
                />
                <Dropdown
                    items={category ? subCategories![category!]!.map(subCategory => {
                        return {label: subCategory.name, value: subCategory.id};
                    }) : []}
                    selectedValue={subCategory}
                    onSelect={(item) => setValue({field: "subCategory", value: item.value})}
                    placeholder="Select Sub Category"
                    fallbackTextOnEmptyItems={"Please select a category first"}
                    showTitle
                    title="Choose a Sub Category"
                />
                <Dropdown
                    items={Object.values(AccountTypes).map((type) => ({
                        label: type,
                        value: type,
                    }))}
                    selectedValue={accountType}
                    onSelect={(item) => setValue({field: "accountType", value: item.value})}
                    placeholder="Select Account Type"
                    showTitle
                    title="Choose a Account Type"
                    error={isAccountTypeError}
                />
            </>}
            {selectedTransactionType === TransactionTypes.Transfer &&
                <>
                    <Dropdown
                        items={Object.values(AccountTypes).map((type) => ({
                            label: type,
                            value: type,
                        }))}
                        selectedValue={fromAccount}
                        onSelect={(item) => setValue({field: "fromAccount", value: item.value})}
                        placeholder="Select From Account"
                        showTitle
                        title="Choose From Account"
                        error={isFromAccountError}
                    />
                    <Dropdown
                        items={Object.values(AccountTypes).map((type) => ({
                            label: type,
                            value: type,
                        }))}
                        selectedValue={toAccount}
                        onSelect={(item) => setValue({field: "toAccount", value: item.value})}
                        placeholder="Select To Account"
                        showTitle
                        title="Choose To Account"
                        error={isToAccountError}
                    />
                </>
            }
            {selectedTransactionType === TransactionTypes.Debt &&
                <>
                    <Dropdown
                        items={friends.map((friend) => ({
                            label: friend.name,
                            value: friend.id,
                        }))}
                        selectedValue={debtPerson?.name}
                        onSelect={(item) => setValue({
                            field: "debtPerson",
                            value: friends.find((friend) => friend.id === item.value)
                        })}
                        placeholder="Select Friend"
                        addFriendButton={true}
                        showTitle
                        title="Choose a Friend"
                        error={isFriendError}
                    />
                    <Dropdown
                        gridItemStyle={{width: "50%"}}
                        items={Object.values(DebtTypes).map((type) => {
                            if (type === "Owe") {
                                return {
                                    label: debtPerson ? amount ? ("I Owe " + debtPerson.name + " ₹" + amount.toString()) : "I Owe " + debtPerson.name : amount ? ("I Owe Friend" + " ₹" + amount.toString()) : "I Owe Friend",
                                    value: type,
                                }
                            } else {
                                return {
                                    label: debtPerson ? amount ? (debtPerson.name + " Owes Me" + " ₹" + amount.toString()) : debtPerson.name + " Owes Me" : amount ? "Friend Owes Me" + " ₹" + amount.toString() : "Friend Owes Me",
                                    value: type,
                                }
                            }
                        })}
                        label={debtTypeLabel}
                        selectedValue={debtType}
                        onSelect={(item) => setValue({field: "debtType", value: item.value})}
                        placeholder="Select Debt Type"
                        showTitle
                        title="Choose Debt Type"
                        error={isDebtTypeError}
                    />
                    {debtType && <>
                        <View style={{backgroundColor: Colors.grey["600"], height: 1, width: "100%"}}/>
                        <View style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginVertical: 10
                        }}>
                            <View style={{}}>
                                <Text style={{
                                    fontSize: 18,
                                    fontWeight: "500"
                                }}>{debtType === DebtTypes.Owe ? amount ? ("Add ₹ " + amount + " to balance") : "Add to balance" : amount ? ("Deduct ₹ " + amount + " from balance") : "Deduct from balance"}</Text>
                                <Text style={{
                                    fontSize: 10,
                                    color: Colors.grey["500"]
                                    // fontWeight: "500"
                                }}>{debtType === DebtTypes.Owe ? "This amount will be added as income" : "This amount will be added as expense"}</Text>
                            </View>
                            <Switch style={{}} value={applyToBalance} onChange={() => {
                                setValue({field: "applyToBalance", value: !applyToBalance})
                            }}/>
                        </View>
                        {applyToBalance && <Dropdown
                            items={Object.values(AccountTypes).map((type) => ({
                                label: type,
                                value: type,
                            }))}
                            selectedValue={accountType}
                            onSelect={(item) => setValue({field: "accountType", value: item.value})}
                            placeholder="Select Account Type"
                            showTitle
                            title="Choose a Account Type"
                            error={isAccountTypeError}
                        />}
                    </>}
                </>
            }
            {/*{(selectedTransactionType === "Income" || selectedTransactionType === "Expense") && <>*/
            }
            {/*    <View style={{backgroundColor: Colors.grey["600"], height: 1, width: "100%"}}/>*/
            }
            {/*    <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>*/
            }
            {/*        <Text style={{fontSize: 18, fontWeight: "500"}}>Split Payment</Text>*/
            }
            {/*        <Switch style={{}} value={splitPayment} onChange={() => {*/
            }
            {/*            setValue({field: "splitPayment", value: !splitPayment})*/
            }
            {/*        }}/>*/
            }
            {/*    </View>*/
            }
            {/*</>}*/
            }
        </ScrollView>
        <View style={styles.buttonContainer}>
            <Pressable style={[styles.button, styles.addButton]}
                       onPress={handleAddTransaction}
                       android_ripple={{color: Colors.rippleColor}}>
                <Text style={styles.buttonText}>Save</Text>
            </Pressable>
        </View>
        <Snackbar
            visible={isSnackBarVisible}
            onDismiss={() => setIsSnackBarVisible(false)}
            action={{
                label: 'Close'
            }}
        >
            Fill in all the inputs
        </Snackbar>
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
        marginTop: 10,
    },
    button: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: "center",
        marginHorizontal: 5,
    },
    cancelButton: {
        backgroundColor: Colors.grey["300"],
    },
    addButton: {
        backgroundColor: "#3b5fff",
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

export default TransactionForm