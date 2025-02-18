import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import SettingsScreen from '../screens/SettingsScreen';
import TabNavigator from "./TabNavigator";
import TransactionsScreen from "../screens/TransactionsScreen";
import FriendsScreen from "../screens/FriendsScreen";
import CategoriesScreen from "../screens/CategoriesScreen";
// import '../gesture-handler';

const Drawer = createDrawerNavigator();

function DrawerNavigator() {

    return (
        <Drawer.Navigator screenOptions={{drawerActiveTintColor: "#3b5fff"}}>
            <Drawer.Screen name="Home" component={TabNavigator} options={{headerShown: false}}/>
            {/*<Drawer.Screen name="Friends" component={FriendsScreen} options={{sceneStyle: {backgroundColor: "white"}}}/>*/}
            <Drawer.Screen name="Categories" component={CategoriesScreen}
                           options={{sceneStyle: {backgroundColor: "white"}, headerShadowVisible: false}}/>
            {/*<Drawer.Screen name="Settings" component={SettingsScreen}/>*/}
        </Drawer.Navigator>
    );
}

export default DrawerNavigator;