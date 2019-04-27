import React, {Component} from 'react';
import {ActivityIndicator, Animated, Keyboard, Platform, Dimensions, StyleSheet, Text, TextInput, View, Image, ImageBackground, TouchableOpacity, Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

export default class LoginScreen extends Component {
    
    constructor(props) {
        super(props);
        this.state = { 
            Name : ""
      };
    }

    static navigationOptions = {
        header: null
    }

    componentDidMount(){
    
        var credentials = {}

        getData = async () => {
            try {
              const value = await AsyncStorage.getItem('@login')
              if(value !== null) {
                // value previously stored
                credentials = JSON.parse(value)
                // Alert.alert("login credential found")
                const data = {
                    username : credentials.username,
                    password : credentials.password
                }
                
                Authenticate = async (data) => {
                    response = await fetch ('https://whispering-savannah-21440.herokuapp.com/login', {
                    method : 'post', 
                    headers : {
                        Accept: 'application/json',
                        'Content-Type' : 'application/json'
                    }, 
                    body : JSON.stringify(data)
                    }).then((response) => response.json())
                    .then((responseJSON) => {
                        if (responseJSON.response == "Done"){
                            this.setState({
                                Name : responseJSON.Name
                            }, function (){
                                if (responseJSON.Admin == 0){
                                    this.props.navigation.navigate('DrawerNavigator_member')
                                }
                                else{
                                    this.props.navigation.navigate('DrawerNavigator_admin', {Name: this.state.Name, Username: credentials.username})
                                }
                            });
                        }else{
                            this.props.navigation.navigate('Login')
                        }
                    })
                }
                Authenticate(data);
              }

              else{
                // Alert.alert("login credentials not found")  
                this.props.navigation.navigate('Login')
              }  
            } catch(e) {
                Alert.alert("Error")  
              // error reading value
            }
          }

          getData()            
    }

    
    render() {
        return (
            <ImageBackground source={require('./BG_1.png')} style={styles.container}>
                <View style={styles.backbox}>
                    <Image source={require('./logo.png')} style={styles.logo}/>
                    <Text style={styles.welcome}>Welcome</Text> 
                    <ActivityIndicator size="large" color="white" />
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backbox: {
        height: 1.2*width,
        width: 0.70*width,
        backgroundColor: 'rgba(255,255, 255,0.8)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
    },
    logo: {
        height: 0.3*width,
        width: 0.25*width,
        marginBottom: 0.08*width,
    },
    welcome: {
        fontFamily: 'Calibri',
        fontWeight: 'bold',
        fontSize: 0.06*width,
        color: '#23186A',
        marginBottom: 0.07*width,
    }
});
