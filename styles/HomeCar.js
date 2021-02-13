import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("screen");

export const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: width / 1.1,
    marginHorizontal: 20,
    borderRadius: 20,

    height: height / 8,

    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 1.5,
  },

  cardTitle: {
    fontWeight: "bold",
    fontSize: 20,
    marginLeft: 10,
  },
  cardDescription: {
    fontSize: 16,
    marginVertical: 8,
    marginLeft: 10,
    marginTop: -10,
  },
  cardImage: {
    flex: 0.3,
  },
});