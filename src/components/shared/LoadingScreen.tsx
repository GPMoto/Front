import LottieView from "lottie-react-native";
import React from "react";
import { View, StyleSheet, Text, Modal } from "react-native";
import { useTheme } from "@/context/ThemeContext";

interface LoadingScreenProps {
  children?: React.ReactNode;
  visible?: boolean;
}

const LoadingScreen = ({ children, visible = true } : LoadingScreenProps) => {
  const { isDarkTheme } = useTheme();

  const overlayColor = isDarkTheme 
    ? "rgba(12, 12, 12, 0.95)" 
    : "rgba(255, 255, 255, 0.95)";

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      statusBarTranslucent={true}
    >
      <View style={[styles.overlay, { backgroundColor: overlayColor }]}>
        <View style={styles.container}>
          <LottieView
            source={require("~/assets/splash-bike.json")}
            autoPlay
            loop
            style={styles.animation}
          />
          {children && (
            <View style={styles.textContainer}>
              {children}
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  animation: {
    width: 220,
    height: 220,
  },
  textContainer: {
    marginTop: 20,
    alignItems: "center",
  },
});

export default LoadingScreen;
