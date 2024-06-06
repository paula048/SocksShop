import React, { useState, useEffect } from 'react';
import { Button, Text, View, FlatList, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import { Picker } from '@react-native-picker/picker';
import useSizes from '../useSizes';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from "@react-navigation/native";

import { createStackNavigator } from "@react-navigation/stack";

import FlashMessage, {showMessage, hideMessage} from "react-native-flash-message";


// npm i react-native-flash-message


const Stack = createStackNavigator();
// const navigation = useNavigation();


const BoughtScreen = ({ route, navigation }) => {






  

  return (
    <View style={styles.mainContainer}>
      <ScrollView>
            <Text style={[styles.detailText, { marginTop: 20 }]}>YOU Bought Succesfull</Text>
      </ScrollView>

      <View>
        
      </View>

      


      
      
      <FlashMessage position={'center'} />
    </View>
  );
  
};



const styles = StyleSheet.create({

  image: {
    width: 300,
    height: 500,
    resizeMode: 'contain'
  },
  mainContainer: {
    marginBottom: 40
  },
  imageContainer: {
    alignItems: 'center',
    // justifyContent: 'center'
  },
  detailsContainer: {

  },
  brand: {
    fontWeight: 'bold',
    marginBottom: 2,
  },
});

export default BoughtScreen;
