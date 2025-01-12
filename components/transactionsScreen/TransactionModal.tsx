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
import TransactionForm from "../transactionModal/TransactionForm";
import AntDesign from "@expo/vector-icons/AntDesign";
import useTransactionFormStore from "../../store/useTransactionFormStore";
import Expense from "../../models/Expense";

const TransactionModal = (props: { isVisible: boolean; onClose: () => void }) => {

    const {selectedTransactionType, clearForm} = useTransactionFormStore();

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
                           onPress={() => {
                               props.onClose()
                               clearForm()
                           }}>
                    <AntDesign name="arrowleft" size={24} color="black" style={{padding: 10, borderRadius: 8}}/>
                </Pressable>
                <Text style={{fontSize: 18, fontWeight: "600"}}>{selectedTransactionType}</Text>
            </View>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                style={styles.container}
            >
                <TransactionTypeSelectorChips/>
                <TransactionForm onClose={props.onClose}/>
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
});

export default TransactionModal;
