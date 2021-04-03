import React, { useState,useContext,useEffect,useCallback } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from 'react-native';
import { Header, Card, Container, Body, Title, Tabs, Tab } from 'native-base';
import AnimatedProgressWheel from 'react-native-progress-wheel';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { AuthContext } from '../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';

import ServiceCardTotal from '../components/ServiceCardTotal';


const ServiceTotal = (props) => {
  const { user, logout } = useContext(AuthContext);
  const {item}=props.route.params

  console.log("item = ",item);
  
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleted, setDeleted] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    fetchService().then(() => {
      setRefreshing(false);
    });
  }, [refreshing]);

  const fetchService = async () => {
    try {
      const list = [];

      await firestore()
      .collection('Service')
      .where('CarRegistration','==',item.CarRegistration)
      
      //.orderBy('GasDate', 'desc')
      
      .get()
      .then((querySnapshot) => {
        console.log('Total : ', querySnapshot.size);

          querySnapshot.forEach((doc) => {
            const {
              Cost,
              Note,
              Receipt,
              Service,
              ServiceDate,
              ServiceProvider,
              TotalKilo,
              
              
            } = doc.data();
            list.push({
              id1: doc.id,
              Cost: Cost,
              Note: Note,
              Receipt: Receipt,
              Service: Service,
              ServiceDate:ServiceDate,
              ServiceProvider: ServiceProvider,
              TotalKilo: TotalKilo,
              
            });
          });
        });

      setService(list);

      if (loading) {
        setLoading(false);
      }

      console.log('gas: ', service);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchService();
  }, []);

  useEffect(() => {
    fetchService();
    setDeleted(false);
  }, [deleted]);


  const ListHeader = () => {
    return null;
  };
  
  return (
    <View style = {styles.container}>
        <ScrollView refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }>
          <Text style = {styles.TextGas}>รายการบันทึกการซ่อมล่าสุด</Text>
          <FlatList 
					
					data={service}
					numColumns={1}
					keyExtractor={(item) => item.id.toString()}
					renderItem={({item}) => (
            <ServiceCardTotal item={item}  parentProps={props} />
            
          )}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={ListHeader}
          ListFooterComponent={ListHeader}
          showsVerticalScrollIndicator={false}  
          
				/>
        </ScrollView>
    </View>
    
    
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  TextGas:{
    color: 'red',
    fontSize: 20,
    alignSelf: 'center',
    marginHorizontal: wp('17%'),
    marginVertical: wp('2%')
  },

});

export default ServiceTotal;
