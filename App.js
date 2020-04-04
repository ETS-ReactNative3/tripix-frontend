import React from "react";
import { StatusBar } from "react-native";
import Provider from "./context/Provider";
import Navigator from "./navigation/Navigator";
import { enableScreens } from "react-native-screens";

StatusBar.setBarStyle("light-content", true);
enableScreens();

const App: () => React$Node = () => {
  return (
    <Provider>
      <Navigator />
    </Provider>
  );
};

export default App;
