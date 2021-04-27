import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SharedMemos from '../screens/SharedMemos';
import AddMemos from '../screens/AddMemos';
import HomeCar from '../screens/HomeCar';
import HomeMemos from '../screens/HomeMemos';
import AddCar from '../screens/AddCar';
import DetailCar from '../screens/DetailCar';
import { DrawerContent } from '../components/DrawerMemos';
import {DrawerCar} from '../components/DrawerCar'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DetailsMemos from '../screens/DetailsMemos';
import AddGas from '../screens/AddGas';
import GasTotal from '../screens/GasTotal';
import EditMemos from '../screens/EditMemos'
import DetailService from '../screens/DetailService'
import SharedCar from '../screens/SharedCar';
import AddService from '../screens/Addservice';
import Service from '../screens/ServiceTotal ';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const MemosDrawer = ({navigation}) => (
  <Drawer.Navigator headerMode='none' drawerContent={props => <DrawerContent{...props}/>}>
        <Drawer.Screen name="Home" component={MemosStack} />  
  </Drawer.Navigator>
  
);
const CarDrawer = ({navigation}) => (
  <Drawer.Navigator headerMode='none' drawerContent={props => <DrawerCar{...props}/>}>
        <Drawer.Screen name="Home" component={CarStack} />  
  </Drawer.Navigator>
  
);

const CarStack = ({navigation}) => (
  <Stack.Navigator >
    <Stack.Screen 
    name="Car Maintenance" 
    component={HomeCar} 
    options={{
      headerTitleAlign: 'center',
      headerTitleStyle: {
        color: '#2e64e5',
        fontFamily: 'Kufam-SemiBoldItalic',
        fontSize: 18,
      },
      headerStyle: {
        shadowColor: '#000',
        elevation: 0,
      },
      headerRight: () => (
        <View style={{marginRight: 10}}>
          <FontAwesome5.Button
            name="plus"
            size={22}
            backgroundColor="#fff"
            color="#2e64e5"
            onPress={() => navigation.navigate('addcar')}
            
          />
        </View>
      ), 
      headerLeft: () => (
        <View style={{marginLeft: 10}}>
          <Icon.Button
            name="menu"
            size={22}
            backgroundColor="#fff"
            color="#2e64e5"
            onPress={() => navigation.openDrawer()}
            
            
          />
        </View>
      ),
    }}
    />
    <Stack.Screen
      name="addcar"
      component={AddCar}
      options={{
        title: 'Add Car',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#fff',
          shadowColor: '#fff',
          elevation: 0,
        },
        headerTitleStyle: {
          color: '#2e64e5',
          fontFamily: 'Kufam-SemiBoldItalic',
          fontSize: 18,
        },
        headerBackTitleVisible: false,
        headerBackImage: () => (
          <View style={{marginLeft: 15}}>
            <Ionicons name="arrow-back" size={25} color="#2e64e5" />
          </View>
        ),
      }}
    />
    <Stack.Screen
      name="addgas"
      component={AddGas}
      options={{
        title: 'Add Fuel',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#fff',
          
          elevation: 0,
        },
        headerTitleStyle: {
          color: '#2e64e5',
          fontFamily: 'Kufam-SemiBoldItalic',
          fontSize: 18,
        },
        
      }}
    />

    <Stack.Screen
      name="detialCar"
      component={DetailCar}
      options={{
        title: 'Dashboard',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: '#2e64e5',
          fontFamily: 'Kufam-SemiBoldItalic',
          fontSize: 18,
        },
        headerStyle: {
          backgroundColor: '#fff',
          shadowColor: '#fff',
          elevation: 0,
        },
        headerBackTitleVisible: false,
        headerBackImage: () => (
          <View style={{marginLeft: 15}}>
            <Ionicons name="arrow-back" size={25} color="#2e64e5" />
          </View>
        ),
      }}
    />
    <Stack.Screen
      name="GasTotal"
      component={GasTotal}
      options={{
        title: 'Fuel Logs',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#fff',
          shadowColor: '#fff',
          elevation: 0,
        },
        headerTitleStyle: {
          color: '#2e64e5',
          fontFamily: 'Kufam-SemiBoldItalic',
          fontSize: 18,
        },
        headerBackTitleVisible: false,
        headerBackImage: () => (
          <View style={{marginLeft: 15}}>
            <Ionicons name="arrow-back" size={25} color="#2e64e5" />
          </View>
        ),
      }}
    />
    <Stack.Screen
      name="detailService"
      component={DetailService}
      options={{
        title: 'Detail Sevice',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#fff',
          shadowColor: '#2e64e515',
          elevation: 0,
        },
        headerTitleStyle: {
          color: '#2e64e5',
          fontFamily: 'Kufam-SemiBoldItalic',
          fontSize: 18,
        },
        headerBackTitleVisible: false,
        headerBackImage: () => (
          <View style={{marginLeft: 15}}>
            <Ionicons name="arrow-back" size={25} color="#2e64e5" />
          </View>
        ),
      }}
    />

    <Stack.Screen
            name="SharedCar"
            component={SharedCar}
            options={{
              title: 'Shared with me',
              headerTitleAlign: 'center',
              headerTitleStyle: {
                color: '#2e64e5',
                fontFamily: 'Kufam-SemiBoldItalic',
                fontSize: 18,
              },

              headerStyle: {
                backgroundColor: '#fff',
                shadowColor: '#fff',
                elevation: 0,
              },
              headerBackTitleVisible: false,
              headerBackImage: () => (
                <View style={{marginLeft: 15}}>
                  <Ionicons name="arrow-back" size={25} color="#2e64e5" />
                </View>
              ),
            }}
    />

    <Stack.Screen
            name="addService"
            component={AddService}
            options={{
              title: 'Add Service',
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: '#fff',
        
                elevation: 0,
              },
              headerTitleStyle: {
                color: '#2e64e5',
                fontFamily: 'Kufam-SemiBoldItalic',
                fontSize: 18,
              },
              headerBackTitleVisible: false,
              headerBackImage: () => (
                <View style={{marginLeft: 15}}>
                  <Ionicons name="arrow-back" size={25} color="#2e64e5" />
                </View>
              ),
            }}
    />

    <Stack.Screen
            name="ServiceTotal"
            component={Service}
            options={{
              title: 'Maintenance Logs',
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: '#fff',
                shadowColor: '#fff',
                elevation: 0,
              },
              headerTitleStyle: {
                color: '#2e64e5',
                fontFamily: 'Kufam-SemiBoldItalic',
                fontSize: 18,
              },
              headerBackTitleVisible: false,
              headerBackImage: () => (
                <View style={{marginLeft: 15}}>
                  <Ionicons name="arrow-back" size={25} color="#2e64e5" />
                </View>
              ),
            }}
    />

    
  </Stack.Navigator>
);

const MemosStack = ({navigation}) => (
  
  <Stack.Navigator>
    <Stack.Screen name="Memos" component={HomeMemos} 
    options={{
      headerTitleAlign: 'center',
      headerTitleStyle: {
        color: '#e13661',
        fontFamily: 'Kufam-SemiBoldItalic',
        fontSize: 18,
      },
      headerStyle: {
        shadowColor: '#000',
        elevation: 0,
      },
      headerRight: () => (
        <View style={{marginRight: 10,flexDirection:'row'}}>
          
          <FontAwesome5.Button
            name="plus"
            size={22}
            backgroundColor="#fff"
            color="#e13661"
            onPress={() => navigation.navigate('addMemos')}
            
          />
        </View>
      ), 
      headerLeft: () => (
        <View style={{marginLeft: 10}}>
          <Icon.Button
            name="menu"
            size={22}
            backgroundColor="#fff"
            color="#e13661"
            onPress={() => navigation.openDrawer()}
          />
        </View>
      ),
      
      
    }}
    />
    <Stack.Screen
      name="addMemos"
      component={AddMemos}
      options={{
        title: 'Add Memo',
        headerTitleAlign: 'center',
        headerStyle: {
        backgroundColor: 'white',
        shadowColor: '#2e64e515',
        elevation: 0,
        },
        headerTitleStyle: {
          color: '#e13661',
          fontFamily: 'Kufam-SemiBoldItalic',
          fontSize: 18,
        },
        headerBackTitleVisible: false,
        headerBackImage: () => (
          <View style={{marginLeft: 15}}>
            <Ionicons name="arrow-back" size={25} color="#e13661" />
          </View>
        ),
      }}
    />
    <Stack.Screen
      name="SharedMemos"
      component={SharedMemos}
      options={{
        title: 'Shared with me',
        headerTitleAlign: 'center',
        headerStyle: {
        backgroundColor: 'white',
        shadowColor: '#2e64e515',
        elevation: 0,
        },
        headerTitleStyle: {
          color: '#e13661',
          fontFamily: 'Kufam-SemiBoldItalic',
          fontSize: 18,
        },
        headerBackTitleVisible: false,
        headerBackImage: () => (
          <View style={{marginLeft: 15}}>
            <Ionicons name="arrow-back" size={25} color="#e13661" />
          </View>
        ),
      }}
    />
    <Stack.Screen
      name="detailsMemos"
      component={DetailsMemos}
      options={{
        title: 'Details',
        headerTitleAlign: 'center',
        headerStyle: {
        backgroundColor: '#fff',
        elevation: 0,
        
        },
        headerTitleStyle: {
          color: '#e13661',
          fontFamily: 'Kufam-SemiBoldItalic',
          fontSize: 18,
        },
        headerRight: () => (
          <View style={{marginRight: 10}}>
            <FontAwesome5.Button
              name="edit"
              size={22}
              backgroundColor="#fff"
              color="#e13661"
              onPress={() => navigation.navigate('editMemos')}
              
            />
          </View>
        ), 
        headerBackTitleVisible: false,
        headerBackImage: () => (
          <View style={{marginLeft: 15}}>
            <Ionicons name="arrow-back" size={25} color="#2e64e5" />
          </View>
        ),
        
        
      }}
    />

<Stack.Screen
      name="editMemos"
      component={EditMemos}
      options={{
        title: 'Edit',
        headerTitleAlign: 'center',
        headerStyle: {
        backgroundColor: '#2e64e515',
        shadowColor: '#2e64e515',
        elevation: 0,
        
        },
        headerBackTitleVisible: false,
        headerBackImage: () => (
          <View style={{marginLeft: 15}}>
            <Ionicons name="arrow-back" size={25} color="#2e64e5" />
          </View>
        ),
        
      }}
    />
    
  </Stack.Navigator>
);

const AppStack = () => {
  return (

    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#2e64e5',
      }}>
      
      <Tab.Screen
        name="Car"
        component={CarDrawer}
        options={{
          
          tabBarIcon: ({color, size}) => (
            <Ionicons
              name="car-sport-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Memos"
        component={MemosDrawer}
        options={{
          // tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="book-outline" color={color} size={size} />
          ),
        }}
      />
      
    </Tab.Navigator>
    

  );
};

export default AppStack;
