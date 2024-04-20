import React from 'react';
import { View, Text } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';




import HomeScreen from "./src/screens/HomeScreen";
import ShopScreen from "./src/screens/ShopScreen";
import FavoriteScreen from './src/screens/FavoriteScreen';
import SettingsScreen from './src/screens/SettingsScreen';


// npm install react-native-screens
// npm install react-native/stack
// npm install @react-navigation/bottom-tabs

const Tab = createBottomTabNavigator();


export default function App(){
  //const Stack = createNativeStackNavigator();       to jest dla Stack nawigacji
  return(
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Shop" component={ShopScreen} />
      <Tab.Screen name="Favorite" component={FavoriteScreen} options={{ tabBarBadge: 3 }}/>
      <Tab.Screen name="Settings" component={SettingsScreen} />
      
      

    </Tab.Navigator>
    </NavigationContainer>

  );
}



