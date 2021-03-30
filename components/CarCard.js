import React, {useContext,Component} from 'react';
import { TouchableOpacity } from "react-native";
import { Text, Image, View } from "react-native";
import { AuthContext } from '../navigation/AuthProvider';
import { styles } from "../styles/HomeCar";
import { NavigationContainer } from "@react-navigation/native";

const CarCard = (props) => {
  const {item, onDelete,parentProps}=props;
  const {navigation} = parentProps;
  const {user, logout} = useContext(AuthContext);

  return (
    <>
    <TouchableOpacity key={item.id}  style={styles.card} 
      onPress={() => { navigation.navigate('detialCar', {item: item}) }}
      onLongPress={() => onDelete(item.id)}
       >
        <View style={{ flexDirection: "row" }}>
          <View style={styles.cardImage}>
            <Image
              style={{ width: "100%", height: "100%", borderRadius: 20 }}
              source={{uri: user.photoURL}}
            />
          </View>
          <View style={{ flex: 0.6, marginHorizontal: 12, overflow: "hidden" }}>
            <Text style={styles.cardTitle}>{item.Brand}</Text>
            
            <Text style={styles.cardDescription}>{item.CarRegistration}</Text>
          </View>
        </View>
  </TouchableOpacity>
      </>

  

    
  );
};

export default CarCard;