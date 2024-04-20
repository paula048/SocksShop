import { useNavigation } from "@react-navigation/native";
import {Button, Text, View} from "react-native";




export default function ShopScreen(){

    const navigation = useNavigation();
    return(
        <View>
            <Text>Shop Screen</Text>
            <Button
            title="Go to Home Screen"
            onPress={() => navigation.navigate("Home")}/>
        </View>
    );
}