import React, {Component} from 'react';
import {Keyboard, Platform, Dimensions, StyleSheet, Text, TextInput, View, Image, ImageBackground, TouchableOpacity, ActionSheetIOS, Picker} from 'react-native';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

const options = ['Cancel', "Continental", "Chinese", "Desi", "Thai", "Drinks"]

export default class AddMenu extends Component {

    constructor(props) {
        super(props);
        this.state = { Name: '',
                       Price: '',
                       Category: 'Continental',
                       Falsify: '',
                       Check_Name: '#D9D8D9',
                       Check_Price: '#D9D8D9',
                       Check_Category: '#D9D8D9',
                     };
    }

    static navigationOptions = {
        title: "Add Menu Item",
    };
     
    onPress = () => {
        if (this.state.Name == '' || this.state.Price == '' || this.state.Category == 'Category')
        {
            this.setState({Falsify: 'Please Fill Out All Required Fields'})
            if (this.state.Name == '') {
                this.setState({Check_Name: 'red'})
            } else {
                this.setState({Check_Name: '#D9D8D9'})
            }
            if (this.state.Price == '') {
                this.setState({Check_Price: 'red'})
            } else {
                this.setState({Check_Price: '#D9D8D9'})
            }
            if (this.state.Category == 'Category') {
                this.setState({Check_Category: 'red'})
            } else {
                this.setState({Check_Category: '#D9D8D9'})
            }
            return

        }

        var isnum = /^\d+$/.test(this.state.Price);

        if(isnum == false)
        {
            this.setState({Falsify: 'Invalid Price, can be digits only'})
            this.setState({Check_Price: 'red'})
            return
        }


        this.setState({Check_Name: '#D9D8D9', Check_Price: '#D9D8D9', Check_Category: '#D9D8D9', Falsify: ''})
        
        const data = {
            Name : this.state.Name,
            Price : this.state.Price,
            Category : this.state.Category
        }

        add_menu_server = async (data) => {
            response = await fetch ('https://whispering-savannah-21440.herokuapp.com/add_menu', {
              method : 'post', 
              headers : {
                Accept: 'application/json',
                'Content-Type' : 'application/json'
              }, 
              body : JSON.stringify(data)
            }).then((response) => response.json())

            .then((responseJSON) => {
                if (responseJSON.response == "Done"){
                    Alert.alert("Menu Item Added Successfully")
                    // this.setState({invalid: 0})
                    //     this.props.navigation.navigate('DrawerNavigator')
                }else{
                    // this.setState({invalid: 1})
                }
                })
        }


        add_menu_server(data)

        this.props.navigation.navigate('Main')
    }

    onClick() {
        ActionSheetIOS.showActionSheetWithOptions(
            {
                options: options,
                cancelButtonIndex: 0,
            },
            (buttonIndex) => {
                if (buttonIndex != 0) {
                  this.setState({Category: options[buttonIndex]})
                }
            },
        );
    }
    
    render() {
        var items = []
        for (let item in options) {
            if (item != 0)
                items.push(
                    <Picker.Item label={options[item]} value={options[item]}/>
                )
        }

        return (
            <ImageBackground source={require('../../BG_3.png')} style={styles.container}>
                <View style={styles.backbox}>

                    {
                        Platform.OS == 'ios' ?
                            <View style={[styles.input, {borderColor: this.state.Check_Category}]}>
                                <Text
                                    onPress={() => this.onClick()}>
                                    {this.state.Category}
                                </Text>
                            </View>
                        
                        :  
                            <View style={[styles.input2, {borderColor: this.state.Check_Category}]}>
                                <Picker
                                        selectedValue={this.state.Category}
                                        onValueChange={(itemValue, itemIndex) => this.setState({Category: itemValue})}
                                >
                                    {items}
                                </Picker>
                            </View>
                    }

                    <TextInput
                        maxLength={50}
                        placeholder="Name"
                        placeholderTextColor="black"
                        style={[styles.input, {borderColor: this.state.Check_Name}]}
                        onChangeText={(Name) => this.setState({Name})}
                    />

                    <TextInput
                        maxLength={10}
                        placeholder="Price"
                        placeholderTextColor="black"
                        style={[styles.input, {borderColor: this.state.Check_Price}]}
                        onChangeText={(Price) => this.setState({Price})}
                    />
                    
                    <TouchableOpacity
                        style={styles.signinbutton}
                        onPress={this.onPress}
                    >
                        <Text style={{color: 'white', fontSize: 0.04*width, fontFamily: "Calibri", fontWeight: "bold"}}> CONFIRM </Text>
                    </TouchableOpacity>

                    {this.state.Falsify != "" ?
                    <Text style={styles.invalid}> {this.state.Falsify} </Text>
                    : <Text style={[styles.invalid, {color: 'rgba(255,255, 255,0)'}]}>Valid</Text>}
    
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
        borderRadius: 20,
        width: 0.8*width,
        backgroundColor: 'white',
        alignItems: 'center',
        paddingVertical: 0.08*width,
    },
    input: {
        fontFamily: "Calibri",
        backgroundColor: "#EEEEEE",
        color: 'black',
        width: 0.65*width,
        height: 0.11*width,
        fontSize: 0.04*width,
        paddingVertical: 0.01*height,
        paddingHorizontal: 0.02*height,
        borderRadius: 10,
        marginBottom: 0.06*width,
        borderWidth: 1,
        justifyContent: 'center',
    },
    input2: {
        fontFamily: "Calibri",
        backgroundColor: "#EEEEEE",
        color: 'black',
        width: 0.65*width,
        height: 0.11*width,
        fontSize: 0.04*width,
        paddingVertical: 0.01*height,
        paddingHorizontal: 0.01*height,
        borderRadius: 10,
        marginBottom: 0.06*width,
        borderWidth: 1,
        justifyContent: 'center',
    },
    signinbutton: {
        backgroundColor: "#23186A",
        color: 'black',
        width: 0.65*width,
        height: 0.11*width,
        paddingVertical: 0.01*height,
        paddingHorizontal: 0.02*height,
        borderRadius: 10,
        borderColor: "#D9D8D9",
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    invalid: {
        fontFamily: "Calibri",
        color: 'red',
        width: 0.65*width,
        fontSize: 0.035*width,
        paddingHorizontal: 0.01*height,
        marginTop: 0.02*width,
    },
});
