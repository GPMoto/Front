import { Text, ToastAndroid, View } from "react-native";
import CameraSecao from "./components/CameraSecao/CameraSecao";
import { styles } from "../../styles/styles";
import { useEffect, useState } from "react";
import * as FileSystem from 'expo-file-system';
import axios from "axios";
import FormularioUwb from "./components/FormularioUwb/FormularioUwb";


interface dataInterface{
  identificador:string;
}

async function converterParaBase64(uri: string) {
  try {
    const base64 = await FileSystem.readAsStringAsync(uri, { encoding: 'base64' });
    return base64;
  } catch (err) {
    console.error('Erro ao converter imagem para Base64:', err);
    return null;
  }
}

export default function AdicionarRastreador() {
  const [uri, setUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [identificador,setIdentificador] = useState("")


  useEffect(()=>{
    const sendApi= async()=>{
      if(uri){
        const img = await converterParaBase64(uri)
        const objImg = {img:img}
        const res = await axios.post("sendImgapi/identificador",JSON.stringify(objImg))
        if(res.status = 200){
          ToastAndroid.show("Moto identificada",ToastAndroid.LONG)
          setLoading(false)
          const data = res.data as dataInterface;
          setIdentificador(data.identificador)
        }
      }else{
        ToastAndroid.show("Não foi possível identificar a moto, tire outra foto!",ToastAndroid.LONG)
      }
    }
    sendApi();
  },[uri])
  return (
    <View style={[styles.container,styles.pageColor,{justifyContent:"space-between",paddingBottom:64}]}>
        <Text style={[styles.whiteText,{fontSize:24,textAlign:"center"}]}>Para adicionar rastreador é preciso tirar uma foto da placa.</Text>
        {identificador && !loading?
        <View>
          <FormularioUwb identificador={identificador} setIdentificador={setIdentificador} setLoading={setLoading}/>
        </View>
        :
        <View>
          {/* fazer o coiso de loading*/}
        </View>
          }
        <CameraSecao uri={uri} setUri={setUri}></CameraSecao>
    </View>
  )
}
