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
import GasCard from '../components/GasCard';
import firestore from '@react-native-firebase/firestore';


const DetailsCar = (props) => {
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
      
      //.orderBy('GasDate', 'desc')
      
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
    <Tabs>
      <Tab heading="Home">
        <View style = {styles.container}>
        <ScrollView>
        

          <Card style = {styles.Gas}>
          <Text style = {styles.TextCen}>รายการบันทึกเติมเชื้อเพลิงล่าสุด</Text>
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
          <Card style = {styles.transparent}>
            <TouchableOpacity>
              <Text style = {styles.Text}onPress={() => { props.navigation.navigate('serviceList',{item: item})}} >แสดงเพิ่มเติม</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style = {styles.Text} onPress={() => { props.navigation.navigate('addgas',{item: item})}}>เพิ่ม</Text>
            </TouchableOpacity>
          </Card>
        </Card>


        
        
      </ScrollView>
    </View>
          </Tab>
          <Tab heading="State">
            <View>
              <Text>Tab 1 content</Text>
            </View>
          </Tab>
    </Tabs>
    
    
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection: 'column',
    backgroundColor: '#707070',
  },
  Gas:{
    flexDirection: 'column',
    backgroundColor: '#242020',
    justifyContent: 'center',
    margin: wp('10%'),
    padding: wp('5%'),
    height: wp('72%')
  },
  TextCen:{
    color: 'white',
    alignSelf: 'center',
    marginHorizontal: wp('17%'),
    marginVertical: wp('2%')
  },
  
  transparent:{
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    flexDirection: 'row',
    elevation: 0
  },
  Text:{
    color: 'white',
    textAlign: 'center',
  },
  contbox:{
    flexDirection: 'column',
    backgroundColor: '#242020',
    justifyContent: 'center',
    margin: 20,
    padding: 35,
    height: 175,
  },


 
  


  

  
  
  
  
});

export default DetailsCar;
