import { View, Text } from 'react-native'
import React from 'react'
import { AnimatedTabBarNavigator } from 'react-native-animated-nav-tab-bar';
import HistoryScreen from '../screens/HistoryScreen';
import ProfileScreen from '../screens/ProfileScreen';
import Home from '../screens/Home';
import Octicons from 'react-native-vector-icons/Octicons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = AnimatedTabBarNavigator();

const BottomMenu = () => {

    return (
        <Tab.Navigator
            tabBarOptions={{
                activeTintColor: "#323715",
            }}
            initialRouteName='Home'
            appearance={{
                topPadding:15,
                tabBarBackground: '#b6c463',
                dotSize: 'small',
                activeTabBackgrounds: '#eef1da',
                dotCornerRadius:15,
            }}
        >
            <Tab.Screen name="Home" component={Home} 
            options={{
                tabBarLabel: 'Home',
                tabBarIcon: () => (
                    <Octicons name="home" size={22} color={'#323715'}/>
                ),
            }}
            />
            <Tab.Screen name="History" component={HistoryScreen} options={{
                tabBarIcon: () => (
                    <Octicons name="history" color='#323715' size={22} />
                ),
            }} />
            <Tab.Screen name="Profile" component={ProfileScreen} options={{
                tabBarIcon: () => (
                    <Octicons name="person" color='#323715' size={22} />
                ),
            }} />

        </Tab.Navigator>
    )
}

export default BottomMenu