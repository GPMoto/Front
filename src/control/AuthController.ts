import { useAuth } from "@/context/AuthContext";
import { UserLogin, UserLoginErrors, UserLoginResponse } from "@/model/User";
import { RootStackNavigationProps, RootStackParamList } from "@/navigators/NavigationTypes";
import { AuthService } from "@/services/AuthService";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Alert } from "react-native";

const useAuthControl = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [loginErrors, setLoginErrors] = useState<UserLoginErrors>({});
  const [error, setError] = useState<string | null>();
  const [formulario, setFormulario] = useState<UserLogin>({
    email: "",
    password: "",
  });
  const { login } = useAuth();

  // type BottomTabProps = BottomTabNavigationProp<BottomTabParamList>;

  const navigation = useNavigation<RootStackNavigationProps>();

  const loginUser = async () => {
    setLoading(true);
    const authService = new AuthService();
    const result = await authService.login(formulario);
    if (!result.success) {
      const errors = result.errors || {};
      setLoading(false);
      setLoginErrors(errors);
      setError(result.message);
      return;
    }

    const loginResponse = result.data as UserLoginResponse;
    await login(loginResponse.token);
    setLoading(false);
  };

  const createAccountUser = async () => {
    setLoading(true);
    const authService = new AuthService();
    const result = await authService.register(formulario);
    if (!result.success) {
      const errors = result.errors || {};
      setLoading(false);
      setLoginErrors(errors);
      setError(result.message);
      return;
    }
    setLoading(false);
    Alert.alert("Usuário criado com sucesso!");
  };

  const goToLoginPage = () => {
    navigation.navigate("Login");
  }

  const goToRegisterPage = () => {
    navigation.navigate("Cadastro");
  }

  const handleForm = (text: string, field: keyof UserLogin) => {
    setFormulario((formulario) => ({
      ...formulario,
      [field]: text,
    }));
  };

  
  return {
    loginUser,
    loading,
    loginErrors,
    error,
    createAccountUser,
    handleForm,
    formulario,
    goToLoginPage,
    goToRegisterPage
  };
};

export { useAuthControl };
