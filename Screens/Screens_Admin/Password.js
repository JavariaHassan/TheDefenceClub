import React, {Component} from 'react';
import {Keyboard, Platform, Dimensions, StyleSheet, Text, TextInput, View, Image, ImageBackground, TouchableOpacity, Alert} from 'react-native';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

export default class LoginScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
                       ID: '',
                       oldPassword: '',
                       newPassword: '', };
    }

    static navigationOptions = {
        title: "Change Password",
    };
    
    onPress = () => {

    //     if (this.state.Password == this.state.ConfirmPass){
    //         const data = {
    //             Name : this.state.Name,
    //             ID : this.state.ID,
    //             Email : this.state.Email,
    //             Password : this.state.Password,
    //             Admin: 0
    //         }
    //         Authenticate = async (data) => {
    //             response = await fetch ('https://whispering-savannah-21440.herokuapp.com/add_admin', {
    //               method : 'post', 
    //               headers : {
    //                 Accept: 'application/json',
    //                 'Content-Type' : 'application/json'
    //               }, 
    //               body : JSON.stringify(data)
    //             }).then((response) => response.json())
    //             .then((responseJSON) => {
    //                 if (responseJSON.response == "Done"){
    //                     Alert.alert("Admin added")
    //                     // this.setState({invalid: 0})
    //                     //     this.props.navigation.navigate('DrawerNavigator')
    //                 }else{
    //                     // this.setState({invalid: 1})
    //                 }
    //                 })
    //         }
    //         Authenticate(data)
        
    //     }
    }
    
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.backbox}>

                    <TextInput
                        style={styles.input}
                        placeholder = "Enter ID"
                        onChangeText={(ID) => this.setState({ID})}
                    />


                    <TextInput
                        style={styles.input}
                        placeholder = "Enter Password"
                        onChangeText={(Password) => this.setState({Password})}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder = "Enter new Password"
                        onChangeText={(newPassword) => this.setState({newPassword})}
                    />

                    <TouchableOpacity
                        style={styles.signinbutton}
                        onPress={this.onPress}
                    >
                        <Text style={{color: 'white', fontSize: 0.04*width}}> Change Password </Text>
                    </TouchableOpacity>
                     
    
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
        height: 0.75*height,
        width: 0.80*width,
        backgroundColor: 'rgba(255,255, 255,0.75)',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderRadius: 0.07*width,
        padding: 30,
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
    signinbutton: {
        backgroundColor: '#23186A',
        marginTop: 0.05*height,
        width: 0.35*width,
        height: 0.07*height,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: width,
        position: 'absolute',
        bottom: 0.1*height,
    },
});

