import { Dimensions } from 'react-native';
import { createDrawerNavigator, createAppContainer } from 'react-navigation';
import { HomePage } from '../components/HomePage';

const WINDOW_WIDTH = Dimensions.get('window').width;
let routeConfigs = {
    'HomePage': {
        screen: HomePage,
    },
};
let drawerNavigatorConfig = {
    initialRouteName: 'HomePage',
    drawerBackgroundColor: '#43484d',
    contentOptions: {
        activeTintColor: '#548ff7',
        activeBackgroundColor: 'transparent',
        inactiveTintColor: '#ffffff',
        inactiveBackgroundColor: 'transparent',
        labelStyle: {
            fontSize: 18,
            marginLeft: 0,
        },
    },
    drawerWidth: Math.min(WINDOW_WIDTH * 0.8, 200),
};
export default DrawerNavigator = createAppContainer(createDrawerNavigator(routeConfigs, drawerNavigatorConfig));