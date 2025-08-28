import AppNavigator from "./AppNavigator";
import AuthNavigator from "./AuthNavigator";
import { useAuth } from "@/context/AuthContext";

export default function RootNavigator() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <AppNavigator /> : <AuthNavigator />;
}
