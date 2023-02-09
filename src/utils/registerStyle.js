import { StyleSheet } from "react-native";
import { theme } from "./GlobalStyle";

export const registerStyle = StyleSheet.create({
  content: {
    padding: 15,
    paddingTop: 0,
  },
  button: {
    margin: 15,
    marginLeft: 0,
    marginRight: 0,
  },
  icon: {
    color: theme.colors.primary,
  },
});
