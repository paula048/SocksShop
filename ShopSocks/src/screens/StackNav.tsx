import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from "@react-navigation/stack";


import HomeScreen from './HomeScreen';
import ProductDetailsScreen from './ProductDetailsScreen';
import TabScreens from './TabScreens';

const Stack = createStackNavigator();


const StackNav = () => {

    return(
        <Stack.Navigator>
            <Stack.Screen name="HomeNav" component={TabScreens} options={{ headerShown: false }}/>
            <Stack.Screen name="Product" component={ProductDetailsScreen} />
        </Stack.Navigator> 
    )
}

export default StackNav;