import { StyleSheet } from "react-native";
import { View, TouchableOpacity, Text } from "react-native";
import { color } from "react-native-reanimated";

export const Eventfinderstyle = StyleSheet.create({
  content: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "rgb(101,37,131)",
  },
  view: {
    width: "80%",
  },
  cardTitle: {
    color: "rgb(101,37,131)",
  },
  cardButton: {
    margin: 2,
    marginLeft: 0,
    marginRight: 0,
    top: -325,
    left: -185,
  },
  displayTxt: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
