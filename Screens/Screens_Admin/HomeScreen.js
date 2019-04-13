import React, {Component} from 'react';
import {Platform, StyleSheet, Dimensions, Text, View, Button, Image, TouchableOpacity, ScrollView} from 'react-native';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

export default class HomeScreen extends Component {

    constructor(props) {
        super(props);
        this.state = { name: 'Musa' };
    }

    static navigationOptions = {
        title: "Home",
    };

    onPress = () => {
        
    }

    render() {
        return (
            <ScrollView contentContainerStyle={styles.main}>
                <View style={styles.header}>
                    <Image source={require('../logo.png')} style={styles.logo}/>
                    <Text style={styles.logotitle}>
                        THE DEFENCE CLUB LAHORE {"\n"}
                        R BLOCK
                    </Text>
                </View>
                <Image style={styles.image} source={require('../BG_2.jpg')} />

                <Text style={styles.welcome}> WELCOME MUSA! </Text>

                <View style={{marginTop: 0.03*width}}>
                    <Text style={styles.question}>
                            WHAT BOOKING WOULD YOU LIKE TO {"\n"}
                            MAKE TODAY?
                    </Text>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.onPress}
                    >
                        <Text style={{color: 'white', fontSize: 0.035*width}}> Make a Reservation </Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    main: {
        height: height,
        alignItems: 'center',
    },
    header: {
        width: width,
        margin: 0.03*width,
        marginLeft: 0.1*width,
        flexDirection: 'row',
    },
    logo: {
        height: 0.18*width,
        width: 0.14*width,
    },
    logotitle: {
        fontWeight: "bold",
        fontSize: 0.045*width,
        color: '#23186A',
        marginTop: 0.03*width,
        marginLeft: 0.03*width,
    },
    image: {
        width: width,
        height: 0.7*width,
    },
    welcome: {
        backgroundColor: '#23186A',
        fontSize: 0.07*width,
        color: 'white',
        width: 0.9*width,
        height: 0.25*width,
        lineHeight: 0.25*width,
        textAlign: 'center',
        borderRadius: 15,
        transform: [{translateY: -0.05*width}],
    },
    bottom: {
        width: width,
        alignItems: 'center',
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 0.25*width,
    },
    question: {
        fontWeight: "bold",
        fontSize: 0.035*width,
        color: '#23186A',
        textAlign: 'center',
        marginBottom: 8,
    },
    button: {
        borderRadius: 8,
        width: 0.64*width,
        height: 0.08*width,
        backgroundColor: '#23186A',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
