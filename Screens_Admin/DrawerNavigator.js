import React, {Component} from 'react';
import {SafeAreaView, ScrollView, Image, View, Text} from 'react-native';
import {DrawerNavigationItem, createDrawerNavigator, createStackNavigator, createAppContainer, DrawerItems} from 'react-navigation';
import {Dimensions} from 'react-native';
import HomeScreen from './HomeScreen.js';
import Add_Acc_Screen from './CreateAccount/StackNavigator'
import ChangePassword from './ChangePassword.js'

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

const CustomeDrawerComponent = (props) => (
	<SafeAreaView style = {{flex: 1}}>
		<View style={{height: 150, backgroundColor: 'white', margin: 15, marginBottom: 50}}>
			<Image source={require('./default_profile.png')} 
			 style={{height: 100, width: 100, borderRadius: 50}}
			 />
			 <Text style={{marginTop: 20}}> Musa Adam Hassan</Text>
			 <Text style={{marginTop: 20}}> Member ID: 12345</Text>
		</View>
		<ScrollView>
		<DrawerItems {...props} />
		</ScrollView>
	</SafeAreaView>
)

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

const Add_Acc = createStackNavigator(
	{
		main: {screen: Add_Acc_Screen},
	},
	{
		defaultNavigationOptions: {
			header: null
		},
	}
);

const change_password = createStackNavigator(
	{
		main: {screen: ChangePassword},
	},
	{
		defaultNavigationOptions: {
			header: null
		},
	}
);


const MainNavigator = createDrawerNavigator({
		Home: {screen: Home},
		Reservations: {screen: Home},
		Menu: {screen: Home},
		'Add Account': {screen: Add_Acc},
		Settings: {screen: Home},
		'Change Password': {screen: change_password}
}, {
   		contentComponent: CustomeDrawerComponent,
   		contentOptions: {
   			labelStyle: {
				fontWeight: 'normal',
			},
			activeTintColor: '#23186A',
			activeBackgroundColor: 'rgba(35, 24, 106, 0.15)',
			inactiveBackgroundColor: 'transparent',
		},
});

const App = createAppContainer(MainNavigator);