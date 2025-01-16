// import './gesture-handler';
import React, {useEffect, useLayoutEffect} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {StyleSheet, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
// import {enableScreens} from "react-native-screens";
// import './gesture-handler';
// import TabNavigator from "./navigators/TabNavigator";
import DrawerNavigator from "./navigators/DrawerNavigator";
// import TransactionsScreen from "./screens/TransactionsScreen";
// import DrawerNavigator from "./navigators/DrawerNavigator";
import useTransactionsStore from "./store/useTransactionsStore";
import transactionsStoreSerializer from "./utils/transactionsStoreSerializer";
import {PaperProvider} from "react-native-paper";

// enableScreens()

export default function App() {
    return (
        <PaperProvider>
            <GestureHandlerRootView>
                <NavigationContainer>
                    <DrawerNavigator/>
                </NavigationContainer>
            </GestureHandlerRootView>
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
