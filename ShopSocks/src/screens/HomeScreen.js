import { AsyncStorage } from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from "@react-navigation/stack";




import { Button, Text, View, FlatList, StyleSheet, Image, TouchableOpacity,Dimensions } from "react-native";
import useResult from "../useResult";
import React, { useState, useEffect } from 'react';

import ProductDetailsScreen from "./ProductDetailsScreen";

const numColumns = 2
const KEY_userEmail = "userEmail";
const KEY_userPassword = "userPassword";



const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();



const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      console.log("ASYNC GET, value exist: "+value);
    }
  } catch (e) {
    console.log("ASYNC GET: "+key+"    ERROR: "+e);
  }
};




export default function HomeScreen({ navigation }) {
  const [count, setCount] = useState(0);


  const onPress = (item) => {
    setCount(prevCount => prevCount + 1);
    
    navigation.navigate("Shop", { selectedItem: item });
  };

  const ProductDetailsView = (item) => {
    console.log("IT: LOVEEEEEEEEEEEEEEEEEE "+ item.id);
    navigation.navigate("Product", { selectedItem: item, myID: item.id });
  };
  



  const { error, loading, jsonResponse } = useResult();


  // const renderItem = ({ item }) => {

  //   return (
  //       <View>
  //         <Image source={{ uri: item.image }} style={{ width: 60, height: 60 }} />
  //         <View>
  //           <Text style={{ fontWeight: "bold" }}>{item.brand}</Text>
  //           <Text>{item.name}</Text>
  //         </View>

  //         <Button title="View" onPress={() => ProductDetailsView(item)}>
  //         </Button>

  //         <TouchableOpacity style={{ height: 50, width: 50, justifyContent: "center", alignItems: "center", height: Dimensions.get('window').width / numColumns }} onPress={() => onPress(item)}>
  //           <Text style={{ color: "green" }}>Buy</Text>
  //           <Text style={{ color: "green" }}>33.99</Text>
  //         </TouchableOpacity>
  //       </View>
  //   );
  // };

  const ResultData = () => {
    if (jsonResponse) {
      return (
        <FlatList
      data={jsonResponse}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      numColumns={2}
    />
      );
    } else if (!error && loading) {
      return <Text>Pobieranie danych...</Text>;
    } else {
      return <Text>Wystąpił błąd podczas pobierania danych</Text>;
    }
  };



  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => ProductDetailsView(item)}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.brand}>{item.brand}</Text>
      {/* <Text>{item.name}</Text> */}
      <Text numberOfLines={2} ellipsizeMode="tail">{item.name.substring(0, 40)}</Text>
      <Text style={styles.brand}>{item.price} zł</Text>
    </TouchableOpacity>
  );



  return (
    <View>
      <Stack.Navigator>
        <Stack.Screen name="Product" component={ProductDetailsScreen} />
      </Stack.Navigator>

      <ResultData />
    </View>
  );
}

const styles = StyleSheet.create({
  listItem: {
    margin: 10,
    padding: 10,
    backgroundColor: "#FFF",
    width: "80%",
    flex: 1,
    alignSelf: "center",
    flexDirection: "row",
    borderRadius: 5
  },
  itemContainer: {
    flex: 1,
    alignItems: 'center',
    margin: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 5,
  },
  brand: {
    fontWeight: 'bold',
    marginBottom: 2,
  },
});
