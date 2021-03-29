import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import {Card} from 'native-base'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const ServiceList = ({navigation}) => {
  return (
    <View style = {style.container}>
      <ScrollView>
        <TouchableOpacity onPress={() => { navigation.navigate('detailService') }}>
            <Card style = {style.CardBox}>
                <Card style ={style.CardDate}>
                    <Text style = {style.Text}>
                        9/10/2564
                    </Text>
                    <Text style = {style.Text}>
                        ระบบเบรค
                    </Text>
                </Card>
                <Card style ={style.CardDate}>
                    <Text style = {style.Text}>3000</Text>
                </Card>
            </Card>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { navigation.navigate('detailService') }} >
            <Card style = {style.CardBox}>
                <Card style ={style.CardDate}>
                    <Text style = {style.Text}>
                        9/10/2564
                    </Text>
                    <Text style = {style.Text}>
                        ระบบเบรค
                    </Text>
                </Card>
                <Card style ={style.CardDate}>
                    <Text style = {style.Text}>3000</Text>
                </Card>
            </Card>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
export default ServiceList;

const style = StyleSheet.create({
    container:{
        backgroundColor:'#242020',
        flex:1,
        padding: wp('3%'),
        
    },
    Text:{
        color:'white'
    },
    CardBox:{
        flexDirection:'row',
        backgroundColor:'#707070',
        justifyContent:'space-between',
        height: hp('9%'),
        padding: wp('1%'),

    },
    CardDate:{
        backgroundColor:'transparent',
        alignItems:'center',
        justifyContent:'space-between',
        padding:wp('2%'),
        elevation:0,
        borderColor:'transparent'

    }
    
})