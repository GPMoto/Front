import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import {
  Image,
  Modal,
  Text,
  ToastAndroid,
  View
} from "react-native";
// import { MotoView } from "../../utils/types/Moto";
import ButtonArea from "../Button/ButtonArea";
import { MotoViewTeste } from "../../utils/interfacesTeste";

interface ModalMapaProps {
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  motoView: MotoViewTeste;
  atualizarComMoto: (motoId: number) => void;
}

export default function ModalMapaComponent({
  modalVisible,
  setModalVisible,
  motoView,
  atualizarComMoto
}: ModalMapaProps) {
  const catchRightImage = {
    "Mottu Sport": require(`../../assets/sport.png`),
    "Mottu E": require(`../../assets/e.png`),
    "Mottu Pop": require(`../../assets/pop.png`),
  };

  const rightName = (motoName: string) => {
    switch (motoName) {
      case "Mottu Sport":
        return require(`../../assets/sport.png`);
      case "Mottu E":
        return require(`../../assets/e.png`);
      case "Mottu Pop":
        return require(`../../assets/pop.png`);
      default:
        return require(`../../assets/pop.png`);
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      backdropColor={"gray"}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <View
          style={{
            width: 300,
            padding: 20,
            backgroundColor: "rgba(196, 196, 196, 0.85)",
            borderRadius: 10,
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              left: 6,
              top: 6,
              position: "absolute",
            }}
          >
            <FontAwesome
              name="close"
              color="#41C526"
              size={30}
              onPress={() => {
                atualizarComMoto(motoView.id!);
                setModalVisible(false);
              }}
            />
          </View>
          <View
            style={{
              padding: 20,
              gap: 15,
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 28, color: "black", fontWeight: "bold" }}>
              {motoView.motoData.idTipoMoto.nmTipo}
            </Text>
            <Text style={{ fontSize: 16, color: "black" }}>
              {motoView.motoData.identificador}
            </Text>
            <View style={{
              flexDirection: 'row',
              gap: 10, 
              justifyContent: 'flex-start',
              alignItems: 'center'
            }}>
              <Text style={{ fontSize: 18, color: "green", fontWeight: "bold" }}>
                Status:
              </Text>
              <Text style={{ fontSize: 16, color: "black" }}>
                {motoView.motoData.condicoes}
              </Text>
            </View>
            <View style={{
              flexDirection: 'row',
              gap: 10, 
              justifyContent: 'flex-start',
              alignItems: 'baseline'
            }}>
              <Text style={{ fontSize: 18, color: "green", fontWeight: "bold" }}>
                Manutenção:
              </Text>
              <Text style={{ fontSize: 16, color: "black", width: 100, flexWrap: "wrap", textAlign: 'center' }}>
                {motoView.motoData.condicoesManutencao}
              </Text>
            </View>
            <Image
              source={rightName(motoView.motoData.idTipoMoto.nmTipo)}
              style={{ width: 150, height: 150, alignSelf: "center" }}
            />
            <View
              style={{
                flexDirection: "row",
                gap: 10,
                justifyContent: 'center'
              }}
            >
              <ButtonArea
                size="small"
                title="Editar"
                action={() =>
                  ToastAndroid.show("Está funcionando", ToastAndroid.LONG)
                }
                additionalStyles={{
                  paddingHorizontal: 60
                }}
              />
             
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}
