import React, { Component,useContext } from "react";
import { View, Text, StyleSheet,TouchableOpacity } from "react-native";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import SimpleLineIconsIcon from "react-native-vector-icons/SimpleLineIcons";
import { AuthContext } from '../navigation/AuthProvider';

const HomeScreen = (props) => {
  const { user, logout } = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <View style={styles.rect2Row}>
        <View style={styles.rect2}>
          <Text style={styles.home}>Home</Text>
        </View>
        <View style={styles.rect3}>
          <Text style={styles.stat}>Stat</Text>
        </View>
      </View>
      <View style={styles.rect5}>
        <Text style={styles.carCare1}>For Circular Progress Bar</Text>
      </View>
      <View style={styles.rect6}>
        <Text style={styles.fuelHistory}>Fuel History</Text>
        <View style={styles.rect7}>
          <View style={styles.fuelHistory1Row}>
            <Text style={styles.fuelHistory1}>11/10/2564</Text>
            <Text style={styles.fuelHistory2}>1200</Text>
            <Text style={styles.thb}>THB</Text>
          </View>
        </View>
        <View style={styles.fuelHistory3StackStack}>
          <View style={styles.fuelHistory3Stack}>
            <Text style={styles.fuelHistory3}>11/10/2564</Text>
            <View style={styles.rect8}>
              <View style={styles.fuelHistory5Row}>
                <Text style={styles.fuelHistory5}>1/10/2564</Text>
                <Text style={styles.fuelHistory6}>500</Text>
                <Text style={styles.thb2}>THB</Text>
              </View>
            </View>
          </View>
          <Text style={styles.fuelHistory4}>1200</Text>
          <Text style={styles.thb1}>THB</Text>
        </View>
        <View style={styles.readMoreRow}>
          <Text style={styles.readMore}>Read More</Text>
          <Text style={styles.add}>Add</Text>
        </View>
      </View>
      <View style={styles.rect9}>
        <Text style={styles.maintenanceHistory}>Maintenance History</Text>
        <View style={styles.fuelHistory7Stack}>
          <Text style={styles.fuelHistory7}>11/10/2564</Text>
          <View style={styles.rect10}>
            <View style={styles.fuelHistory8StackRow}>
              <View style={styles.fuelHistory8Stack}>
                <Text style={styles.fuelHistory8}>11/10/2564</Text>
                <Text style={styles.order87}>Order.87</Text>
              </View>
              <Text style={styles.ladkrabang}>Ladkrabang</Text>
              <Text style={styles.fuelHistory9}>3000</Text>
              <Text style={styles.thb3}>THB</Text>
            </View>
          </View>
        </View>
        <View style={styles.rect11}>
          <View style={styles.fuelHistory10ColumnRow}>
            <View style={styles.fuelHistory10Column}>
              <Text style={styles.fuelHistory10}>5/10/2564</Text>
              <Text style={styles.order86}>Order.86</Text>
            </View>
            <Text style={styles.bangkapi}>Bangkapi</Text>
            <Text style={styles.fuelHistory11}>1500</Text>
            <Text style={styles.thb4}>THB</Text>
          </View>
        </View>
        <View style={styles.readMore1Row}>
          <Text style={styles.readMore1}>Read More</Text>
          <Text style={styles.add1}>Add</Text>
        </View>
      </View>
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#3e3d3d"
    },
    rect2: {
      width: 180,
      height: 41,
      backgroundColor: "#215f80",
      borderWidth: 1,
      borderColor: "#656464"
    },
    home: {
      fontFamily: "roboto-700",
      color: "rgba(255,255,255,1)",
      fontSize: 16,
      marginTop: 11,
      marginLeft: 68
    },
    rect3: {
      width: 180,
      height: 41,
      backgroundColor: "#215f80",
      borderWidth: 1,
      borderColor: "#656464",
      marginLeft: 1
    },
    stat: {
      fontFamily: "roboto-700",
      color: "rgba(255,255,255,1)",
      fontSize: 16,
      marginTop: 11,
      marginLeft: 75
    },
    rect2Row: {
      height: 41,
      flexDirection: "row",
      marginTop: 98,
      marginLeft: -1
    },
    rect5: {
      width: 360,
      height: 175,
      backgroundColor: "#242020",
      marginTop: 75
    },
    carCare1: {
      fontFamily: "roboto-700",
      color: "rgba(255,255,255,1)",
      fontSize: 25,
      marginTop: 73,
      marginLeft: 39
    },
    rect6: {
      width: 361,
      height: 188,
      backgroundColor: "#242020",
      marginTop: 19,
      marginLeft: -1
    },
    fuelHistory: {
      fontFamily: "roboto-700",
      color: "rgba(255,255,255,1)",
      fontSize: 16,
      marginTop: 11,
      marginLeft: 137
    },
    rect7: {
      width: 292,
      height: 45,
      backgroundColor: "#3e3d3d",
      flexDirection: "row",
      marginTop: 12,
      marginLeft: 30
    },
    fuelHistory1: {
      fontFamily: "roboto-700",
      color: "rgba(255,255,255,1)",
      fontSize: 16
    },
    fuelHistory2: {
      fontFamily: "roboto-700",
      color: "rgba(255,255,255,1)",
      fontSize: 16,
      marginLeft: 105
    },
    thb: {
      fontFamily: "roboto-700",
      color: "rgba(255,255,255,1)",
      fontSize: 16,
      marginLeft: 4
    },
    fuelHistory1Row: {
      height: 19,
      flexDirection: "row",
      flex: 1,
      marginRight: 16,
      marginLeft: 13,
      marginTop: 13
    },
    fuelHistory3: {
      top: 13,
      left: 13,
      position: "absolute",
      fontFamily: "roboto-700",
      color: "rgba(255,255,255,1)",
      fontSize: 16
    },
    rect8: {
      top: 0,
      left: 0,
      width: 292,
      height: 45,
      position: "absolute",
      backgroundColor: "#3e3d3d",
      flexDirection: "row"
    },
    fuelHistory5: {
      fontFamily: "roboto-700",
      color: "rgba(255,255,255,1)",
      fontSize: 16
    },
    fuelHistory6: {
      fontFamily: "roboto-700",
      color: "rgba(255,255,255,1)",
      fontSize: 16,
      marginLeft: 122
    },
    thb2: {
      fontFamily: "roboto-700",
      color: "rgba(255,255,255,1)",
      fontSize: 16,
      marginLeft: 5
    },
    fuelHistory5Row: {
      height: 19,
      flexDirection: "row",
      flex: 1,
      marginRight: 16,
      marginLeft: 13,
      marginTop: 13
    },
    fuelHistory3Stack: {
      top: 0,
      left: 0,
      width: 292,
      height: 45,
      position: "absolute"
    },
    fuelHistory4: {
      top: 13,
      left: 204,
      position: "absolute",
      fontFamily: "roboto-700",
      color: "rgba(255,255,255,1)",
      fontSize: 16
    },
    thb1: {
      top: 13,
      left: 245,
      position: "absolute",
      fontFamily: "roboto-700",
      color: "rgba(255,255,255,1)",
      fontSize: 16
    },
    fuelHistory3StackStack: {
      width: 292,
      height: 45,
      marginTop: 14,
      marginLeft: 30
    },
    readMore: {
      fontFamily: "roboto-700",
      color: "rgba(255,255,255,1)",
      fontSize: 16
    },
    add: {
      fontFamily: "roboto-700",
      color: "rgba(255,255,255,1)",
      fontSize: 16,
      marginLeft: 225
    },
    readMoreRow: {
      height: 19,
      flexDirection: "row",
      marginTop: 12,
      marginLeft: 16,
      marginRight: 13
    },
    rect9: {
      width: 361,
      height: 188,
      backgroundColor: "#242020",
      marginTop: 25
    },
    maintenanceHistory: {
      fontFamily: "roboto-700",
      color: "rgba(255,255,255,1)",
      fontSize: 16,
      marginTop: 14,
      marginLeft: 106
    },
    fuelHistory7: {
      top: 13,
      left: 13,
      position: "absolute",
      fontFamily: "roboto-700",
      color: "rgba(255,255,255,1)",
      fontSize: 16
    },
    rect10: {
      top: 0,
      left: 0,
      width: 292,
      height: 45,
      position: "absolute",
      backgroundColor: "#3e3d3d",
      flexDirection: "row"
    },
    fuelHistory8: {
      top: 0,
      left: 0,
      position: "absolute",
      fontFamily: "roboto-700",
      color: "rgba(255,255,255,1)",
      fontSize: 16
    },
    order87: {
      top: 18,
      left: 0,
      position: "absolute",
      fontFamily: "roboto-700",
      color: "rgba(255,255,255,1)",
      fontSize: 14
    },
    fuelHistory8Stack: {
      width: 86,
      height: 35
    },
    ladkrabang: {
      fontFamily: "roboto-700",
      color: "rgba(255,255,255,1)",
      fontSize: 16,
      marginLeft: 12,
      marginTop: 7
    },
    fuelHistory9: {
      fontFamily: "roboto-700",
      color: "rgba(255,255,255,1)",
      fontSize: 16,
      marginLeft: 9,
      marginTop: 7
    },
    thb3: {
      fontFamily: "roboto-700",
      color: "rgba(255,255,255,1)",
      fontSize: 16,
      marginLeft: 4,
      marginTop: 7
    },
    fuelHistory8StackRow: {
      height: 35,
      flexDirection: "row",
      flex: 1,
      marginRight: 19,
      marginLeft: 9,
      marginTop: 6
    },
    fuelHistory7Stack: {
      width: 292,
      height: 45,
      marginTop: 13,
      marginLeft: 29
    },
    rect11: {
      width: 292,
      height: 45,
      backgroundColor: "#3e3d3d",
      marginTop: 15,
      marginLeft: 29
    },
    fuelHistory10: {
      fontFamily: "roboto-700",
      color: "rgba(255,255,255,1)",
      fontSize: 16
    },
    order86: {
      fontFamily: "roboto-700",
      color: "rgba(255,255,255,1)",
      fontSize: 14
    },
    fuelHistory10Column: {
      width: 76
    },
    bangkapi: {
      fontFamily: "roboto-700",
      color: "rgba(255,255,255,1)",
      fontSize: 16,
      marginLeft: 22,
      marginTop: 4
    },
    fuelHistory11: {
      fontFamily: "roboto-700",
      color: "rgba(255,255,255,1)",
      fontSize: 16,
      marginLeft: 27,
      marginTop: 4
    },
    thb4: {
      fontFamily: "roboto-700",
      color: "rgba(255,255,255,1)",
      fontSize: 16,
      marginLeft: 4,
      marginTop: 4
    },
    fuelHistory10ColumnRow: {
      height: 36,
      flexDirection: "row",
      marginTop: 5,
      marginLeft: 9,
      marginRight: 19
    },
    readMore1: {
      fontFamily: "roboto-700",
      color: "rgba(255,255,255,1)",
      fontSize: 16
    },
    add1: {
      fontFamily: "roboto-700",
      color: "rgba(255,255,255,1)",
      fontSize: 16,
      marginLeft: 220
    },
    readMore1Row: {
      height: 19,
      flexDirection: "row",
      marginTop: 9,
      marginLeft: 20,
      marginRight: 14
    }
  });

  