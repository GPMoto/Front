
import { Text, ToastAndroid, View } from 'react-native'
import InputLabel from '../../../../components/InputLabel/InputLabel';
import { useState } from 'react';
import ButtonArea from '../../../../components/Button/ButtonArea';
import axios from 'axios';

interface FormularioUwbProps{
    identificador:string;
    setIdentificador:(value:string)=>void;
    setLoading:(value:boolean)=>void;
}

export default function FormularioUwb(props:FormularioUwbProps) {
    const [condicoesManutencao,setCondicoesManutencao]= useState("");
    const [id,setId]= useState(0);


    const enviaDados = async ()=>{
        if(condicoesManutencao && id){
            const moto = {condicoesManutencao,idIdentificador:id}
            const res = await axios.post("url/postMoto",JSON.stringify(moto))
            if(res.status = 201){
                ToastAndroid.show("Rastreador adicionado", ToastAndroid.LONG);
                props.setLoading(false)
                setCondicoesManutencao("")
                setId(0);
                props.setIdentificador("")
            }else{
                ToastAndroid.show("Não foi possivel adicionar rastreador.", ToastAndroid.LONG);
            }
        }else{
            ToastAndroid.show("Preencha os campos!", ToastAndroid.LONG);
        }
    }

  return (
    <View>
        <Text>Adicionar Informações da moto {props.identificador}</Text>
        <View>
            <InputLabel title='Id do rastreador' show={false} setValue={(e)=>setId(parseInt(e))} value={id.toString()} placeholder='Adicionar id do rastreador'></InputLabel>
            <InputLabel title='Condições de manutenção' show={false} setValue={(e)=>setCondicoesManutencao(e)} value={condicoesManutencao} placeholder='Coloque a condição de manutenção'></InputLabel>
            <ButtonArea size='medium' title='Salvar rastreador' action={()=>enviaDados()}></ButtonArea>
        </View>
    </View>
  )
}
