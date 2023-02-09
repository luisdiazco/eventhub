import { StyleSheet } from "react-native";
import { DefaultTheme } from "react-native-paper";

export default StyleSheet.create({
  CustomFont: {
    fontFamily: "DancingScript-Regular",
  },
  ButtonText: {
    fontFamily: "AbrilFatface-Regular",
    fontSize: 30,
    padding: 10,
  },
});

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "rgb(101,37,131)",
    tint: "rgb(255,255,255)",
    background: "transparent",
  },
};
