import React, { useState,useContext } from "react";
import { View, Text, StyleSheet,TouchableOpacity,Image,Button, ScrollView } from "react-native";
import { AuthContext } from '../navigation/AuthProvider';
import { Card } from 'react-native-elements';
import moment from 'moment';
import {Divider} from '../styles/HomeMemos';
import ProgressiveImage from '../components/ProgressiveImage';
import Icon from 'react-native-vector-icons/FontAwesome';

const  DetailsMemos= (props) => {
  const { user, logout } = useContext(AuthContext);
  const {item}=props.route.params
  //console.log("item = ",item);
  

  return (
    <View style = {styles.container} >
       <View style = {styles.container2} >
       <ScrollView>    
        <Text style = {styles.Title} >{item.Title}</Text>
        <Card.Divider/>
            <Text style = {styles.date}>{moment(item.postTime.toDate()).format('DD MMMM YYYY')}</Text>
        <Card.FeaturedTitle/>
        <Text  style = {styles.Details} >{item.MemosDetails}</Text>
        
        {item.postImg != null ? (
        <ProgressiveImage 
          source={{uri: item.postImg}}
          style={{width: '90%', height: 250,alignSelf:'center',}}
          resizeMode='cover'
        />
      ) : <Divider />}
        
    </ScrollView>
    </View>
    
					
			
    </View>
  );
}

const styles = StyleSheet.create({
	container:{
        flex:1,
        backgroundColor:'#fccdc9'

    },
    container2:{
      width:'90%',
      alignSelf:'center',
      marginTop: 20,
      backgroundColor:'white',
      borderRadius:20,

  },
    actionButton:{
        alignSelf : "flex-end",
        marginRight: 5,
        
    },
    Title:{
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom:10,
        marginLeft: 20,
        
    },
    date:{
        fontSize: 13,
        marginLeft: 20,
        
    },
    Details:{
        fontSize: 18,
        marginRight:20,
        marginLeft:20,
        marginBottom:20
    },
    actionButton: {
      
      width: 60,
		height: 60,
		backgroundColor: '#2e64e5',
		borderRadius: 100, 
		position: 'absolute',
		elevation: 10,
		alignItems: 'center',
		justifyContent: 'center',
		bottom: 30,
		right: 30
    },
    
    
})


export default DetailsMemos;