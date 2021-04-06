import React, {useContext} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { 
  TouchableOpacity,
  View, 
  Text, 
  StyleSheet,  
} from "react-native";
import { AuthContext } from '../navigation/AuthProvider';
import moment from 'moment';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const ServiceCardTotal = (props) => {
  const {item,onDelete, parentProps}=props;
  const {navigation} = parentProps;
  const {user, logout} = useContext(AuthContext);
  
  return (

    <TouchableOpacity 
      key={item.id} 
      style = {styles.container}
      onPress={() => { navigation.navigate('detailService', {item: item}) }}
       >
          <Text style = {styles.TextDate}>
        {moment(item.ServiceDate.toDate()).format('MMM Do YY')}
        {'\n'}
        {item.Service} 
        </Text>
    </TouchableOpacity> 
        
          
          
        
    


      
  );
};
export default ServiceCardTotal;
const styles = StyleSheet.create({
    container:{
        height:hp('10%'),
        width: wp('91%'),
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius:10,
        justifyContent: 'space-between',
        marginTop: 10,
        marginLeft : 15,
        
      },
      TextDate:{
        color: 'black',
        marginTop:21,
        marginLeft:15,
      },
      raka:{
        color: 'black',
        marginTop: 29,
        marginLeft: 150,
        
      },
      bat:{
        color: 'black',
        marginRight: 30,
        marginTop:29,
        
      },

});




