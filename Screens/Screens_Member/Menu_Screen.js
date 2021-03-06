import React, {Component} from 'react';
import {Button, Keyboard, Platform, Dimensions, StyleSheet, Text, TextInput, View, Image, ImageBackground, TouchableOpacity, ScrollView, Alert, BackHandler} from 'react-native';
import Swipeout from 'react-native-swipeout';
import {NavigationEvents} from 'react-navigation';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

var MenuObj = {
    
}

export default class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {     
                        data: MenuObj,
                        fooditem: 0,    
                    };
        screen_name = ""
    }

    componentDidMount(){

        if (online_status === 1){
            return fetch('https://whispering-savannah-21440.herokuapp.com/get_menu')
                .then((response) => response.json())
                .then((responseJson) => {
                console.log(responseJson);

                MenuObj = responseJson;

                this.setState({
                    data : responseJson 
                });
                
                })
                .catch((error) =>{
                    Alert.alert("Please check your internet connection")
                });
        }
        if (online_status === 0){
            Alert.alert("Please check your internet connection")
        }
        
      }

    static navigationOptions = ({navigation}) => ({
        title: 'Menu',
        headerLeft: <TouchableOpacity onPress={() => navigation.openDrawer()}> 
                <Image source={require('../hamburger.png')} style={{width:20, height:17, marginLeft: 20}} />
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
                if (MenuObj[key]['Name'].toUpperCase().indexOf(filter) > -1) {
                    newData[key] = {}
                    newData[key]['Name'] = MenuObj[key]['Name']
                    newData[key]['Category'] = MenuObj[key]['Category']
                    newData[key]['Price'] = MenuObj[key]['Price']
                } 
            }

            this.setState({ data: newData });  
        }  
    }
    
    
    render() {

        var items = [];
        for (let key in this.state.data) {
            items.push(
                <View style={styles.wipeout}>
                    <View style={styles.list}>
                        <Text style={styles.listitem1}> {this.state.data[key]['Name']} </Text>
                        <Text style={styles.listitem2}> {this.state.data[key]['Category']}  |  Pkr {this.state.data[key]['Price']}</Text>
                    </View>
                </View>
            )
        }

        return (

            <ImageBackground source={require('../BG_3.png')} style={styles.container}>
                <NavigationEvents onDidFocus = { () => {screen_name = ""}}/>                

                <View style={styles.backbox}>
                    <NavigationEvents onDidFocus={(() => fetch('https://whispering-savannah-21440.herokuapp.com/get_menu')
                        .then((response) => response.json())
                        .then((responseJson) => {
                            console.log(responseJson);
                            MenuObj = responseJson;
                            this.setState({
                                data: responseJson
                            });
                        })
                        .catch((error) => {
                            Alert.alert("Please check your internet connection");
                        }))
                    }
                
                    />

                    <View style={{width: width*0.9, height: width*0.16, marginBottom: 5, flexDirection: 'row', backgroundColor: 'white', borderColor: "#D9D8D9", borderWidth: 1, borderRadius: 10, alignItems: 'center', justifyContent: 'center'}}>
                        <TextInput
                            style={styles.input}
                            placeholder="Search"
                            placeholderTextColor="#23186A"
                            onChangeText={(Search) => this.onChange(Search)}
                        />
                        <View style={{borderTopRightRadius: 10, borderBottomRightRadius: 10, width: width*0.19, height: width*0.16, backgroundColor: "#23186A", justifyContent: 'center', alignItems: 'center'}}>
                            <Image source={require('../search.png')} style={{width: width*0.05, height: width*0.05}}/>
                        </View>
                    </View>

                    <ScrollView contentContainerStyle={{justifyContent: 'center', alignItems: 'center', paddingBottom: 50}}
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
        alignItems: 'center',
    },
    input: {
        height: width*0.12,
        width: (width*0.9) - (width*0.19),
        fontFamily: "Calibri",
        fontWeight: "bold",
        padding: 10,
        paddingLeft: 16,
        color: "#23186A",
        fontSize: 17,
    },
    scrollview: {
        width: width*0.90,
        paddingBottom: 20,
    },
    wipeout: {
        width: width*0.90,
        backgroundColor: 'transparent',
        marginBottom: 5,
    },
    list: {
        height: width*0.16,
        backgroundColor: 'white',
        padding: 10,
        borderColor: "#D9D8D9",
        borderWidth: 1,
        borderRightWidth: 0,
        borderRadius: 10,
    },
    listitem1: {
        fontFamily: "Calibri",
        fontSize: 17,
        color: 'black',
    },
    listitem2: {
        fontFamily: "Calibri",
        fontSize: 15,
        color: '#424242',
    },
});