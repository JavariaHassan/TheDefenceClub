import React, {Component} from 'react';
import {ScrollView, Keyboard, Platform, Dimensions, StyleSheet, Text, TextInput, View, Image, ImageBackground, TouchableOpacity} from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import { fromRight } from 'react-navigation-transitions';
import Create from './Account';
import Member from './Add_Member';
import Admin from './Add_Admin';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

class Member_Comp extends Component {

    constructor(props) {
        super(props);
        this.state = { Name: '',
                       ID: '',
                       Email: '',
                       Password: '',
                       ConfirmPass: '', };
    }

    static navigationOptions = {
        title: "Add Member",
    };
    
    onPress = () => {
        if (this.state.Password == this.state.ConfirmPass){
            const data = {
                Name : this.state.Name,
                ID : this.state.ID,
                Email : this.state.Email,
                Password : this.state.Password,
                Admin: 0
            }
            Authenticate = async (data) => {
                response = await fetch ('https://whispering-savannah-21440.herokuapp.com/add_member', {
                  method : 'post', 
                  headers : {
                    Accept: 'application/json',
                    'Content-Type' : 'application/json'
                  }, 
                  body : JSON.stringify(data)
                }).then((response) => response.json())
                .then((responseJSON) => {
                    if (responseJSON.response == "Done"){
                        Alert.alert("Member added")
                        // this.setState({invalid: 0})
                        //     this.props.navigation.navigate('DrawerNavigator')
                    }else{
                        // this.setState({invalid: 1})
                    }
                    })
            }
            Authenticate(data)
        
        }
    }
    
    render() {
        return (
            <View style={styles.backbox_Admin}>

                <Text style={styles.header}> Name </Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(Name) => this.setState({Name})}
                />

                <Text style={styles.header}> Member ID </Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(ID) => this.setState({ID})}
                />

                <Text style={styles.header}> Email </Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(Email) => this.setState({Email})}
                />

                <Text style={styles.header}> Password </Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(Password) => this.setState({Password})}
                />

                <Text style={styles.header}> Confirm Password </Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(ConfirmPass) => this.setState({ConfirmPass})}
                />
            
                
                <TouchableOpacity
                    style={styles.signinbutton}
                    onPress={this.onPress}
                >
                    <Text style={{color: 'white', fontSize: 0.04*width}}> Create Account </Text>
                </TouchableOpacity>

            </View>
        );
    }
}

class Admin_Comp extends Component {

    constructor(props) {
        super(props);
        this.state = { Name: '',
                       ID: '',
                       Email: '',
                       Password: '',
                       ConfirmPass: '', };
    }
    
    onPress = () => {

        if (this.state.Password == this.state.ConfirmPass){
            const data = {
                Name : this.state.Name,
                ID : this.state.ID,
                Email : this.state.Email,
                Password : this.state.Password,
                Admin: 0
            }
            Authenticate = async (data) => {
                response = await fetch ('https://whispering-savannah-21440.herokuapp.com/add_admin', {
                  method : 'post', 
                  headers : {
                    Accept: 'application/json',
                    'Content-Type' : 'application/json'
                  }, 
                  body : JSON.stringify(data)
                }).then((response) => response.json())
                .then((responseJSON) => {
                    if (responseJSON.response == "Done"){
                        Alert.alert("Admin added")
                        // this.setState({invalid: 0})
                        //     this.props.navigation.navigate('DrawerNavigator')
                    }else{
                        // this.setState({invalid: 1})
                    }
                    })
            }
            Authenticate(data)
        
        }
    }
    
    render() {
        return (
            <View style={styles.backbox_Admin}>

                <Text style={styles.header}> Name </Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(Name) => this.setState({Name})}
                />

                <Text style={styles.header}> Admin ID </Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(ID) => this.setState({ID})}
                />

                <Text style={styles.header}> Email </Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(Email) => this.setState({Email})}
                />

                <Text style={styles.header}> Password </Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(Password) => this.setState({Password})}
                />

                <Text style={styles.header}> Confirm Password </Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(ConfirmPass) => this.setState({ConfirmPass})}
                />
            
                
                <TouchableOpacity
                    style={styles.signinbutton}
                    onPress={this.onPress}
                >
                    <Text style={{color: 'white', fontSize: 0.04*width}}> Create Account </Text>
                </TouchableOpacity>

            </View>
        );
    }
}

export default class Main extends Component {

    constructor(props) {
        super(props);
        this.state = { option: 1,
                       adminstyle: styles.secondbarselected,
                       memberstyle: styles.secondbar};
    };

    static navigationOptions = ({navigation}) => ({
        title: 'Add Account',
        headerLeft: <TouchableOpacity onPress={() => navigation.openDrawer()}> 
                <Image source={require('../../hamburger.png')} style={{width:20, height:17, marginLeft: 20}} />
            </TouchableOpacity>,
    });
    
    onPress1 = () => {
        Keyboard.dismiss();
        this.setState({option: 1,
                       adminstyle: styles.secondbarselected,
                       memberstyle: styles.secondbar})
    };

    onPress2 = () => {
        Keyboard.dismiss();
        this.setState({option: 0,
                       adminstyle: styles.secondbar,
                       memberstyle: styles.secondbarselected})
    };
    
    render() {
        return (
            <ImageBackground source={require('../../BG_3.png')} style={styles.container}>
                <ScrollView contentContainerStyle={{alignItems: 'center'}}
                            style={styles.backbox}>
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity
                            onPress={this.onPress1}
                        >
                            <View style={this.state.adminstyle}>
                                <Text style={styles.buttons}> ADMIN </Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={this.onPress2}
                        >
                        <View style={this.state.memberstyle}>
                            <Text style={styles.buttons}> MEMBER </Text>
                        </View>
                        </TouchableOpacity>

                    </View>
                    {this.state.option ?
                        <Admin_Comp/>
                        : <Member_Comp/>}
                </ScrollView>
            </ImageBackground>
        );
    }
}

const MainNavigator = createStackNavigator(
    {
        Admin:  {screen: Admin},
        Member: {screen: Member},
    },
);

const App = createAppContainer(MainNavigator);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backbox: {
        flex: 1,
        width: width,
        backgroundColor: 'rgba(255,255, 255,0.50)',
    },
    backbox_Admin: {
        paddingVertical: 0.1*width,
        width: 0.8*width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    secondbar: {
        width: width/2,
        height: 0.06*height,
        backgroundColor: 'white',
        borderColor:'lightgrey',
        borderBottomWidth: 0.5,
        borderTopWidth: 0.5,
        borderRightWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }, 
    secondbarselected: {
        width: width/2,
        height: 0.06*height,
        backgroundColor: 'white',
        borderColor:'lightgrey',
        borderBottomColor: '#23186A',
        borderBottomWidth: 2,
        borderTopWidth: 0.5,
        borderRightWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }, 
    buttons: {
        fontSize: 15,
        fontFamily: "Calibri Bold",
    },
    header: {
        width: 0.60*width,
        color: '#23186A',
        fontSize: 0.035*width,
        marginBottom: 3,
    },
    input: {
        backgroundColor: "white",
        color: '#23186A',
        width: 0.60*width,
        height: 0.1*width,
        fontSize: 0.035*width,
        paddingVertical: 0.01*height,
        paddingHorizontal: 0.02*height,
        borderRadius: 10,
        marginBottom: 0.03*width,
    },
    signinbutton: {
        backgroundColor: '#59B957',
        marginTop: 0.05*height,
        width: 0.35*width,
        height: 0.07*height,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
});
