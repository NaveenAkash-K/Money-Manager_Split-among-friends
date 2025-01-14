import React, {useState, useRef, useEffect, useCallback} from "react";
import {Text, Pressable, ScrollView, View, StyleSheet} from "react-native";
import Colors from "../../constants/Colors";
import {Entypo} from "@expo/vector-icons";
import moment from "moment";
import Modal from "react-native-modal"; // Import react-native-modal

const MonthPicker = ({selectedDate, setSelectedDate}) => {
    const [showMonthPicker, setShowMonthPicker] = useState(false);
    const [showYearList, setShowYearList] = useState(false);
    const [itemHeight, setItemHeight] = useState(0);  // State to store the dynamic height

    const yearListRef = useRef(null);

    // Array of months and years
    const months = moment.monthsShort();
    const years = Array.from({length: 50}, (_, i) => moment().year() - 25 + i); // Display last 25 years to next 25 years

    const toggleMonthPicker = () => {
        setShowMonthPicker((prev) => !prev);
        setShowYearList(false);
    };

    const handleMonthSelect = (monthIndex) => {
        const updatedDate = new Date(selectedDate);
        updatedDate.setMonth(monthIndex);
        setSelectedDate(updatedDate);
        toggleMonthPicker();
    };

    const handleYearSelect = (year) => {
        const updatedDate = new Date(selectedDate);
        updatedDate.setFullYear(year);
        setSelectedDate(updatedDate);
        setShowYearList(false);
    };

    // Scroll to the current year when the year list is shown
    useEffect(() => {
        if (showYearList && yearListRef.current && itemHeight > 0) {
            const currentYearIndex = years.indexOf(moment(selectedDate).year());
            if (currentYearIndex !== -1) {
                const yOffset = (currentYearIndex) * (itemHeight + 6);  // Calculate based on dynamic height
                yearListRef.current.scrollTo({y: yOffset, animated: false});
            }
        }
    }, [showYearList, itemHeight, selectedDate]);  // Include itemHeight in dependencies

    const handleItemLayout = useCallback((event) => {
        // Measure the height of the first item (or any other item)
        const {height} = event.nativeEvent.layout;
        if (itemHeight === 0) {
            setItemHeight(height);  // Save the height of the first item
        }
    }, [itemHeight]);

    return (
        <Pressable
            android_ripple={{color: Colors.rippleColor}}
            style={{paddingHorizontal: 10, paddingVertical: 5}}
            onPress={toggleMonthPicker}
        >
            <Text style={{fontWeight: "bold", fontSize: 14}}>
                {moment(selectedDate).format("MMM YYYY")}
            </Text>

            <Modal
                isVisible={showMonthPicker}
                onBackdropPress={toggleMonthPicker}
                onBackButtonPress={toggleMonthPicker}
                backdropTransitionOutTiming={10}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <View style={styles.yearNavigation}>
                            <Pressable
                                style={{padding: 5}}
                                android_ripple={{color: Colors.rippleColor, borderless: true}}
                                onPress={() => {
                                    const updatedDate = new Date(selectedDate);
                                    updatedDate.setFullYear(selectedDate.getFullYear() - 1);
                                    setSelectedDate(updatedDate);
                                }}
                            >
                                <Entypo name="chevron-left" size={24} color="black"/>
                            </Pressable>
                            <Pressable
                                style={{paddingVertical: 5, paddingHorizontal: 10}}
                                android_ripple={{color: Colors.rippleColor}}
                                onPress={() => setShowYearList(!showYearList)}
                            >
                                <Text style={styles.selectedYear}>{selectedDate.getFullYear()}</Text>
                            </Pressable>
                            <Pressable
                                style={{padding: 5}}
                                android_ripple={{color: Colors.rippleColor, borderless: true}}
                                onPress={() => {
                                    const updatedDate = new Date(selectedDate);
                                    updatedDate.setFullYear(selectedDate.getFullYear() + 1);
                                    setSelectedDate(updatedDate);
                                }}
                            >
                                <Entypo name="chevron-right" size={24} color="black"/>
                            </Pressable>
                        </View>

                        {showYearList ? (
                            <ScrollView
                                ref={yearListRef}
                                style={styles.yearList}
                            >
                                {years.map((year) => (
                                    <Pressable
                                        android_ripple={{color: Colors.rippleColor}}
                                        key={year}
                                        style={[
                                            styles.yearItem,
                                            selectedDate.getFullYear() === year && styles.selectedYearItem,
                                        ]}
                                        onPress={() => handleYearSelect(year)}
                                        onLayout={handleItemLayout}  // Add onLayout here
                                    >
                                        <Text
                                            style={[styles.yearText, selectedDate.getFullYear() === year ? {color: "white"} : {}]}>
                                            {year}
                                        </Text>
                                    </Pressable>
                                ))}
                            </ScrollView>
                        ) : (
                            <View style={styles.monthContainer}>
                                {months.map((month, index) => {
                                    const isCurrentMonth =
                                        moment().month() === index && moment().year() === moment(selectedDate).year(); // Check both month and year
                                    const isSelectedMonth =
                                        selectedDate.getMonth() === index

                                    return (
                                        <Pressable
                                            android_ripple={{
                                                color: Colors.rippleColor,
                                                borderless: true,
                                            }}
                                            key={index}
                                            style={[
                                                styles.monthItem,
                                                isCurrentMonth && styles.currentMonth, // Highlight current month only for the current year
                                                isSelectedMonth && styles.selectedMonth, // Highlight selected month only for the selected year
                                                {borderRadius: 1000},
                                            ]}
                                            onPress={() => handleMonthSelect(index)}
                                        >
                                            <Text
                                                style={[
                                                    styles.monthText,
                                                    isSelectedMonth ? {color: "white"} : {}, // Highlight selected month's text
                                                ]}
                                            >
                                                {month}
                                            </Text>
                                        </Pressable>
                                    );
                                })}
                            </View>
                        )}
                    </View>
                </View>
            </Modal>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        backgroundColor: "white",
        borderRadius: 10,
        padding: 20,
        width: "85%",
        maxHeight: "80%",
        elevation: 10, // Shadow for Android
        shadowColor: "#000", // Shadow for iOS
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    yearNavigation: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    selectedYear: {
        fontSize: 20,
        fontWeight: "bold",
    },
    yearList: {
        marginBottom: 20,
        height: "50%",
    },
    yearItem: {
        padding: 10,
        borderRadius: 5,
        marginVertical: 5,
        marginHorizontal: 10,
    },
    selectedYearItem: {
        backgroundColor: "#3b5fff",
    },
    yearText: {
        fontSize: 16,
        textAlign: "center",
        fontWeight: "bold",
    },
    monthContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
    },
    monthItem: {
        height: 50,
        width: 50,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 20,
        marginVertical: 10,
        borderRadius: 1000,
    },
    monthText: {
        color: "#333",
        fontWeight: "bold",
    },
    currentMonth: {
        borderWidth: 2,
        borderColor: "#3b5fff",
    },
    selectedMonth: {
        backgroundColor: "#3b5fff",
    },
});

export default MonthPicker;
