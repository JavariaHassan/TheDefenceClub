import React, {Component} from 'react';
import {Button, Keyboard, Platform, Dimensions, StyleSheet, Text, TextInput, View, Image, ImageBackground, TouchableOpacity, ScrollView, Alert} from 'react-native';
import {NavigationEvents} from 'react-navigation';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

var MenuObj = {
    
}

var nav = null;

export default class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {     
                        data: MenuObj,
                        fooditem: 0,    
                    };        
    }

    componentDidMount(){
        const { navigation } = this.props;
        nav = navigation.getParam('nav');

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
        title: '',
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

    menuPickAdd = key => {
        nav.navigate('Add', {menuItem: key})
    }

    menuPick = key => {
        Alert.alert(
            "Add "+key['Name']+" to Menu?",
            '',
            [
                {text: 'Cancel', style: 'cancel'},
                {text: 'Add', onPress: () => this.menuPickAdd(key)},
            ],
          );
    }
    
    render() {
        var items = [];
        for (const key in this.state.data) {
            items.push(
                <TouchableOpacity onPress={() => this.menuPick(this.state.data[key])} style={styles.wipeout}>
                    <View style={styles.list}>
                        <Text style={styles.listitem1}> {this.state.data[key]['Name']} </Text>
                        <Text style={styles.listitem2}> {this.state.data[key]['Category']}  |  Pkr {this.state.data[key]['Price']}</Text>
                    </View>
                </TouchableOpacity>
            )
        }

        return (

            <View style={styles.container}>
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

                    <View style={{width: width*0.9, height: width*0.12, marginBottom: 10, flexDirection: 'row', backgroundColor: '#EEEEEE', borderColor: "#EEEEEE", borderWidth: 1, borderRadius: 10, alignItems: 'center', justifyContent: 'center'}}>
                        <TextInput
                            style={styles.input}
                            placeholder="Search"
                            placeholderTextColor="grey"
                            onChangeText={(Search) => this.onChange(Search)}
                        />
                        <View style={{borderTopRightRadius: 10, borderBottomRightRadius: 10, width: width*0.19, height: width*0.12, backgroundColor: "#23186A", justifyContent: 'center', alignItems: 'center'}}>
                            <Image source={require('../../search.png')} style={{width: width*0.05, height: width*0.05}}/>
                        </View>
                    </View>

                    <ScrollView contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
                                style={styles.scrollview}>
                        {items}
                    </ScrollView>
    
                </View>
            </View>
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
        padding: 10,
        paddingLeft: 16,
        color: "grey",
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
        backgroundColor: '#FC2632',
        borderRadius: 10,
    },
    list: {
        height: width*0.16,
        backgroundColor: 'white',
        padding: 10,
        borderColor: "#D9D8D9",
        borderBottomWidth: 1,
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
