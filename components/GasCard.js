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

export const GasCard = (props) => {
  const {item,onDelete, parentProps}=props;
  const {navigation} = parentProps;
  const {user, logout} = useContext(AuthContext);
  
  return (

    
        <Card key={item.id} style = {styles.historybox} >
          <Text style = {styles.TextDate}>{moment(item.GasDate.toDate()).format('MMM Do YY')}</Text>
          
          <Text style = {styles.raka}>{item.Raka}</Text>
          <Text style = {styles.bat}>บาท</Text>
          
        </Card>
    


      
  );
};

export default GasCard;

const styles = StyleSheet.create({
    historybox:{
        height:55,
        flexDirection: 'row',
        backgroundColor: '#707070',
        justifyContent: 'space-between',
      },
      TextDate:{
        color: 'white',
        marginTop:17,
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




