import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("screen");
import styled from 'styled-components';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  background-color: #D9F1F1;
`;

export const styles = StyleSheet.create({
  card: {
    flex: 1,
    justifyContent: 'center',
    marginVertical: 10,
    backgroundColor: "#F8F9F9",
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: width / 1.1,
    marginHorizontal: 15,
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
    fontSize: 18,
    marginVertical: 8,
    marginLeft: 10,
    marginTop: 5,
    
    
  },
  cardImage: {
    flex: 0.3,
  },
  Container:{
  flex: 1,
  justifyContent: 'center'
  }
  
});

