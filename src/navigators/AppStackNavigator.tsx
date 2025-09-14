import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AppStackParamList } from "./NavigationTypes";
import SingleMoto from "@/screens/Moto/SingleMoto";

const AppStackNavigator = () => {
  const { Navigator, Screen } = createNativeStackNavigator<AppStackParamList>();
  return (
    <Navigator>
      <Screen component={SingleMoto} name="Moto" />
    </Navigator>
  );
};

export default AppStackNavigator;

const styles = StyleSheet.create({});
