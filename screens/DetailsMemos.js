import React, { useState,useContext } from "react";
import { View, Text, StyleSheet,TouchableOpacity,Image,Button } from "react-native";
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
    <Card style = {styles.container} >
        <TouchableOpacity style={styles.actionButton} >
			<Icon name="share-alt" size={30} color="#4F8EF7"/>
		</TouchableOpacity>
        
        <Text style = {styles.Title} >{item.Title}</Text>
        
        <Card.Divider/>
            <Text style = {styles.date}>{moment(item.postTime.toDate()).format('DD MMMM YYYY')}</Text>
        <Card.FeaturedTitle/>
        <Text  style = {styles.Details} >{item.MemosDetails}</Text>
        
        {item.postImg != null ? (
        <ProgressiveImage 
          source={{uri: item.postImg}}
          style={{width: '100%', height: 250}}
          resizeMode='cover'
        />
      ) : <Divider />}
        
            
        <TouchableOpacity 
			style={styles.actionButton}
			onPress={() => { props.navigation.navigate('addMemos') }}>
			
		</TouchableOpacity>

        
    </Card>
  );
}

const styles = StyleSheet.create({
	container:{
        flex:1,
    },
    actionButton:{
        alignSelf : "flex-end",
        marginRight: 5,
    },
    Title:{
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom:5,
        
    },
    date:{
        fontSize: 13,
        
    },
    Details:{
        fontSize: 18,
    }
    
})


export default DetailsMemos;