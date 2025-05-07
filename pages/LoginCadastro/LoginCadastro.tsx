import { Text, View } from "react-native";
import InputLabel from "../../components/InputLabel/InputLabel";
import FormularioLogin from "./components/FormularioLogin/FormularioLogin";
import axios from "axios";




export default function LoginCadastro() {

  

  return (
    <View>
        <Text>Acessar Conta</Text>
        <FormularioLogin></FormularioLogin>
    </View>
  )
}
