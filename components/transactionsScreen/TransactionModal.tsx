import React, {useState} from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    Pressable,
    View,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    Modal
} from "react-native";
import {ReactNativeModal} from "react-native-modal";
import TransactionTypes from "../../types/TransactionTypes";
import Colors from "../../constants/Colors";
import TransactionTypeSelectorChips from "../transactionModal/TransactionTypeSelectorChips";
import IncomeForm from "../transactionModal/IncomeForm";
import AntDesign from "@expo/vector-icons/AntDesign";

const TransactionModal = (props: { isVisible: boolean; onClose: () => void }) => {
    const [selectedTransactionType, setSelectedTransactionType] = useState<TransactionTypes>(
        TransactionTypes.Expense
    );
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");

    const handleAddTransaction = () => {
        // Add transaction logic here
        console.log({
            type: selectedTransactionType,
            amount,
            date,
            description,
        });
        props.onClose();
    };

    return (
        <Modal
            visible={props.isVisible}
            style={styles.modal}
            animationType={"slide"}
        >
            <View style={{
                flexDirection: "row",
                alignItems: "center",
                marginHorizontal: 10,
                marginTop: 5,
                marginRight: 5
            }}>
                <Pressable android_ripple={{color: Colors.grey["200"]}} style={{borderRadius: 8}}
                           onPress={props.onClose}>
                    <AntDesign name="arrowleft" size={24} color="black" style={{padding: 10, borderRadius: 8}}/>
                </Pressable>
                <Text style={{fontSize: 18, fontWeight: "600"}}>Add Income</Text>
            </View>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                style={styles.container}
            >
                {/*<View style={styles.handle}/>*/}
                <TransactionTypeSelectorChips
                    setSelectedTransactionType={setSelectedTransactionType}
                    selectedTransactionType={selectedTransactionType}
                />
                <IncomeForm/>
            </KeyboardAvoidingView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modal: {
        justifyContent: "flex-end",
        margin: 0,
    },
    container: {
        flex: 1,
        backgroundColor: "white",
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        paddingHorizontal: 20,
        paddingVertical: 0,
    },
    handle: {
        width: 40,
        height: 5,
        backgroundColor: "#ccc",
        borderRadius: 2.5,
        alignSelf: "center",
        marginVertical: 10,
    },
});

export default TransactionModal;
