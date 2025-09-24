import React from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { Ionicons as Icon } from "@expo/vector-icons"; // Exemplo com ícones

interface FloatingButtonProps {
  onPress: () => void;
}

const FloatingButton = ({ onPress }: FloatingButtonProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Icon name="add" size={30} color="#000" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute", // Faz o botão flutuar
    bottom: 30, // Distância da parte inferior
    right: 30, // Distância da direita
    width: 60,
    height: 60,
    borderRadius: 30, // Deixa o botão redondo
    backgroundColor: "#00ff00ff",
    justifyContent: "center",
    alignItems: "center",
    elevation: 8, // Sombra para Android
    shadowColor: "#000", // Sombra para iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});

export default FloatingButton;
