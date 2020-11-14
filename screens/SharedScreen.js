import React, { useContext } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import FormButton from '../components/FormButton';
import { AuthContext } from '../navigation/AuthProvider';



const Shared = ({navigation}) => {
  const { user, logout } = useContext(AuthContext);
  return (

    <View style={styles.container}>
      <Text style={styles.text}>อยากจะร้องให้ก้องไปทั่วโลกา</Text>
      
      {/*<Button
        title="Firebase"
        onPress={() => navigation.navigate("Firebase")}
        />
      */}

    </View>

  );
}


export default Shared;

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