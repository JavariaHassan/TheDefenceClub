import React, {Component} from 'react';
import {createDrawerNavigator, createStackNavigator, createAppContainer} from 'react-navigation';
import {Dimensions} from 'react-native';
import HomeScreen from './HomeScreen.js';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

export default class Drawer extends Component {

    static navigationOptions = {
        header: null
    }
    
    render() {
        return (
           <App />
        );
    }
}

const Home = createStackNavigator(
	{
		main: {screen: HomeScreen},
	},
	{
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

const MainNavigator = createDrawerNavigator({
   Home: {screen: Home},
});

const App = createAppContainer(MainNavigator);