import * as React from 'react'

import { Text, View, TouchableOpacity, TextInput, StyleSheet, Dimensions } from 'react-native'
import { SearchBar, IconProps } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Animatable from 'react-native-animatable';

import { FAB } from 'react-native-elements';

import Icon from 'react-native-vector-icons/FontAwesome5';

const { width, height } = Dimensions.get("screen")

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Homescreen from './ShalabyAppScreens/Homescreen';
import listpricescreen from './ShalabyAppScreens/listpricescreen';
import customerListscreen from './ShalabyAppScreens/customerListscreen';
import customerDetialsScreen from './ShalabyAppScreens/customerDetialsScreen';
import loginScreen from './ShalabyAppScreens/loginScreen'

import Splash from './ShalabyAppScreens/splash'


const Stack = createNativeStackNavigator()


function MyStack() {
  return (
    <Stack.Navigator

      screenOptions={
        {
          headerShown: false, 
          

        }
        
      }
      initialRouteName='Splash'
      >

      <Stack.Screen name='Splash' component={Splash} />


      <Stack.Screen name='login' component={loginScreen} />

      <Stack.Screen name='Home' component={Homescreen} />
      <Stack.Screen name='ListPrice' component={listpricescreen} />
      <Stack.Screen name='customerList' component={customerListscreen} />
      <Stack.Screen name='customerDetials' component={customerDetialsScreen} />


    </Stack.Navigator>
  )
}





export default function App() {

  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  text: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#000"
  },
});






