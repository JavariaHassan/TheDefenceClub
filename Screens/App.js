import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';

import LoginScreen from './LoginScreen.js';
import DrawerNavigatorScreen_admin from './Screens_Admin/DrawerNavigator.js';
import DrawerNavigatorScreen_member from './Screens_Member/DrawerNavigator.js';


const MainNavigator = createStackNavigator({
    Login:           {screen: LoginScreen},
    DrawerNavigator_admin: {screen: DrawerNavigatorScreen_admin},
    DrawerNavigator_member : {screen: DrawerNavigatorScreen_member}
});

const App = createAppContainer(MainNavigator);

export default App;
