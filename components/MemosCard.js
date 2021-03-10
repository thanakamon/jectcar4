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

const MemosCard = ({item, onDelete}) => {
  const {user, logout} = useContext(AuthContext);
  
  return (

    <TouchableOpacity  key={item.id} style={styles.parentView} >
        <View style={{
            borderRadius: 10, 
            padding: 15,
            backgroundColor: "#2FC2DF",
            }}>
        <Text style={styles.date}>
            {moment(item.postTime.toDate()).format('DD MMMM')}
        </Text>
        
        <Text numberOfLines={1} style={styles.title}>
            {item.Title}
        </Text>
        
        <Text numberOfLines={5} style={styles.note}>
              {item.MemosDetails}
        </Text>
        
        </View> 
    </TouchableOpacity>
      
  );
};

export default MemosCard;

const styles = StyleSheet.create({
  parentView: {
      borderRadius: 10,
      margin: 13,
      flex: 1,   
  },
  date: {
      color: 'white',
      fontSize: 15,
      fontWeight: 'bold',
      alignSelf: 'flex-end'
  },
  title: {
    color: 'white',
    fontSize: 23,
    fontWeight: 'bold',
    marginTop: 10,
  },
  note: {
      color: 'white',
      marginTop: 10,
      fontSize: 17,
      fontWeight: 'bold',
  }
})




