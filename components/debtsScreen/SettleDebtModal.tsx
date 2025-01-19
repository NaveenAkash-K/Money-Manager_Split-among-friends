import React, {useState} from "react";
import Modal from "react-native-modal";
import {StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList, Pressable} from "react-native";
import Colors from "../../constants/Colors";

const SettleDebtModal = (props) => {
    const [settlementType, setSettlementType] = useState(null); // Tracks "partial" or "full"
    const [partialAmount, setPartialAmount] = useState(""); // Tracks partial settlement amount
    const [error, setError] = useState(""); // Tracks validation errors

    // Calculate remaining debt after deducting payment logs
    const totalPaid = props.paymentLogs.reduce((acc, log) => acc + parseFloat(log.amount), 0);
    const remainingDebt = props.data.amount - totalPaid;

    const handleSettle = () => {
        // Validate partial amount if applicable
        if (settlementType === "partial") {
            const parsedAmount = parseFloat(partialAmount);
            if (isNaN(parsedAmount) || parsedAmount <= 0) {
                setError(`Please enter a valid amount.`);
                return;
            }
            if (parsedAmount > remainingDebt) {
                setError(`Amount cannot be greater than ₹${remainingDebt.toFixed(2)}.`);
                return;
            }
        }
        setError(""); // Clear error if validation passes

        props.onSettle({
            type: settlementType,
            amount: settlementType === "full" ? remainingDebt : parseFloat(partialAmount),
        });
        props.onClose();
    };

    const renderSettlementLog = ({item}) => (
        <View style={styles.logItem}>
            <View style={styles.logDetails}>
                <Text style={styles.logAmount}>₹{parseFloat(item.amount).toLocaleString()}</Text>
                {item.description && (
                    <Text style={styles.logDescription}>{item.description}</Text>
                )}
            </View>
            <Text style={styles.logDate}>{new Date(item.date).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
            })}</Text>
        </View>
    );

    return (
        <Modal
            isVisible={props.isVisible}
            onBackdropPress={props.onClose}
            onSwipeComplete={props.onClose}
            swipeDirection="down"
            backdropTransitionOutTiming={10}
            propagateSwipe={true}
            style={[styles.modal, props.modalStyle]}
        >
            <View style={styles.modalBody}>
                {/* Header */}
                <View style={[styles.modalHeader, props.modalHeaderStyle]}>
                    <View style={styles.modalHandle}></View>
                    <Text style={[styles.modalTitle, props.titleStyle]}>Settle Debt</Text>
                </View>

                {/* Content */}
                <View style={styles.contentContainer}>
                    {/* Debt Details */}
                    <View style={styles.row}>
                        <Text style={styles.label}>Total Debt Amount:</Text>
                        <Text style={styles.value}>₹{props.data.amount.toLocaleString()}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Debtor's Name:</Text>
                        <Text style={styles.value}>{props.data.debtPerson.name}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Settled Amount:</Text>
                        <Text
                            style={[
                                styles.value,
                                {color: remainingDebt > 0 ? "red" : "green"},
                            ]}
                        >
                            ₹{remainingDebt.toFixed(2)}
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Remaining Debt:</Text>
                        <Text
                            style={[
                                styles.value,
                                {color: remainingDebt > 0 ? "red" : "green"},
                            ]}
                        >
                            ₹{remainingDebt.toFixed(2)}
                        </Text>
                    </View>

                    {/* Payment Logs */}
                    <Text style={[styles.sectionTitle, {marginTop: 10}]}>Settlement Logs</Text>
                    {props.paymentLogs.length > 0 ? (
                        <FlatList
                            data={props.paymentLogs}
                            renderItem={renderSettlementLog}
                            keyExtractor={(item, index) => index.toString()}
                            contentContainerStyle={styles.logList}
                            ItemSeparatorComponent={() => <View
                                style={{height: 1, width: "100%", backgroundColor: Colors.grey["300"]}}/>}
                        />
                    ) : (
                        <Text style={styles.noLogsText}>
                            No Settlement have been logged yet.
                        </Text>
                    )}

                    {/* Settlement Options */}
                    <Text style={[styles.sectionTitle, {marginBottom: 10}]}>Settlement Options</Text>
                    <View style={styles.optionsContainer}>
                        <Pressable
                            android_ripple={{color: Colors.rippleColor}}
                            style={[
                                styles.optionButton,
                                settlementType === "partial" && styles.optionButtonActive,
                            ]}
                            onPress={() => setSettlementType("partial")}
                        >
                            <Text style={styles.optionText}>Partial Settlement</Text>
                        </Pressable>
                        <Pressable
                            android_ripple={{color: Colors.rippleColor}}
                            style={[
                                styles.optionButton,
                                settlementType === "full" && styles.optionButtonActive,
                            ]}
                            onPress={() => setSettlementType("full")}
                        >
                            <Text style={styles.optionText}>Full Settlement</Text>
                        </Pressable>
                    </View>

                    {/* Partial Settlement Amount Input */}
                    {settlementType === "partial" && (
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={[
                                    styles.input,
                                    error && {borderColor: "red"},
                                ]}
                                keyboardType="numeric"
                                value={partialAmount}
                                onChangeText={(text) => setPartialAmount(text)}
                                placeholder={`Enter settlement amount`}
                            />
                        </View>
                    )}
                </View>

                {/* Action Button */}
                <TouchableOpacity
                    style={[
                        styles.settleButton,
                        !settlementType && {backgroundColor: "#ccc"},
                    ]}
                    onPress={handleSettle}
                    disabled={!settlementType}
                >
                    <Text style={styles.settleButtonText}>
                        {settlementType === "full"
                            ? "Proceed to Full Settlement"
                            : "Proceed to Settlement"}
                    </Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modal: {
        justifyContent: "flex-end",
        margin: 0,
    },
    modalBody: {
        backgroundColor: "#fff",
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        maxHeight: "80%",
        paddingHorizontal: 20,
        paddingBottom: 20,
        elevation: 5,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: {width: 0, height: -2},
    },
    modalHeader: {
        borderBottomWidth: 1,
        borderBottomColor: "#f0f0f0",
        paddingVertical: 12,
        marginBottom: 15,
    },
    modalHandle: {
        width: 40,
        height: 5,
        backgroundColor: "#ccc",
        borderRadius: 2.5,
        alignSelf: "center",
        marginBottom: 8,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "600",
        textAlign: "center",
        color: "#333",
    },
    contentContainer: {
        marginTop: 10,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 8,
    },
    label: {
        fontSize: 16,
        color: "#555",
        fontWeight: "600",
    },
    value: {
        fontSize: 16,
        fontWeight: "500",
        color: "#222",
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#333",
        // marginTop: 10,
        marginBottom: 5,
    },
    logList: {
        marginBottom: 10,
    },
    logItem: {
        // backgroundColor: "#f9f9f9",
        padding: 10,
        // marginBottom: 5,
        // borderRadius: 8,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        // borderWidth: 1,
        // borderColor: "#eee",
    },
    logDetails: {
        flex: 1,
        marginRight: 10,
    },
    logAmount: {
        fontSize: 16,
        fontWeight: "600",
        color: "#222",
    },
    logDescription: {
        fontSize: 14,
        color: "#666",
        // marginTop: 4,
    },
    noDescription: {
        fontSize: 14,
        color: "#aaa",
        marginTop: 4,
    },
    logDate: {
        fontSize: 14,
        color: "#999",
    },
    noLogsText: {
        fontSize: 14,
        color: "#999",
        textAlign: "center",
        marginTop: 10,
    },
    optionsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        // marginVertical: 20,
    },
    optionButton: {
        flex: 1,
        padding: 12,
        marginHorizontal: 5,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
    },
    optionButtonActive: {
        backgroundColor: "rgba(59,95,255,0.07)",
        borderColor: "#007BFF",
    },
    optionText: {
        color: "#333",
        fontWeight: "500",
    },
    inputContainer: {
        marginTop: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: Colors.grey["100"],
        backgroundColor: Colors.grey["100"],
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingVertical: 12,
        fontSize: 15,
        color: Colors.grey["800"],
        marginBottom: 10,
    },
    settleButton: {
        backgroundColor: "#3b5fff",
        borderRadius: 8,
        padding: 15,
        marginTop: 20,
        alignItems: "center",
    },
    settleButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
});

export default SettleDebtModal;
