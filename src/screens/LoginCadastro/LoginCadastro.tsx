import { View } from "react-native";
import FormularioLogin from "./components/FormularioLogin/FormularioLogin";
import { globalStyles } from "../../styles/styles";

export default function LoginCadastro(props: any) {
  return (
    <View style={[globalStyles.container, globalStyles.pageColor]}>
      <FormularioLogin {...props}></FormularioLogin>
    </View>
  );
}


