import React, {Component} from 'react';
import {Dimensions, StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert} from 'react-native';


var width = Dimensions.get('window').width;

export default class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    };

    static navigationOptions = () => ({
        headerStyle: {
            borderBottomWidth: 0,
        },
    })

    confirm = (member_id, reservation_id) => {

        const data = {
            id : String(member_id),
            reservation_id : String(reservation_id)
        }

        Alert.alert(String(data.id), String(data.reservation_id))

        ConfirmReservation = async (data) => {
            response = await fetch ('http://192.168.1.100:3000/confirmReservation', {
              method : 'post', 
              headers : {
                Accept: 'application/json',
                'Content-Type' : 'application/json'
              }, 
              body : JSON.stringify(data)
            }).then((response) => response.json())
            .then((responseJSON) => {
                Alert.alert("Reservation has been confirmed")
            })
        }
        ConfirmReservation(data)

        //write confirm code here
        // Alert.alert(
        //     'Reservation has been confirmed',
        //     '',
        //     [
        //       {
        //         text: 'OK',
        //         style: 'cancel',
        //         onPress: () => {this.props.navigation.navigate}
        //       },
        //     ],
        //   );
    }

    delete = (member_id, reservation_id) => {
        //write remove code here

        const data = {
            id : String(member_id),
            reservation_id : String(reservation_id)
        }

        deleteReservation = async (data) => {
            response = await fetch ('http://192.168.1.100:3000/deleteReservation', {
              method : 'post', 
              headers : {
                Accept: 'application/json',
                'Content-Type' : 'application/json'
              }, 
              body : JSON.stringify(data)
            }).then((response) => response.json())
            .then((responseJSON) => {
                Alert.alert("Reservation has been Removed")
            })
        }
        deleteReservation()




        // Alert.alert(
        //     'Reservation has been removed',
        //     '',
        //     [
        //       {
        //         text: 'OK',
        //         style: 'cancel',
        //         onPress: () => {this.props.navigation.goBack()}
        //       },
        //     ],
        //   );
    }

    delete_alert = (member_id, reservation_id) => {
        Alert.alert(
            'Are you sure you want to remove this reservation?',
            '',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {text: 'Remove', onPress: () => this.delete(member_id, reservation_id)},
            ],
          );
    }

    render() {
        const { navigation } = this.props;
        const info = navigation.getParam('info');
        const pending = navigation.getParam('pending');
        items = []
        for (i in info.menu) {
            items.push(
                <View style={{flexDirection: 'row', paddingVertical: 0.02*width, width:0.9*width}}>
                    <Text style={{flex: 1, color: 'black', fontSize: 0.04*width}}> {info.menu[i].name} </Text>
                    <Text style={{flex: 1, color: 'grey', fontSize: 0.04*width}}> {info.menu[i].category} </Text>
                    <Text style={{flex: 1, color: 'grey', fontSize: 0.04*width}}> PKR  {info.menu[i].price} </Text>
                </View>
            )
        }
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={{fontWeight: 'bold', fontSize: 0.07*width}}> {info.date} </Text>
                <Text style={{paddingTop: 0.02*width, fontWeight: 'bold', fontSize: 0.05*width}}> {info.start_time} - {info.end_time}</Text>
                
                <View style={{flexDirection: 'row', marginTop: 0.1*width, paddingVertical: 0.03*width, width:0.9*width, borderBottomWidth: StyleSheet.hairlineWidth, borderTopWidth: StyleSheet.hairlineWidth, borderColor: 'grey'}}>
                    <Text style={{flex: 4, color: 'black', fontSize: 0.04*width}}> Member ID </Text>
                    <Text style={{flex: 6, color: 'grey', fontSize: 0.04*width}}> {info.member_id} </Text>
                </View>
                <View style={{flexDirection: 'row', paddingVertical: 0.03*width, width:0.9*width, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: 'grey'}}>
                    <Text style={{flex: 4, color: 'black', fontSize: 0.04*width}}> Reservation ID </Text>
                    <Text style={{flex: 6, color: 'grey', fontSize: 0.04*width}}> {info.member_id}_{info.reservation_id} </Text>
                </View>
                <View style={{flexDirection: 'row', paddingVertical: 0.03*width, width:0.9*width, borderBottomWidth: StyleSheet.hairlineWidth, borderColor: 'grey'}}>
                    <Text style={{flex: 4, color: 'black', fontSize: 0.04*width}}> Timestamp </Text>
                    <Text style={{flex: 6, color: 'grey', fontSize: 0.04*width}}> {info.timestamp} </Text>
                </View>
                <View style={{flexDirection: 'row', paddingVertical: 0.03*width, width:0.9*width, borderBottomWidth: StyleSheet.hairlineWidth, borderColor: 'grey'}}>
                    <Text style={{flex: 4, color: 'black', fontSize: 0.04*width}}> Status </Text>
                    <Text style={{flex: 6, color: 'grey', fontSize: 0.04*width}}> {info.status} </Text>
                </View>

                <Text style={{color: 'black', paddingTop: 0.1*width, paddingBottom: 0.02*width, fontSize: 0.03*width, fontWeight: 'bold'}}> VENUE </Text>
                <View style={{flexDirection: 'row', paddingVertical: 0.02*width, width:0.9*width, borderTopWidth: StyleSheet.hairlineWidth, borderColor: 'grey'}}>
                    <Text style={{flex: 4, color: 'black', fontSize: 0.04*width}}> Name </Text>
                    <Text style={{flex: 6, color: 'grey', fontSize: 0.04*width}}> {info.venue.name} </Text>
                </View>
                <View style={{flexDirection: 'row', paddingVertical: 0.02*width, width:0.9*width}}>
                    <Text style={{flex: 4, color: 'black', fontSize: 0.04*width}}> Price </Text>
                    <Text style={{flex: 6, color: 'grey', fontSize: 0.04*width}}> PKR  {info.venue.price} </Text>
                </View>
                <View style={{flexDirection: 'row', paddingVertical: 0.02*width, width:0.9*width, borderBottomWidth: StyleSheet.hairlineWidth, borderColor: 'grey'}}>
                    <Text style={{flex: 4, color: 'black', fontSize: 0.04*width}}> Surcharge </Text>
                    <Text style={{flex: 6, color: 'grey', fontSize: 0.04*width}}> PKR  {info.venue.per_hour_surcharge} </Text>
                </View>

                <Text style={{color: 'black', paddingTop: 0.1*width, paddingBottom: 0.02*width, fontSize: 0.03*width, fontWeight: 'bold'}}> MENU </Text>
                <View style = {{borderTopWidth: StyleSheet.hairlineWidth, borderBottomWidth: StyleSheet.hairlineWidth, borderColor: 'grey'}}>
                    {items}
                </View> 

                <Text style={{color: 'black', paddingTop: 0.1*width, paddingBottom: 0.02*width, fontSize: 0.03*width, fontWeight: 'bold'}}> INSTRUCTIONS </Text>
                <View style = {{alignContent:'flex-start', minHeight: 0.2*width, paddingTop: 0.02*width, paddingBottom: 0.1*width, borderTopWidth: StyleSheet.hairlineWidth, borderColor: 'grey'}}>
                    <Text style={{color: 'grey', fontSize: 0.04*width}}> 
                        {info.instructions} 
                    </Text>
                </View> 

                {pending ?
                    <TouchableOpacity onPress={() => this.confirm(info.member_id, info.reservation_id)} style={{flexDirection: 'row', paddingVertical: 0.03*width, width:0.9*width, borderTopWidth: StyleSheet.hairlineWidth, borderColor: 'grey'}}>
                        <Text style={{flex: 1, textAlign:'center', color: '#0C60FB', fontSize: 0.045*width}}> Confirm Reservation </Text>
                    </TouchableOpacity> : null
                }
                <TouchableOpacity onPress={() => this.delete_alert(info.member_id, info.reservation_id)} style={{flexDirection: 'row',paddingVertical: 0.03*width, width:0.9*width, borderBottomWidth: StyleSheet.hairlineWidth, borderTopWidth: StyleSheet.hairlineWidth, borderColor: 'grey'}}>
                    <Text style={{ flex: 1, textAlign:'center', color: '#FC2632', fontSize: 0.045*width}}> Remove Reservation </Text>
                </TouchableOpacity>
                
            </ScrollView>
            
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingVertical: 0.03*width,
        paddingHorizontal: 0.05*width,
        paddingBottom: 0.1*width,
    },
});