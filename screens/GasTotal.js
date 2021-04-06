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
import GasCard from '../components/GasCardTotal';
import firestore from '@react-native-firebase/firestore';


const GasTotal = (props) => {
  const { user, logout } = useContext(AuthContext);
  const {item}=props.route.params

  console.log("item = ",item);
  
  const [gas, setGas] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleted, setDeleted] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    fetchGas().then(() => {
      setRefreshing(false);
    });
  }, [refreshing]);

  const fetchGas = async () => {
    try {
      const list = [];

      await firestore()
      .collection('Gas')
      .where('CarRegistration','==',item.CarRegistration)
      .orderBy('GasDate', 'desc')
      
      .get()
      .then((querySnapshot) => {
        console.log('Total : ', querySnapshot.size);

          querySnapshot.forEach((doc) => {
            const {
              Raka,
              GasDate,
              
              
            } = doc.data();
            list.push({
              id: doc.id,
              Raka,
              GasDate,
              
            });
          });
        });
      
      const price=list.reduce((prev,cur)=>{
        console.log("Prev>>>>>>",prev);
        console.log("Cur>>>>>>",cur);
        return prev+Number(cur.Raka)
      },0)

      console.log("PRICE>>>>>>>>>>>>>>>>>>>>>",price);

      setGas(list);

      if (loading) {
        setLoading(false);
      }

      console.log('gas: ', gas);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchGas();
  }, []);

  useEffect(() => {
    fetchGas();
    setDeleted(false);
  }, [deleted]);

  


  const ListHeader = () => {
    return null;
  };
  
  return (
    <View style = {styles.container}>
        <ScrollView>
          
          <FlatList 
					
					data={gas}
					numColumns={1}
					keyExtractor={(item) => item.id.toString()}
					renderItem={({item}) => (
            <GasCard item={item}  parentProps={props} />
            
          )}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={ListHeader}
          ListFooterComponent={ListHeader}
          showsVerticalScrollIndicator={false}  
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
				/>   
        </ScrollView>
    </View>
    
    
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection: 'column',
    backgroundColor: "#D9F1F1",
  },
  

});

export default GasTotal;
