import React, {Component} from 'react';
import {Button, Keyboard, Platform, Dimensions, StyleSheet, Text, TextInput, View, Image, ImageBackground, TouchableOpacity, ScrollView, Alert} from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import { fromRight } from 'react-navigation-transitions';
import Swipeout from 'react-native-swipeout';

import Main_Screen from './Main_Screen';
import Add_Screen from './Add_Menu';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;


const MainNavigator = createStackNavigator(
    {
        Main:   {screen: Main_Screen},
        Add: {screen: Add_Screen},
    },
    {
        transitionConfig: () => fromRight(),
        defaultNavigationOptions: {
            title: "",
            headerStyle: {
                backgroundColor: 'white',
                borderBottomColor:'#A9A9A9',
                borderBottomWidth: 1,
            },
            headerTintColor: "#23186A",
            headerTitleStyle: {
                fontWeight: "normal",
                color: "#23186A",
                fontFamily: "Calibri",
                fontWeight: "bold",
            },
        },
    }
);

const App = createAppContainer(MainNavigator);

export default App;