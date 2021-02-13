import React, {useContext, useState} from 'react';
import {View, Text, TouchableOpacity, Switch, StyleSheet} from 'react-native';
import FormInput from '../components/FormInputAddcar';
import FormButton from '../components/FormButton';
import {AuthContext} from '../navigation/AuthProvider';

const SignupScreen = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const {register} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Add Car</Text>

      <FormInput
        placeholderText="Brand"
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
      <FormButton
        buttonTitle="Create"
        
      />

      
    </View>
  );
};

export default SignupScreen;

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
