import React, {Component} from 'react';
import {SafeAreaView, ScrollView, Image, View, Text, Alert} from 'react-native';
import {createDrawerNavigator, createStackNavigator, createAppContainer, DrawerItems} from 'react-navigation';
import { NavigationActions, StackActions } from 'react-navigation'

import Home_Screen from './HomeScreen.js';
import Account_Screen from './Account.js'
import Password_Screen from './Password.js'//wth
import Menu_Screen from './Menu/StackNavigator'
import Reservations_Screen from './Reservations/StackNavigator'

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
	console.log("AAAAAAAH  ", nav2),
	<SafeAreaView style = {{flex: 1}}>
		<View style={{height: 150, backgroundColor: 'white', margin: 15, marginBottom: 50}}>
			<Image source={require('./default_profile.png')} 
			 style={{height: 100, width: 100, borderRadius: 50}}
			 />
			 <Text style={{marginTop: 20}}> {values.name} </Text>
			 <Text style={{marginTop: 20}}> Member ID: {values.user} </Text>
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
							onPress: () => 
								nav2.dispatch(StackActions.reset({
									index: 0,
									actions: [
										NavigationActions.navigate({
											routeName: 'Login',
										}),
									],
								}))
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
			activeTintColor: '#23186A',
			activeBackgroundColor: 'rgba(35, 24, 106, 0.15)',
			inactiveBackgroundColor: 'transparent',
		},
});

