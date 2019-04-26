import React, {Component} from 'react';
import {Keyboard, Dimensions, StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity, ScrollView} from 'react-native';
import { fromBottom } from 'react-navigation-transitions';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

reservations = {
                    "20100180_10" :
                    {   member_id: "20100180",
                        reservation_id: 10,
                        timestamp : '12:24',
                        date : '04 July 2019',
                        start_time : '12:00',
                        end_time: '02:00',
                        instructions: "",
                        status: "unconfirmed",
                        menu : {
                            0 :  
                                {
                                    name: "Karahi",
                                    price: 800,
                                    category: 'Desi',
                                },
                            1 :  
                                {
                                    name: "Naan",
                                    price: 20,
                                    category: 'Desi',
                                }
                        },
                        venue: 
                        {
                            name: "Banquet Hall",
                            price: 10000,
                            per_hour_surcharge: 2000,
                        }
                    },
                    "20100058_10" :
                    {   member_id: "20100058",
                        reservation_id: 10,
                        timestamp : '02:30',
                        date : '11 July 2019',
                        start_time : '13:00',
                        end_time: '15:00',
                        instructions: "Birthday Decorations",
                        status: "unconfirmed",
                        menu : {
                            0 :  
                                {
                                    name: "Karahi",
                                    price: 800,
                                    category: 'Desi',
                                },
                            1 :  
                                {
                                    name: "Biryani",
                                    price: 850,
                                    category: 'Desi',
                                },
                            2 :  
                                {
                                    name: "Naan",
                                    price: 20,
                                    category: 'Desi',
                                }
                        },
                        venue: 
                        {
                            name: "Lawn",
                            price: 10000,
                            per_hour_surcharge: 2000,
                        }
                    },
                    "20100125_10" :
                    {   member_id: "20100125",
                        reservation_id: 10,
                        timestamp : '13:30',
                        date : '20 September 2019',
                        start_time : '13:00',
                        end_time: '15:00',
                        instructions: "",
                        status: "confirmed",
                        menu : {
                            0 :  
                                {
                                    name: "Coffee",
                                    price: 320,
                                    category: 'Drinks',
                                },
                            1 :  
                                {
                                    name: "More Coffee",
                                    price: 320,
                                    category: 'Drinks',
                                },
                            2 :  
                                {
                                    name: "Diet Coke",
                                    price: 50,
                                    category: 'Drinks',
                                }
                        },
                        venue: 
                        {
                            name: "Lawn",
                            price: 10000,
                            per_hour_surcharge: 2000,
                        }
                    },
                }

class Pending extends Component {
    constructor(props) {
        super(props);
    };

    render() {
        var r_pending = [];
        for (const i in reservations) {
            if (reservations[i].status == "unconfirmed") {
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

    render() {
        var r_confirmed = [];
        for (const i in reservations) {
            if (reservations[i].status == "confirmed") {
                r_confirmed.push(
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('View', {pending: 0, info: reservations[i]})} style={{padding: 10, borderRadius: 10, backgroundColor: 'white', marginBottom: 0.04*width}}>
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
        headerRight: <TouchableOpacity onPress={() => navigation.navigate('Add')}> 
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
                        <TouchableOpacity
                            onPress={this.onPress1}
                        >
                            <View style={this.state.adminstyle}>
                                <Text style={styles.buttons}> PENDING </Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={this.onPress2}
                        >
                        <View style={this.state.memberstyle}>
                            <Text style={styles.buttons}> CONFIRMED </Text>
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
