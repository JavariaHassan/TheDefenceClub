import React, {Component} from 'react';
import {SafeAreaView, ScrollView, Image, View, Text, Alert} from 'react-native';
import {DrawerNavigationItem, createDrawerNavigator, createStackNavigator, createAppContainer, DrawerItems, BackHandler} from 'react-navigation';
import { NavigationActions, StackActions } from 'react-navigation'
import {Dimensions} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import Home_Screen from './HomeScreen.js'
import Password_Screen from './Password.js'//wth
import Menu_Screen from './Menu_Screen'
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

		// this.props.navigation.navigate('Home', {Name: values.name, Username: values.user})
	}

	// check = () => {
    //     return true
	// }
	
    // componentWillMount(){
    //     BackHandler.addEventListener('hardwareBackPress',function(){
    //         if (screen_name == "main"){
    //             return true
    //         }
    //         return false
    //     })
    // }

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

const Menu = createStackNavigator(
	{
		main: {screen: Menu_Screen},
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
		// Home: {screen: ({Home}) => <Mystack screenProps = {drawerNavigation: navigation}/>},
		Home : {screen: Home},
		Reservations: {screen: Reservations},
		Menu: {screen: Menu},
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

const App = createAppContainer(MainNavigator);