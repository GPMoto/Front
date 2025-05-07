import { StyleSheet, Text, View } from "react-native";
import InputLabel from "../../components/InputLabel/InputLabel";
import FormularioLogin from "./components/FormularioLogin/FormularioLogin";
import axios from "axios";
import { styles } from "../../styles/styles";




export default function LoginCadastro(props:any) {

  return (
    <View style={[styles.container,styles.pageColor,estiloLocal.ContainerLocal]}>
      <View style={[estiloLocal.formArea]}>
        <Text style={[styles.whiteText,{fontSize:24}]}>Acessar Conta</Text>
        <FormularioLogin {...props}></FormularioLogin>
       </View>
    </View>
  )
}

const estiloLocal = StyleSheet.create({
  ContainerLocal:{
    alignItems:'center',
    justifyContent:'center'
  },
  formArea:{
    width:'90%',
    height:'50%',
    borderRadius:16,
    padding:16,
    backgroundColor:'#959595',
  }
})
