import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import ProductDetailsScreen from './ProductDetailsScreen';
import BoughtScreen from './BoughtScreen';
import TabScreens from './TabScreens';

const Stack = createStackNavigator();

interface StackNavProps {
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const StackNav: React.FC<StackNavProps> = ({ setIsAuthenticated }) => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="HomeNav">
                {(props) => <TabScreens {...props} setIsAuthenticated={setIsAuthenticated} />}
            </Stack.Screen>
            <Stack.Screen name="Product" component={ProductDetailsScreen} />
            <Stack.Screen name="AfterBuy" component={BoughtScreen} />
        </Stack.Navigator>
    );
};

export default StackNav;
