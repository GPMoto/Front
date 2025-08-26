import LoginCadastro from "@/screens/LoginCadastro/LoginCadastro";
import { ParamListBase } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login">
        {(props: ParamListBase) => <LoginCadastro {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
