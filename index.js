/**
 * @format
 */

import {AppRegistry} from 'react-native';
// import App from './Screens/Screens_Admin/Menu/StackNavigator';
// import App from './Screens/Screens_Admin/Account';
// import App from './Screens/Screens_Member/DrawerNavigator';
// import App from './Screens/LoginScreen';
import App from './Screens/App';
import {name as appName} from './app.json';

console.disableYellowBox = true;

AppRegistry.registerComponent(appName, () => App);
