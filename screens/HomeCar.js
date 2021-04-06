import React, {useEffect, useState,useContext,useCallback} from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Alert,
  RefreshControl,
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
  const [refreshing, setRefreshing] = useState(false);
  
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    fetchCar().then(() => {
      setRefreshing(false);
    });
  }, [refreshing]);

  const fetchCar = async () => {
    try {
      const list = [];

      await firestore()
      .collection('Car')
      .where('email','==',user.email)
      .orderBy('Time', 'desc')
      .get()
      .then((querySnapshot) => {
        console.log('Total : ', querySnapshot.size);

          querySnapshot.forEach((doc) => {
            const {
              Brand,
              CarRegistration,
              img,
              Insurance,
              Tax,
              DateFirst,
              Repayment,
              Installment,
              
              
            } = doc.data();
            list.push({
              id: doc.id,
              Brand,
              CarRegistration,
              img,
              Insurance,
              Tax,
              DateFirst,
              Repayment,
              Installment,
              
              
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

  const handleDelete = (carId) => {
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
          onPress: () => deleteCar(carId),
        },
      ],
      {cancelable: false},
    );
  };

  const deleteCar = (carId) => {
    console.log('Current Memos Id: ', carId);

    firestore()
      .collection('Car')
      .doc(carId)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          const {carImg} = documentSnapshot.data();

          if (carImg != null) {
            const storageRef = storage().refFromURL(carImg);
            const imageRef = storage().ref(storageRef.fullPath);

            imageRef
              .delete()
              .then(() => {
                console.log(`${carImg} has been deleted successfully.`);
                deleteFirestoreData(carId);
              })
              .catch((e) => {
                console.log('Error while deleting the image. ', e);
              });
            // If the post image is not available
          } else {
            deleteFirestoreData(carId);
          }
        }
      });
  };

  const deleteFirestoreData = (carId) => {
    firestore()
      .collection('Car')
      .doc(carId)
      .delete()
      .then(() => {
        Alert.alert(
          'Memos deleted!',
          'Your Memos has been deleted successfully!',
        );
        setDeleted(true);
      })
      .catch((e) => console.log('Error deleting posst.', e));
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
          <ScrollView 
           refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
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
          </ScrollView>
        </Container>
        
      )}
    </SafeAreaView>
  );
};

export default HomeCar;
