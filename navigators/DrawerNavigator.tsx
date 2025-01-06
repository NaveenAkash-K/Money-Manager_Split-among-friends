import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import SettingsScreen from '../screens/SettingsScreen';
import TabNavigator from "./TabNavigator";
import TransactionsScreen from "../screens/TransactionsScreen";
// import '../gesture-handler';

const Drawer = createDrawerNavigator();

function DrawerNavigator() {

    return (
        <Drawer.Navigator screenOptions={{drawerActiveTintColor: "#7637a6"}}>
            <Drawer.Screen name="Home" component={TabNavigator} options={{headerShown: false}}/>
            <Drawer.Screen name="Settings" component={SettingsScreen}/>
        </Drawer.Navigator>
    );
}

export default DrawerNavigator;