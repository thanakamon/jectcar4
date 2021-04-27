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

export const MemosCard = (props) => {
  const {item,onDelete, parentProps}=props;
  const {navigation} = parentProps;
  const {user, logout} = useContext(AuthContext);
  console.log("jj",item);
  return (

    <TouchableOpacity  key={item.id} style={{backgroundColor:item.color, borderRadius: 10,
      margin: 13,
      flex: 1,  }} 
    onPress={() => { navigation.navigate('detailsMemos',{item: item}) }}
    onLongPress={() => onDelete(item.id)}
      >
        <View style={{
            borderRadius: 10, 
            padding: 15,
            
            }}>
        <Text style={styles.date}>
            {item.category}
        </Text>
        
        <Text numberOfLines={1} style={styles.title}>
            {item.Title.toUpperCase()}
        </Text>
        
        

        <Text numberOfLines={2}  style={styles.note}>
              {item.MemosDetails}
        </Text>
        
        </View> 
    </TouchableOpacity>
      
  );
};

export default MemosCard;

const styles = StyleSheet.create({
  date: {
      color: 'black',
      fontSize: 15,
      fontWeight: 'bold',
      alignSelf: 'flex-end'
  },
  title: {
    color: 'black',
    fontSize: 23,
    fontWeight: 'bold',
    marginTop: 10,
  },
  note: {
      color: 'black',
      marginTop: 10,
      fontSize: 17,
      fontWeight: 'bold',
  }
})




