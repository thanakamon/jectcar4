import React, {useContext, useState} from 'react';
import {View, Text, TouchableOpacity, Switch, StyleSheet, Alert} from 'react-native';
import FormInput from '../components/FormInputAddcar';
import FormButton from '../components/FormButton';
import {AuthContext} from '../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import DatePicker from 'react-native-datepicker';


const Addcar = (props) => {
  
  const {user, logout} = useContext(AuthContext);
  const [brand, setBrand] = useState();
  const [model, setModel] = useState();
  const [carregis, setCarregis] = useState();
  const [datetax, setDateTaxt] = useState();
  const [dateins, setDateIns] = useState();
  const [datefirst, setDateFirst] = useState();

  const Create = async () => {
    firestore()
    .collection('Car')
    .add({
      name : user.displayName,
      email: user.email,
      Brand : brand,
      Model : model,
      CarRegistration : carregis,
      Insurance : dateins,
      Tax : datetax,
      DateFirst : datefirst,
      Time: firestore.Timestamp.fromDate(new Date()),
    })
    .then(() => {
      console.log('Success');
      Alert.alert(
        'บันทึกกกก',
        'บันทึกสำเร็จ',
        
      );
      setBrand(null);
      setModel(null);
      setCarregis(null);
      setDateIns(null);
      setDateTaxt(null);
      setDateFirst(null);
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
        onChangeText={(content) => setBrand(content)}
      />
      <FormInput
        placeholderText="Model"
        value={model}
        onChangeText={(content) => setModel(content)}
        
      />
      <FormInput
        placeholderText="Car registration"
        value={carregis}
        onChangeText={(content) => setCarregis(content)}
        
      />
      <DatePicker
          style={styles.datePickerStyle}
          date={dateins} // Initial date from state
          mode="date" // The enum of date, datetime and time
          placeholder="Insurance expiration date"
          format="DD-MM-YYYY"
          minDate="01-01-2020"
          maxDate="01-01-2030"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              //display: 'none',
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0,
            },
            dateInput: {
              marginLeft: 36,
            },
          }}
          onDateChange={(date) => {
            setDateIns(date);
          }}
        />
        <DatePicker
          style={styles.datePickerStyle}
          date={datetax} // Initial date from state
          mode="date" // The enum of date, datetime and time
          placeholder="Tax expiration date"
          format="DD-MM-YYYY"
          minDate="01-01-2020"
          maxDate="01-01-2030"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              //display: 'none',
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0,
            },
            dateInput: {
              marginLeft: 36,
            },
          }}
          onDateChange={(date) => {
            setDateTaxt(date);
          }}
        />
      
      <View >
        <Text style={styles.TCar} >กรณีผ่อนรถ</Text>
      </View>

      <DatePicker
          style={styles.datePickerStyle}
          date={datefirst} // Initial date from state
          mode="date" // The enum of date, datetime and time
          placeholder="วันที่ชำระงวดแรก"
          format="DD-MM-YYYY"
          minDate="01-01-2020"
          maxDate="01-01-2030"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              //display: 'none',
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0,
            },
            dateInput: {
              marginLeft: 36,
            },
          }}
          onDateChange={(date) => {
            setDateFirst(date);
          }}
        />
      <FormInput
        placeholderText="จำนวนงวด"
        iconType="user"
        keyboardType="number"
        
      />
      <FormInput
        placeholderText="ค่างวด"
        iconType="user"
        keyboardType="email-address"
        
      />
      <FormButton onPress={Create}
        buttonTitle="Create" 
        //onPress={() => { props.navigation.navigate('CarMaintenance') }} 
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
  datePickerStyle: {
    width: '100%',
    marginTop: 5,
    marginBottom: 5,
    borderColor: '#ccc',
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: '#fff',
    
  },
  
});
