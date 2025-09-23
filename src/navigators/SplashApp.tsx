import LoadingScreen from "@/components/shared/LoadingScreen";
import { useAuth } from "@/context/AuthContext";
import { NavigationContainer } from "@react-navigation/native";
import { Text } from "react-native";
import RootNavigator, { navigationRef, resetToLogin } from "./RootNavigator";
import { registerUnauthorizedHandler } from "@/services/UnauthorizedHandler";
import MockSessionManager from "@/mock/MockSessionManager";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

const SplashApp = () => {
  const { splashScreen, logout } = useAuth();
  useEffect(() => {
   registerUnauthorizedHandler(async () => {
      await logout();
      resetToLogin();
    });
  }, [logout]);
  if (splashScreen) {
    return (
      <LoadingScreen>
        <Text style={{ color: "#666", fontSize: 16, textAlign: "center" }}>
          Carregando aplicativo...
        </Text>
      </LoadingScreen>
    );
  }

  return (
    <NavigationContainer ref={navigationRef}>
      <RootNavigator />
    </NavigationContainer>
  )
};

export default SplashApp;
