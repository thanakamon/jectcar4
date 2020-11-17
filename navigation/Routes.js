import React, { useContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {AuthContext} from './AuthProvider';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import firestore from '@react-native-firebase/firestore';


const Routes = () => {
  const {user, setUser} = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = (user) => {
    // console.log(user);
    getUser = async () => {
      const userDocument = await firestore().collection("users").where('email','==',user.email).get().then(querySnapshot => {
        if(!querySnapshot.size){
          firestore().collection("users").add({name:user.displayName,email:user.email}).then(console.log);
        }  
        //console.log('Total users: ', querySnapshot.size);
          querySnapshot.forEach(documentSnapshot => {
            console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
          });
        });
      //console.log(userDocument);
      //console.log("userDoc"+userDocument)
    }
    getUser();
    setUser(user);
    if(initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if(initializing) return null;

    return (
      <NavigationContainer>
          { user ? <AppStack/> : <AuthStack/>} 
      </NavigationContainer>
    );
};

export default Routes;
