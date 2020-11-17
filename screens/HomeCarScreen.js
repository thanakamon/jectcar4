import React, { useContext } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import FormButton from '../components/FormButton';
import { AuthContext } from '../navigation/AuthProvider';



const HomeCarScreen = ({navigation}) => {
  const { user, logout } = useContext(AuthContext);
  return (

    <View style={styles.container}>
      <Text style={styles.text}>หน้าแรกรถ</Text>
      
      {/*<Button
        title="Firebase"
        onPress={() => navigation.navigate("Firebase")}
        />
      */}

    </View>

  );
}


export default HomeCarScreen;

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