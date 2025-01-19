import React, {useState} from "react";
import {Pressable, Text, View, ScrollView, StyleSheet, TextStyle, ViewStyle} from "react-native";
import {ReactNativeModal} from "react-native-modal";
import {Entypo, Octicons} from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import AddFriendsModal from "../friendsScreen/AddFriendsModal";
import AddFriendButton from "../friendsScreen/AddFriendButton";


interface DropdownItem {
    label: string;
    value: string;
}

interface DropdownProps {
    items: DropdownItem[] | undefined;
    selectedValue?: string | number;
    onSelect: (item: DropdownItem) => void;
    placeholder?: string;
    modalStyle?: ViewStyle;
    containerStyle?: ViewStyle;
    dropdownButtonStyle?: ViewStyle;
    dropdownTextStyle?: TextStyle;
    dropdownIconStyle?: ViewStyle;
    modalHeaderStyle?: ViewStyle;
    modalBodyStyle?: ViewStyle;
    gridItemStyle?: ViewStyle;
    gridItemTextStyle?: TextStyle;
    fallbackTextOnEmptyItems?: string;
    title?: string;
    titleStyle?: TextStyle;
    showTitle?: boolean;
    label?: string;
    addFriendButton?: boolean;
    error?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
                                               items,
                                               selectedValue,
                                               onSelect,
                                               placeholder = "Select an option",
                                               modalStyle,
                                               containerStyle,
                                               dropdownButtonStyle,
                                               dropdownTextStyle,
                                               dropdownIconStyle,
                                               modalHeaderStyle,
                                               modalBodyStyle,
                                               gridItemStyle,
                                               gridItemTextStyle,
                                               addFriendButton,
                                               fallbackTextOnEmptyItems,
                                               label,
                                               error,
                                               title, // Modal title
                                               titleStyle, // Custom style for the title
                                               showTitle, // Option to show or hide the title
                                           }) => {
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [selectedLocal, setSelectedLocal] = useState<{
        label: string;
        value: string
    } | undefined>(items.find(item => item.value === selectedValue));

    const [isAddFriendModalVisible, setIsAddFriendModalVisible] = useState(false)

    return (
        <View
            style={[styles.container, containerStyle, error ? {borderColor: "#ff5d5d"} : {borderColor: "transparent"}]}>
            {/* Dropdown Button */}
            {<AddFriendsModal isVisible={isAddFriendModalVisible} onClose={() => setIsAddFriendModalVisible(false)}
                              title={"Add Friends"}/>}
            <Pressable
                style={[styles.dropdownButton, dropdownButtonStyle]}
                onPress={() => setIsDropdownVisible(true)}
            >
                {selectedLocal ?
                    <Text style={[styles.dropdownText, dropdownTextStyle]}>
                        {label ? label : selectedLocal.label}
                    </Text> :
                    <Text style={[{fontSize: 14, color: Colors.grey["500"]}, dropdownTextStyle]}>
                        {placeholder}
                    </Text>}

                <Octicons
                    name="chevron-down"
                    size={16}
                    style={[styles.dropdownIcon, dropdownIconStyle]}
                />
            </Pressable>

            {/* Dropdown Modal */}
            <ReactNativeModal
                isVisible={isDropdownVisible}
                onBackdropPress={() => setIsDropdownVisible(false)}
                onSwipeComplete={() => setIsDropdownVisible(false)}
                swipeDirection="down"
                backdropTransitionOutTiming={10}
                animationOutTiming={150}
                propagateSwipe={true}
                style={[styles.modal, modalStyle]}
            >
                <View style={[styles.modalBody, modalBodyStyle]}>
                    {/* Modal Header */}
                    <View style={[styles.modalHeader, modalHeaderStyle]}>
                        <View style={styles.modalHandle}></View>
                        {showTitle && (
                            <Text style={[styles.modalTitle, titleStyle]}>{title}</Text>
                        )}
                    </View>
                    {addFriendButton && <AddFriendButton onPress={() => setIsAddFriendModalVisible(true)}/>}

                    {/* Grid Content */}
                    <ScrollView>
                        <View style={styles.gridContainer}>
                            {(items && items.length > 0) ? items.map((item, index) => {
                                return <Pressable
                                    key={index}
                                    style={[styles.gridItem, gridItemStyle, selectedValue === item.value ? {backgroundColor:"rgba(59,95,255,0.07)"} : {}]}
                                    onPress={() => {
                                        onSelect(item);
                                        setSelectedLocal(item);
                                        setIsDropdownVisible(false);
                                    }}
                                    android_ripple={{color: "#ddd"}}
                                >
                                    <Text style={[styles.gridItemText, gridItemTextStyle, selectedValue === item.value ? {color:"#3b5fff"} : {}]}>
                                        {item.label}
                                    </Text>
                                </Pressable>
                            }) : <Text style={{
                                flex: 1,
                                textAlign: "center",
                                fontWeight: "bold",
                                marginVertical: 100,
                                fontSize:16
                            }}>{fallbackTextOnEmptyItems}</Text>}
                        </View>
                    </ScrollView>
                </View>
            </ReactNativeModal>

        </View>
    )
        ;
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
        borderRadius: 8,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "transparent",
    },
    dropdownButton: {
        backgroundColor: "#f7f7f7",
        borderRadius: 8,
        padding: 12,
        paddingLeft: 20,
        paddingRight: 25,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    dropdownText: {
        fontSize: 14,
        // color: "#555",
    },
    dropdownIcon: {
        color: "#555",
    },
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
    gridContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    gridItem: {
        width: "33.3333%", // Divide into 3 equal columns
        paddingVertical: 30,
        alignItems: "center",
        justifyContent: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    gridItemText: {
        fontSize: 16,
        fontWeight: "500",
        color: "#333",
    },
});

export default Dropdown;
