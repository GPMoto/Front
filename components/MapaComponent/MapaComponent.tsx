import React, { useState } from "react";
import { Text, ToastAndroid, View } from "react-native";
import { styles } from "../../styles/styles";
import Fontisto from "@expo/vector-icons/Fontisto";

type Moto = {
  id: number;
  uwb: number;
  color: string;
};

export default function Mapa() {
  const obj: Moto = {
    id: Math.floor(Math.random() * 10000),
    uwb: Math.floor(Math.random() * 10000),
    color: "black",
  };

  const inicializarMotos = (): Moto[] => {
    return Array.from({ length: 60 }, () => ({
      id: Math.floor(Math.random() * 10000),
      uwb: Math.floor(Math.random() * 10000),
      color: "black",
    }));
  };

  const [listaMotos, setListaMotos] = useState<Moto[]>(inicializarMotos);

  const atualizarCorMoto = (motoId: number) => {
    setListaMotos((listaAntiga) =>
      listaAntiga.map((moto) =>
        moto.id === motoId
          ? moto.color === "#41C526"
            ? { ...moto, color: "black" }
            : { ...moto, color: "#41C526" }
          : moto
      )
    );
    ToastAndroid.show("Moto selecionada!", ToastAndroid.SHORT);
  };

  return (
    <View
      style={{
        borderWidth: 3,
        borderColor: "#41C526",
        backgroundColor: "#D9D9D9",
        borderRadius: 16,
        padding: 20,
        gap: 15,
        maxWidth: 550,
        alignItems: 'center'
      }}
    >
      <Text style={styles.paragraph_black}>Pátio</Text>
      <View
        style={{
          borderRadius: 8,
          padding: 10,
          borderColor: "black",
          borderWidth: 1,
          flexWrap: "wrap",
          width: "80%",
          maxWidth: 500,
          alignSelf: "center",
          flexDirection: "row",
          gap: 20,
          justifyContent: "center",
        }}
      >
        {listaMotos.map((moto, index) => (
          <Fontisto
            name="motorcycle"
            size={24}
            color={moto.color}
            key={index}
            onPress={() => atualizarCorMoto(moto.id)}
          />
        ))}
      </View>
    </View>
  );
}
