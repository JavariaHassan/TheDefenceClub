import React, {Component} from 'react';
import {StyleSheet, Dimensions, SafeAreaView, ScrollView, Image, View, Text, Alert} from 'react-native';
import {createDrawerNavigator, createStackNavigator, createAppContainer, DrawerItems} from 'react-navigation';
import { NavigationActions, StackActions } from 'react-navigation'
import AsyncStorage from '@react-native-community/async-storage';

import Home_Screen from './HomeScreen.js';
import Account_Screen from './Account.js'
import Password_Screen from './Password.js'//wth
import Menu_Screen from './Menu/StackNavigator'
import Reservations_Screen from './Reservations/StackNavigator'

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

global.values = {
	name : "",
	user : ""
}

nav2 = null

export default class Drawer extends Component {
	constructor(props) {
		super(props)

		Nametosave = this.props.navigation.state.params.Name
		Usernametosave = this.props.navigation.state.params.Username

		values.name = Nametosave
		values.user = Usernametosave

		nav2 = this.props.navigation
		// this.props.navigation.dispatch(StackActions.reset({
		// 	index: 0,
		// 	actions: [
		// 		NavigationActions.navigate({
		// 			routeName: 'Login',
		// 		}),
		// 	],
		// }))
		// this.props.navigation.navigate('Login')
	}

    static navigationOptions = {
        header: null
    }
    
    render() {
		const App = createAppContainer(MainNavigator);
        return (
           <App/>
        );
    }
}


const CustomeDrawerComponent = (props) => (
	<SafeAreaView style = {{flex: 1}}>
		<View style={{padding: 10, paddingTop: 0.05*height, paddingBottom: 0.05*height}}>
			<Image source={require('../logo.png')} 
			 style={{height: 0.12*height, width: 0.1*height}}
			 />
			 <Text style={{marginLeft: 0.01*height, marginTop: 20, fontWeight: 'bold'}}> {values.name} </Text>
			 <Text style={{marginLeft: 0.01*height, marginTop: 8}}> Member ID: {values.user} </Text>
		</View>
		<ScrollView>
		<DrawerItems {...props} 
			onItemPress={(route) => {
				console.log(route)
				if (route.route.routeName !== "Logout") {
				  	props.onItemPress(route);
				  	return;
				}
				
				Alert.alert(
					'Are you sure you want to logout?',
					'',
					[
						{
							text: 'Cancel',
							style: 'cancel',
					  	},
					  {
							text: 'Logout', 
							onPress: () => {
								AsyncStorage.clear();
								// AsyncStorage.removeItem('@login')
								nav2.dispatch(StackActions.reset({
									index: 0,
									actions: [
										NavigationActions.navigate({
											routeName: 'Login',
										}),
									],
								}))
							}
					  },
					],
				);
			}}
		/>
		</ScrollView>
	</SafeAreaView>
)

const Home = createStackNavigator(
	{
		main: {screen: Home_Screen},
	},
	{
		defaultNavigationOptions: {
            title: "",
            headerStyle: {
                backgroundColor: 'white',
                borderBottomColor:'#A9A9A9',
                borderBottomWidth: 1,
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
                fontWeight: "normal",
                color: "#23186A",
                fontFamily: "Calibri",
                fontWeight: "bold",
            },
        },
	}
);

const Account = createStackNavigator(
	{
		main: {screen: Account_Screen},
	},
	{
		defaultNavigationOptions: {
            title: "",
            headerStyle: {
                backgroundColor: 'white',
                borderBottomColor:'#A9A9A9',
                borderBottomWidth: 1,
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
                fontWeight: "normal",
                color: "#23186A",
                fontFamily: "Calibri",
                fontWeight: "bold",
            },
        },
	}
);

const Menu = createStackNavigator(
	{
		main: {screen: Menu_Screen},
	},
	{
		defaultNavigationOptions: {
			header: null
		},
	}
);

const Reservations = createStackNavigator(
	{
		main: {screen: Reservations_Screen},
	},
	{
		defaultNavigationOptions: {
			header: null
		},
	}
);

const Password = createStackNavigator(
	{
		main: {screen: Password_Screen},
	},
	{
		defaultNavigationOptions: {
            title: "",
            headerStyle: {
                backgroundColor: 'white',
                borderBottomColor:'#A9A9A9',
                borderBottomWidth: 1,
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
                fontWeight: "normal",
                color: "#23186A",
                fontFamily: "Calibri",
                fontWeight: "bold",
            },
        },
	}
);

const MainNavigator = createDrawerNavigator({
		Home : {screen: Home},
		Reservations: {screen: Reservations},
		Menu: {screen: Menu},
		'Add Account': {screen: Account},
		'Change Password': {screen: Password},
		Logout: {screen: Home},
}, {
		contentComponent: CustomeDrawerComponent,
   		contentOptions: {
   			labelStyle: {
				fontWeight: 'normal',
			},
			activeTintColor: 'white',
			activeBackgroundColor: '#23186A',
			inactiveBackgroundColor: 'transparent',
		},
});

