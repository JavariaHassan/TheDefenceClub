import React, {Component} from 'react';
import {Button, Keyboard, Platform, Dimensions, StyleSheet, Text, TextInput, View, Image, ImageBackground, TouchableOpacity, ScrollView, Alert} from 'react-native';
import Swipeout from 'react-native-swipeout';
import {NavigationEvents} from 'react-navigation';

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
     "Name": "chicken karahi",
     "Category": "desi",
     "Price": "200",
    },

    "pizza" : {
     "Name": "pizza",
     "Category": "fast food",
     "Price": "500",
    },

    "sada naan" : {
     "Name": "sada naan",
     "Category": "tandoor",
     "Price": "10",
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

    componentDidMount(){
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
            console.error(error);
            Alert.alert("No data received")
          });
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
    
    onPress = () => {
        // remove api called 
        var datatemp = {
            Name : "",
            Price : "",
            Category : ""
        }

        for (let key in this.state.data) {
            if (key === this.state.fooditem)
            {
                datatemp = {
                    Name : this.state.data[key]["Name"],
                    Price : this.state.data[key]["Price"],
                    Category : this.state.data[key]["Category"]
                }
                break;
            }
        }

        remove_menu_server = async (data) => {
            response = await fetch ('https://whispering-savannah-21440.herokuapp.com/remove_menu', {
              method : 'post', 
              headers : {
                Accept: 'application/json',
                'Content-Type' : 'application/json'
              }, 
              body : JSON.stringify(data)
            }).then((response) => response.json())

            .then((responseJSON) => {
                if (responseJSON.response == "Done"){
                    Alert.alert("Menu Item Removed Successfully")
                    // this.setState({invalid: 0})
                    //     this.props.navigation.navigate('DrawerNavigator')
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
                        console.error(error);
                        Alert.alert("No data received")
                    });
                }

                if (responseJSON.response == "Nokey"){
                    Alert.alert("No item selected")
                }
                else{
                    // this.setState({invalid: 1})
                }
                })

        }
        remove_menu_server(datatemp)
    }
    
    render() {
        var swipeoutBtns = [
            {
                text: 'Remove',
                backgroundColor: '#FE6463',
                onPress : this.onPress
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
                        <Text style={styles.listitem1}> {this.state.data[key]['Name']} </Text>
                        <Text style={styles.listitem2}> {this.state.data[key]['Category']}  |  Pkr {this.state.data[key]['Price']}</Text>
                    </View>
                </Swipeout>
            )
        }

        return (

            <ImageBackground source={require('../../BG_3.png')} style={styles.container}>
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
                            console.error(error);
                            Alert.alert("No data received");
                        }))
                    }
                
                    />

                    <View style={{width: width*0.9, marginBottom: 10, flexDirection: 'row'}}>
                        <TextInput
                            style={styles.input}
                            placeholder="Search"
                            placeholderTextColor="#23186A"
                            onChangeText={(Search) => this.onChange(Search)}
                        />
                        <View style={{width: width*0.15, height: 0.07*height, backgroundColor: "#23186A", justifyContent: 'center', alignItems: 'center'}}>
                            <Image source={require('../../search.png')} style={{width: width*0.05, height:0.03*height}}/>
                        </View>
                    </View>

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
        alignItems: 'center',
    },
    input: {
        height: 0.07*height,
        width: width*0.75,
        fontFamily: "Calibri",
        paddingLeft: 20,
        padding: 10,
        backgroundColor: 'white',
        color: "#23186A",
        fontSize: 20,
        borderColor: "#D6D6D6",
        borderWidth: 1,
    },
    scrollview: {
        width: width*0.90,
        backgroundColor: 'white',
        marginBottom: width*0.05,
        padding: 6,
        paddingVertical: 20,
        borderColor: "#D6D6D6",
        borderWidth: 1,
    },
    wipeout: {
        width: width*0.80,
        backgroundColor: 'transparent',
        borderBottomColor:'#D6D6D6',
        borderBottomWidth: 1,
    },
    list: {
        backgroundColor: 'white',
        padding: 5,
        paddingBottom: 8,
    },
    listitem1: {
        fontFamily: "Calibri",
        fontSize: 20,
        color: '#424242',
    },
    listitem2: {
        fontFamily: "Calibri",
        fontSize: 16,
        paddingLeft: 2,
    },
});
