import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import StatsScreen from '../screens/StatsScreen'; // Replace with your actual path
import AccountsScreen from '../screens/AccountsScreen';   // Replace with your actual path
import TransactionsScreen from '../screens/TransactionsScreen'; // Replace with your actual path
import DebtsScreen from '../screens/DebtsScreen';  // Replace with your actual path
import {Pressable, StyleSheet, Text, View} from "react-native"
import {Entypo, FontAwesome6, Ionicons, MaterialIcons} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";
import {DrawerActions} from "@react-navigation/native";
import DateChanger from "../components/transactionsScreen/DateChanger";

const Tab = createBottomTabNavigator();

function TabNavigator() {
    const navigation = useNavigation();

    const headerLeftImage = () => {
        return <Pressable style={{}} onPress={() => {
            navigation.dispatch(DrawerActions.toggleDrawer());
        }}>
            <Entypo name="menu" size={26} color="black" style={styles.menuIcon}/>
        </Pressable>
    }

    return (
        <Tab.Navigator screenOptions={{
            headerLeft: headerLeftImage,
            tabBarStyle: styles.tabBar,
            tabBarLabelStyle: styles.tabBarLabel,
            sceneStyle: {backgroundColor: "#fff"},
            tabBarActiveTintColor: "#3b5fff",
        }}>
            <Tab.Screen
                name="Transactions"
                component={TransactionsScreen}
                options={{
                    headerShadowVisible: false,
                    headerRightContainerStyle: {
                        marginLeft: 10, // Add spacing to align properly
                    },
                    headerRight: () => (
                        <View style={{marginRight: 15}}>
                            <DateChanger/>
                        </View>
                    ),
                    tabBarIcon: (props) => (
                        <FontAwesome6 name="money-bill-transfer" size={20} color={props.color}/>
                    ),
                }}
            />
            <Tab.Screen name="Stats" component={StatsScreen}
                        options={{
                            tabBarIcon: (props =>
                                <Ionicons name="analytics-sharp" size={24} color={props.color}/>)
                        }}/>
            <Tab.Screen name="Accounts" component={AccountsScreen}
                        options={{
                            tabBarIcon: (props =>
                                <MaterialIcons name="account-balance" size={24} color={props.color}/>)
                        }}/>
            <Tab.Screen name="Debts" component={DebtsScreen}
                        options={{
                            headerShadowVisible: false,
                            tabBarIcon: (props =>
                                <MaterialIcons name="transfer-within-a-station" size={24} color={props.color}/>)
                        }}/>
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    menuIcon: {
        marginHorizontal: 12,
        marginVertical: 10,
    },
    tabBar: {
        height: 60,                // Adjust the height of the TabBar
    },
    tabBarLabel: {
        fontSize: 12,              // Adjust the font size for tab labels (if shown)
        fontWeight: 'bold',        // Make the font bold
    },
});

export default TabNavigator;