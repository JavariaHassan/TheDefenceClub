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

                    <Text style={styles.header}> Category </Text>
                    <View style={styles.input2}>
                        <Picker style={styles.picker}
                                selectedValue={this.state.Category}
                                onValueChange={(itemValue, itemIndex) => this.setState({Category: itemValue})}
                        >
                            <Picker.Item label="Chinese" value="Chinese" />
                            <Picker.Item label="Thai" value="Thai" />
                        </Picker>
                    </View>

                    <Text style={styles.header}> Name </Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(Name) => this.setState({Name})}
                    />

                    <Text style={styles.header}> Price </Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(Price) => this.setState({Price})}
                    />
                
                    
                    <TouchableOpacity
                        style={styles.signinbutton}
                        onPress={this.onPress}
                    >
                        <Text style={{color: 'white', fontSize: 0.04*width}}> Add Item </Text>
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
        borderRadius: 0.1*width,
        backgroundColor: 'rgba(255,255, 255,0.75)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        backgroundColor: "white",
        color: '#23186A',
        width: 0.60*width,
        height: 0.1*width,
        fontSize: 0.035*width,
        paddingVertical: 0.01*height,
        paddingHorizontal: 0.02*height,
        borderRadius: 10,
        marginBottom: 0.03*width,
    },
    input2: {
        backgroundColor: "white",
        color: '#23186A',
        width: 0.60*width,
        height: 0.1*width,
        fontSize: 0.035*width,
        borderRadius: 10,
        marginBottom: 0.03*width,
    },
    header: {
        width: 0.60*width,
        color: '#23186A',
        fontSize: 0.035*width,
        marginBottom: 3,
    }, 
    signinbutton: {
        backgroundColor: '#59B957',
        marginTop: 0.05*height,
        width: 0.35*width,
        height: 0.07*height,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
});
