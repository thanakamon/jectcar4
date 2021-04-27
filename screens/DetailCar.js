import React, { useState, useContext, useEffect, useCallback } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  Image,
} from 'react-native';
import { Header, Card, Container, Body, Title, Tabs, Tab, List, Icon } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AuthContext } from '../navigation/AuthProvider';
import GasCard from '../components/GasCard';
import firestore from '@react-native-firebase/firestore';
import ServiceCard from '../components/ServiceCard';
import moment from 'moment';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const DetailsCar = (props) => {
  const { user, logout } = useContext(AuthContext);
  const { item } = props.route.params
  const [service, setService] = useState(null);
  const [kilo, setKilo] = useState();
  const [gas, setGas] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleted, setDeleted] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0)
  const [totalService, setTotalService] = useState(0);
  const [itemDate, setitemDate] = useState({ ...item, diff: moment(item.Insurance).diff(moment(), "days") });
  const [itemBaterry, setitemBaterry] = useState({});
  const [Total, setTotal] = useState(0);

  //console.log("Betttt",list1);
  useEffect(() => {
    setTotal(totalPrice + totalService);
  }, [totalPrice, totalService])

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    fetchGas().then(() => {
      setRefreshing(false);
    });
    fetchService().then(() => {
      setRefreshing(false);
    });
  }, [refreshing]);

  const fetchGas = async () => {
    try {
      const list = [];

      await firestore()
        .collection('Gas')
        .where('CarRegistration', '==', item.CarRegistration)

        .orderBy('GasDate', 'desc')

        .get()
        .then((querySnapshot) => {
          //console.log('Total : ', querySnapshot.size);

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
      setTotalPrice(list.reduce((prev, cur) => {
        //console.log("Prev>>>>>>",prev);
        //console.log("Cur>>>>>>",cur);
        return prev + Number(cur.Raka)
      }, 0))

      setGas(list);

      if (loading) {
        setLoading(false);
      }

      //console.log('gas: ', gas);
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

  const fetchService = async () => {
    try {
      const list1 = [];

      await firestore()
        .collection('Service')
        .where('CarRegistration', '==', item.CarRegistration)

        .orderBy('ServiceDate', 'desc')
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
            list1.push({
              id1: doc.id,
              Cost: Cost,
              Note: Note,
              Receipt: Receipt,
              Service: Service,
              ServiceDate: ServiceDate,
              ServiceProvider: ServiceProvider,
              TotalKilo: TotalKilo,


            });
          });
        });
      setTotalService(list1.reduce((ser, vice) => {
        //console.log("Prev>>>>>>",prev);
        //console.log("Cur>>>>>>",cur);
        return ser + Number(vice.Cost)
      }, 0))


      setKilo(list1[0].TotalKilo);
      setitemBaterry({ ...list1, diff: moment(list1[0].ServiceDate).add(1, 'Y').add(8, 'M').diff(moment(), 'days') })
      setService(list1);
      console.log(list1[0].TotalKilo);

      if (loading) {
        setLoading(false);
      }

      //console.log('gas: ', service);
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
    <Tabs>
      <Tab heading="Home">
        <View style={styles.container}>

          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }
          >

            <Card style={styles.contbox}>
              
              <View style={styles.Card}>
                <View style={{ flexDirection: 'row' }}>
                  <View>
                    <Icon style={styles.icon}
                      name='car' />
                  </View>
                  <View>
                    <Text style={styles.brand}>{item.Brand}</Text>
                    <Text style={styles.CarRegistration}>{item.CarRegistration}</Text>
                  </View>
                </View>
                <View>
                  <Text style={styles.dateTax1}>Expiration date</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <View>
                    <AnimatedCircularProgress style={styles.pro1}
                      size={95}
                      width={17}
                      fill={200 * 100 / 365}
                      tintColor="green"
                      onAnimationComplete={() => console.log('onAnimationComplete')}
                      backgroundColor="red" >
                      {
                        (fill) => (
                          <Text >
                            {itemDate.diff} Day
                          </Text>
                        )
                      }
                    </AnimatedCircularProgress>
                  </View>
                  <View>
                    <AnimatedCircularProgress style={styles.pro2}
                      size={95}
                      width={17}
                      fill={450 * 100 / 630}
                      tintColor="green"
                      onAnimationComplete={() => console.log('onAnimationComplete')}
                      backgroundColor="red" >
                      {
                        (fill) => (
                          <Text>
                            {itemBaterry.diff} Day

                          </Text>
                        )
                      }
                    </AnimatedCircularProgress>
                  </View>
                  <View>
                    <AnimatedCircularProgress style={styles.pro3}
                      size={95}
                      width={17}
                      fill={kilo * 100 / 60000}
                      tintColor="red"
                      onAnimationComplete={() => console.log('onAnimationComplete')}
                      backgroundColor="green" >
                      {
                        (fill) => (
                          <Text>
                            {kilo}Km
                          </Text>

                        )
                      }
                    </AnimatedCircularProgress>
                  </View>


                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.A}>Tax</Text>
                  <Text style={styles.B}>Battery</Text>
                  <Text style={styles.C}>Break</Text>
                </View>

              </View>
            </Card>


            <Card style={styles.Gas}>
              <Text style={styles.TextCen}>Recent Fuel Logs</Text>
              <FlatList

                data={gas}
                numColumns={1}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <GasCard item={item} parentProps={props} />

                )}
                keyExtractor={(item) => item.id}
                ListHeaderComponent={ListHeader}
                ListFooterComponent={ListHeader}
                showsVerticalScrollIndicator={false}

              />
              <Card style={styles.transparent}>
                <TouchableOpacity>
                  <Text style={styles.Text} onPress={() => { props.navigation.navigate('GasTotal', { item: item }) }} >Show More</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.Text} onPress={() => { props.navigation.navigate('addgas', { item: item }) }}>Add</Text>
                </TouchableOpacity>
              </Card>
            </Card>

            <Card style={styles.Gas}>
              <Text style={styles.TextCen}>Recent Maintenance Logs</Text>
              <FlatList

                data={service}
                numColumns={1}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <ServiceCard item={item} parentProps={props} />

                )}
                keyExtractor={(item) => item.id}
                ListHeaderComponent={ListHeader}
                ListFooterComponent={ListHeader}
                showsVerticalScrollIndicator={false}

              />
              <Card style={styles.transparent}>
                <TouchableOpacity>
                  <Text style={styles.Text} onPress={() => { props.navigation.navigate('ServiceTotal', { item: item }) }} >Show More</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.Text} onPress={() => { props.navigation.navigate('addService', { item: item }) }}>Add</Text>
                </TouchableOpacity>
              </Card>
            </Card>




          </ScrollView>
        </View>
      </Tab>
      <Tab heading="Stat">
        <View style={styles.Brand}>
          <View style={styles.con2}>
            <View style={styles.CarTopic}>
              <Text style={{ fontSize: 25, color: 'black', alignSelf: 'flex-start', marginLeft: 20, }}>{item.Brand}</Text>
              <Text style={{ fontSize: 15, color: 'black', alignSelf: 'flex-start', marginLeft: 20 }}>{item.CarRegistration}</Text>
            </View>
            <View style={styles.Brand2}>
              <View style={styles.CardDetail}>
                <Text style={{ fontSize: 18, color: 'black' }}>Fuel</Text>
                <Text style={{ fontSize: 18, color: 'black' }}>{totalPrice}</Text>
              </View>
              <View style={styles.CardDetail}>
                <Text style={{ fontSize: 18, color: 'black' }}>Maintenance</Text>
                <Text style={{ fontSize: 18, color: 'black' }}>{totalService}</Text>
              </View>
              <View style={{ alignSelf: 'flex-end', flexDirection: 'row', fontSize: 20, marginTop: hp('3%') }}>
                <Text style={{ marginHorizontal: wp('3%'), fontSize: 20, color: 'black', marginBottom: 10 }}>Total</Text>
                <Text style={{ marginHorizontal: wp('3%'), fontSize: 20, color: 'black', marginBottom: 10 }}>{Total}</Text>
                <Text style={{ marginHorizontal: wp('3%'), fontSize: 20, color: 'black', marginBottom: 10 }}>THB</Text>
              </View>
            </View>
          </View>
        </View>
      </Tab>



    </Tabs>


  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#707070',
  },
  icon:{
    fontSize:110,
    color:'#D35400'
  },
  brand: {
    fontSize: 30,
    marginLeft: '10%',
    marginTop: 15
  },
  CarRegistration: {
    fontSize: 18,
    marginLeft: '10%',
  },
  dateTax1: {
    fontSize:25,
    marginBottom: 15,
    borderBottomColor: 'black',
    borderBottomWidth: 3,
  },
  Tax: {
    fontSize: 20,
    marginLeft: '10%',
  },
  pro1: {
    marginLeft: 20,
  },
  pro2: {
    marginLeft: 20
  },
  pro3: {
    marginLeft: 20
  },
  proText: {
    fontSize: 16,
  },
  A: {
    fontSize: 16,
    marginLeft: 55
  },
  B: {
    fontSize: 16,
    marginLeft: 80
  },
  C: {
    fontSize: 16,
    marginLeft: 70

  },
  img1: {
    display: 'flex',
    height: hp('12%'),
    width: wp('26%'),
    marginLeft: wp('0.4%'),
    borderRadius: 18,
    borderWidth: 1,
    marginTop: hp('2%')
  },
  space: {
    margin: 25
  },
  progressbox: {
    flexDirection: 'row',
    backgroundColor: '#D9F1F1',
    borderColor: 'transparent',
    elevation: 0
  },
  cirpro: {
    backgroundColor: '#242020',
  },
  con2: {
    borderRadius: 20,
    width: '90%',
    marginTop: 20,
    alignSelf: 'center',
    backgroundColor: 'white'

  },
  Gas: {
    flexDirection: 'column',
    backgroundColor: '#D9F1F1',
    justifyContent: 'center',
    alignSelf: 'center',
    width: '95%',
    margin: wp('1%'),
    padding: wp('5%'),
    height: wp('78%'),
    borderRadius: 10,
    marginTop: 10,
  },
  jimmy: {
    flexDirection: 'column',
    backgroundColor: '#D9F1F1',
    justifyContent: 'center',
    alignSelf: 'center',
    width: '95%',
    margin: wp('1%'),
    padding: wp('5%'),
    height: wp('78%'),
    borderRadius: 10,
    marginTop: 10,
  },
  TextCen: {
    color: 'black',
    alignSelf: 'center',
    marginBottom: 16,
    fontSize: 25,
  },
  TextCen1: {
    color: 'black',
    alignSelf: 'center',
    fontSize: 25,
  },
  TextCarRe: {
    color: 'black',
    alignSelf: 'center',
    fontSize: 15,
    marginBottom: 10,
  },

  transparent: {
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    flexDirection: 'row',
    elevation: 0
  },
  Text: {
    color: 'black',
    textAlign: 'center',
    fontSize: 16,
  },
  Text5: {
    color: 'black',
    marginLeft: 25,
    textAlign: 'center',
    fontSize: 16,
  },
  contbox: {
    flexDirection: 'column',
    backgroundColor: '#D9F1F1',
    justifyContent: 'center',
    alignSelf: 'center',
    width: '95%',
    margin: wp('1%'),
    padding: wp('5%'),
    borderRadius: 10
  },
  Brand: {
    backgroundColor: "#D9F1F1",
    flex: 1
  },
  Brand2: {
    backgroundColor: 'white',
    width: wp('90%'),
    alignSelf: 'center',
    borderRadius: 20
  },
  CarTopic: {
    borderRadius: 20,
    justifyContent: 'space-between',
    flexDirection: 'column',
    height: hp('8%'),
    width: wp('90%'),
    marginTop: 10,
    marginHorizontal: wp('9%'),
    backgroundColor: 'white',
    paddingBottom: wp('1%'),
    alignSelf: 'center'
  },
  CardDetail: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginVertical: wp('5%'),
    marginHorizontal: wp('9%'),
    borderBottomWidth: 1,
    paddingBottom: wp('1%'),
    color: 'white',
    borderBottomColor: '#808080'
  },












});

export default DetailsCar;
