import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import { fromRight } from 'react-navigation-transitions';
import Create from './Account';
import Member from './Add_Member';
import Admin from './Add_Admin';

const MainNavigator = createStackNavigator(
    {
        Main:   {screen: Create},
        Admin:  {screen: Admin},
        Member: {screen: Member},
    },
    {
        transitionConfig: () => fromRight(),
        defaultNavigationOptions: {
            title: "",
            headerStyle: {
                backgroundColor: '#23186A',
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
                flex: 1,
                fontWeight: "bold",
                textAlign: 'center',
            },
        },
    }
);

const App = createAppContainer(MainNavigator);

export default App;