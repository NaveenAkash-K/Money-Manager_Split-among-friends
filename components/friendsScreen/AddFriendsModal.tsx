import {ReactNativeModal} from "react-native-modal";
import {Pressable, StyleSheet, Text, TextInput, View} from "react-native";
import React, {useLayoutEffect, useState} from "react";
import Colors from "../../constants/Colors";
import useFriendsStore from "../../store/useFriendsStore";
import Friend from "../../models/Friend";

const AddFriendsModal = (props: any) => {
    const [name, setName] = useState<string | undefined>()
    const [phoneNo, setPhoneNo] = useState<string | undefined>()
    const [email, setEmail] = useState<string | undefined>()

    const {addFriend} = useFriendsStore();

    useLayoutEffect(() => {
        setName(undefined)
        setPhoneNo(undefined)
        setEmail(undefined)
    }, [props.isVisible]);

    return <ReactNativeModal
        isVisible={props.isVisible}
        onBackdropPress={() => props.onClose()}
        onSwipeComplete={() => props.onClose()}
        swipeDirection="down"
        backdropTransitionOutTiming={10}
        propagateSwipe={true}
        style={[styles.modal, props.modalStyle]}
    >
        <View style={styles.modalBody}>
            <View style={[styles.modalHeader, props.modalHeaderStyle]}>
                <View style={styles.modalHandle}></View>
                <Text style={[styles.modalTitle, props.titleStyle]}>Add Friend</Text>
            </View>
            <View style={{padding: 15}}>
                <TextInput
                    style={[styles.input]}
                    placeholder="Friend Name"
                    placeholderTextColor={Colors.grey["500"]}
                    value={name}
                    onChangeText={(text) => {
                        setName(text)
                    }}
                />
                <TextInput
                    style={[styles.input]}
                    placeholder="Friend Phone No"
                    placeholderTextColor={Colors.grey["500"]}
                    value={phoneNo}
                    onChangeText={(text) => {
                        setPhoneNo(phoneNo)
                    }}
                />
                <TextInput
                    style={[styles.input]}
                    placeholder="Friend Email"
                    placeholderTextColor={Colors.grey["500"]}
                    value={email}
                    onChangeText={(text) => {
                        setEmail(email)
                    }}
                />
            </View>
            <View style={styles.buttonContainer}>
                <Pressable style={[styles.button, styles.addButton]}
                           onPress={() => {
                               if (!name) return;
                               addFriend(new Friend(name, phoneNo, email));
                               props.onClose();
                           }}
                           android_ripple={{color: Colors.rippleColor}}>
                    <Text style={styles.buttonText}>Save</Text>
                </Pressable>
            </View>
        </View>
    </ReactNativeModal>
}

const styles = StyleSheet.create({
    modal: {
        justifyContent: "flex-end",
        margin: 0,
    },
    modalBody: {
        backgroundColor: "#fff",
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        maxHeight: "70%",
    },
    modalHeader: {
        // padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
        paddingVertical: 15,
    },
    modalHandle: {
        width: 40,
        height: 5,
        backgroundColor: "#ccc",
        borderRadius: 2.5,
        alignSelf: "center",
    },
    modalTitle: {
        marginTop: 15,
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
    },
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
    buttonContainer: {
        borderTopWidth: 1,
        borderColor: Colors.grey["200"],
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 20,
        paddingHorizontal: 15,
    },
    button: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: "center",
        marginHorizontal: 5,
    },
    addButton: {
        backgroundColor: "#3b5fff",
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
    },
})

export default AddFriendsModal;