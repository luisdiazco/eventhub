import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider as PaperProvider } from "react-native-paper";
import { theme } from "./src/utils/GlobalStyle";
import NavBar from "./src/components/NavBar";
import { Provider } from "react-redux";
import { store } from "./src/store/store";
import LoadingComponent from "./src/components/loading/loading.component";

function App() {
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <NavBar />
        <LoadingComponent />
      </PaperProvider>
    </Provider>
  );
}

export default App;
