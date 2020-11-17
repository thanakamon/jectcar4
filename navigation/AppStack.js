import React from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import FirebaseScreen from '../screens/FirebaseScreen';
import SharedScreen from '../screens/SharedScreen';
import { DrawerContent } from '../screens/Drawer';
import HomeCarScreen from '../screens/HomeCarScreen';
import MemosScreen from '../screens/MemosScreen';
import realtimedatabase from '../screens/Realtimetadabase';
import StorageDatabase from '../screens/StorageScreen';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


const AppStack = () => {
  return (
    
      <Drawer.Navigator headerMode='none' drawerContent={props => <DrawerContent{...props}/>}>
        <Drawer.Screen name="Application" component={HomeScreen} />
        <Drawer.Screen name="FireStore" component={FirebaseScreen} />
        <Drawer.Screen name="Shared" component={SharedScreen} />
        
        <Stack.Screen name="CarHome" component={HomeCarScreen}/>
        <Stack.Screen name="Memos" component={MemosScreen}/>
        <Stack.Screen name="Realtime" component={realtimedatabase}/>
        <Stack.Screen name="Storage" component={StorageDatabase}/>
      </Drawer.Navigator>

      
  

  );
}

export default AppStack;
