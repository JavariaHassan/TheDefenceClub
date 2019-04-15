import React, {Component} from 'react';
import {StyleSheet, Alert} from 'react-native';
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
                backgroundColor: 'white',
                borderBottomColor:'#A9A9A9',
                borderBottomWidth: 0.5,
            },
            headerTintColor: "#23186A",
            headerTitleStyle: {
                fontWeight: "normal",
                color: "#23186A",
                fontFamily: "Calibri Bold",
            },
        },
    }
);

const App = createAppContainer(MainNavigator);

export default App;
