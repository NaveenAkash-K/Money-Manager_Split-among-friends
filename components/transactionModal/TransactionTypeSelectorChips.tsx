import {Pressable, Text, View} from "react-native";
import TransactionTypes from "../../types/TransactionTypes";
import Colors from "../../constants/Colors";

const TransactionTypeSelectorChips = (props: {
    setSelectedTransactionType: (arg0: TransactionTypes) => void;
    selectedTransactionType: TransactionTypes;
}) => {
    return <View style={{flexDirection: "row", gap: 10, marginBottom:20, marginTop:10}}>
        <Pressable
            onPress={() => {
                props.setSelectedTransactionType(TransactionTypes.Income)
            }}
            style={{
                borderWidth: 1.5,
                borderColor: props.selectedTransactionType === TransactionTypes.Income ? Colors.income.main : Colors.grey["700"],
                paddingVertical: 5,
                borderRadius: 8,
                flex: 1
            }}><Text
            style={{
                textAlign: "center",
                fontWeight: "500",
                color: props.selectedTransactionType === TransactionTypes.Income ? Colors.income.main : Colors.grey["700"]
            }}>Income</Text></Pressable>
        <Pressable
            onPress={() => {
                props.setSelectedTransactionType(TransactionTypes.Expense)
            }}
            style={{
                borderWidth: 1.5,
                borderColor: props.selectedTransactionType === TransactionTypes.Expense ? Colors.expense.main : Colors.grey["700"],
                paddingVertical: 5,
                borderRadius: 8,
                flex: 1
            }}><Text
            style={{
                textAlign: "center",
                fontWeight: "500",
                color: props.selectedTransactionType === TransactionTypes.Expense ? Colors.expense.main : Colors.grey["700"]
            }}>Expense</Text></Pressable>
        <Pressable
            onPress={() => {
                props.setSelectedTransactionType(TransactionTypes.Transfer)
            }}
            style={{
                borderWidth: 1.5,
                borderColor: props.selectedTransactionType === TransactionTypes.Transfer ? "#7637a6" : Colors.grey["700"],
                paddingVertical: 5,
                borderRadius: 8,
                flex: 1
            }}><Text
            style={{
                textAlign: "center",
                fontWeight: "500",
                color: props.selectedTransactionType === TransactionTypes.Transfer ? "#7637a6" : Colors.grey["700"]
            }}>Transfer</Text></Pressable>
        <Pressable
            onPress={() => {
                props.setSelectedTransactionType(TransactionTypes.Debt)
            }}
            style={{
                borderWidth: 1.5,
                borderColor: props.selectedTransactionType === TransactionTypes.Debt ? "#7637a6" : Colors.grey["700"],
                paddingVertical: 5,
                borderRadius: 8,
                flex: 1
            }}><Text
            style={{
                textAlign: "center",
                fontWeight: "500",
                color: props.selectedTransactionType === TransactionTypes.Debt ? "#7637a6" : Colors.grey["700"]
            }}>Debt</Text></Pressable>
    </View>
}

export default TransactionTypeSelectorChips;