import React from "react";
import { Text, View } from "react-native";
import { mapaComponentStyles } from "./MapaComponentStyles";

interface SecaoMapaProps {
  titulo: string;
  areaStyle: any;
  children: React.ReactNode;
}

export default function SecaoMapa({ titulo, areaStyle, children }: SecaoMapaProps) {
  return (
    <View style={mapaComponentStyles.sectionContainer}>
      <Text style={mapaComponentStyles.sectionText}>{titulo}</Text>
      <View style={areaStyle}>
        {children}
      </View>
    </View>
  );
}