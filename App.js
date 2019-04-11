import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';

import LoginScreen from './LoginScreen.js';
import DrawerNavigatorScreen from './Screens_Admin/DrawerNavigator.js';

const MainNavigator = createStackNavigator({
    Login:           {screen: LoginScreen},
    DrawerNavigator: {screen: DrawerNavigatorScreen},
});

const App = createAppContainer(MainNavigator);

export default App;
