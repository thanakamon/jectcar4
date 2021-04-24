import React, { useState,useContext } from "react";
import { View, Text, StyleSheet,TouchableOpacity,Image,Button, ScrollView,TextInput } from "react-native";
import { AuthContext } from '../navigation/AuthProvider';
import { Card } from 'react-native-elements';
import moment from 'moment';
import {Divider} from '../styles/HomeMemos';
import ProgressiveImage from '../components/ProgressiveImage';
import Icon from 'react-native-vector-icons/FontAwesome';

const  EditMemos= (props) => {
  const { user, logout } = useContext(AuthContext);
  //const {item} = props.route.params;

  //console.log("item = ",item);
  //console.log("item = ",item);
  return (
    <View style = {styles.container} >
      <ScrollView>
          <TextInput style={styles.textTitle}
            placeholder="ADD TITLE..."
            
            onChangeText={(content) => settitle(content)}
          />
          <TextInput style={styles.textDescription}
            underlineColorAndroid="transparent"
            placeholder="ADD DESCRIPTION..."
            
            multiline={true} 
            
            onChangeText={(content) => setMemos(content)}
          />
 
      </ScrollView> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white',
    
  },
  actionButtonIcon: {
    fontSize: 25,
    height: 28,
    color: 'white',
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
  textTitle:{
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    fontFamily: 'Lato-Regular',
    marginTop: 20,
    marginLeft:10,
    marginRight:10,
    borderBottomColor: 'black',
    borderBottomWidth: 3,
  },
  textDescription:{
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    fontFamily: 'Lato-Regular',
    marginTop: 20,
    marginLeft:10,
    marginRight:10,
    
  },
  
  
	
});


export default EditMemos;