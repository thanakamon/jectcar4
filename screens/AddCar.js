import React, {useContext, useState} from 'react';
import {View, Text, TouchableOpacity, Switch, StyleSheet} from 'react-native';
import FormInput from '../components/FormInputAddcar';
import FormButton from '../components/FormButton';
import {AuthContext} from '../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';

const Addcar = ({navigation}) => {
  const {user, logout} = useContext(AuthContext);
  const [brand, setBrand] = useState();

  const Create = async () => {
    firestore()
    .collection('Car')
    .add({
      user: user.email,
      Brand : brand,
      
    })
    .then(() => {
      console.log('Post Added!');
      Alert.alert(
        'บันทึกกกก',
        'บันทึกสำเร็จ',
      );
      setBrand(null);
    })
    .catch((error) => {
      console.log('Something went wrong with added post to firestore.', error);
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Add Car</Text>

      <FormInput
        placeholderText="Brand"
        value={brand}
        iconType="user"
      />
      <FormInput
        placeholderText="Model"
        iconType="user"
        
      />
      <FormInput
        placeholderText="Car registration"
        iconType="user"keyboardType="email-address"
        
      />
      <FormInput
        placeholderText="Insurance expiration date"
        iconType="user"
        
      />
      <FormInput
        placeholderText="Tax expiration date"
        iconType="user" 
      />

      <View >
        <Text style={styles.TCar} >กรณีผ่อนรถ</Text>
      </View>

      <FormInput
        placeholderText="วันที่ชำระงวดแรก"
        iconType="user"
        keyboardType="email-address"
        
      />
      <FormInput
        placeholderText="จำนวนงวด"
        iconType="user"
        keyboardType="email-address"
        
      />
      <FormInput
        placeholderText="ค่างวด"
        iconType="user"
        keyboardType="email-address"
        
      />
      <FormButton onPress={Create}
        buttonTitle="Create"  
      />
    </View>
  );
};

export default Addcar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9fafd',
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  text: {
    fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 28,
    marginBottom: 10,
    color: '#051d5f',
    textAlign:"center"
  },
  navButton: {
    marginTop: 15,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2e64e5',
    fontFamily: 'Lato-Regular',
  },
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 35,
    justifyContent: 'center',
  },
  color_textPrivate: {
    fontSize: 13,
    fontWeight: '400',
    fontFamily: 'Lato-Regular',
    color: 'grey',
  },
  TCar:{
      fontFamily: 'Kufam-SemiBoldItalic',
      marginTop:15,
      marginBottom:15,
      fontSize : 18,
      fontWeight: 'bold'
  },
  
  
});
