import React, { useState, useEffect } from 'react';
import { Button, Text, View, FlatList, StyleSheet, Image, TouchableOpacity } from "react-native";

export default function ShopScreen({ route }) {
  const [data, setData] = useState([]);

  // Function to add the selected item to data array
  const addItemToData = (item) => {
    setData(prevData => [...prevData, item]);
  };

  // useEffect to listen for changes in route.params.selectedItem and add it to data array
  useEffect(() => {
    if (route.params?.selectedItem) {
      addItemToData(route.params.selectedItem);
    }
  }, [route.params?.selectedItem]);

  // Render function for FlatList
  const renderItem = ({ item }) => {
    return (
      <View style={styles.listItem}>
        <Text>{item.category}</Text>
        <Text>{item.color}</Text>
      </View>
    );
  };

  return (
    <View>
      <Text>Shop Screen</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listItem: {
    margin: 10,
    padding: 10,
    backgroundColor: "#FFF",
    width: "80%",
    alignSelf: "center",
    borderRadius: 5
  }
});
