import React, { useRef, useState } from 'react'
import { Button, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import ButtonArea from '../../../../components/Button/ButtonArea';
import { FontAwesome } from '@expo/vector-icons';

export default function CameraSecao() {
    const [facing, setFacing] = useState<CameraType>('back');
    const [show,setShow] = useState(false)
    const ref = useRef<CameraView>(null);
    const [uri, setUri] = useState<string | null>(null);
    const [permission, requestPermission] = useCameraPermissions();
  
    if (!permission) {
      // Camera permissions are still loading.
      return <View />;
    }
  
    if (!permission.granted) {
      // Camera permissions are not granted yet.
      return (
        <View style={estiloLocal.container}>
          <Text style={estiloLocal.message}>Precisamos de permissão para usar a camera</Text>
          <Button onPress={requestPermission} title="Garantir permissão" />
        </View>
      );
    }
  
    // provavelmente quando for enviar a foto pra api, mandar em base64
    const tirarFoto = async ()=>{
        const foto = await ref.current?.takePictureAsync();
        if(foto){
            ToastAndroid.show("Foto tirada com sucesso.",ToastAndroid.LONG)
            setUri(foto?.uri)
            setShow(!show)
        }else{
            ToastAndroid.show("Não foi possível tirar a foto tente novamente.",ToastAndroid.LONG)
        }
    }
    return (
      <View style={estiloLocal.container}>
        {(show?
        <CameraView mode='picture' ref={ref} style={estiloLocal.camera} facing={facing}>
          <View style={estiloLocal.buttonContainer}>
            <TouchableOpacity style={estiloLocal.button} onPress={()=>setShow(!show)}>
              <Text style={estiloLocal.text}>X</Text>
            </TouchableOpacity>
          </View>
          <View style={estiloLocal.buttonContainer}>
            <TouchableOpacity style={{flex:1,alignSelf:'flex-end',alignItems:'center',marginBottom:32}} onPress={()=>tirarFoto()}>
                <FontAwesome name="circle-o" size={70} style={{borderWidth:10}} color="#41C526" light/>
            </TouchableOpacity>
          </View>
        </CameraView>
        :
        <View>
            <ButtonArea title="Abrir camera" action={()=>setShow(!show)}/>
        </View>)
        }
      </View>
    );
  }
  
  const estiloLocal = StyleSheet.create({
    container: {
      flex: 1,
    },
    message: {
      textAlign: 'center',
      paddingBottom: 10,
    },
    camera: {
      flex: 1,
    },
    buttonContainer: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: 'transparent',
      margin: 32,
    },
    button: {
      flex: 1,
      alignSelf: 'flex-start',
      alignItems: 'flex-end',
    },
    text: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'white',
    },
  });