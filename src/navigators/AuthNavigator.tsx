import LoginCadastro from "@/screens/LoginCadastro/LoginCadastro";
import { ParamListBase } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./NavigationTypes";

export default function AuthNavigator() {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login">
        {(props: ParamListBase) => <LoginCadastro {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
