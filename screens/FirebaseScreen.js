import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import firestore from '@react-native-firebase/firestore';

class HomeScreen extends Component {
  state = {
    user: {
      name: ""
    }
  }
  constructor(props) {
    super(props);
    this.getUser();
    //console.log(firestore().collection('users').doc('gFSLp3pdAzunNZTaPpg6'));
    this.subscriber = firestore().collection("users").doc
      ('gFSLp3pdAzunNZTaPpg6').onSnapshot(doc => {
        this.setState({
          user:{
            name: doc.data().name
          }
        })
      })
  }
  getUser = async () => {
    const userDocument = await firestore().collection("users").doc
      ('gFSLp3pdAzunNZTaPpg6').get()
    //console.log("userDoc"+userDocument)
  }

  render() {
    return (
      <View>
        <Text>Name: {this.state.user.name} </Text>
      </View>
    );
  }
}


export default HomeScreen;

