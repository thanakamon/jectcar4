import React, { Component,useContext } from "react";
import { View, Text, StyleSheet,TouchableOpacity } from "react-native";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import SimpleLineIconsIcon from "react-native-vector-icons/SimpleLineIcons";
import { AuthContext } from '../navigation/AuthProvider';

const HomeScreen = (props) => {
  const { user, logout } = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <View style={styles.group}>
        <TouchableOpacity style={styles.button} onPress={() => { props.navigation.navigate('CarMa') }} >
          <FontAwesomeIcon name="car" style={styles.icon}></FontAwesomeIcon>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button2} onPress={() => { props.navigation.navigate('Memos') }}>
        <SimpleLineIconsIcon
          name="notebook"
          style={styles.icon2}
        ></SimpleLineIconsIcon>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(13,90,104,1)"
  },
  group: {
    width: 308,
    height: 119,
    marginTop: 87,
    marginLeft: 50
  },
  button: {
    width: 308,
    height: 119,
    backgroundColor: "#E6E6E6",
    borderRadius:13,
  },
  icon: {
    color: "rgba(128,128,128,1)",
    fontSize: 96,
    height: 96,
    width: 110,
    marginTop: 12,
    marginLeft: 15
  },
  button2: {
    width: 308,
    height: 119,
    backgroundColor: "#E6E6E6",
    marginTop: 28,
    marginLeft: 50,
    borderRadius:13,
  },
  icon2: {
    color: "rgba(128,128,128,1)",
    fontSize: 96,
    height: 107,
    width: 96,
    marginTop: 6,
    marginLeft: 15
    
  }
});

export default HomeScreen;