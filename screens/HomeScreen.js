import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import FormButton from '../components/FormButton';
import { AuthContext } from '../navigation/AuthProvider';
import Icon from 'react-native-vector-icons/Ionicons';
import ActionButton from 'react-native-action-button';

import database from '@react-native-firebase/database';


const HomeScreen = () => {
  const { user, logout } = useContext(AuthContext);
  return (

    <View style={styles.container}>
      <Text style={styles.text}>Welcome </Text>
      <Text style={styles.text}>{user.displayName}</Text>
      <Text style={styles.text}> {user.email}</Text>
      <Text style={styles.text}> {user.uid}</Text>
      <FormButton buttonTitle='Logout' onPress={() => logout()} />
    
    </View>


  );
}


export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9fafd',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 20,
    color: '#333333'
  }
}); 