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
import {Card} from 'native-base'

export const GasCardTotal = (props) => {
  const {item,onDelete, parentProps}=props;
  const {navigation} = parentProps;
  const {user, logout} = useContext(AuthContext);
  
  return (

    
        <TouchableOpacity key={item.id} style = {styles.historybox} >
          <Text style = {styles.TextDate}>{moment(item.GasDate.toDate()).format('MMM Do YY')}</Text>
          
          <Text style = {styles.raka}>{item.Raka}</Text>
          <Text style = {styles.bat}>THB</Text>
          
        </TouchableOpacity>
    


      
  );
};

export default GasCardTotal;

const styles = StyleSheet.create({
    historybox:{
        height:55,
        flexDirection: 'row',
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        borderRadius: 10,
        marginBottom :11,
      },
      TextDate:{
        color: 'black',
        marginTop:17,
        marginLeft:15,
      },
      raka:{
        color: 'black',
        marginTop: 17,
        marginLeft: 150,
        
      },
      bat:{
        color: 'black',
        marginRight: 30,
        marginTop:17,
        
      },

});




