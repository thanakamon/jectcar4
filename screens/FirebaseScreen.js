import React, { Component } from 'react';
import { View, Text, Button,StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../navigation/AuthProvider'
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
class FireStore extends Component {
    static contextType = AuthContext;
    state = {
        user: {
            name: "",
            email: ""
        }
    }
    constructor(props) {
        super(props);
        //this.getUser();
        //this.addUser();
        //console.log(firestore().collection('users').doc('gFSLp3pdAzunNZTaPpg6'));
        this.subscriber = firestore().collection("users").doc
            ('none@kmitl.ac.th').onSnapshot(doc => {
                this.setState({
                    user: {
                        name: doc.data().name,
                        email: doc.data().email
                    }
                })
            })
    }
    /* 
    getUser = async () => {
        const userDocument = await firestore().collection("users").where('email', '==', 'non@kmitl.ac.th').get().then(querySnapshot => {
            //console.log('Total users: ', querySnapshot.size);

            querySnapshot.forEach(documentSnapshot => {
                console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
            });
        });
        //console.log(userDocument);
        //console.log("userDoc"+userDocument)
    }
    
    addUser = async () => {
        const userDocument = await firestore().collection("users").doc('none@kmitl.ac.th').set({
                name: 'Iom',
                email: 'none@kmitl.ac.th'
              }).then(console.log)
        //console.log("userDoc"+userDocument)
    }
    */
render() {
    const { user, logout } = (this.context);

    return (
        <View style={styles.container}>
        <Text style={styles.text}>{this.state.user.name}</Text>
        <Text style={styles.text}>{this.state.user.email}</Text>
        
        
        
  
      </View>
    );
}
}
//<button onPress={() => { props.navigation.navigate('real') }}>Realtime</button>

export default FireStore;

const styles = StyleSheet.create({

    container: {
      backgroundColor: '#f9fafd',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    text: {
      fontSize: 30,
      color: '#333333'
    }
  
  }); 
