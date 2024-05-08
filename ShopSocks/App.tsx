import React, {useState} from 'react';
import { View, Text, FlatList } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from "./src/screens/HomeScreen";
import ShopScreen from "./src/screens/ShopScreen";
import FavoriteScreen from './src/screens/FavoriteScreen';
import SettingsScreen from './src/screens/SettingsScreen';

import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import ProductDetailsScreen from './src/screens/ProductDetailsScreen';


import TabScreens from './src/screens/TabScreens';
import StackNav from './src/screens/StackNav';



// npm install react-native-screens
// npm install react-native/stack
// npm install @react-navigation/bottom-tabs

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


export default function App(){
  //const Stack = createNativeStackNavigator();       to jest dla Stack nawigacji
  const [isAuthenticated, setIsAuthenticated] = useState(false); // State to track authentication status


  return(
    <NavigationContainer>
      {isAuthenticated ? ( // Render different navigation depending on authentication status
        <StackNav/>
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="Login">
            {(props) => <LoginScreen {...props} setIsAuthenticated={setIsAuthenticated} />}
          </Stack.Screen>
          <Stack.Screen name="SignUp">
            {(props) => <SignUpScreen {...props} setIsAuthenticated={setIsAuthenticated} />}
          </Stack.Screen>

          
          
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}