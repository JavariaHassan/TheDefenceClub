import React, {Component} from 'react';
import {Keyboard, Platform, Dimensions, StyleSheet, Text, TextInput, View, Image, ImageBackground, TouchableOpacity, Alert} from 'react-native';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

export default class LoginScreen extends Component {
    
    constructor(props) {
        super(props);
        this.state = { Username: 'username',
                       Password: 'password',
                       invalid: 0 };
    }

    static navigationOptions = {
        header: null
    }
    
    onPress = () => {
        Keyboard.dismiss();

        const data = {
            username : this.state.Username,
            password : this.state.Password
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
                            this.props.navigation.navigate('DrawerNavigator_admin', {Name: this.state.Name, Username: this.state.Username})
                        }
                    });
                    this.setState({invalid: 0})
                }else{
                    this.setState({invalid: 1})
                }
                })
        }
        Authenticate(data).catch(alert => {});
    }
    
    render() {
        return (
            <ImageBackground source={require('./BG_1.png')} style={styles.container}>
                <View style={styles.backbox}>
                    <Image source={require('./logo.png')} style={styles.logo}/>
                
                    <Text style={styles.welcome}>Welcome</Text>
                
                    <TextInput
                        style={styles.input}
                        placeholder="Username"
                        onChangeText={(Username) => this.setState({Username})}
                    />
                
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        onChangeText={(Password) => this.setState({Password})}
                    />
                
                    {this.state.invalid ?
                        <Text style={styles.invalid}>Invalid username or password</Text>
                        : null}
                
                    <TouchableOpacity
                        style={styles.signinbutton}
                        onPress={this.onPress}
                    >
                        <Text style={{color: 'white', fontSize: 0.04*width}}> SIGN IN </Text>
                    </TouchableOpacity>
    
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
        height: 0.70*height,
        width: 0.70*width,
        backgroundColor: 'rgba(255,255, 255,0.75)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 0.1*width,
    },
    logo: {
        height: 0.25*width,
        width: 0.20*width,
        position: 'absolute',
        top: 0.05*height,
    },
    welcome: {
        fontSize: 0.05*width,
        color: '#23186A',
        paddingBottom: 0.025*height,
    },
    input: {
        color: '#767171',
        borderBottomColor: '#767171',
        borderBottomWidth: 1,
        width: 0.50*width,
        fontSize: 0.035*width,
        paddingBottom: 0,
        marginBottom: 0.01*height,
    },
    signinbutton: {
        backgroundColor: '#23186A',
        marginTop: 0.05*height,
        width: 0.35*width,
        height: 0.07*height,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: width,
        position: 'absolute',
        bottom: 0.1*height,
    },
    invalid: {
        color: 'red',
        fontSize: 0.03*width,
        textAlign: 'left',
        width: 0.50*width,
    },
});
