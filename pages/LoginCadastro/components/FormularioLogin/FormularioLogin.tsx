import { StyleSheet, ToastAndroid, View } from 'react-native'
import InputLabel from '../../../../components/InputLabel/InputLabel'
import { useState } from 'react'
import ButtonArea from '../../../../components/Button/ButtonArea';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';




export default function FormularioLogin(props:any) {
    const {navigation} = props;
    const [email,setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const postLogin = async (login:{email:string,senha:string})=>{
        const res = await axios.post("postLogin/login",login)
        if(res.status == 200){
          return true
        }
        return false
      }

      const saveLogin= async(login:{email:string,senha:string})=>{
        try{
        await AsyncStorage.setItem("LOGIN",JSON.stringify(login))
        }catch(e){
          console.error('Erro ao salvar token:', e);
        }
      }
    const logar = async ()=>{
        if( email && senha){
            let login = {email,senha}
            console.log(login)
            // const res = await postLogin(login)
            if(true){
                ToastAndroid.show("Login Realizado com sucesso", ToastAndroid.LONG);
                await saveLogin(login)
                navigation.popTo("Home")
                
            }else{
                ToastAndroid.show("Email ou senha invalidos", ToastAndroid.LONG);
            }
        }else{
            ToastAndroid.show("Campo de email ou senha invalido!",ToastAndroid.LONG);
        }
    }

  return (
    <View style={[estiloLocal.formulario]}>
        <InputLabel title='Email' value={email} setValue={setEmail} placeholder='Digite o seu email' show={false}></InputLabel>
        <InputLabel secure={true} title='Senha' value={senha} setValue={setSenha} placeholder='Digite a sua senha' show={false}></InputLabel>
        <View style={{width:'50%',alignSelf:'center'}}>
        <ButtonArea size='medium' title='Acessar' action={()=>logar()}></ButtonArea>
        </View>
    </View>
  )
}

const estiloLocal= StyleSheet.create({
  formulario:{
    gap:20,
    padding:12,
  }
});