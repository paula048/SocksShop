import React from 'react';
import { Button, Text, View } from "react-native";

interface SettingsScreenProps {
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ setIsAuthenticated }) => {
    const handleLogout = () => {
        setIsAuthenticated(false);
        // Optionally navigate to the login screen if you want to
    };

    return (
        <View>
            <Text>Settings Screen</Text>
            <Button title="Log out" onPress={handleLogout} />
        </View>
    );
};

export default SettingsScreen;
