import React, {Component} from 'react';
import {FlatList, Button, Keyboard, Platform, Dimensions, StyleSheet, Text, TextInput, View, Image, ImageBackground, TouchableOpacity, ScrollView, Alert, Picker, ActionSheetIOS} from 'react-native';
import {NavigationEvents} from 'react-navigation';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';


var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

const options = ['Cancel', "Banquet", "TV Room", "Lawn 1", "Lawn 2"]
const options_banquet = ["Cancel","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40"]  // 15-40 banquet limit 
const options_lawn = ["Cancel","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25"] // 10-25 lawns limit
const options_tv = ["Cancel","5","6","7","8","9","10","11","12","13","14","15"] // 5-15 tv room limit

var timings = [{index: 0, key: 'Breakfast', time: '09:00 - 11:00'},
               {index: 1, key: 'Lunch', time: '12:30 - 15:00'},
               {index: 2, key: 'Dinner', time: '19:30 - 22:00'},
              ]

var memberID = null;
var venue = 'Banquet';
var timing = 0;
var guestnumber = 1;
var date = null;
var menu = {
    "Karahi" :  
        {
            name: "Karahi",
            price: 800,
            category: 'Desi',
        },
    "Biryani" :  
        {
            name: "Biryani",
            price: 850,
            category: 'Desi',
        },
    "Naan" :  
        {
            name: "Naan",
            price: 20,
            category: 'Desi',
        }
};

class Page_Menu extends Component {
    constructor(props) {
        super(props);
    };

    onPress2 = () => {
        this.props.navi.navigate('Menu')
    }

    render() {
        var items = []
        for (i in menu) {
            items.push(
                <View style={styles.list}>
                    <Text style={styles.listitem1}> {menu[i].name} </Text>
                    <Text style={styles.listitem2}> {menu[i].category}  |  PKR {menu[i].price} </Text>
                </View>
            )
        }

        return (
            <View style={styles.container}>
                    <Text style={styles.title}> Select Your Menu </Text>

                    <View style={{width: 0.9*width}}>
                        <ScrollView contentContainerStyle={{width: 0.9*width, alignItems: 'center', marginBottom: 0.2*width}}>
                            {items}
                        </ScrollView>
                    </View>

                    <TouchableOpacity onPress={this.onPress2}>
                        <View style={{alignItems: 'center', justifyContent: 'center', position: 'absolute', right: 0.05*width, bottom: 0.05*width, backgroundColor: '#23186A', width: 0.12*width, height: 0.12*width, borderRadius: 0.12*width}}>
                            <Text style={{flex: 1, color: 'white', fontSize: 0.09*width}}> + </Text>
                        </View>
                    </TouchableOpacity>
            </View>
        );
    }
}

class Page_MemberID extends Component {
    constructor(props) {
        super(props);
    };

    render() {

        return (
            <View style={styles.container}>
                    <Text style={styles.title}> Member ID </Text>
                    <TextInput
                        style={styles.input}
                        autoCorrect={false}
                        placeholderTextColor="#5E5E5E"
                        onChangeText={(id) => memberID = id}
                    />
            </View>
        );
    }
}

class Page_VenueTimePeople extends Component {
    constructor(props) {
        super(props);
        this.state = { venue: 'Banquet',
                       guests : 15,
                       styles: [{backgroundColor: '#D2D2E1', borderColor: '#211965'}, {}, {}]
                     };
    };

    onClick() {
        ActionSheetIOS.showActionSheetWithOptions(
            {
                options: options,
                cancelButtonIndex: 0,
            },
            (buttonIndex) => {
                venue = options[buttonIndex]

                if (buttonIndex != 0) {
                    var array_2 = []
                    
                    if(venue == 'Banquet'){
                        array_2 = options_banquet
                    }
                    if(venue == 'TV Room'){
                        array_2 = options_tv
                    }
                    if(venue == 'Lawn 1' || venue == 'Lawn 2'){
                        array_2 = options_lawn
                    }

                    this.setState({venue: options[buttonIndex]})
                    this.setState({guests: array_2[1]})

                }
            },
        );
    }

    onClick2() {
        var array_2 = []
        if(this.state.venue == 'Banquet'){
            array_2 = options_banquet
        }
        if(this.state.venue == 'TV Room'){
            array_2 = options_tv
        }
        if(this.state.venue == 'Lawn 1' || this.state.venue == 'Lawn 2'){
            array_2 = options_lawn
        }

        ActionSheetIOS.showActionSheetWithOptions(
            {
                options: array_2,
                cancelButtonIndex: 0,
            },
            (buttonIndex) => {
                if (buttonIndex != 0) {
                    guestnumber = array_2[buttonIndex]
                    this.setState({guests: array_2[buttonIndex]})
                }
            },
        );
    }


    timingClick(index) {
        timing = index
        timing_styles = [{}, {}, {}]
        timing_styles[index] = {backgroundColor: '#D2D2E1', borderColor: '#211965'}
        this.setState({styles: timing_styles})
    }
    
    render() {

        var items = []
        for (let item in options) {
            if (item != 0)
                items.push(
                    <Picker.Item label={options[item]} value={options[item]}/>
                )
        }

        var items_2 = []
        var array_1 = []
        if(this.state.venue == 'Banquet'){
            array_1 = options_banquet
        }
        if(this.state.venue == 'TV Room'){
            array_1 = options_tv
        }
        if(this.state.venue == 'Lawn 1' || this.state.venue == 'Lawn 2'){
            array_1 = options_lawn
        }
     

        for (let item in array_1) {
            if (item != 0)
                items_2.push(
                    <Picker.Item label={array_1[item]} value={array_1[item]}/>
                )
        }

        var items_timings = []
        for (let index in timings) {
            items_timings.push(
                <TouchableOpacity onPress={() => this.timingClick(index)}>
                    <View style={[styles.input, {marginBottom: 0.05*width}, this.state.styles[index]]}>
                        <Text style={styles.timing}>{timings[index].key}:  {timings[index].time}</Text>
                    </View>
                </TouchableOpacity>
            )
        }

        return (
            <View style={styles.container}>
                    <Text style={styles.title}> Venue </Text>
                    {
                        Platform.OS == 'ios' ?
                            <View style={styles.input}>
                                <Text style={{fontFamily: "Calibri", color: 'black', fontSize: 0.04*width}}
                                    onPress={() => this.onClick()}>
                                    {this.state.venue}
                                </Text>
                            </View>
                        
                        :  
                            <View style={styles.input2}>
                                <Picker
                                        style={{fontFamily: "Calibri", color: 'black', fontSize: 0.04*width}}
                                        selectedValue={this.state.venue}
                                        onValueChange={(itemValue, itemIndex) => {venue = itemValue; this.setState({venue: itemValue})}}
                                >
                                    {items}
                                </Picker>
                            </View>
                    }

                    <Text style={styles.title}> Number of Guests </Text>
                    {
                        Platform.OS == 'ios' ?
                            <View style={styles.input}>
                                <Text style={{fontFamily: "Calibri", color: 'black', fontSize: 0.04*width}}
                                    onPress={() => this.onClick2()}>
                                    {this.state.guests}
                                </Text>
                            </View>
                        
                        :  
                            <View style={styles.input2}>
                                <Picker
                                        style={{fontFamily: "Calibri", color: 'black', fontSize: 0.04*width}}
                                        selectedValue={this.state.guests}
                                        onValueChange={(itemValue, itemIndex) => {guestnumber = itemValue; this.setState({guests: itemValue})}}
                                >
                                    {items_2}
                                </Picker>
                            </View>
                    }

                    {/* <Text style={styles.title}> Number of Guests </Text>
                    <TextInput
                        placeholder=""
                        placeholderTextColor="black"
                        keyboardType="numeric"
                        style={styles.input}
                        onChangeText={(guests) => guestnumber = guests}
                    /> */}
                        
                    <Text style={styles.title}> Timing </Text>
                    {items_timings}
            </View>
        );
    }
}

class Page_Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.onDayPress = this.onDayPress.bind(this)
    };

    onDayPress(day) {
        date = day.dateString
        this.setState({
            selected: day.dateString
        })
    }

    render() {

        return (
            <View style={styles.container}>
                <Text style={[styles.title, {margin: 0}]}> Select Date </Text>

                <View style={{width: 0.8*width, marginTop: 0.02*width}}>
                    <Calendar
                            minDate={Date()}
                            onDayPress={this.onDayPress}
                            markedDates={{[this.state.selected]: {selected:true}}}
                            theme={{
                                selectedDayBackgroundColor: '#D2D2E0',
                                selectedDayTextColor: '#23186A',
                                calendarBackground: '#ffffff',
                                textSectionTitleColor: '#23186A',
                                textDisabledColor: '#d9e1e8',
                                arrowColor: '#23186A',
                                monthTextColor: '#23186A',
                                textDayFontFamily: 'Calibri',
                                textMonthFontFamily: 'Calibri',
                                textDayHeaderFontFamily: 'Calibri',
                                textMonthFontWeight: 'bold',
                                textDayFontSize: width*0.04,
                                textMonthFontSize: width*0.04,
                                textDayHeaderFontSize: width*0.04
                            }}
                        />
                </View>
            </View>
        );
    }
}

export default class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = { carousalItems: [{},{},{},{}],
                       activeSlide: 0,
                     };
        const { navigation } = this.props;
        this.nav = navigation.getParam('nav');
    };

    static navigationOptions = ({navigation}) => ({
        title: 'Add Reservation'
    })

    _renderItem = ({item, index}) => {
        if (index == 0) {
            return <Page_MemberID />
        } else if (index == 1) {
            return <Page_VenueTimePeople />
        } else if (index == 2) {
            return <Page_Calendar />
        } else if (index == 3) {
            return <Page_Menu navi={this.nav}/>
        }   
    }

    get pagination () {
        const { carousalItems, activeSlide } = this.state;
        return (
            <Pagination
              dotsLength={carousalItems.length}
              activeDotIndex={activeSlide}
              containerStyle={{width: width, height: width*0.15, paddingTop: 0, }}
              dotStyle={{
                  width: 10,
                  height: 10,
                  borderRadius: 10,
                  margin: 0,
                  padding: 0,
                  backgroundColor: 'rgba(255, 255, 255, 1)'
              }}
              inactiveDotStyle={{
                  // Define styles for inactive dots here
              }}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
            />
        );
    }
    
    render() {
        return (
            <ImageBackground source={require('../../BG_3.png')} style={{flex: 1}}>
            
                    <Carousel
                        onSnapToItem={(index) => this.setState({ activeSlide: index }) }
                        ref={(c) => { this._carousel = c; }}
                        data={this.state.carousalItems}
                        renderItem={this._renderItem}
                        sliderWidth={width}
                        itemWidth={width}
                    />

                    <View style={{width: width, height: width*0.15}}>
                    { this.pagination }
                    </View>

            </ImageBackground>
            
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 0.1*width,
        marginHorizontal: 0.05*width,
        padding: 0.1*width,
        borderRadius: 20,
        backgroundColor: 'white',
        flex: 1,
        alignItems: 'center'
    },
    date_title: {
        width: 0.9*width, 
        height: 0.15*width, 
        marginTop: 0.05*width, 
        backgroundColor: 'white', 
        borderRadius: 20, 
        paddingHorizontal: width*0.05,
        paddingTop: width*0.05,
    },
    secondbar: {
        width: width,
        height: 0.11*width,
        backgroundColor: '#23186A',
        justifyContent: 'center',
        alignItems: 'center',
    }, 
    buttons: {
        height: 0.11*width,
        lineHeight: 0.12*width,
        color: 'white',
        fontSize: 15,
        fontFamily: "Calibri",
        fontWeight: "bold",
    },
    title: {
        fontFamily: "Calibri",
        color: 'black',
        width: 0.7*width,
        fontSize: 0.04*width,
        marginBottom: 0.02*width,
    },
    input: {
        fontFamily: "Calibri",
        backgroundColor: "#EEEEEE",
        color: 'black',
        width: 0.7*width,
        height: 0.11*width,
        fontSize: 0.04*width,
        paddingVertical: 0.01*height,
        paddingHorizontal: 0.02*height,
        borderRadius: 10,
        marginBottom: 0.15*width,
        borderColor: "#D9D8D9",
        borderWidth: 1,
        justifyContent: 'center',
    },
    input2: {
        fontFamily: "Calibri",
        backgroundColor: "#EEEEEE",
        color: 'black',
        width: 0.7*width,
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
    timing: {
        fontFamily: "Calibri",
        color: 'black',
        fontSize: 0.04*width,

    },
    list: {
        width: 0.7*width,
        height: width*0.14,
        backgroundColor: 'white',
        padding: 10,
        borderColor: "#D9D8D9",
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 0.03*width,
    },
    listitem1: {
        fontFamily: "Calibri",
        fontSize: 0.04*width,
        color: 'black',
    },
    listitem2: {
        fontFamily: "Calibri",
        fontSize: 0.035*width,
        color: '#424242',
    },
});