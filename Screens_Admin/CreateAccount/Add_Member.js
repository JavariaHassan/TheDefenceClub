import React, {Component} from 'react';
import {Keyboard, Platform, Dimensions, StyleSheet, Text, TextInput, View, Image, ImageBackground, TouchableOpacity} from 'react-native';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

export default class LoginScreen extends Component {

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
    }
    
    render() {
        return (
            <ImageBackground source={require('../../BG_3.png')} style={styles.container}>
                <View style={styles.backbox}>

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
        height: 0.75*height,
        width: 0.80*width,
        backgroundColor: 'rgba(255,255, 255,0.75)',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderRadius: 0.07*width,
        padding: 30,
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
    header: {
        width: 0.60*width,
        color: '#23186A',
        fontSize: 0.035*width,
        marginBottom: 3,
    },
    signinbutton: {
        backgroundColor: '#59B957',
        marginTop: 0.05*height,
        width: 0.35*width,
        height: 0.07*height,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        position: 'absolute',
        bottom: 30,
        right: 30+(0.03*width),
    },
});
