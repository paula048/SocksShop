/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';



import useResult, { ResultJson } from "./src/useResult";



function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };



  const { error, loading, jsonResponse } = useResult();

  const renderItem = ({ item }: { item: ResultJson }) => {
      return (
        <View style={{paddingTop:20}}>
          <View>
            <Text>Category:</Text>
            <Text>{item.category}</Text>
          </View>
          <View>
            <Text>Type:</Text>
            <Text>{item.type}</Text>
          </View>
        </View>
      );
    };



    const ResultData = (): React.JSX.Element => {
            if (jsonResponse) {
                return (
                    <FlatList
                        data={jsonResponse}
                        renderItem={renderItem}
                        keyExtractor={item => item.question}
                    />
                );
            } else if (!error && loading) {
                return <Text>Pobieranie danych...</Text>
            } else {
                return <Text>Wystąpił błąd podczas pobierania danych</Text>
            }
        }





  return (
    <SafeAreaView style={backgroundStyle}>

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Text style={styles.highlight}>Moj test</Text>
          <View>
          <ResultData />
          </View>



          


        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
