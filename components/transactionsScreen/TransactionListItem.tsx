import Colors from "../../constants/Colors";
import {Pressable, StyleSheet, Text, View} from "react-native";
import TransactionTypes from "../../types/TransactionTypes";
import React, {useState} from "react";
import AccountTypes from "../../types/AccountTypes";
import Friend from "../../models/Friend";
import DebtTypes from "../../types/DebtTypes";
import useSubCategoriesStore from "../../store/useSubCategoriesStore";
import useCategoriesStore from "../../store/useCategoriesStore";
import SettleDebtModal from "../debtsScreen/SettleDebtModal";

const TransactionListItem = (props: {
    data: {
        category?: string | undefined;
        subCategory?: string | undefined;
        name: string;
        description?: string | undefined;
        type: TransactionTypes;
        accountType?: AccountTypes;
        debtType?: DebtTypes;
        debtPerson?: Friend;
        fromAccount?: AccountTypes;
        toAccount?: AccountTypes
        date: Date;
        amount: number;
    };
}) => {
    const [isSettleDebtModalVisible, setIsSettleDebtModalVisible] = useState(false);
    const {subCategories} = useSubCategoriesStore()
    const {categories} = useCategoriesStore()

    return <Pressable
        android_ripple={{color: Colors.grey["300"]}}
        onPress={() => {
            if (props.data.type === TransactionTypes.Debt) {
                setIsSettleDebtModalVisible(true);
            }
        }}
        // background={TouchableNativeFeedback.Ripple(Colors.grey[300], true)}
        style={[styles.transactionItem, {}]}
    >
        {props.data.type === TransactionTypes.Debt && <SettleDebtModal
            isVisible={isSettleDebtModalVisible}
            onClose={() => {
                setIsSettleDebtModalVisible(false)
            }}
            paymentLogs={[
                { date: "2024-12-01", amount: 200, method: "Cash" },
                { date: "2024-12-10", amount: 300, method: "Bank Transfer" },
            ]}
            data={props.data}
        />}

        <View style={styles.transactionDetails}>
            {/* Left section with category and sub-category */}
            {<View style={styles.categoryContainer}>
                <Text style={styles.category} numberOfLines={1}>
                    {props.data.type === TransactionTypes.Transfer ? "Transfer" : props.data.type === TransactionTypes.Debt ? "Debt" : categories![props.data.type]!.find(cat => cat.id === props.data.category)!.name}
                </Text>
                {(props.data.subCategory && props.data.type !== TransactionTypes.Transfer && props.data.type !== TransactionTypes.Debt) && (
                    <Text numberOfLines={1}
                          style={styles.subCategory}>{subCategories[props.data.category!].find(subCat => subCat.id === props.data.subCategory)!.name}</Text>
                )}
            </View>}

            {/* Right section with name and description */}
            <View style={styles.nameContainer}>
                <Text style={styles.name} numberOfLines={1}>
                    {props.data.name}
                    {/*"₹ " + props.data.amount{
                    props.data.description && props.data.type !== TransactionTypes.Debt && props.data.type !== TransactionTypes.Transfer && (
                        <Text style={styles.description} numberOfLines={1}>
                            {props.data.description}
                        </Text>
                    )
                } + "   -->   " + props.data.debtPerson!.name :*/}
                    {/*"₹ " + props.data.amount + "   <--   " + props.data.debtPerson!.name : props.data.name}*/}
                </Text>
                {
                    (props.data.description && props.data.type !== TransactionTypes.Debt && props.data.type !== TransactionTypes.Transfer) &&
                    <Text style={styles.description} numberOfLines={1}>
                        {props.data.description}
                    </Text>

                }
                {
                    props.data.type === TransactionTypes.Debt &&
                    <Text style={[styles.description]}>
                        {
                            props.data.debtType ===
                            DebtTypes.Owe ?
                                props.data.debtPerson!.name + "   -->   " + "You" :
                                "You" + "   -->   " + props.data.debtPerson!.name
                        }
                    </Text>
                }
                {
                    props.data.type === TransactionTypes.Transfer &&
                    <Text style={styles.description}>
                        {
                            props.data.fromAccount + "   -->   " + props.data.toAccount
                        }
                    </Text>
                }

            </View>
        </View>

        {/* Amount section */}
        <View style={{alignItems: "center", minWidth: 50}}>
            <Text
                style={[
                    styles.amount,
                    // props.data.type === TransactionTypes.Income ? styles.incomeText : props.data.type === TransactionTypes.Expense ? styles.expenseText : props.data.type === TransactionTypes.Debt ? props.data.debtType === DebtTypes.Owes ? {color: Colors.income.light} : {color: Colors.expense.light} : {},
                    props.data.type === TransactionTypes.Income ? styles.incomeText : props.data.type === TransactionTypes.Expense ? styles.expenseText : props.data.type === TransactionTypes.Debt ? props.data.debtType === DebtTypes.Owes ? {} : {} : {},
                ]}
            >
                {props.data.type === TransactionTypes.Income ? `₹ ${props.data.amount}` : `₹ ${Math.abs(props.data.amount)}`}
            </Text>
            <Text
                style={styles.accountTypeText}
            >
                {(props.data.type === TransactionTypes.Income ||
                    props.data.type === TransactionTypes.Expense ||
                    props.data.type === TransactionTypes.Debt) ?
                    props.data.accountType :
                    "Transfer"}
            </Text>
        </View>

    </Pressable>
}

// @ts-ignore
const styles = StyleSheet.create({
    transactionItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 8,
        paddingHorizontal: 18,
        borderRadius: 6,
        // marginBottom: 2,
    },
    transactionDetails: {
        flex: 1,
        flexDirection: "row",
        marginRight: 8,
    },
    categoryContainer: {
        justifyContent: "center",
        marginRight: 12, // Add some space between category and name
        width: 80, // Fixed width for category
    },
    nameContainer: {
        justifyContent: "center",
        flex: 1, // Ensure text fits and adjusts based on screen width
    },
    category: {
        fontSize: 13,
        color: Colors.grey[600],
        fontWeight: "500",
        overflow: "hidden", // Prevent text overflow
        // @ts-ignore
        textOverflow: "ellipsis", // Ellipsis for long category names
    },
    subCategory: {
        fontSize: 11,
        color: Colors.grey[500],
        fontWeight: "400",
        marginTop: 2,
    },
    name: {
        fontSize: 13,
        fontWeight: "600",
        color: Colors.onSurface,
    },
    description: {
        fontSize: 11,
        color: Colors.grey[500],
        marginTop: 2,
    },
    amount: {
        fontSize: 13,
        fontWeight: "500",
        textAlign: "right", // Align amount to the right
    },
    accountTypeText: {
        fontSize: 10,
        color: Colors.grey[500],
        marginTop: 2,
    },
    incomeText: {
        color: Colors.income.main,
    },
    expenseText: {
        color: Colors.expense.main,
    },
})

export default TransactionListItem;