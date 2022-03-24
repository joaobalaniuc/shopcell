import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './container/SplashScreen';
import DrawerNavigator from './DrawerNavigator';
import 'react-native-gesture-handler';
import Login from './container/Login';
import React from 'react';

import Teste from './container/Teste';


const Stack = createStackNavigator();

// const SwitchNavigator = createSwitchNavigator({
//     // Teste: { screen: Teste },
//     SplashScreen: { screen: SplashScreen },
//     Teste: { screen: Teste },
//     Login: { screen: Login },
//     Dashboard: { screen: DrawerNavigator },
// })

export default () =>{
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: false}}>
                <Stack.Screen name="SplashScreen" component={SplashScreen}/>
                <Stack.Screen name="Login" component={Login}/>
                <Stack.Screen name="DrawerNavigator" component={DrawerNavigator}/> 
            </Stack.Navigator>
        </NavigationContainer>
    )
}

