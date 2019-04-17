import React, {Component} from 'react';
import {ActivityIndicator, Animated, Keyboard, Platform, Dimensions, StyleSheet, Text, TextInput, View, Image, ImageBackground, TouchableOpacity, Alert} from 'react-native';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

export default class LoginScreen extends Component {
    
    constructor(props) {
        super(props);
        this.state = { Username: 'username',
                       Password: 'password',
                       invalid: 0,
                       length:  new Animated.Value(0.5*width),
                       borderRadius:  new Animated.Value(10),
                       load: 0,
                       eye: '',
                       showPassword: true,
                     };
    }

    static navigationOptions = {
        header: null
    }

    signinAnimation = () => {
        this.setState({load: 1})
        if (1) {
            Animated.timing(                  
            this.state.length,            
                {
                    toValue: 0.09*width,             
                    duration: 300,         
                },
            ).start();
        }
        this.setState({borderRadius: 0.09*width})
    }

    signoutAnimation = () => {
        this.setState({load: 0})
        if (1) {
            Animated.timing(                  
            this.state.length,            
                {
                    toValue: 0.5*width,             
                    duration: 300,         
                },
            ).start();
        }
        this.setState({borderRadius: 10})
    }

    eye = () => {
    	this.setState({ showPassword: !this.state.showPassword });
    	if (this.state.eye == '') {
    		this.setState({eye: ''})
    	} else {
    		this.setState({eye: ''})
    	}
    }
    
    onPress = () => {
        Keyboard.dismiss();
        this.signinAnimation()

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
                    this.signoutAnimation()
                }
                })
        }
        Authenticate(data).catch(alert => {this.signoutAnimation()});
    }
    
    render() {

        const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)

        return (
            <ImageBackground source={require('./BG_1.png')} style={styles.container}>
                <View style={styles.backbox}>
                    <Image source={require('./logo.png')} style={styles.logo}/>
                
                    <Text style={styles.welcome}>Welcome</Text>
                	
                	<View style={styles.input}>
	                	<View style={styles.input1}>
	                		<Text style={styles.icon}>  </Text>
		                    <TextInput
		                        style={styles.input2}
		                        autoCorrect={false}
		                        placeholder="Username"
		                        placeholderTextColor="#5E5E5E"
		                        onChangeText={(Username) => this.setState({Username})}
		                    />
	                    </View>
                    </View>
                	
                	<View style={styles.input}>
	                	<View style={styles.input1}>
	                		<TouchableOpacity onPress={this.eye}>
	                			<Text style={styles.icon}> {this.state.eye} </Text>
	                		</TouchableOpacity>
		                    <TextInput
		                    	secureTextEntry={this.state.showPassword}
		                    	autoCorrect={false}
		                        style={styles.input2}
		                        placeholder="Password"
		                        placeholderTextColor="#5E5E5E"
		                        onChangeText={(Password) => this.setState({Password})}
		                    />
			            </View>
                    </View>
                
                    {this.state.invalid ?
                        <Text style={styles.invalid}>Invalid username or password</Text>
                        : <Text style={[styles.invalid, {color: 'rgba(255,255, 255,0)'}]}>Invalid username or password</Text>}
                
                    <AnimatedTouchableOpacity
                        style={[styles.signinbutton, {width: this.state.length, borderRadius: this.state.borderRadius}]}
                        onPress={this.onPress}
                    >
                        {this.state.load ?
                            <ActivityIndicator size="small" color="white" />
                            : <Text style={{color: 'white', fontSize: 0.038*width, fontFamily: 'Calibri', fontWeight: 'bold'}}> SIGN IN </Text>}
                        
                    </AnimatedTouchableOpacity>
    
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
    },
    input: {
        backgroundColor: "white",
        width: 0.5*width,
        height: 0.09*width,
        paddingHorizontal: 10,
        borderRadius: 10,
        marginTop: 0.03*width,
        borderColor: "#D9D8D9",
        borderWidth: 1,
    },
    input1: {
        flex: 1,
        flexDirection: 'row',
    },
    input2: {
        height: 0.09*width,
    	width: 0.35*width,
        fontFamily: "Calibri",
        color: '#5E5E5E',
        fontSize: 0.038*width,
    },
    icon: {
        height: 0.09*width,
    	width: 0.07*width,
    	fontFamily: "Font Awesome 5 Free",
        color: '#5E5E5E',
        fontSize: 0.03*width,
        lineHeight: 0.075*width,
    },
    signinbutton: {
        marginTop: 0.07*width,
        backgroundColor: "#23186A",
        color: 'white',
        width: 0.5*width,
        height: 0.09*width,
        alignItems: 'center',
        justifyContent: 'center',
    },
    invalid: {
        color: 'red',
        marginTop: 5,
        fontSize: 0.03*width,
        textAlign: 'left',
        width: 0.5*width,
        marginLeft: 10,
    },
});
