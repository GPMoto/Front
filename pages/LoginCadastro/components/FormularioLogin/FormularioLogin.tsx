import { ToastAndroid, View } from 'react-native'
import InputLabel from '../../../../components/InputLabel/InputLabel'
import { useState } from 'react'
import ButtonArea from '../../../../components/Button/ButtonArea';
import axios from 'axios';




export default function FormularioLogin() {
    const [email,setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const postLogin = async (login:{email:string,senha:string})=>{
        const res = await axios.post("postLogin/login",login)
        if(res.status == 200){
          return true
        }
        return false
      }
    const logar = async ()=>{
        if( email && senha){
            let login = {email,senha}
            const res = await postLogin(login)
            if(res){
                ToastAndroid.show("Login Realizado com sucesso", ToastAndroid.LONG);
            }else{
                ToastAndroid.show("Email ou senha invalidos", ToastAndroid.LONG);
            }
        }else{
            ToastAndroid.show("Campo de email ou senha invalido!",ToastAndroid.LONG);
        }
    }

  return (
    <View>
        <InputLabel title='Email' value={email} setValue={setEmail} placeholder='Digite o seu email' show={false}></InputLabel>
        <InputLabel secure={true} title='Senha' value={senha} setValue={setSenha} placeholder='Digite a sua senha' show={false}></InputLabel>
        <ButtonArea title='Acessar' action={logar}></ButtonArea>
    </View>
  )
}
