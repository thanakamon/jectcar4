import React, { useContext } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import FormButton from '../components/FormButton';
import { AuthContext } from '../navigation/AuthProvider';
import Icon from 'react-native-vector-icons/Ionicons';
import ActionButton from 'react-native-action-button';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { State } from 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import FirebaseScreen from './FirebaseScreen';


const HomeScreen = ({navigation}) => {
  const { user, logout } = useContext(AuthContext);
  return (

    <View style={styles.container}>
      <Text style={styles.text}>Welcome </Text>
      <Text style={styles.text}>Name : {user.displayName}</Text>
      <Text style={styles.text}>Email : {user.email}</Text>
      <FormButton buttonTitle='Logout' onPress={() => logout()} />
      
      {/*<Button
        title="Firebase"
        onPress={() => navigation.navigate("Firebase")}
        />
      */}

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