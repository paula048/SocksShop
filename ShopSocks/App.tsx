import React, { useState } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import StackNav from './src/screens/StackNav';

const Stack = createStackNavigator();

const App: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(true);

    return (
        <NavigationContainer>
            {isAuthenticated ? (
                <StackNav setIsAuthenticated={setIsAuthenticated} />
            ) : (
                <Stack.Navigator>
                    <Stack.Screen name="Login">
                        {(props) => <LoginScreen {...props} setIsAuthenticated={setIsAuthenticated} />}
                    </Stack.Screen>
                    <Stack.Screen name="SignUp">
                        {(props) => <SignUpScreen {...props} setIsAuthenticated={setIsAuthenticated} />}
                    </Stack.Screen>
                </Stack.Navigator>
            )}
        </NavigationContainer>
    );
};

export default App;
