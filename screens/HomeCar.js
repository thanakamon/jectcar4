import React, {useEffect, useState,useContext} from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Alert,
} from 'react-native';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import CarCard from '../components/CarCard';
import firestore from '@react-native-firebase/firestore';
import {Container} from '../styles/HomeCar';
import {AuthContext} from '../navigation/AuthProvider';

const HomeCar = (props) => {
  const {user, logout} = useContext(AuthContext);

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleted, setDeleted] = useState(false);

  const fetchCar = async () => {
    try {
      const list = [];

      await firestore()
      .collection('Car')
      .where('email','==',user.email)
      //.orderBy('Time', 'desc')
      .get()
      .then((querySnapshot) => {
        console.log('Total : ', querySnapshot.size);

          querySnapshot.forEach((doc) => {
            const {
              Brand,
              CarRegistration,
              
              
            } = doc.data();
            list.push({
              id: doc.id,
              Brand,
              CarRegistration,
              
              
            });
          });
        });

      setCar(list);

      if (loading) {
        setLoading(false);
      }

      console.log('Car: ', car);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchCar();
  }, []);

  useEffect(() => {
    fetchCar();
    setDeleted(false);
  }, [deleted]);

  const handleDelete = (postId) => {
    Alert.alert(
      'Delete post',
      'Are you sure?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed!'),
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => deletePost(postId),
        },
      ],
      {cancelable: false},
    );
  };

  const ListHeader = () => {
    return null;
  };
  return (
    <SafeAreaView style={{flex: 1, }}>
      {loading ? (
        <ScrollView
          style={{flex: 1}}
          contentContainerStyle={{alignItems: 'center'}}>
          <SkeletonPlaceholder>
            
            <View style={{marginTop: 10, marginBottom: 30}}>
              <View
                style={{marginTop: 10, width: 350, height: 120, borderRadius: 4,borderRadius: 20}}
              />
              <View
                style={{marginTop: 10, width: 350, height: 120, borderRadius: 4,borderRadius: 20}}
              />
              <View
                style={{marginTop: 10, width: 350, height: 120, borderRadius: 4,borderRadius: 20}}
              />
            </View>
          </SkeletonPlaceholder>
          
        </ScrollView>
      ) : (
        
        <Container>
          <FlatList 
            data={car}
            renderItem={({item}) => (
              <CarCard  item={item}  onDelete={handleDelete} parentProps={props}/>
            )}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={ListHeader}
            ListFooterComponent={ListHeader}
            showsVerticalScrollIndicator={false}
          />
        </Container>
        
      )}
    </SafeAreaView>
  );
};

export default HomeCar;
