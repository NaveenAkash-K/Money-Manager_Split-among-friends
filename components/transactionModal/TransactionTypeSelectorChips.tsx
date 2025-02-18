import {Pressable, Text, View} from "react-native";
import TransactionTypes from "../../types/TransactionTypes";
import Colors from "../../constants/Colors";
import useTransactionFormStore from "../../store/useTransactionFormStore";

const TransactionTypeSelectorChips = () => {
    const {setValue, selectedTransactionType} = useTransactionFormStore();

    return <View style={{flexDirection: "row", gap: 10, marginBottom: 20, marginTop: 10}}>
        <Pressable
            onPress={() => {
                setValue({field: "selectedTransactionType", value: TransactionTypes.Income})
            }}
            style={{
                borderWidth: 1.5,
                borderColor: selectedTransactionType === TransactionTypes.Income ? Colors.income.main : Colors.grey["700"],
                paddingVertical: 5,
                borderRadius: 8,
                flex: 1
            }}><Text
            style={{
                textAlign: "center",
                fontWeight: "500",
                color: selectedTransactionType === TransactionTypes.Income ? Colors.income.main : Colors.grey["700"]
            }}>Income</Text>
        </Pressable>
        <Pressable
            onPress={() => {
                setValue({field: "selectedTransactionType", value: TransactionTypes.Expense})
            }}
            style={{
                borderWidth: 1.5,
                borderColor: selectedTransactionType === TransactionTypes.Expense ? Colors.expense.main : Colors.grey["700"],
                paddingVertical: 5,
                borderRadius: 8,
                flex: 1
            }}><Text
            style={{
                textAlign: "center",
                fontWeight: "500",
                color: selectedTransactionType === TransactionTypes.Expense ? Colors.expense.main : Colors.grey["700"]
            }}>Expense</Text>
        </Pressable>
        {/*<Pressable*/}
        {/*    onPress={() => {*/}
        {/*        setValue({field: "selectedTransactionType", value: TransactionTypes.Transfer})*/}
        {/*    }}*/}
        {/*    style={{*/}
        {/*        borderWidth: 1.5,*/}
        {/*        borderColor: selectedTransactionType === TransactionTypes.Transfer ? "#3b5fff" : Colors.grey["700"],*/}
        {/*        paddingVertical: 5,*/}
        {/*        borderRadius: 8,*/}
        {/*        flex: 1*/}
        {/*    }}><Text*/}
        {/*    style={{*/}
        {/*        textAlign: "center",*/}
        {/*        fontWeight: "500",*/}
        {/*        color: selectedTransactionType === TransactionTypes.Transfer ? "#3b5fff" : Colors.grey["700"]*/}
        {/*    }}>Transfer</Text>*/}
        {/*</Pressable>*/}
        {/*<Pressable*/}
        {/*    onPress={() => {*/}
        {/*        setValue({field: "selectedTransactionType", value: TransactionTypes.Debt})*/}
        {/*    }}*/}
        {/*    style={{*/}
        {/*        borderWidth: 1.5,*/}
        {/*        borderColor: selectedTransactionType === TransactionTypes.Debt ? "#3b5fff" : Colors.grey["700"],*/}
        {/*        paddingVertical: 5,*/}
        {/*        borderRadius: 8,*/}
        {/*        flex: 1*/}
        {/*    }}><Text*/}
        {/*    style={{*/}
        {/*        textAlign: "center",*/}
        {/*        fontWeight: "500",*/}
        {/*        color: selectedTransactionType === TransactionTypes.Debt ? "#3b5fff" : Colors.grey["700"]*/}
        {/*    }}>Debt</Text>*/}
        {/*</Pressable>*/}
    </View>
}

export default TransactionTypeSelectorChips;