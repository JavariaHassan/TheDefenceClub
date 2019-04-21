import React, {Component} from 'react';
import {Button, Keyboard, Platform, Dimensions, StyleSheet, Text, TextInput, View, Image, ImageBackground, TouchableOpacity, ScrollView, Alert} from 'react-native';
import {NavigationEvents} from 'react-navigation';

import Add_Screen from './Add_Reservation';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

export default class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = { option: 1,
                       adminstyle: styles.secondbarselected,
                       memberstyle: styles.secondbar};
    };

    static navigationOptions = ({navigation}) => ({
        title: 'Reservations',
        headerRight: <TouchableOpacity onPress={() => navigation.navigate('Add')}> 
                <Image source={require('../../plus.png')} style={{width:17, height:17, marginRight: 20}} />
            </TouchableOpacity>,
        headerLeft: <TouchableOpacity onPress={() => navigation.openDrawer()}> 
                <Image source={require('../../hamburger.png')} style={{width:20, height:17, marginLeft: 20}} />
            </TouchableOpacity>,
    })

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
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity
                            onPress={this.onPress1}
                        >
                            <View style={this.state.adminstyle}>
                                <Text style={styles.buttons}> PENDING </Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={this.onPress2}
                        >
                        <View style={this.state.memberstyle}>
                            <Text style={styles.buttons}> CONFIRMED </Text>
                        </View>
                        </TouchableOpacity>
                    </View>

                    <ScrollView contentContainerStyle={{flex: 1, alignItems: 'center', paddingTop: 0.09*width}}>
                        <View style={{width: 0.85*width, height: 1.2*width, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', borderRadius: 20}}>
                                
                        </View>
                    </ScrollView>
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
        flex: 1,
        width: width,
        backgroundColor: 'rgba(255,255, 255,0.50)',
    },
    secondbar: {
        width: width/2,
        height: 0.11*width,
        backgroundColor: '#23186A',
        justifyContent: 'center',
        alignItems: 'center',
    }, 
    secondbarselected: {
        width: width/2,
        height: 0.11*width,
        backgroundColor: '#23186A',
        borderColor:'lightgrey',
        borderBottomColor: 'white',
        borderBottomWidth: 4,
        justifyContent: 'center',
        alignItems: 'center',
    }, 
    buttons: {
        height: 0.11*width,
        lineHeight: 0.12*width,
        color: 'white',
        fontSize: 15,
        fontFamily: "Calibri",
        fontWeight: "bold",
    },
    input: {
        fontFamily: "Calibri",
        backgroundColor: "#EEEEEE",
        color: 'black',
        width: 0.65*width,
        height: 0.11*width,
        fontSize: 0.04*width,
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
        paddingHorizontal: 0.02*height,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
});
