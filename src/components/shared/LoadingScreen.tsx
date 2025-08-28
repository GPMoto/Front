import LottieView from "lottie-react-native";
import React from "react";
import { View, StyleSheet, Text, Modal } from "react-native";

interface LoadingScreenProps {
  children?: React.ReactNode;
  visible?: boolean;
}

const LoadingScreen = ({ children, visible = true } : LoadingScreenProps) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      statusBarTranslucent={true}
    >
      <View style={styles.overlay}>
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
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  animation: {
    width: 400,
    height: 400,
  },
  textContainer: {
    marginTop: 20,
    alignItems: "center",
  },
});

export default LoadingScreen;
