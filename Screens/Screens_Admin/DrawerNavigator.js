import React, {Component} from 'react';
import {SafeAreaView, ScrollView, Image, View, Text, Alert} from 'react-native';
import {DrawerNavigationItem, createDrawerNavigator, createStackNavigator, createAppContainer, DrawerItems} from 'react-navigation';
import {Dimensions} from 'react-native';

import Home_Screen from './HomeScreen.js';
import Account_Screen from './Account/StackNavigator'
import Password_Screen from './Password.js'//wth
import Menu_Screen from './Menu/StackNavigator'

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

const values = {
	name : "",
	user : ""
}

export default class Drawer extends Component {
	constructor(props) {
		super(props)

		Nametosave = this.props.navigation.state.params.Name
		Usernametosave = this.props.navigation.state.params.Username

		values.name = Nametosave
		values.user = Usernametosave
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
		<View style={{height: 150, backgroundColor: 'white', margin: 15, marginBottom: 50}}>
			<Image source={require('./default_profile.png')} 
			 style={{height: 100, width: 100, borderRadius: 50}}
			 />
			 <Text style={{marginTop: 20}}> {values.name} </Text>
			 <Text style={{marginTop: 20}}> Member ID: {values.user} </Text>
		</View>
		<ScrollView>
		<DrawerItems {...props} />
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
                fontFamily: "Calibri Bold",
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
			header: null
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

const Password = createStackNavigator(
	{
		main: {screen: Password_Screen},
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
		Menu: {screen: Menu},
		'Add Account': {screen: Account},
		Settings: {screen: Home},
		'Change Password': {screen: Password}
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