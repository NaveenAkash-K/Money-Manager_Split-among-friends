// import './gesture-handler';
import React, {useEffect, useLayoutEffect} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {StyleSheet, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {enableScreens} from "react-native-screens";
// import './gesture-handler';
// import TabNavigator from "./navigators/TabNavigator";
import DrawerNavigator from "./navigators/DrawerNavigator";
// import TransactionsScreen from "./screens/TransactionsScreen";
// import DrawerNavigator from "./navigators/DrawerNavigator";
import useTransactionsStore from "./store/useTransactionsStore";
import transactionsStoreSerializer from "./utils/transactionsStoreSerializer";
import {PaperProvider} from "react-native-paper";
import useCategoriesStore from "./store/useCategoriesStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useSubCategoriesStore from "./store/useSubCategoriesStore";

enableScreens()

export default function App() {
    const {initializeCategories} = useCategoriesStore()
    const {initializeSubCategories} = useSubCategoriesStore()
    useLayoutEffect(() => {
        initializeCategories()
        initializeSubCategories()
    }, []);

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
