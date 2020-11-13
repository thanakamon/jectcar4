import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import FirebaseScreen from '../screens/FirebaseScreen';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


const AppStack = () => {
  return (

    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Firebase" component={FirebaseScreen} />
    </Drawer.Navigator>
  );
}

export default AppStack;
