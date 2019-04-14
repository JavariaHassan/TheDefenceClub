/**
 * @format
 */

import {AppRegistry} from 'react-native';
// import App from './Screens/Screens_Admin/Menu/StackNavigator';
// import App from './Screens/Screens_Admin/Account/StackNavigator';
import App from './Screens/Screens_Admin/DrawerNavigator';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
