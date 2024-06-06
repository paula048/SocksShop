import React, { useState, useEffect } from 'react';
import { Button, Text, View, FlatList, StyleSheet, Image, TouchableOpacity } from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
 


import BoughtScreen from './BoughtScreen';
import useSizesUPDATE from '../useSizesUPDATE';


export default function ShopScreen({ route }) {
  const [data, setData] = useState([]);
  const [finalDetailPrice, setFinalDetailPrice] = useState([]);
  const [finalPrice, setFinalPrice] = useState([]);
  const [sumAllPrices, setSumAllPrices] = useState();
  const [quantities, setQuantities] = useState([]);
  const [ability, setAbility] = useState([]);
  const [size, setSize] = useState([]);

  // Function to add the selected item to data array
  const addItemToData = (item, currentSize, maxAbility) => {
    setData(prevData => [...prevData, item]);
    setFinalDetailPrice(prevFinalDetailPrice => [...prevFinalDetailPrice, item.price]);
    setFinalPrice(prevFinalPrice => [...prevFinalPrice, item.price]);
    setQuantities(prevQuantities => [...prevQuantities, 1]); // Initialize quantity to 1 for the added item
    setSize(prevSize => [...prevSize, currentSize]);
    setAbility(prevAbility => [...prevAbility, maxAbility]);
  };


  useEffect(() => {
    // Muszę dać tu rzutowania na typ Number, bo bez tego traktuje mi wartości jako string
    let suma = finalDetailPrice.reduce((a, b) => Number(a) + Number(b), 0);
    console.log("Calosc: "+finalDetailPrice);
    console.log("Po liczeniu: "+suma);
    setSumAllPrices(suma);
  });




  const changePrice = (index, value) => {
    setFinalDetailPrice(prevFinalDetailPrice => {
        const updatedFinalDetailPrice = [...prevFinalDetailPrice];
        updatedFinalDetailPrice[index]= finalPrice[index] * value;

      return updatedFinalDetailPrice;
    });
  };

  // Function to change quantity for a current product bu index
  const changeQuantity = (index, operation) => {
    setQuantities(prevQuantities => {
      const updatedQuantities = [...prevQuantities];
      if (operation === '+' && updatedQuantities[index] < ability[index]) { // Example limit to 10, adjust as needed
        updatedQuantities[index]++;
        changePrice(index, updatedQuantities[index]);
        
      } else if (operation === '-' && updatedQuantities[index] > 0) {
        updatedQuantities[index]--;
        changePrice(index, updatedQuantities[index]);
      }
      return updatedQuantities;
    });
  };



    // useEffect to log a message whenever the quantities array changes
    useEffect(() => {
      console.log("Value changed");
    }, [finalDetailPrice]);

    const Stack = createStackNavigator();



    
  function PressBuyButton(){

    console.log("onClick Buuton KUP wszystko");
    UpdateSizes();
    CheckFinallyAvability();
    
    navigation.navigate("AfterBuy");

  }


  function CheckFinallyAvability(){

    console.log("Function: check ability");


  }


  // function UpdateSizes(){

  //   useSizesUPDATE(1, 52, 2);
  // }

  function UpdateSizes(){

    finalDetailPrice.forEach((element, index) => {
      useSizesUPDATE(data[index].id, size[index], ability[index]-quantities[index]);
    });


    
  }

  



  // usuwanie produktu z koszyka
  function deleteProduct(index) {
    setData(prevData => prevData.filter((item, i) => i !== index));
    setFinalDetailPrice(prevFinalDetailPrice => prevFinalDetailPrice.filter((item, i) => i !== index));
    setFinalPrice(prevFinalPrice => prevFinalPrice.filter((item, i) => i !== index));
    setQuantities(prevQuantities => prevQuantities.filter((item, i) => i !== index));
    setSize(prevSize => prevSize.filter((item, i) => i !== index));
  }
  



  // useEffect to listen for changes in route.params.selectedItem and add it to data array
  useEffect(() => {
    if (route.params?.selectedItem) {
      addItemToData(route.params.selectedItem, route.params.choosedSize, route.params.ilosc);
    }
    
    
  }, [route.params?.selectedItem]);


  const navigation = useNavigation();


  // Render function for FlatList
  const renderItem = ({ item, index }) => {


    return (
      <View style={styles.listItem2}>


        
        

        <View>
        <Image source={{ uri: item.image }} style={styles.image}/>
          <Text>{item.brand}</Text>
          <Text>{item.name}</Text>
          <Text>Rozmiar: {size[index]}</Text>
        </View>
        
        <View>
          <Text>{finalDetailPrice[index]}</Text>
          <View style={styles.listItem3}>
            <TouchableOpacity style={styles.touch} onPress={() => changeQuantity(index, '+')}><Text style={styles.textCenter}>+</Text></TouchableOpacity>
            <Text>{quantities[index]}</Text>
            <TouchableOpacity style={styles.touch} onPress={() => changeQuantity(index, '-')}><Text style={styles.textCenter}>-</Text></TouchableOpacity>
          </View>
          <Button title='DELETE' onPress={() => deleteProduct(index)} />

        </View>

      </View>
    );
  };

  return (
    <>
      <ScrollView>
        <View>
          <Text>Shop Screen</Text>

          <View>
            <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}/>
          </View>

          <View>
            <Text value={sumAllPrices}>Price: {sumAllPrices}</Text>
            <Text value={sumAllPrices}></Text>
          </View>
        </View>
      </ScrollView>

      <View>
        <Button title="Buy" onPress={PressBuyButton} ></Button>
      </View>
    </>

  );
  
  
}


const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 100,
    resizeMode: 'contain'
  },
  listItem: {
    margin: 10,
    padding: 10,
    backgroundColor: "#FFF",
    alignSelf: "center",
    borderRadius: 5
  },
  listItem2: {
    margin: 10,
    padding: 10,
    backgroundColor: "#FFF",
    width: "80%",
    flex: 2,
    alignSelf: "center",
    flexDirection: "row",
    borderRadius: 5
  },
  listItem3: {

    alignSelf: "center",
    flexDirection: "row",

  },
  itemContainer: {
    flex: 1,
    alignItems: 'center',
    margin: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
  },
  touch: {
    backgroundColor: '#00afff',
    height: 20,
    width: 20,
    alignContent: 'center',
    justifyContent: 'center',
    textAlign: 'center'
    
  },
  textCenter: {

    alignContent: 'center',
    justifyContent: 'center',
    textAlign: 'center'

  }
});
