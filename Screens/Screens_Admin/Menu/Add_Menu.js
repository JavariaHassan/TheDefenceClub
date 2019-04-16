import React, {Component} from 'react';
import {Keyboard, Platform, Dimensions, StyleSheet, Text, TextInput, View, Image, ImageBackground, TouchableOpacity, Alert, Picker} from 'react-native';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

export default class AddMenu extends Component {

    constructor(props) {
        super(props);
        this.state = { Name: '',
                       Price: '',
                       Category: '',
                     };
    }

    static navigationOptions = {
        title: "Add Menu Item",
    };
    
    onPress = () => {
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
    
    render() {
        return (
            <ImageBackground source={require('../../BG_3.png')} style={styles.container}>
                <View style={styles.backbox}>

                    <View style={styles.input2}>
                        <Picker
                                selectedValue={this.state.Category}
                                onValueChange={(itemValue, itemIndex) => this.setState({Category: itemValue})}
                        >
                            <Picker.Item label='Category' value='' />
                            <Picker.Item label="Chinese" value="Chinese" />
                            <Picker.Item label="Thai" value="Thai" />
                        </Picker>
                    </View>

                    <TextInput
                        placeholder="Name"
                        placeholderTextColor="black"
                        style={styles.input}
                        onChangeText={(Name) => this.setState({Name})}
                    />

                    <TextInput
                        placeholder="Price"
                        placeholderTextColor="black"
                        style={styles.input}
                        onChangeText={(Price) => this.setState({Price})}
                    />
                
                    
                    <TouchableOpacity
                        style={styles.signinbutton}
                        onPress={this.onPress}
                    >
                        <Text style={{color: 'white', fontSize: 0.04*width, fontFamily: "Calibri", fontWeight: "bold"}}> CONFIRM </Text>
                    </TouchableOpacity>
    
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
        height: 0.60*height,
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
        borderColor: "#D9D8D9",
        borderWidth: 1,
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
        borderColor: "#D9D8D9",
        borderWidth: 1,
        justifyContent: 'center',
    },
    header: {
        width: 0.60*width,
        color: '#23186A',
        fontSize: 0.035*width,
        marginBottom: 3,
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
        position: 'absolute',
        bottom: 0.08*width,
    },
});
