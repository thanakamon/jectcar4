import React, { Component,useContext } from "react";
import { View, Text, StyleSheet,TouchableOpacity,Image,ScrollView } from "react-native";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import SimpleLineIconsIcon from "react-native-vector-icons/SimpleLineIcons";
import { AuthContext } from '../navigation/AuthProvider';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {showNotification,
   handScheduleNotification ,
    handCancel
  } from '../components/NoficationCar.android';


const HomeScreen = (props) => {
  const { user, logout } = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <ScrollView>
    <Image 
        source={require('../assets/logoo2.png')}
        style={styles.logo}
      />
      
      
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D9F1F1"
  },
  logo: {
    width: "85%",
    alignSelf:'center',
    marginTop: -620,
    resizeMode: "contain"
  },
  group: {
    marginTop: -610,
    alignSelf:'center'
  },
  button: {
    width: wp('80%'),
    height: hp('13%'),
    backgroundColor: "#C3DDE0",
    borderRadius:13,
    flexDirection:'row'
  },
  icon: {
    color: "rgba(128,128,128,1)",
    display:'flex',
    fontSize: 65,
    marginLeft: 15,
    alignSelf:'center'
  },
  button2: {
    width: wp('80%'),
    height: hp('13%'),
    backgroundColor: "#C3DDE0",
    borderRadius:13,
    marginTop: 15,
    flexDirection:'row',
    alignSelf:'center'
  },
  icon2: {
    color: "rgba(128,128,128,1)",
    display:'flex',
    fontSize: 65,
    marginLeft: 15,
    alignSelf:'center'
    
  }
});

export default HomeScreen;