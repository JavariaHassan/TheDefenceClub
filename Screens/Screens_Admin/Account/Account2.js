import React, {Component} from 'react';
import {Keyboard, Platform, Dimensions, StyleSheet, Text, TextInput, View, Image, ImageBackground, TouchableOpacity} from 'react-native';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

export default class LoginScreen extends Component {

    constructor(props) {
        super(props);
    };

    static navigationOptions = {
        title: "Create Account",
    };
    
    onPressAdmin = () => {
        this.props.navigation.navigate('Admin')
    };

    onPressMember = () => {
        this.props.navigation.navigate('Member')
    };
    
    render() {
        return (
            <ImageBackground source={require('../../BG_3.png')} style={styles.container}>
                <TouchableOpacity
                    style={styles.backbox}
                    onPress={this.onPressAdmin}
                >
                    <Text style={styles.text}>  Admin </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.backbox}
                    onPress={this.onPressMember}
                >
                    <Text style={styles.text}> Member </Text>
                </TouchableOpacity>
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
        height: 0.1*height,
        width: 0.6*width,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: 0.04*height,
    },
    text: {
        color: '#23186A',
        fontWeight: 'bold',
        fontSize: 0.04*width,
    }
});