import React from "react";
import { Text, View } from "react-native";
import { styles } from "./style";
import CompanyScreen from "./screens/CompanyScreen";
import TabStackScreen from "./routers/TabStackScreen";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <NavigationContainer>
      <TabStackScreen />
    </NavigationContainer>
  )
}