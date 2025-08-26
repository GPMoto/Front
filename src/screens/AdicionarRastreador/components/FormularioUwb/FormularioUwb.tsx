import { Text, ToastAndroid, View } from "react-native";
import InputLabel from "../../../../components/InputLabel/InputLabel";
import { useState } from "react";
import ButtonArea from "../../../../components/Button/ButtonArea";
import axios from "axios";
import { styles } from "../../../../styles/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { uwbInterfaceTeste } from "../../../../utils/interfacesTeste";

interface FormularioUwbProps {
  identificador: string;
  setIdentificador: (value: string) => void;
  setLoading: (value: boolean) => void;
}

export default function FormularioUwb(props: FormularioUwbProps) {
  const [condicoesManutencao, setCondicoesManutencao] = useState("");
  const [id, setId] = useState(0);

  const enviaDados = async () => {
    if (condicoesManutencao && id) {
      const moto = { condicoesManutencao, idIdentificador: id };
      const res = await axios.post("url/postMoto", JSON.stringify(moto));
      if ((res.status = 201)) {
        ToastAndroid.show("Rastreador adicionado", ToastAndroid.LONG);
        props.setLoading(false);
        setCondicoesManutencao("");
        setId(0);
        props.setIdentificador("");
      } else {
        ToastAndroid.show(
          "Não foi possivel adicionar rastreador.",
          ToastAndroid.LONG
        );
      }
    } else {
      ToastAndroid.show("Preencha os campos!", ToastAndroid.LONG);
    }
  };

  const salvarMotoComUwb = async (
    identificador: string,
    condicoesManutencao: string,
    rastreadorId: number
  ) => {
    try {
      const strUwbs = await AsyncStorage.getItem("uwbMotos");
      let uwbs: uwbInterfaceTeste[] = JSON.parse(strUwbs ? strUwbs : "[]");

      const uwbIndex = uwbs.findIndex((uwb) => uwb.idUwb === rastreadorId);

      if (uwbIndex !== -1) {
        uwbs[uwbIndex].moto.identificador = identificador;
        uwbs[uwbIndex].moto.condicoesManutencao = condicoesManutencao;
      }

      await AsyncStorage.setItem("uwbMotos", JSON.stringify(uwbs));
      return true;
    } catch (error) {
      ToastAndroid.show(
        "Não foi possivel adicionar rastreador.",
        ToastAndroid.LONG
      );
      return false;
    }
  };

  const enviaDadosMock = async () => {
    if (condicoesManutencao && id) {
      if (
        await salvarMotoComUwb(props.identificador, condicoesManutencao, id)
      ) {
        ToastAndroid.show("Rastreador adicionado", ToastAndroid.LONG);
        props.setLoading(false);
        setCondicoesManutencao("");
        setId(0);
        props.setIdentificador("");
      } else {
        ToastAndroid.show(
          "Não foi possivel adicionar rastreador.",
          ToastAndroid.LONG
        );
      }
    } else {
      ToastAndroid.show("Preencha os campos!", ToastAndroid.LONG);
    }
  };

  const voltarCamera = () => {
    props.setIdentificador("");
  };

  return (
    <View>
      <Text style={[styles.paragraph, { textAlign: "center" }]}>
        Adicionar Informações da moto {props.identificador}
      </Text>
      <View>
        <InputLabel
          title="Id do rastreador"
          show={false}
          setValue={(e) => setId(parseInt(e))}
          value={id.toString()}
          placeholder="Adicionar id do rastreador"
        ></InputLabel>
        <InputLabel
          title="Condições de manutenção"
          show={false}
          setValue={setCondicoesManutencao}
          value={condicoesManutencao}
          placeholder="Coloque a condição de manutenção"
        ></InputLabel>
        <View style={{ flexDirection: "row", gap: 5 }}>
          <ButtonArea
            additionalStyles={{ marginVertical: 10 }}
            size="small"
            title="Salvar"
            action={() => enviaDadosMock()}
          ></ButtonArea>
          <ButtonArea
            additionalStyles={{ marginVertical: 10 }}
            size="small"
            title="Câmera"
            action={() => voltarCamera()}
          ></ButtonArea>
        </View>
      </View>
    </View>
  );
}
