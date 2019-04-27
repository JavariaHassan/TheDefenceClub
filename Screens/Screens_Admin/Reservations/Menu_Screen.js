import React, {Component} from 'react';
import {FlatList, Button, Keyboard, Platform, Dimensions, StyleSheet, Text, TextInput, View, Image, ImageBackground, TouchableOpacity, ScrollView, Alert, Picker, ActionSheetIOS} from 'react-native';
import {NavigationEvents} from 'react-navigation';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

export default class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    };

    static navigationOptions = ({navigation}) => ({
        title: 'Menu'
    })
    
    render() {

        return (

            <ImageBackground source={require('../../BG_3.png')} style={{flex: 1}}>
            
            </ImageBackground>
            
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 0.1*width,
        marginHorizontal: 0.05*width,
        padding: 0.1*width,
        borderRadius: 20,
        backgroundColor: 'white',
        flex: 1,
        alignItems: 'center'
    },
});