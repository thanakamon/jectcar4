import React from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import FirebaseScreen from '../screens/FirebaseScreen';
import SharedScreen from '../screens/SharedScreen';
import {DrawerContent} from '../screens/Drawer'


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


const AppStack = () => {
  return (
    
      <Drawer.Navigator drawerContent={props => <DrawerContent{...props}/>}>
        <Drawer.Screen name="Application" component={HomeScreen} />
        <Drawer.Screen name="FireStore" component={FirebaseScreen} />
        <Drawer.Screen name="Shared" component={SharedScreen} />
      </Drawer.Navigator>
      
  );
}

export default AppStack;
