import React, {Component} from 'react';
import {Keyboard, Dimensions, StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity, ScrollView, Alert} from 'react-native';
import { fromBottom } from 'react-navigation-transitions';
import {NavigationEvents} from 'react-navigation';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

var reservations = {}
var data2 = {
    member_id : values.user
}

class Pending extends Component {

    constructor(props) {
        super(props); 
    };        

    componentDidMount(){


        AskCurrentReservation = async (data) => {
            // Alert.alert(data.member_id)
            response = await fetch ('http://whispering-savannah-21440.herokuapp.com/get_reservations4UserRecent', {
              method : 'POST', 
              headers : {
                Accept: 'application/json',
                'Content-Type' : 'application/json'
              }, 
              body : JSON.stringify(data)
            }).then((response) => response.json())
            .then((responseJSON) => {
                lengthofresponse = responseJSON.length
                // Alert.alert(lengthofresponse)
                var i;
                for (i=0; i<lengthofresponse; i++){
                    console.log("Hello")
                    id = responseJSON[i].member_id + "_" + String(responseJSON[i].reservation_id)
                    reservations[id] = {}
                    reservations[id].member_id = responseJSON[i].member_id
                    reservations[id].reservation_id = responseJSON[i].reservation_id
                    reservations[id].timestamp = responseJSON[i].timestamp
                    reservations[id].date = responseJSON[i].date
                    reservations[id].start_time = responseJSON[i].start_time
                    reservations[id].end_time = responseJSON[i].end_time
                    reservations[id].instructions = responseJSON[i].instructions
                    reservations[id].status = responseJSON[i].status
                    reservations[id].menu = responseJSON[i].menu
                    reservations[id].venue = responseJSON[i].venue
                    reservations[id].timeSince = responseJSON[i].timeSince
                    reservations[id].passed = "false"
                    console.log(reservations[id])
                }        
                this.forceUpdate()
        })}
        AskCurrentReservation(data2)


        AskPassedReservation = async (data) => {
            // Alert.alert("Hello")
            response = await fetch ('http://whispering-savannah-21440.herokuapp.com/get_reservations4UserPassed', {
              method : 'POST', 
              headers : {
                Accept: 'application/json',
                'Content-Type' : 'application/json'
              }, 
              body : JSON.stringify(data)
            }).then((response) => response.json())
            .then((responseJSON) => {
                lengthofresponse = responseJSON.length
                // Alert.alert("passed reservation")
                var i;
                for (i=0; i<lengthofresponse; i++){
                    console.log("Hello")
                    id = responseJSON[i].member_id + "_" + String(responseJSON[i].reservation_id)
                    reservations[id] = {}
                    reservations[id].member_id = responseJSON[i].member_id
                    reservations[id].reservation_id = responseJSON[i].reservation_id
                    reservations[id].timestamp = responseJSON[i].timestamp
                    reservations[id].date = responseJSON[i].date
                    reservations[id].start_time = responseJSON[i].start_time
                    reservations[id].end_time = responseJSON[i].end_time
                    reservations[id].instructions = responseJSON[i].instructions
                    reservations[id].status = responseJSON[i].status
                    reservations[id].menu = responseJSON[i].menu
                    reservations[id].venue = responseJSON[i].venue
                    reservations[id].timeSince = responseJSON[i].timeSince
                    reservations[id].passed = "true"
                    console.log(reservations[id])
                }        
                this.forceUpdate()
        })}
        AskPassedReservation(data2)

    }

    render() {
        var r_pending = [];
        for (const i in reservations) {
            if (reservations[i].passed == "false") {
                r_pending.push(
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('View', {pending: 1, info: reservations[i]})} style={{padding: 10, borderRadius: 10, backgroundColor: 'white', marginBottom: 0.04*width}}>
                        <View style={[styles.reservation_bar, {borderBottomWidth: StyleSheet.hairlineWidth, borderColor: 'grey', paddingBottom: 0.015*width, marginBottom: 0.03*width}]}>
                            <Text style={{paddingRight: 0.01*width, fontSize: 0.035*width, fontFamily: "simple-line-icons"}}></Text>
                            <Text style={{color: 'black', fontSize: 0.035*width}}> {reservations[i].member_id} </Text>
                        </View>
                        <View style={[styles.reservation_bar, {justifyContent: 'center',}]}>
                            <Text style={{paddingRight: 0.01*width, fontSize: 0.04*width, fontFamily: "Font Awesome 5 Free"}}></Text>
                            <Text style={{fontWeight: 'bold', color: 'black', fontSize: 0.04*width}}> {reservations[i].date} </Text>
                        </View>
                        <View style={[styles.reservation_bar, {paddingBottom: 5}]}>
                            <Text style={{color: 'black', flex: 1, textAlign: 'center', fontSize: 0.035*width}}> {reservations[i].venue.name} </Text>
                        </View>
                        <View style={{alignContent: 'center'}}>
                            <View style={styles.reservation_bar}>
                                <Text style={{color: 'grey', flex: 1, paddingLeft: 0.1*width, fontSize: 0.03*width}}> FROM </Text>
                                <Text style={{color: 'grey', flex: 1, paddingLeft: 0.18*width, fontSize: 0.03*width}}> TO </Text>
                            </View>
                            <View style={styles.reservation_bar}>
                                <Text style={{color: 'black', flex: 1, paddingLeft: 0.1*width, fontSize: 0.05*width, fontWeight: 'bold'}}> {reservations[i].start_time} </Text>
                                <Text style={{fontFamily: 'Entypo', fontSize: 0.06*width, color: 'black'}}>  </Text>
                                <Text style={{color: 'black', flex: 1, paddingRight: 0.1*width, fontSize: 0.05*width, textAlign: 'right', fontWeight: 'bold'}}> {reservations[i].end_time} </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )
            }
        } 
        return (
            <ScrollView contentContainerStyle = {{width: width, alignItems: 'center', paddingVertical: 0.09*width,}}>
                {r_pending}
            </ScrollView>
            
        );
    }
}

class Confirmed extends Component {
    constructor(props) {
        super(props);
    };

    componentDidMount(){
    
        // const data = {
        //     member_id : values.user
        // }

        AskCurrentReservation = async (data) => {
            // Alert.alert(data.member_id)
            response = await fetch ('http://whispering-savannah-21440.herokuapp.com/get_reservations4UserRecent', {
              method : 'POST', 
              headers : {
                Accept: 'application/json',
                'Content-Type' : 'application/json'
              }, 
              body : JSON.stringify(data)
            }).then((response) => response.json())
            .then((responseJSON) => {
                lengthofresponse = responseJSON.length
                // Alert.alert(lengthofresponse)
                var i;
                for (i=0; i<lengthofresponse; i++){
                    console.log("Hello")
                    id = responseJSON[i].member_id + "_" + String(responseJSON[i].reservation_id)
                    reservations[id] = {}
                    reservations[id].member_id = responseJSON[i].member_id
                    reservations[id].reservation_id = responseJSON[i].reservation_id
                    reservations[id].timestamp = responseJSON[i].timestamp
                    reservations[id].date = responseJSON[i].date
                    reservations[id].start_time = responseJSON[i].start_time
                    reservations[id].end_time = responseJSON[i].end_time
                    reservations[id].instructions = responseJSON[i].instructions
                    reservations[id].status = responseJSON[i].status
                    reservations[id].menu = responseJSON[i].menu
                    reservations[id].venue = responseJSON[i].venue
                    reservations[id].timeSince = responseJSON[i].timeSince
                    reservations[id].passed = "false"
                    console.log(reservations[id])
                }        
                this.forceUpdate()
        })}
        AskCurrentReservation(data2)


        AskPassedReservation = async (data) => {
            // Alert.alert("Hello")
            response = await fetch ('http://whispering-savannah-21440.herokuapp.com/get_reservations4UserPassed', {
              method : 'POST', 
              headers : {
                Accept: 'application/json',
                'Content-Type' : 'application/json'
              }, 
              body : JSON.stringify(data)
            }).then((response) => response.json())
            .then((responseJSON) => {
                lengthofresponse = responseJSON.length
                // Alert.alert("passed reservation")
                var i;
                for (i=0; i<lengthofresponse; i++){
                    console.log("Hello")
                    id = responseJSON[i].member_id + "_" + String(responseJSON[i].reservation_id)
                    reservations[id] = {}
                    reservations[id].member_id = responseJSON[i].member_id
                    reservations[id].reservation_id = responseJSON[i].reservation_id
                    reservations[id].timestamp = responseJSON[i].timestamp
                    reservations[id].date = responseJSON[i].date
                    reservations[id].start_time = responseJSON[i].start_time
                    reservations[id].end_time = responseJSON[i].end_time
                    reservations[id].instructions = responseJSON[i].instructions
                    reservations[id].status = responseJSON[i].status
                    reservations[id].menu = responseJSON[i].menu
                    reservations[id].venue = responseJSON[i].venue
                    reservations[id].timeSince = responseJSON[i].timeSince
                    reservations[id].passed = "true"
                    console.log(reservations[id])
                }        
                this.forceUpdate()
        })}
        AskPassedReservation(data2)

    }

    render() {
        var r_confirmed = [];
        for (const i in reservations) {
            if (reservations[i].passed == "true") {
                r_confirmed.push(
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('View', {pending: 0, info: reservations[i]})} style={{padding: 10, borderRadius: 10, backgroundColor: 'white', marginBottom: 0.04*width}}>
                        <View style={[styles.reservation_bar, {borderBottomWidth: StyleSheet.hairlineWidth, borderColor: 'grey', paddingBottom: 0.015*width, marginBottom: 0.03*width}]}>
                            <Text style={{color: 'black', paddingRight: 0.01*width, fontSize: 0.035*width, fontFamily: "simple-line-icons"}}></Text>
                            <Text style={{color: 'black', fontSize: 0.035*width}}> {reservations[i].member_id} </Text>
                        </View>
                        <View style={[styles.reservation_bar, {justifyContent: 'center',}]}>
                            <Text style={{color: 'black', paddingRight: 0.01*width, fontSize: 0.04*width, fontFamily: "Font Awesome 5 Free"}}></Text>
                            <Text style={{fontWeight: 'bold', color: 'black', fontSize: 0.04*width}}> {reservations[i].date} </Text>
                        </View>
                        <View style={[styles.reservation_bar, {paddingBottom: 5}]}>
                            <Text style={{color: 'black', flex: 1, textAlign: 'center', fontSize: 0.035*width}}> {reservations[i].venue.name} </Text>
                        </View>
                        <View style={{alignContent: 'center'}}>
                            <View style={styles.reservation_bar}>
                                <Text style={{color: 'grey', flex: 1, paddingLeft: 0.1*width, fontSize: 0.03*width}}> FROM </Text>
                                <Text style={{color: 'grey', flex: 1, paddingLeft: 0.18*width, fontSize: 0.03*width}}> TO </Text>
                            </View>
                            <View style={styles.reservation_bar}>
                                <Text style={{color: 'black', flex: 1, paddingLeft: 0.1*width, fontSize: 0.05*width, fontWeight: 'bold'}}> {reservations[i].start_time} </Text>
                                <Text style={{fontFamily: 'Entypo', fontSize: 0.06*width, color: 'black'}}>  </Text>
                                <Text style={{color: 'black', flex: 1, paddingRight: 0.1*width, fontSize: 0.05*width, textAlign: 'right', fontWeight: 'bold'}}> {reservations[i].end_time} </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )
            }
        } 
        return (
            <ScrollView contentContainerStyle = {{width: width, alignItems: 'center', paddingVertical: 0.09*width,}}>
                {r_confirmed}
            </ScrollView>
            
        );
    }
}

export default class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = { option: 1,
                       adminstyle: styles.secondbarselected,
                       memberstyle: styles.secondbar};
    };

    static navigationOptions = ({navigation}) => ({
        title: 'Reservations',
        headerRight: <TouchableOpacity onPress={() => {console.log(1, navigation); navigation.navigate('Add', {nav: navigation})}}> 
                <Image source={require('../../plus.png')} style={{width:17, height:17, marginRight: 20}} />
            </TouchableOpacity>,
        headerLeft: <TouchableOpacity onPress={() => navigation.openDrawer()}> 
                <Image source={require('../../hamburger.png')} style={{width:20, height:17, marginLeft: 20}} />
            </TouchableOpacity>,
    })

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
            <ImageBackground source={require('../../BG_3.png')} style={styles.container}>
                    <View style={{flexDirection: 'row'}}>
 
                        <NavigationEvents onDidFocus={(() => 
                                response = fetch ('http://whispering-savannah-21440.herokuapp.com/get_reservations4UserRecent', {
                                    method : 'POST', 
                                    headers : {
                                      Accept: 'application/json',
                                      'Content-Type' : 'application/json'
                                    }, 
                                    body : JSON.stringify(data2)
                                  }).then((response) => response.json())
                                  .then((responseJSON) => {
                                      lengthofresponse = responseJSON.length
                                      // Alert.alert(lengthofresponse)
                                      var i;
                                      for (i=0; i<lengthofresponse; i++){
                                          console.log("Hello")
                                          id = responseJSON[i].member_id + "_" + String(responseJSON[i].reservation_id)
                                          reservations[id] = {}
                                          reservations[id].member_id = responseJSON[i].member_id
                                          reservations[id].reservation_id = responseJSON[i].reservation_id
                                          reservations[id].timestamp = responseJSON[i].timestamp
                                          reservations[id].date = responseJSON[i].date
                                          reservations[id].start_time = responseJSON[i].start_time
                                          reservations[id].end_time = responseJSON[i].end_time
                                          reservations[id].instructions = responseJSON[i].instructions
                                          reservations[id].status = responseJSON[i].status
                                          reservations[id].menu = responseJSON[i].menu
                                          reservations[id].venue = responseJSON[i].venue
                                          reservations[id].timeSince = responseJSON[i].timeSince
                                          reservations[id].passed = "false"
                                          console.log(reservations[id])
                                      }        
                                      this.forceUpdate()
                            }))}/>

                        <NavigationEvents onDidFocus={(() => 
                            response = fetch ('http://whispering-savannah-21440.herokuapp.com/get_reservations4UserPassed', {
                                method : 'POST', 
                                headers : {
                                Accept: 'application/json',
                                'Content-Type' : 'application/json'
                                }, 
                                body : JSON.stringify(data2)
                            }).then((response) => response.json())
                            .then((responseJSON) => {
                                lengthofresponse = responseJSON.length
                                // Alert.alert("passed reservation")
                                var i;
                                for (i=0; i<lengthofresponse; i++){
                                    console.log("Hello")
                                    id = responseJSON[i].member_id + "_" + String(responseJSON[i].reservation_id)
                                    reservations[id] = {}
                                    reservations[id].member_id = responseJSON[i].member_id
                                    reservations[id].reservation_id = responseJSON[i].reservation_id
                                    reservations[id].timestamp = responseJSON[i].timestamp
                                    reservations[id].date = responseJSON[i].date
                                    reservations[id].start_time = responseJSON[i].start_time
                                    reservations[id].end_time = responseJSON[i].end_time
                                    reservations[id].instructions = responseJSON[i].instructions
                                    reservations[id].status = responseJSON[i].status
                                    reservations[id].menu = responseJSON[i].menu
                                    reservations[id].venue = responseJSON[i].venue
                                    reservations[id].timeSince = responseJSON[i].timeSince
                                    reservations[id].passed = "true"
                                    console.log(reservations[id])
                                }        
                                this.forceUpdate()
                            }))}/>


                        
                        <TouchableOpacity
                            onPress={this.onPress1}
                        >
                            <View style={this.state.adminstyle}>
                                <Text style={styles.buttons}> Current </Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={this.onPress2}
                        >
                        <View style={this.state.memberstyle}>
                            <Text style={styles.buttons}> Passed </Text>
                        </View>
                        </TouchableOpacity>
                    </View>

                    {this.state.option ?
                    <Pending navigation={this.props.navigation}/>
                    : <Confirmed navigation={this.props.navigation}/>}

            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    reservation_bar: {
        flexDirection: 'row', 
        width: 0.8*width, 
        paddingHorizontal: 0.01*width,
        paddingTop: 0.005*width,
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
});
