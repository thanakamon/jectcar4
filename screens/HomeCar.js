import React, { Component } from "react";
import {
  View,
  ImageBackground,
  Dimensions,
  Text,
  Animated,
  Easing,TouchableOpacity
} from "react-native";
import { styles } from "../styles/HomeCar";
import { FlatList } from "react-native-gesture-handler";
import Card from "../components/CarCard";

const { width, height } = Dimensions.get("screen");

export default class Luxury extends Component {
  state = {
    alignment: new Animated.Value(height),
    cardAlignment: new Animated.Value(400),
    cards: [
      {
        id: 1,
        title: "Brand",
        description: "Car registration",
        image: require("../assets/Logo2.png"),
      },

      {
        id: 2,
        title: "KUBOTA YARIS",
        description: "น ม 6 เลย",
        image: require("../assets/toyota.jpg"),
      },
    ],
  };

  AnimateUI = () => {
    Animated.sequence([
      Animated.timing(this.state.alignment, {
        toValue: height / 3,
        duration: 800,
        easing: Easing.back(),
      }),
      Animated.timing(this.state.cardAlignment, {
        toValue: 0,
        duration: 700,
        easing: Easing.ease,
      }),
    ]).start();
  };

  componentDidMount() {
    this.AnimateUI();
  }

  handlePress = (id) => {
    // Find The Item By ID
    const card = this.state.cards.find((item) => item.id === id);

    // Navigate To Details Screen With The Card Data

    this.props.navigation.navigate("Details", { card });
  };

  render() {

    const { navigate } = this.props.navigation;

    const AnimatedBackground = {
      height: this.state.alignment,
    };

    const AnimatedCards = {
      transform: [
        {
          translateX: this.state.cardAlignment,
        },
      ],
    };

    return (
      <View>
        
        <Animated.View style={[styles.cardView, AnimatedCards]}>
          <FlatList
            data={this.state.cards}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => this.props.navigation.navigate("detialCar")} >
              <Card
                title={item.title}
                image={item.image}
                location={item.location}
                description={item.description}
                onPress={() => this.handlePress(item.id)}
              />
              </TouchableOpacity>
            )}
          />
        </Animated.View>
        
      </View>
    );
  }
}