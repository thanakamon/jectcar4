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
import {Card} from 'react-native-elements'
import {Divider} from '../styles/HomeMemos';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const DetailService = (props) => {
    const {item}=props.route.params
    
    
    return(
        <View style = {style.container}>
            <ScrollView>
                <View style = {style.VCardBox}>
                <View style = {style.CardBox}>
                    <Text style = {style.Text}>Date</Text>
                    <Text style = {style.Text}>{moment(item.ServiceDate.toDate()).format('MMM Do YY')}</Text>
                    
                </View>
                <View style = {style.CardBox}>
                    <Text style = {style.Text}>Miles</Text>
                    <Text style = {style.Text}>{item.TotalKilo}</Text>
                </View>
                <View style = {style.CardBox}>
                    <Text style = {style.Text}>Cost</Text>
                    <Text style = {style.Text}>{item.Cost}</Text>
                </View>
                <View style = {style.CardBox}>
                    <Text style = {style.Text}>Services  </Text>
                    <Text style = {style.Text1}>{item.Service}</Text>
                </View>
                <View style = {style.CardBox}>
                    <Text style = {style.Text}>Servicer</Text>
                    <Text style = {style.Text}>{item.ServiceProvider}</Text>
                </View>
                <View style = {style.CardBox}>
                    <Text style = {style.Text}>Note : </Text>
                    <Text style = {style.Text2}>{'\n'}{item.Note}</Text>
                </View>
                <View style = {style.VPCardBox}>
                    <Text style = {style.Text}>Receipt</Text>
                    <Image
                        style={style.tinyLogo}
                        
                    />
                    {item.Receipt != null ? (
                    <Image
                        style={{width:wp('80%'),height:hp('80%'),alignSelf:'center',marginTop:20, borderRadius:20}}
                        source={{uri: item.Receipt}}
                        resizeMode='cover'
        />
      ) : <Divider />}
                </View>
                </View>
            </ScrollView>
        </View>
    );
};
export default DetailService ;
const style = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#D9F1F1"
    },
    Text:{
        color:'black',
        fontSize:20,
        
    },
    Text1:{
        color:'black',
        fontSize:20,
        width:wp('60%')
       
    },
    Text2:{
        color:'black',
        fontSize:20,
        marginLeft: 20,
        width:wp('55%')
       
    },
    VCardBox:{
        backgroundColor:"#fff",
        width:wp('90%'),
        margin:10,
        borderRadius:20,
        alignSelf:'center'
    },
    CardBox:{
        borderRadius:20,
        backgroundColor:"#fff",
        flexDirection:'row',
        shadowColor:"#fff",
        padding: wp('4%'),
        width:wp('90%'),
        alignSelf:'center',
        justifyContent:'space-between',
        borderBottomColor: 'grey',
        borderBottomWidth: 1
        
    },
    VPCardBox:{
        padding:wp('4%'),
        width:wp('90%'),
        alignSelf:'center',
    },
    

        
        
        
        
    
});

