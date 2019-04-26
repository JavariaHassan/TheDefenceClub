import {createStackNavigator, createAppContainer} from 'react-navigation';
import { fromRight } from 'react-navigation-transitions';

import Main_Screen from './Main_Screen';
import Add_Screen from './Add_Reservation';
import RDetails_Screen from './Reservation_Details';

const MainNavigator = createStackNavigator(
    {
        Main:   {screen: Main_Screen},
        Add: {screen: Add_Screen},
        View: {screen: RDetails_Screen},
    },
    {
        transitionConfig: () => fromRight(),
        defaultNavigationOptions: {
            title: "",
            headerStyle: {
                backgroundColor: 'white',
                borderBottomColor:'#A9A9A9',
                borderBottomWidth: 1,
            },
            headerTintColor: "#23186A",
            headerTitleStyle: {
                fontWeight: "normal",
                color: "#23186A",
                fontFamily: "Calibri",
                fontWeight: "bold",
            },
        },
    }
);

const App = createAppContainer(MainNavigator);

export default App;