import React, {Component} from 'react';
import {Platform, StyleSheet, Dimensions, Text, View, Button, Image, TouchableOpacity, ScrollView, ImageBackground, Alert, BackHandler} from 'react-native';
import {NavigationEvents} from 'react-navigation';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;
global.screen_name = ""


export default class HomeScreen extends Component {

    constructor(props) {
        super(props);
        screen_name = this.props.navigation.state["routeName"]        
    }

    componentWillMount(){
        BackHandler.addEventListener('hardwareBackPress',function(){
            if (screen_name == "main"){
                return true
            }
            return false
        })
    }

    static navigationOptions = ({navigation}) => ({
        title: 'Home',
        headerLeft: <TouchableOpacity onPress={() => navigation.openDrawer()}> 
                <Image source={require('../hamburger.png')} style={{width:20, height:17, marginLeft: 20}} />
            </TouchableOpacity>,
    })

    onPress = () => {
        Alert.alert(typeof this.props.navigation.state.params)
    }

    render() {
        return (
            <ImageBackground source={require('../BG_1.png')} style={styles.container}>
                <View style={styles.backbox}>
                    <NavigationEvents onDidFocus = { () => {screen_name = "main"}}/>                
                    <ScrollView contentContainerStyle={styles.main}>
                        <View style={styles.header}>
                            <Image source={require('../logo.png')} style={styles.logo}/>
                            <Text style={styles.logotitle}>
                                THE DEFENCE CLUB LAHORE {"\n"}
                                R BLOCK
                            </Text>
                        </View>
                        <Image style={styles.image} source={require('../BG_2.jpg')} />

                        <Text style={styles.welcome}> WELCOME {values.name}! </Text>

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
        flex: 1,
        backgroundColor: 'rgba(255,255, 255,0.75)',

    },
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
        fontFamily: 'Calibri',
        fontWeight: 'bold',
        borderColor:'grey',
        borderBottomWidth: 2,
        borderRightWidth: 2,
        backgroundColor: 'white',
        fontSize: 0.07*width,
        color: '#23186A',
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
