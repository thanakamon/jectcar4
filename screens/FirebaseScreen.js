import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../navigation/AuthProvider'
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
        this.getUser();
        this.addUser();
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
    
render() {
    const { user, logout } = (this.context);

    return (
        <View>
            <Text>Name: {this.state.user.name}</Text>
            <Text>Email: {this.state.user.email} </Text>

        </View>
    );
}
}


export default FireStore;

