import React, {useContext,Component} from 'react';
import { Text, Image, View, StyleSheet, TouchableOpacity } from "react-native";
import { AuthContext } from '../navigation/AuthProvider';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
const CarCard = (props) => {
  const {item, onDelete,parentProps}=props;
  const {navigation} = parentProps;
  const {user, logout} = useContext(AuthContext);

  return (
    <>
    <TouchableOpacity key={item.id} 
      onPress={() => { navigation.navigate('detialCar', {item: item}) }}
      onLongPress={() => onDelete(item.id)}
       >
        <View style = {styles.Card}>
          <View style = {{flexDirection:'row'}}>
              <View>
                <Image style ={styles.img} 
                //defaultSource={{uri:user.PhotoURL}}
                source={{ uri: item.img }}/>
              </View>
              <View style = {styles.carregis} >
                <Text style = {{fontSize:20,marginBottom:hp('1.5%')}} >Brand: {item.Brand}</Text>
                <Text style = {{fontSize:14}}>Registration: {item.CarRegistration}</Text>
              </View>
          </View>
        </View>
  </TouchableOpacity>
      </>

  

    
  );
};

export default CarCard;

const styles = StyleSheet.create({
  Card:{
    height:hp('22%'),
    width: wp('90%'),
    borderRadius: 15,
    marginTop: hp('1.8%'),
    backgroundColor: 'white',
  },
  img:{
    height:hp('15%'),
    width:wp('30%'),
    marginTop:hp('3%'),
    marginLeft:wp('5%'),
    alignSelf:'flex-start',
    borderRadius: 40,
    borderWidth: 1
  },
  carregis:{
    alignSelf:'center',
    marginLeft:wp('9%'),
    marginTop:hp('0%'),
  },
  author:{
    alignSelf:'flex-end',
    fontSize:12,
    color:'#808080'
  }
})