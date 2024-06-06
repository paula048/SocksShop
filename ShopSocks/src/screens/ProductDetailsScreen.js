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


const ProductDetailsScreen = ({ route, navigation }) => {
  const selectedItem = route.params?.selectedItem;
  const myID = route.params?.myID;
  const { error, loading, jsonResponse } = useSizes();
  const [selectedValue, setSelectedValue] = useState(null);
  const [ilosc, setIlosc] = useState(null);                   // pozniej optymalizuj i usun to
  const [options, setOptions] = useState([]);

  const [jsonResSAVE, setJsonResSAVE] = useState([]);
  console.log("ID  ^^^^^^^^^^^^^^: ",myID);

  useEffect(() => {
    // Extract unique sizes from jsonResponse where sock_id is equal to 1
    if (jsonResponse) {
      const filteredItems = jsonResponse.filter(item => item.sock_id === myID);
      setJsonResSAVE(filteredItems);
      const uniqueSizes = Array.from(new Set(filteredItems.map(item => item.size)));
      // const uniqueIlosc = Array.from(new Set(filteredItems.map(item => item.quantity)));
      setOptions(uniqueSizes);
      // setIlosc(uniqueIlosc);

      // Jeśli uniqueSizes nie jest pusta, ustaw selectedValue na pierwszy element
    if (uniqueSizes.length > 0) {
      setSelectedValue(uniqueSizes[0]);
      // setIlosc()
    }
    }
  }, [jsonResponse]);
  

  const handleChange = (itemValue, itemIndex) => {
    setSelectedValue(itemValue);
    console.log("choosed SIZE: "+itemValue);
  }
  


  const onPress = (item) => {
    setCount(prevCount => prevCount + 1);
    
    navigation.navigate("Shop", { selectedItem: item });
  };


  function PressBuyButton(){

    const value =UstawIlosc();
    console.log("ILOSC PAULA: "+value);
    navigation.navigate("Shop", { selectedItem: selectedItem, choosedSize:  selectedValue, ilosc: value});

  }


  function UstawIlosc(){

    const rozmiar = jsonResSAVE.filter(item => item.size == selectedValue);
    console.log("romiary tab: "+rozmiar[0].quantity);
    return rozmiar[0].quantity;

  }




  

  return (
    <View style={styles.mainContainer}>
      <ScrollView>
      {selectedItem ? (
        <>
          <View style={styles.imageContainer}>
            <Image source={{ uri: selectedItem.image }} style={styles.image}/>
          </View>
  
          <View style={styles.imageDetailsContainer}>
            <Text style={{textAlign: 'center', fontWeight: 'bold'}}>{selectedItem.brand}</Text>
            <Text style={{textAlign: 'center'}}>{selectedItem.name}</Text>
            <Text style={{textAlign: 'center'}}>{selectedItem.price}</Text>
            
            <Text style={styles.detailText}>Category: {selectedItem.category}</Text>
            <Text style={styles.detailText}>Color: {selectedItem.color}</Text>
            <Text style={styles.detailText}>Description: ...</Text>
          </View>
        </>
      ) : (
        <Text style={styles.detailText}>No product details available</Text>
      )}
  
      <Text style={[styles.detailText, { marginTop: 20 }]}>Size: </Text>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        
      <Picker
          selectedValue={selectedValue}
          style={{ height: 50, width: 150 }}
          onValueChange={handleChange}>
          {options.map((value, index) => (
            <Picker.Item key={index} label={value.toString()} value={value} />
          ))}
        </Picker>

      </View>
      </ScrollView>

      <View>
        
      </View>

      

      <TouchableOpacity onPress={PressBuyButton}>
        <Text>Press me</Text>
      </TouchableOpacity>

      <Button title="Buy" onPress={PressBuyButton}/>
      
      
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

export default ProductDetailsScreen;
