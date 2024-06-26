import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import { Alert, Button, Image, Pressable, SafeAreaView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';



import useUsers from '../useUsers';
import { err } from 'react-native-svg';

// import {AsyncStorage} from 'react-native';



const logo = require("../img/logo.jpg")


const KEY_userEmail = "userEmail";
const KEY_userPassword = "userPassword";

export default function LoginScreen({ setIsAuthenticated }) {
    const [click, setClick] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigation = useNavigation();

    const { error, loading, jsonResponse } = useUsers();

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




  
  const storeData = async (key,value) => {
    try {
      await AsyncStorage.setItem(key, value);
      console.log("ASYNC SET, saving data");
    } catch (e) {
      console.log("ASYNC SET, saving data error: "+e);
    }
  };
  



    const handleLogin = () => {
      console.log(jsonResponse);


      getData(KEY_userEmail);
      getData(KEY_userPassword);

  
      // W ramach testó tymczasowo sprawdzam przez 'name'   => potem ZMIEŃ na 'email' !
      const user = jsonResponse.find(user => user.name === email);
  
      if (user) {
        console.log("Użytkownik istnieje.");
          if(user.password === password){
            console.log("Logowanie SUKCES !!!");
            storeData(KEY_userEmail,email);
            storeData(KEY_userPassword, password);
            getData(KEY_userEmail);
            getData(KEY_userPassword);
            setIsAuthenticated(true);
            navigation.navigate("Home");
          }
          
      } else {
        console.log("Niepoprawne haslo lub e-mail");    
      }

  };

    return (
        <SafeAreaView style={styles.container}>
            <Image source={logo} style={styles.image} resizeMode='contain' />
            <Text style={styles.title}>Login</Text>
            <View style={styles.inputView}>
                <TextInput style={styles.input} placeholder='EMAIL OR USERNAME' value={email} onChangeText={setEmail} autoCorrect={false} autoCapitalize='none' />
                <TextInput style={styles.input} placeholder='PASSWORD' secureTextEntry value={password} onChangeText={setPassword} autoCorrect={false} autoCapitalize='none' />
            </View>
            <View style={styles.rememberView}>
                <View style={styles.switch}>
                    <Switch value={click} onValueChange={setClick} trackColor={{ true: "green", false: "gray" }} />
                    <Text style={styles.rememberText}>Remember Me</Text>
                </View>
                <View>
                    <Pressable onPress={() => Alert.alert("Forget Password!")}>
                        <Text style={styles.forgetText}>Forgot Password?</Text>
                    </Pressable>
                </View>
            </View>

            <View style={styles.buttonView}>
                <Pressable style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>LOGIN</Text>
                </Pressable>
            </View>

            <Text style={styles.footerText}>Don't Have Account?<Text style={styles.signup} onPress={() => navigation.navigate("SignUp")}>  Sign Up</Text></Text>
        </SafeAreaView>
    );
}





const styles = StyleSheet.create({
    container : {
      alignItems : "center",
      paddingTop: 70,
    },
    image : {
      height : 160,
      width : 170
    },
    title : {
      fontSize : 30,
      fontWeight : "bold",
      textTransform : "uppercase",
      textAlign: "center",
      paddingVertical : 40,
      color : "red"
    },
    inputView : {
      gap : 15,
      width : "100%",
      paddingHorizontal : 40,
      marginBottom  :5
    },
    input : {
      height : 50,
      paddingHorizontal : 20,
      borderColor : "red",
      borderWidth : 1,
      borderRadius: 7
    },
    rememberView : {
      width : "100%",
      paddingHorizontal : 50,
      justifyContent: "space-between",
      alignItems : "center",
      flexDirection : "row",
      marginBottom : 8
    },
    switch :{
      flexDirection : "row",
      gap : 1,
      justifyContent : "center",
      alignItems : "center"
      
    },
    rememberText : {
      fontSize: 13
    },
    forgetText : {
      fontSize : 11,
      color : "red"
    },
    button : {
      backgroundColor : "red",
      height : 45,
      borderColor : "gray",
      borderWidth  : 1,
      borderRadius : 5,
      alignItems : "center",
      justifyContent : "center"
    },
    buttonText : {
      color : "white"  ,
      fontSize: 18,
      fontWeight : "bold"
    }, 
    buttonView :{
      width :"100%",
      paddingHorizontal : 50
    },
    optionsText : {
      textAlign : "center",
      paddingVertical : 10,
      color : "gray",
      fontSize : 13,
      marginBottom : 6
    },
    mediaIcons : {
      flexDirection : "row",
      gap : 15,
      alignItems: "center",
      justifyContent : "center",
      marginBottom : 23
    },
    icons : {
      width : 40,
      height: 40,
    },
    footerText : {
      textAlign: "center",
      color : "gray",
    },
    signup : {
      color : "red",
      fontSize : 13
    }
  })