import { useAuth } from "@/context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

class AuthController {
  static checkSavedLogin = async () => {
    const { login } = useAuth();
    try {
      const savedLogin = await AsyncStorage.getItem("LOGIN");
      if (savedLogin) {
        const loginData = JSON.parse(savedLogin);
        login(loginData.email);
      }
    } catch (error) {
      console.error("Erro ao verificar login salvo:", error);
    }
  };
}

export { AuthController };
