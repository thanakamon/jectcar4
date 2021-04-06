import React, {useState, useContext,Component} from 'react';
import { Platform, StyleSheet, Text, View, TextInput, ToastAndroid,Button } from "react-native";
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
        Raka: Number(raka),
        

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
        <View style={styles.container2}>
        <Text style={styles.headerText}>
         Miles
        </Text>
        <TextInput
          style={styles.InputText}
          underlineColorAndroid ='transparent'
          keyboardType= "numeric"
          value={miles}
          onChangeText={(content) => setMiles(content)}
        />
        
         <Text style={styles.headerText}>
         Cost
        </Text>
        <TextInput
          style={styles.InputText}
          underlineColorAndroid="transparent"
          keyboardType= "numeric"
          value={raka}
          onChangeText={(content) => setRaka(content)}
        />
        <View style={styles.btn}>
        <Button  
          
            title="   Save"
            onPress={() => { submitGas();  props.navigation.navigate('detialCar') }}
        />
        </View>
        </View>
      </View>
 
      );
    };
export default AddGas;

const styles = StyleSheet.create({
  headerText: {
    fontSize: 22,
    textAlign: "left",
    margin: 10,
    fontWeight: "bold"
    
  },
  container: {
    flex: 1,
    borderRadius : 15,
    backgroundColor: "#D9F1F1"
  },
  container2: {
    margin:20,
    borderRadius : 15,
    backgroundColor: "#fff"
  },
  InputText: {
    height: 40,
    width: "80%", 
    borderColor: 'gray', 
    borderWidth: 1, 
    marginTop: 10  ,
    marginBottom: 20  ,
    textAlign: 'center',
    marginLeft: 40,
    
  },
  btn: {
    width :'30%',
    marginTop: 40,
    marginBottom: 20  ,
   
    alignSelf:'center'
  },
});
