import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const CarScreen = () => {
  const [car, setCar] = useState();
  const fetchCar = async () => {
    const list = [];
    await firestore()
      .collection('Car')
      .where('carName', '==', 'TOYOTA')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const {
            carName,
            carRegistration,
          } = doc.data();
          list.push({
            carName: carName,
            carRegistration:carRegistration,
          });
        });
      });
  };
  useEffect(() => {
    fetchCar();
  }, []);
  return (
    <View>
      <Text>{car}</Text>
    </View>
  );
};
export default CarScreen;

