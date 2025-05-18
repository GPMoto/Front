import { Text, ToastAndroid, View } from "react-native";
import CameraSecao from "./components/CameraSecao/CameraSecao";
import { styles } from "../../styles/styles";
import { useEffect, useState } from "react";
import * as FileSystem from "expo-file-system";
import axios from "axios";
import FormularioUwb from "./components/FormularioUwb/FormularioUwb";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { uwbMockList } from "../../utils/uwbMock";
import {
  motoInterfaceTeste,
  uwbInterfaceTeste,
} from "../../utils/interfacesTeste";
import { motoInterface } from "../../utils/Interfaces";
import { motoInterfaceTesteList } from "../../utils/motoInterfaceList";
import FormularioPagina from "./FormularioPagina";
import { useNavigation } from "@react-navigation/native";

interface dataInterface {
  identificador: string;
}

async function converterParaBase64(uri: string) {
  try {
    const base64 = await FileSystem.readAsStringAsync(uri, {
      encoding: "base64",
    });
    return base64;
  } catch (err) {
    console.error("Erro ao converter imagem para Base64:", err);
    return null;
  }
}

export default function AdicionarRastreador() {
  const [uri, setUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [identificador, setIdentificador] = useState("");

  const carregarPlaca = () => {};

  const navigation = useNavigation();

  const sendApi = async () => {
    if (uri) {
      const img = await converterParaBase64(uri);
      const objImg = { img: img };
      const res = await axios.post(
        "sendImgapi/identificador",
        JSON.stringify(objImg)
      );
      if ((res.status = 200)) {
        ToastAndroid.show("Moto identificada", ToastAndroid.LONG);
        setLoading(false);
        const data = res.data as dataInterface;
        setIdentificador(data.identificador);
      }
    } else {
      ToastAndroid.show(
        "Não foi possível identificar a moto, tire outra foto!",
        ToastAndroid.LONG
      );
    }
  };

  const sendApiMock = async () => {
    if (uri) {
      const img = await converterParaBase64(uri);
      const objImg = { img: img };
      if (true) {
        // ToastAndroid.show("Moto identificada", ToastAndroid.LONG);
        setLoading(false);
        const strListaMotos = await AsyncStorage.getItem("listaMotos");
        const data: motoInterfaceTeste[] = await JSON.parse(
          strListaMotos ? strListaMotos : "[]"
        );
        const rastreador = data.find((moto) =>
          moto.identificador.toUpperCase().includes("ABC-9090")
        );
        setIdentificador("ABC-9090");
        ToastAndroid.show(`Moto: ${identificador} `, ToastAndroid.LONG);
        console.log(identificador);
      }
    } else {
      ToastAndroid.show(
        "Não foi possível identificar a moto, tire outra foto!",
        ToastAndroid.LONG
      );
    }
  };

  const loadMotos = async () => {
    await AsyncStorage.setItem(
      "listaMotos",
      JSON.stringify(motoInterfaceTesteList)
    );
  };

  useEffect(() => {
    loadMotos();
  }, [uri]);
  return (
    <View
      style={[
        styles.container,
        styles.pageColor,
        { justifyContent: "space-between", paddingBottom: 64 },
      ]}
    >
      <View
        style={[
          styles.container,
          {
            display: identificador ? "none" : "flex",
          },
        ]}
      >
        <CameraSecao
          uri={uri}
          setUri={setUri}
          mandarParaForm={sendApiMock}
        ></CameraSecao>
        <Text
          style={[
            styles.whiteText,
            {
              fontSize: 16,
              textAlign: "center",
              paddingTop: 16,
              width: "80%",
              alignSelf: "center",
            },
          ]}
        >
          Para adicionar rastreador é preciso tirar uma foto da placa.
        </Text>
      </View>

      {identificador && !loading ? (
        <View style={styles.container}>
        <FormularioPagina
          identificador={identificador}
          setIdentificador={setIdentificador}
          setLoading={setLoading}
        />
        </View>
      ) : (
        <View></View>
      )}
    </View>
  );
}
