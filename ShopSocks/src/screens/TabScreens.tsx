import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './HomeScreen';
import ShopScreen from "./ShopScreen";
import FavoriteScreen from './FavoriteScreen';
import SettingsScreen from './SettingsScreen';

const Tab = createBottomTabNavigator();


const TabScreens = () => {

    return(
        <Tab.Navigator initialRouteName="Home">
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Shop" component={ShopScreen} />
            <Tab.Screen name="Favorite" component={FavoriteScreen} options={{ tabBarBadge: 3 }}/>
            <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>)
}

export default TabScreens;