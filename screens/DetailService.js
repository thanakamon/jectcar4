import React, {useState, useContext,Component} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import moment from 'moment';
import {Card} from 'native-base';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const DetailService = (props) => {
    const {item}=props.route.params
    
    
    return(
        <View style = {style.container}>
            <ScrollView>
                <Card style = {style.CardBox}>
                    <Text style = {style.Text}>วันที่</Text>
                    <Text style = {style.Text}>{moment(item.ServiceDate.toDate()).format('MMM Do YY')}</Text>
                </Card>
                <Card style = {style.CardBox}>
                    <Text style = {style.Text}>ระยะทางสะสม</Text>
                    <Text style = {style.Text}>{item.TotalKilo}</Text>
                </Card>
                <Card style = {style.CardBox}>
                    <Text style = {style.Text}>ค่าใช้จ่าย</Text>
                    <Text style = {style.Text}>3000</Text>
                </Card>
                <Card style = {style.CardBoxservice}>
                    <Text style = {style.Text}>บริการ : </Text>
                    <Text style = {style.Text1}>{item.Service}</Text>
                </Card>
                <Card style = {style.CardBox}>
                    <Text style = {style.Text}>ผู้บริการ</Text>
                    <Text style = {style.Text}>{item.ServiceProvider}</Text>
                </Card>
                <Card style = {style.CardBox}>
                    <Text style = {style.Text}>หมายเหตุ</Text>
                    <Text style = {style.Text}>{item.Note}</Text>
                </Card>
                
                    <Text style = {style.Text}>ใบเสร็จ</Text>
                    <Image
                        style={style.tinyLogo}
                        source={{uri: item.Receipt}}
      />
                
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
    Text1:{
        color:'white',
        fontSize:20
    },
    CardBox:{
        backgroundColor:'#242020',
        flexDirection:'row',
        height: hp('8%'),
        padding: wp('4%'),
        justifyContent:'space-between'
        
    },
    CardBoxservice:{
        backgroundColor:'#242020',
        flexDirection:'row',
        width: '99%',
        height: 90,
        padding: wp('4%'),
        justifyContent:'space-between'
        
    },
    tinyLogo:{
       
        width: '99%',
        height: 250,
        
        
        
    },
});

