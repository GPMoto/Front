import LoadingScreen from "@/components/shared/LoadingScreen";
import { useAuth } from "@/context/AuthContext";
import { NavigationContainer } from "@react-navigation/native";
import { Text } from "react-native";
import RootNavigator from "./RootNavigator";

const SplashApp = () => {
  const { splashScreen } = useAuth();
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
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  )
};

export default SplashApp;
