import React, { Component,useContext } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';



import {Card} from 'native-base'
import AnimatedProgressWheel from 'react-native-progress-wheel';
import { AuthContext } from '../navigation/AuthProvider';

const HomeScreen = (props) => {
  const { user, logout } = useContext(AuthContext);
  return (
    <View style = {styles.container}>
      <Card style = {styles.contbox}>
        <Card style = {styles.progressbox}>
          <AnimatedProgressWheel style = {styles.cirpro}
            size = {80}
            width = {15}
            color = {'lightgreen'}
            progress = {30}
            animateFromValue = {0}
            backgroundColor = {'red'}
          />
          <View style = {styles.space}></View>
          <AnimatedProgressWheel style = {styles.cirpro}
            size = {80}
            width = {15}
            color = {'lightblue'}
            progress = {75}
            animateFromValue = {0}
            backgroundColor = {'red'}
          />
          <View style = {styles.space}></View>
          <AnimatedProgressWheel style = {styles.cirpro}
            size = {80}
            width = {15}
            color = {'orange'}
            progress = {60}
            animateFromValue = {0}
            backgroundColor = {'red'}
          />
        </Card>
        <Card style = {styles.progressbox}>
          <Text style = {styles.Text}>ภาษีสิ้นสุด/วัน</Text>
          <View style = {styles.space}></View>
          <Text style = {styles.Text}> จำนวนงวด{"\n"}คงเหลือ/วัน</Text>
          <View style = {styles.space}></View>
          <Text style = {styles.Text}>  ชำระงวด/วัน</Text>
        </Card>
      </Card>
      <Card style = {styles.contbox1}>
        <Text style = {styles.TextCen}>รายการบันทึกเติมเชื้อเพลิงล่าสุด</Text>
        <Card style = {styles.historybox}>
          <Text style = {styles.TextDate}>9/9/2020</Text>
          <Text style = {styles.historyspace}></Text>
          <Text style = {styles.TextLeft}>200 THB</Text>
        </Card>
        <Card style = {styles.historybox}>
          <Text style = {styles.TextDate}>11/9/2020</Text>
          <Text style = {styles.historyspace}></Text>
          <Text style = {styles.TextLeft}>500 THB</Text>
        </Card>
        <Card style = {styles.historybox}>
          <Text style = {styles.TextDate}>12/9/2020</Text>
          <Text style = {styles.historyspace}></Text>
          <Text style = {styles.TextLeft}>1000 THB</Text>
        </Card>
        <Card style = {styles.transparent}>
          <Text style = {styles.Text}>แสดงเพิ่มเติม</Text>
          <Text style = {styles.Text}>เพิ่ม</Text>
        </Card>
      </Card>
      <Card style = {styles.contbox1}>
        <Text style = {styles.TextCen}>รายการบันทึกซ่อมบำรุงล่าสุด</Text>
        <Card style = {styles.historybox}>
          <Text style = {styles.TextDate}> 9/9/2020{'\n'} Ord.10</Text>
          <Text style = {styles.historyspace}></Text>
          <Text style = {styles.TextLeft}>200 THB</Text>
        </Card>
        <Card style = {styles.historybox}>
          <Text style = {styles.TextDate}> 11/9/2020{'\n'} Ord.11</Text>
          <Text style = {styles.historyspace}></Text>
          <Text style = {styles.TextLeft}>500 THB</Text>
        </Card>
        <Card style = {styles.historybox}>
          <Text style = {styles.TextDate}> 12/9/2020{'\n'} Ord.12</Text>
          <Text style = {styles.historyspace}></Text>
          <Text style = {styles.TextLeft}>1000 THB</Text>
        </Card>
        <Card style = {styles.transparent}>
          <Text style = {styles.Text}>แสดงเพิ่มเติม</Text>
          <Text style = {styles.Text}>เพิ่ม</Text>
        </Card>
      </Card>
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection: 'column',
    backgroundColor: '#707070',
  },
  card:{
    backgroundColor: '#242020',
    justifyContent: 'center',
    margin: 10,
    padding: 35,
    height: 175,
  },
  contbox:{
    flexDirection: 'column',
    backgroundColor: '#242020',
    justifyContent: 'center',
    margin: 20,
    padding: 35,
    height: 175,
  },
  contbox1:{
    flexDirection: 'column',
    backgroundColor: '#242020',
    justifyContent: 'center',
    margin: 20,
    padding: 35,
    height: 260
  },
  progressbox:{
    flexDirection: 'row',
    backgroundColor: '#242020',
    borderColor: 'transparent',
    elevation: 0
  },
  cirpro:{
  backgroundColor: '#242020',
  },
  space: {
    margin:20
  },
  Text:{
    color: 'white'
  },
  TextDate:{
    color: 'white',
    margin: 10
  },
  TextLeft:{
    color: 'white',
    margin: 10
  },
  TextCen:{
    color: 'white',
    marginHorizontal: 60,
    marginVertical: 5
  },
  historybox:{
    height:55,
    flexDirection: 'row',
    backgroundColor: '#707070'
  },
  historyspace:{
    margin: 70
  },
  none:{
    opacity: 0,
    height:10
  },
  transparent:{
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    flexDirection: 'row',
    elevation: 0
  },
});

  