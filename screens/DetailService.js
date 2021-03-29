import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Card} from 'native-base';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const DetailService = () => {
    
    
    return(
        <View style = {style.container}>
            <ScrollView>
                <Card style = {style.CardBox}>
                    <Text style = {style.Text}>วันที่</Text>
                    <Text style = {style.Text}>4/9/2564</Text>
                </Card>
                <Card style = {style.CardBox}>
                    <Text style = {style.Text}>ระยะทางสะสม</Text>
                    <Text style = {style.Text}>10845</Text>
                </Card>
                <Card style = {style.CardBox}>
                    <Text style = {style.Text}>ค่าใช้จ่าย</Text>
                    <Text style = {style.Text}>3000</Text>
                </Card>
                <Card style = {style.CardBox}>
                    <Text style = {style.Text}>บริการ</Text>
                    <Text style = {style.Text}>ระบบเบรก</Text>
                </Card>
                <Card style = {style.CardBox}>
                    <Text style = {style.Text}>ผู้บริการ</Text>
                    <Text style = {style.Text}>วีระยานยนต์</Text>
                </Card>
                <Card style = {style.CardBox}>
                    <Text style = {style.Text}>หมายเหตุ</Text>
                    <Text style = {style.Text}></Text>
                </Card>
                <Card style = {style.CardBox}>
                    <Text style = {style.Text}>ใบเสร็จ</Text>
                    <Text style = {style.Text}></Text>
                </Card>
            </ScrollView>
        </View>
    );
};
export default DetailService ;
const style = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#242020'
    },
    Text:{
        color:'white',
        fontSize:20
    },
    CardBox:{
        backgroundColor:'#242020',
        flexDirection:'row',
        height: hp('8%'),
        padding: wp('4%'),
        justifyContent:'space-between'
        
    }
});

