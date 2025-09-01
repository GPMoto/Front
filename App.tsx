import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "@/navigators/RootNavigator";
import { AuthProvider } from "@/context/AuthContext";
import SplashApp from "@/navigators/SplashApp";

export default function App() {
  return (
    <AuthProvider>
      <SplashApp />
    </AuthProvider>
  );
}
