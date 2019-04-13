import React, {Component} from 'react';
import {Button, Keyboard, Platform, Dimensions, StyleSheet, Text, TextInput, View, Image, ImageBackground, TouchableOpacity, ScrollView, Alert} from 'react-native';
import Swipeout from 'react-native-swipeout';

import Add_Screen from './Add_Menu';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

var MenuObj2 = {
    'Continental' : ['Chicken And Cheese Salad', 'Peppered Pasta Salad', 'Paneer Steak'],
    'Chinese' : ['Hot and Sour Soup', 'Golden Fried Prawns', 'Cho Yuen Squids'],
    'Desi' : ['Bombay Biryani', 'Nihari', 'Naan'],
    'Thai' : ['Tom Yum Goong', 'Som Tum', 'Pad Thai'],
    'Drinks' : ['Coke', 'Water', 'Chai'],
};

var MenuObj = {
    "chicken karahi" : {
     "name": "chicken karahi",
     "category": "desi",
     "price": 200,
    },

    "pizza" : {
     "name": "pizza",
     "category": "fast food",
     "price": 500,
    },

    "sada naan" : {
     "name": "sada naan",
     "category": "tandoor",
     "price": 10,
    }
}

export default class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {     
                        data: MenuObj,
                        fooditem: 0,    
                    };
    }

    static navigationOptions = ({navigation}) => ({
        title: 'Menu',
        headerRight: <TouchableOpacity onPress={() => navigation.navigate('Add')}> 
                <Image source={require('../../plus.png')} style={{width:17, height:17, marginRight: 20}} />
            </TouchableOpacity>,
        headerLeft: <TouchableOpacity onPress={() => navigation.openDrawer()}> 
                <Image source={require('../../hamburger.png')} style={{width:20, height:17, marginLeft: 20}} />
            </TouchableOpacity>,
    })

    onChange = Search => {
        if (Search == '') {
            this.setState({data: MenuObj})
        }
        else {
            var newData = {}

            for (var key in MenuObj) {
                filter = Search.toUpperCase()
                if (MenuObj[key]['name'].toUpperCase().indexOf(filter) > -1) {
                    newData[key] = {}
                    newData[key]['name'] = MenuObj[key]['name']
                    newData[key]['category'] = MenuObj[key]['category']
                    newData[key]['price'] = MenuObj[key]['price']
                } 
            }

            this.setState({ data: newData });  
        }  
    }
    
    onPress = () => {
    }
    
    render() {
        var swipeoutBtns = [
            {
                text: 'Remove',
                backgroundColor: '#FE6463',
                onPress: () => { 
                    Alert.alert(this.state.fooditem)
                }
            }
        ]

        var items = [];
        for (let key in this.state.data) {
            items.push(
                <Swipeout style={styles.wipeout} right={swipeoutBtns}
                    autoClose={true}
                    onOpen={() => {
                        this.setState({
                            fooditem: key,
                        })
                    }}
                >

                    <View style={styles.list}>
                        <Text style={styles.listitem1}> {this.state.data[key]['name']} </Text>
                        <Text style={styles.listitem2}> {this.state.data[key]['category']}  |  Pkr {this.state.data[key]['price']}</Text>
                    </View>
                </Swipeout>
            )
        }

        return (
            <ImageBackground source={require('../../BG_3.png')} style={styles.container}>
                <View style={styles.backbox}>

                    <TextInput
                        style={styles.input}
                        placeholder="Search"
                        placeholderTextColor="#23186A"
                        onChangeText={(Search) => this.onChange(Search)}
                    />

                    <ScrollView contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
                                style={styles.scrollview}>
                        {items}
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
        paddingTop: 0.05*width,
        width: width,
        backgroundColor: 'rgba(255,255, 255,0.50)',
        alignItems: 'center',
    },
    input: {
        width: width*0.9,
        padding: 10,
        backgroundColor: 'white',
        color: "#23186A",
        marginBottom: 10,
        fontSize: 18,
        borderColor:'#D6D6D6',
        borderWidth: 0.5,
        borderRadius: 10,
    },
    scrollview: {
        width: width*0.90,
        backgroundColor: 'white',
        borderRadius: 10,
        marginBottom: width*0.05,
        padding: 6,
        paddingVertical: 20,
    },
    wipeout: {
        width: width*0.80,
        backgroundColor: 'transparent',
        borderBottomColor:'#D6D6D6',
        borderBottomWidth: 1,
        borderRadius: 5,
    },
    list: {
        backgroundColor: 'white',
        padding: 5,
        paddingBottom: 8,
    },
    listitem1: {
        fontSize: 18,
        color: '#424242',
    },
    listitem2: {
        fontSize: 14,
        paddingLeft: 2,
    },
    signinbutton: {
        backgroundColor: '#23186A',
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: width,
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
    bar: {
        width: 0.9*width,
    },
});
