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
import {Card} from 'native-base'
export const ServiceCard = (props) => {
  const {item,onDelete, parentProps}=props;
  const {navigation} = parentProps;
  const {user, logout} = useContext(AuthContext);
  
  return (

    
     <TouchableOpacity key={item.id} style = {styles.historybox}
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

export default ServiceCard;

const styles = StyleSheet.create({
  historybox:{
      height:55,
      flexDirection: 'row',
      backgroundColor: '#fff',
      justifyContent: 'space-between',
      borderRadius:10,
      marginBottom:11,
    },
    TextDate:{
      color: 'black',
      marginTop:9,
      marginLeft:15,
    },
    

});





