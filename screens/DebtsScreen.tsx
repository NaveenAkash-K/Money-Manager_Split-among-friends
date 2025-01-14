import * as React from 'react';
import {View, Text, useWindowDimensions, StyleSheet, Pressable, Animated} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';
import Colors from '../constants/Colors';
import AllDebtsTabView from "../components/debtsScreen/tabViews/AllDebtsTabView";
import YouOweOthersDebtsTabView from "../components/debtsScreen/tabViews/YouOweOthersDebtsTabView";
import OthersOwesYouDebtsTabView from "../components/debtsScreen/tabViews/OthersOwesYouDebtsTabView";

// Define the scenes for each tab
const renderScene = SceneMap({
    All: AllDebtsTabView,
    Owe: YouOweOthersDebtsTabView,
    Owes: OthersOwesYouDebtsTabView,
});

const routes = [
    {key: 'All', title: 'All Debts'},
    {key: 'Owe', title: 'You Owe Others'},
    {key: 'Owes', title: 'Others Owes You'},
];

export default function DebtsScreen() {
    const layout = useWindowDimensions();
    const [index, setIndex] = React.useState(0);
    const [tabBarWidth, setTabBarWidth] = React.useState(0);

    // Animated value for smoothly transitioning the active tab's background and indicator
    const translateX = React.useRef(new Animated.Value(0)).current;

    const handleTabPress = (i) => {
        setIndex(i);
    };

    React.useEffect(() => {
        Animated.spring(translateX, {
            toValue: (index * tabBarWidth) / routes.length,
            useNativeDriver: true,
        }).start();
    }, [index, tabBarWidth]);

    return (
        <TabView
            navigationState={{index, routes}}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{width: layout.width}}
            renderTabBar={(props) => (
                <View
                    style={styles.tabBar}
                    onLayout={(e) => setTabBarWidth(e.nativeEvent.layout.width)} // Calculate width
                >
                    {props.navigationState.routes.map((route, i) => (
                        <Pressable
                            key={route.key}
                            style={[
                                styles.tabItem,
                                index === i && styles.activeTab, // Active tab style
                            ]}
                            onPress={() => handleTabPress(i)}
                        >
                            <Text
                                style={[
                                    styles.tabText,
                                    index === i && styles.activeTabText, // Active tab text color
                                ]}
                            >
                                {route.title}
                            </Text>
                        </Pressable>
                    ))}
                    {/* Animated indicator for active tab */}
                    <Animated.View
                        style={[
                            styles.tabIndicator,
                            {
                                transform: [{translateX}],
                                width: tabBarWidth / routes.length, // Dynamic width for the indicator
                            },
                        ]}
                    />
                </View>
            )}
        />
    );
}

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: 'white',
        flexDirection: 'row',
        elevation: 4,
        position: 'relative',
    },
    tabItem: {
        flex: 1,
        paddingVertical: 12,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 3,
        borderBottomColor: 'transparent',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    activeTab: {
        backgroundColor: '#e6f0ff', // Light background on active tab
    },
    tabText: {
        fontWeight: '600',
        textAlign: 'center',
        color: Colors.grey['500'], // Default text color
        fontSize: 14,
    },
    activeTabText: {
        color: '#3b5fff', // Active tab text color
        fontWeight: '700',
    },
    tabIndicator: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        height: 3,
        backgroundColor: '#3b5fff', // Color for the active tab indicator
    },
});
