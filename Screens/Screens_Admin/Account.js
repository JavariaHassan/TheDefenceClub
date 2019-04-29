import React, {Component} from 'react';
import {ScrollView, Keyboard, Dimensions, StyleSheet, Text, TextInput, View, Image, ImageBackground, TouchableOpacity, Alert} from 'react-native';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

class Member_Comp extends Component {

    constructor(props) {
        super(props);
        this.state = { Name: '',
                       ID: '',
                       Email: '',
                       Password: '',
                       ConfirmPass: '', };
    }

    static navigationOptions = {
        title: "Add Member",
    };
    
    onPress = () => {
        if (this.state.Password == this.state.ConfirmPass){
            const data = {
                Name : this.state.Name,
                ID : this.state.ID,
                Email : this.state.Email,
                Password : this.state.Password,
                Admin: 0,
                reservation : 0
            }
            Authenticate = async (data) => {
                response = await fetch ('https://whispering-savannah-21440.herokuapp.com/add_member', {
                  method : 'post', 
                  headers : {
                    Accept: 'application/json',
                    'Content-Type' : 'application/json'
                  }, 
                  body : JSON.stringify(data)
                }).then((response) => response.json())
                .then((responseJSON) => {
                    if (responseJSON.response == "Done"){
                        Alert.alert("Member added")
                        // this.setState({invalid: 0})
                        //     this.props.navigation.navigate('DrawerNavigator')
                    }else{
                        // this.setState({invalid: 1})
                    }
                    })
            }
            Authenticate(data)
        
        }
    }
    
    render() {
        return (
            <View style={styles.backbox_Admin}>

                <TextInput
                    placeholder="Name"
                    placeholderTextColor="black"
                    style={styles.input}
                    onChangeText={(Name) => this.setState({Name})}
                />

                <TextInput
                    placeholder="Member ID"
                    placeholderTextColor="black"
                    style={styles.input}
                    onChangeText={(ID) => this.setState({ID})}
                />

                <TextInput
                    placeholder="Email"
                    placeholderTextColor="black"
                    style={styles.input}
                    onChangeText={(Email) => this.setState({Email})}
                />

                <TextInput
                    placeholder="Password"
                    placeholderTextColor="black"
                    style={styles.input}
                    onChangeText={(Password) => this.setState({Password})}
                />

                <TextInput
                    placeholder="Confirm Password"
                    placeholderTextColor="black"
                    style={styles.input}
                    onChangeText={(ConfirmPass) => this.setState({ConfirmPass})}
                />
            
                
                <TouchableOpacity
                    style={styles.signinbutton}
                    onPress={this.onPress}
                >
                    <Text style={{color: 'white', fontSize: 0.04*width, fontFamily: "Calibri", fontWeight: "bold"}}> CONFIRM </Text>
                </TouchableOpacity>

            </View>
        );
    }
}

class Admin_Comp extends Component {

    constructor(props) {
        super(props);
        this.state = { Name: '',
                       ID: '',
                       Email: '',
                       Password: '',
                       ConfirmPass: '', };
    }
    
    onPress = () => {

        if (this.state.Password == this.state.ConfirmPass){
            const data = {
                Name : this.state.Name,
                ID : this.state.ID,
                Email : this.state.Email,
                Password : this.state.Password,
                Admin: 0,
                reservation : 0
            }
            Authenticate = async (data) => {
                response = await fetch ('https://whispering-savannah-21440.herokuapp.com/add_admin', {
                  method : 'post', 
                  headers : {
                    Accept: 'application/json',
                    'Content-Type' : 'application/json'
                  }, 
                  body : JSON.stringify(data)
                }).then((response) => response.json())
                .then((responseJSON) => {
                    if (responseJSON.response == "Done"){
                        Alert.alert("Admin added")
                        // this.setState({invalid: 0})
                        //     this.props.navigation.navigate('DrawerNavigator')
                    }else{
                        // this.setState({invalid: 1})
                    }
                    })
            }
            Authenticate(data)
        
        }
    }
    
    render() {
        return (
            <View style={styles.backbox_Admin}>

                <TextInput
                    placeholder="Name"
                    placeholderTextColor="black"
                    style={styles.input}
                    onChangeText={(Name) => this.setState({Name})}
                />

                <TextInput
                    placeholder="Admin ID"
                    placeholderTextColor="black"
                    style={styles.input}
                    onChangeText={(ID) => this.setState({ID})}
                />

                <TextInput
                    placeholder="Email"
                    placeholderTextColor="black"
                    style={styles.input}
                    onChangeText={(Email) => this.setState({Email})}
                />

                <TextInput
                    placeholder="Password"
                    placeholderTextColor="black"
                    style={styles.input}
                    onChangeText={(Password) => this.setState({Password})}
                />

                <TextInput
                    placeholder="Confirm Password"
                    placeholderTextColor="black"
                    style={styles.input}
                    onChangeText={(ConfirmPass) => this.setState({ConfirmPass})}
                />
            
                
                <TouchableOpacity
                    style={styles.signinbutton}
                    onPress={this.onPress}
                >
                    <Text style={{color: 'white', fontSize: 0.04*width, fontFamily: "Calibri", fontWeight: "bold"}}> CONFIRM </Text>
                </TouchableOpacity>

            </View>
        );
    }
}

export default class Main extends Component {

    constructor(props) {
        super(props);
        this.state = { option: 1,
                       adminstyle: styles.secondbarselected,
                       memberstyle: styles.secondbar};
    };

    static navigationOptions = ({navigation}) => ({
        title: 'Add Account',
        headerLeft: <TouchableOpacity onPress={() => navigation.openDrawer()}> 
                <Image source={require('../hamburger.png')} style={{width:20, height:17, marginLeft: 20}} />
            </TouchableOpacity>,
    });
    
    onPress1 = () => {
        Keyboard.dismiss();
        this.setState({option: 1,
                       adminstyle: styles.secondbarselected,
                       memberstyle: styles.secondbar})
    };

    onPress2 = () => {
        Keyboard.dismiss();
        this.setState({option: 0,
                       adminstyle: styles.secondbar,
                       memberstyle: styles.secondbarselected})
    };
    
    render() {
        return (
            <ImageBackground source={require('../BG_3.png')} style={styles.container}>
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity
                            onPress={this.onPress1}
                        >
                            <View style={this.state.adminstyle}>
                                <Text style={styles.buttons}> ADMIN </Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={this.onPress2}
                        >
                        <View style={this.state.memberstyle}>
                            <Text style={styles.buttons}> MEMBER </Text>
                        </View>
                        </TouchableOpacity>
                    </View>

                    <ScrollView contentContainerStyle={{flex: 1, alignItems: 'center', paddingTop: 0.09*width}}>
                        <View style={{width: 0.85*width, height: 1.2*width, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', borderRadius: 20}}>
                            {this.state.option ?
                            <Admin_Comp/>
                            : <Member_Comp/>}
                        </View>
                    </ScrollView>
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
        width: width,
        backgroundColor: 'rgba(255,255, 255,0.50)',
    },
    backbox_Admin: {
        paddingVertical: 0.1*width,
        width: 0.8*width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    secondbar: {
        width: width/2,
        height: 0.11*width,
        backgroundColor: '#23186A',
        justifyContent: 'center',
        alignItems: 'center',
    }, 
    secondbarselected: {
        width: width/2,
        height: 0.11*width,
        backgroundColor: '#23186A',
        borderColor:'lightgrey',
        borderBottomColor: 'white',
        borderBottomWidth: 4,
        justifyContent: 'center',
        alignItems: 'center',
    }, 
    buttons: {
        color: 'white',
        fontSize: 15,
        fontFamily: "Calibri",
        fontWeight: "bold",
    },
    header: {
        width: 0.60*width,
        color: '#23186A',
        fontSize: 0.035*width,
        marginBottom: 3,
    },
    input: {
        fontFamily: "Calibri",
        backgroundColor: "#EEEEEE",
        color: 'black',
        width: 0.65*width,
        height: 0.11*width,
        fontSize: 0.04*width,
        paddingHorizontal: 0.02*height,
        borderRadius: 10,
        marginBottom: 0.06*width,
        borderColor: "#D9D8D9",
        borderWidth: 1,
    },
    signinbutton: {
        backgroundColor: "#23186A",
        color: 'white',
        width: 0.65*width,
        height: 0.11*width,
        fontSize: 0.04*width,
        paddingHorizontal: 0.02*height,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
});
