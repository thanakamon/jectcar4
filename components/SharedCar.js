import React, {useContext,Component} from 'react';
import { Text, Image, View, StyleSheet, TouchableOpacity } from "react-native";
import { AuthContext } from '../navigation/AuthProvider';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
const SharedCar = (props) => {
  const {item, onDelete,parentProps}=props;
  const {navigation} = parentProps;
  const {user, logout} = useContext(AuthContext);
  console.log(item.img)
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
                <Text style = {{fontSize:20,marginTop:('15%')}} >Brand: {item.Brand}</Text>
                <Text style = {{fontSize:14,marginTop:hp('0.5%')}}>Registration: {item.CarRegistration}</Text>
                <View style = {styles.vc}>
                  <Text style = {styles.created}>
                    Created by 
                  </Text>
                  <Text style = {styles.email}>
                    {item.email}
                  </Text>
                </View>
              </View>
          </View>
         
        </View>
  </TouchableOpacity>
      </>  
  );
};

export default SharedCar;

const styles = StyleSheet.create({
  Card:{
    height:hp('18%'),
    width: wp('90%'),
    borderRadius: 15,
    marginTop: hp('1.8%'),
    backgroundColor: 'white',
  },
  img:{
    height:hp('13%'),
    width:wp('29%'),
    marginTop:hp('2.8%'),
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
  vc:{
    alignSelf:'flex-start',
    marginTop:hp('2%'),
  },
  created:{
    alignSelf:'flex-start',
    
    fontSize:12,
    color:'#808080',
    marginRight: 20,
  },
  email:{
    alignSelf:'flex-end',
    fontSize:12,
    color:'#808080',
    
  }
})