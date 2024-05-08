import React, { useState, useEffect } from 'react';
import { Button, Text, View, FlatList, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Picker } from '@react-native-picker/picker';
import useSizes from '../useSizes';
import { ScrollView } from 'react-native-gesture-handler';

const ProductDetailsScreen = ({ route }) => {
  const selectedItem = route.params?.selectedItem;
  const myID = route.params?.myID;
  const { error, loading, jsonResponse } = useSizes();
  const [selectedValue, setSelectedValue] = useState(null);
  const [options, setOptions] = useState([]);
  console.log("ID  ^^^^^^^^^^^^^^: ",myID);

  useEffect(() => {
    // Extract unique sizes from jsonResponse where sock_id is equal to 1
    if (jsonResponse) {
      const filteredItems = jsonResponse.filter(item => item.sock_id === myID);
      const uniqueSizes = Array.from(new Set(filteredItems.map(item => item.size)));
      setOptions(uniqueSizes);
    }
  }, [jsonResponse]);
  

  const handleChange = (itemValue, itemIndex) => {
    setSelectedValue(itemValue);
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

      <Button title="Buy"/>
      

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
