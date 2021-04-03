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

    
     <Card key={item.id} style = {styles.historybox} >
        <Text style = {styles.TextDate}>
        {moment(item.ServiceDate.toDate()).format('MMM Do YY')}
        {'\n'}
        {item.Service} 
        </Text>
     
        
     
      </Card>   
          
          
        
    


      
  );
};

export default ServiceCard;

const styles = StyleSheet.create({
  historybox:{
      height:55,
      flexDirection: 'row',
      backgroundColor: '#707070',
      justifyContent: 'space-between',
    },
    TextDate:{
      color: 'white',
      marginTop:1,
      marginLeft:15,
    },
    raka:{
      color: 'white',
      marginTop: 17,
      marginLeft: 150,
      
    },
    bat:{
      color: 'white',
      marginRight: 30,
      marginTop:17,
      
    },

});




