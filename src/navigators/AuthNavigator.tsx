import LoginCadastro from "@/screens/LoginCadastro/LoginCadastro";
import { ParamListBase } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./NavigationTypes";
import Cadastro from "@/screens/Cadastro/Cadastro";
import { useTheme } from "@/context/ThemeContext";
import { useDarkColors } from "@/styles/theme-config";

export default function AuthNavigator() {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  const { isDarkTheme } = useTheme();
  const colors = useDarkColors();
  
  return (
    <Stack.Navigator screenOptions={{
      headerStyle: { 
        backgroundColor: colors.cardBg
      },
      headerTitleStyle: {
        color: colors.primaryText,
        fontSize: 18,
        fontWeight: "bold"
      },
      headerTintColor: "#41C526",
      headerShadowVisible: false,
    }}>
      <Stack.Screen 
        name="Login" 
        component={LoginCadastro}
      />
      <Stack.Screen 
        name="Cadastro" 
        component={Cadastro}
        options={{ 
          title: "Criar Conta",
          headerBackTitle: "Voltar"
        }}
      />
    </Stack.Navigator>
  );
}
