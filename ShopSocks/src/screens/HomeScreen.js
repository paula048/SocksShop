import { AsyncStorage } from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Button, Text, View, FlatList, StyleSheet, Image, TouchableOpacity } from "react-native";
import useResult from "../useResult";
import React, { useState, useEffect } from 'react';



const KEY_userEmail = "userEmail";
const KEY_userPassword = "userPassword";


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



export default function HomeScreen() {
  const [count, setCount] = useState(0);

  const onPress = (item) => {
    setCount(prevCount => prevCount + 1);
    console.log(item.category);
    getData(KEY_userEmail)
  };





  const { error, loading, jsonResponse } = useResult();

  const renderItem = ({ item }) => {
    return (
      <View style={styles.listItem}>
        <Image source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} style={{ width: 60, height: 60, borderRadius: 30 }} />
        <View style={{ alignItems: "center", flex: 1 }}>
          <Text style={{ fontWeight: "bold" }}>{item.category}</Text>
          <Text>{item.color}</Text>
        </View>
        <TouchableOpacity style={{ height: 50, width: 50, justifyContent: "center", alignItems: "center" }} onPress={() => onPress(item)}>
          <Text style={{ color: "green" }}>Call</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const ResultData = () => {
    if (jsonResponse) {
      return (
        <FlatList
          data={jsonResponse}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      );
    } else if (!error && loading) {
      return <Text>Pobieranie danych...</Text>;
    } else {
      return <Text>Wystąpił błąd podczas pobierania danych</Text>;
    }
  };

  const navigation = useNavigation();

  return (
    <View>
      <Text>HomeScreen</Text>
      <Button
        title="Go to Shop Screen"
        onPress={() => navigation.navigate("Shop")} />
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
  }
});
