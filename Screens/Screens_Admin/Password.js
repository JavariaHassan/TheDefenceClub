
import React, {Component} from 'react';
import {Keyboard, Platform, Dimensions, StyleSheet, Text, TextInput, View, Image, ImageBackground, TouchableOpacity, Alert, ScrollView} from 'react-native';
import Swipeout from 'react-native-swipeout';
import {NavigationEvents} from 'react-navigation';


var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

export default class LoginScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
                       ID: '',
                       oldPassword: '',
                       newPassword: '', };
    }

     static navigationOptions = ({navigation}) => ({
        title: 'Change Password',
        headerLeft: <TouchableOpacity onPress={() => navigation.openDrawer()}> 
                <Image source={require('../hamburger.png')} style={{width:20, height:17, marginLeft: 20}} />
            </TouchableOpacity>,
    })
    
    onPress = () => {
        const data =
        {
            ID: this.state.ID,
            oldPassword: this.state.oldPassword,
            newPassword: this.state.newPassword
        }
        
        
        Authenticate = async (data) => {
            response = await fetch('https://whispering-savannah-21440.herokuapp.com/change_password', {
                method : 'post',
                headers : {
                    Accept : 'application/json',
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(data)
            }).then((response) => response.json())
            .then((responseJSON) => {
                Alert.alert(responseJSON.response)
                if (responseJSON.response == "done") {
                    Alert.alert("Password Changed")
                } else if (responseJSON.response == "OldIdPass_invalid") {
                    Alert.alert("Old Password Invalid")
                }
            })
        }
        Authenticate(data)
    }
    
    render() {
        return (
            <ImageBackground source={require('../BG_1.png')} style={styles.container}>
               <View style={styles.backbox}>
                     <Image style={styles.image} source={require('../key.png')} />
                            
                        <TextInput 
                            style={styles.input}
                            placeholder = "Id"
                            placeholderTextColor = 'black'
                            onChangeText={(ID) => this.setState({ID})}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder= "Old Password"
                            placeholderTextColor = 'black'
                            onChangeText={(oldPassword) => this.setState({oldPassword})}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder = "Confirm New Password"
                            placeholderTextColor = 'black'
                            onChangeText={(newPassword) => this.setState({newPassword})}
                        />

                        <TouchableOpacity
                            style={styles.signinbutton}
                            onPress={this.onPress}
                        >
                            <Text style={{color: 'white', fontSize: 0.04*width, fontFamily: "Calibri Bold"}}> SUBMIT </Text>
                        </TouchableOpacity>


               </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.75)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    backbox: {
        width: width*0.8,
        height: height*0.75,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    image: {
        width: 0.25*width,
        height: 0.25*width,
        alignItems: 'center',
        marginBottom: 0.1*width,
    },
    welcome: {
        fontSize: 0.07*width,
        color: 'black',
        width: 0.9*width,
        height: 0.25*width,
        lineHeight: 0.25*width,
        textAlign: 'center',
        borderRadius: 15,
        alignItems: 'center',
    },
    input: {
        fontFamily: "Calibri",
        backgroundColor: "#EEEEEE",
        color: 'black',
        width: 0.65*width,
        height: 0.11*width,
        fontSize: 0.04*width,
        paddingVertical: 0.01*height,
        paddingHorizontal: 0.02*height,
        borderRadius: 10,
        marginBottom: 0.06*width,
        borderColor: "#D9D8D9",
        borderWidth: 1,
    },
    signinbutton: {
        backgroundColor: "#23186A",
        color: 'white',
        width: 0.65*width,
        height: 0.11*width,
        fontSize: 0.04*width,
        paddingVertical: 0.01*height,
        paddingHorizontal: 0.02*height,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
});




