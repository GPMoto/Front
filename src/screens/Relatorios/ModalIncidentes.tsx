import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { View, Modal, ToastAndroid, Image, Text } from "react-native";
import ButtonArea from "../../components/Button/ButtonArea";

interface OutrosIncidentesProps {
  setModalVisible: (value: boolean) => void;
  modalVisible: boolean;
  listaIncidentes: string[];
}

export default function ModalIncidentes({
  listaIncidentes,
  modalVisible,
  setModalVisible,
}: OutrosIncidentesProps) {
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
            backgroundColor: "rgba(61, 61, 61, 0.85)",
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
              left: 12,
              top: 6,
              position: "absolute",
            }}
          ></View>
          <View
            style={{
              padding: 20,
              gap: 15,
              justifyContent: "center",
            }}
          >
            {listaIncidentes.map((incidente, index) => (
              <Text
                style={{ fontSize: 16, color: "white", textAlign: "left" }}
                key={index}
              >
                {index + 1}. {incidente}
              </Text>
            ))}

            <View
              style={{
                flexDirection: "row",
                gap: 10,
                justifyContent: "center",
              }}
            >
              <ButtonArea
                size="small"
                title="Fechar"
                action={() => {
                  setModalVisible(false);
                }}
                additionalStyles={{
                  width: '100%',
                  alignSelf: 'stretch',
                  paddingHorizontal: 20,
                  marginTop: 10
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}
