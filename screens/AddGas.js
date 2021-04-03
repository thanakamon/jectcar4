import React, {useState, useContext,Component} from 'react';
import { Platform, StyleSheet, Text, View, TextInput, ToastAndroid } from "react-native";
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../navigation/AuthProvider';


const  AddGas = (props)=> {
    const {item}=props.route.params
    const {user, logout} = useContext(AuthContext);
    const [miles, setMiles] = useState(null);
    const [raka, setRaka] = useState();
    
    
    console.log("item=",item);
    const submitGas = async () => {
  
      firestore()
      .collection('Gas')
      .add({
        CarRegistration : item.CarRegistration,
        GasDate: firestore.Timestamp.fromDate(new Date()),
        Miles: miles,
        Raka: raka,
        

      })
      .then(() => {
        console.log('Post Added!');
        Alert.alert(
          'Saved',
          'Suscess',
        );
        setMiles(null);
        setRaka(null);
        
      })
      .catch((error) => {
        console.log('Something went wrong with added post to firestore.', error);
      });
    }
    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>
         ไมล์สะสม
        </Text>
        <TextInput
          style={styles.InputText}
          underlineColorAndroid ='transparent'
          keyboardType= "numeric"
          value={miles}
          onChangeText={(content) => setMiles(content)}
        />
        
         <Text style={styles.headerText}>
         ค่าใช้จ่าย
        </Text>
        <TextInput
          style={styles.InputText}
          underlineColorAndroid="transparent"
          keyboardType= "numeric"
          value={raka}
          onChangeText={(content) => setRaka(content)}
        />
        <Button
          icon={
            <Icon
            name="save"
            size={30}
            color="#215F80" />
            }
            title="   Save"
         
            type="clear"
            onPress={() => { submitGas();  props.navigation.navigate('detialCar') }}
        />
      </View>
 
      );
    };
export default AddGas;

const styles = StyleSheet.create({
  headerText: {
    fontSize: 18,
    textAlign: "left",
    margin: 10,
    fontWeight: "bold"
    
  },
  container: {
    flex: 1,
    margin: 20 ,
    borderRadius : 15,
    backgroundColor: "#e5e5e5"
  },
  InputText: {
    height: 40,
    width: "60%", 
    borderColor: 'gray', 
    borderWidth: 1, 
    marginTop: 10  ,
    marginBottom: 20  ,
    textAlign: 'center',
    marginLeft: 40,
    
  },
  bnt: {
    width :'60%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20  ,
    marginLeft: 40,
    justifyContent: 'flex-end'
  },
});
