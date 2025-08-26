import { useEffect } from "react";
import AppNavigator from "./AppNavigator";
import AuthNavigator from "./AuthNavigator";
import { useAuth } from "@/context/AuthContext";
import { AuthController } from "@/control/AuthController";

export default function RootNavigator() {
  useEffect(() => {
    AuthController.checkSavedLogin();
  });
  const { user } = useAuth();
  return user ? <AppNavigator /> : <AuthNavigator />;
}
