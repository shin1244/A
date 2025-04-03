import React from "react";
import { Text, View } from "react-native";
import { styles } from "./style";
import CompanyMain from "./screens/Company/CompanyMain";
import TabStackScreen from "./screens/TabStackScreen";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <NavigationContainer>
      <TabStackScreen />
    </NavigationContainer>
  )
}