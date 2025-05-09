import Fontisto from "@expo/vector-icons/Fontisto";
import React, { useState } from "react";
import {
  FlatList,
  ListRenderItemInfo,
  Text,
  ToastAndroid,
  View,
} from "react-native";
import { styles } from "../../styles/styles";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

type Moto = {
  id: number;
  uwb: number;
  color: string;
};

export default function MapaComponent() {
  // const obj: Moto = {
  //   id: Math.floor(Math.random() * 10000),
  //   uwb: Math.floor(Math.random() * 10000),
  //   color: "black",
  //   clicked: false
  // };

  const inicializarMotos = (): Moto[] => {
    return Array.from({ length: 100 }, () => ({
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
  };

  return (
    <View
      style={{
        // borderWidth: 1,
        // borderColor: "#41C526",
        backgroundColor: "#D9D9D9",
        borderRadius: 4,
        padding: 10,
        gap: 2,
        maxWidth: "90%",
        alignSelf: "center",
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
          flexDirection: "row",
          gap: 20,
          justifyContent: "center",
          height: 200,
          alignSelf: "center",
        }}
      >
        <FlatList
          numColumns={8} // Define o número de colunas
          data={listaMotos}
          renderItem={({ item }: ListRenderItemInfo<Moto>) => (
            <Fontisto
              name="motorcycle"
              size={20}
              color={item.color}
              onPress={() => {
                atualizarCorMoto(item.id);
                ToastAndroid.show(
                  `Moto selecionada ${item.id}: uwb ${item.uwb}!`,
                  ToastAndroid.SHORT
                );
              }}
            />
          )}
          keyExtractor={(item: Moto) => "moto_key_" + item.id}
          contentContainerStyle={{
            gap: 10, // Espaçamento entre os itens
            justifyContent: "center",
          }}
          columnWrapperStyle={{
            justifyContent: "center", // Centraliza as colunas
            gap: 20, // Espaçamento entre as colunas
          }}
          style={{
            maxHeight: 180, // Limita a altura visível
          }}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "stretch",
          width: "100%",
          gap: 10,
        }}
      >
        <View style={{ paddingVertical: 4, gap: 2 }}>
          <Text style={{ fontSize: 14, color: "black" }}>Conserto</Text>
          <View
            style={{
              borderRadius: 8,
              padding: 5,
              borderColor: "black",
              borderWidth: 1,
              flexWrap: "wrap",
              flexDirection: "row",
              gap: 20,
              justifyContent: "flex-start",
              height: 100,
              width: 100,
              backgroundColor: "#A44949",
              alignSelf: "center",
              alignItems: "flex-start",
            }}
          >
            <MaterialIcons name="report-problem" size={16} color="black" />
          </View>
        </View>
        <View style={{ paddingVertical: 4, gap: 2 }}>
          <Text style={{ fontSize: 14, color: "black" }}>Conserto</Text>
          <View
            style={{
              borderRadius: 8,
              padding: 5,
              borderColor: "black",
              borderWidth: 1,
              flexWrap: "wrap",
              flexDirection: "row",
              gap: 20,
              justifyContent: "flex-start",
              flex: 1,
              backgroundColor: "#49A44C",
              alignSelf: "center",
              alignItems: "flex-start",
              height: 100,
              width: 170
            }}
          >
            <MaterialIcons name="report-problem" size={16} color="black" />
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 10,
        }}
      >
        <View style={{ height: "100%", alignItems: "stretch" }}>
          <View style={{ paddingVertical: 4, gap: 2 }}>
            <Text style={{ fontSize: 14, color: "black" }}>Administrativo</Text>
            <View
              style={{
                borderRadius: 8,
                padding: 5,
                borderColor: "black",
                borderWidth: 1,
                flexWrap: "wrap",
                flexDirection: "row",
                gap: 20,
                justifyContent: "flex-start",
                width: 165,
                backgroundColor: "#A4A449",
                alignItems: "flex-start",
                height: 100,
              }}
            >
              <MaterialIcons
                name="admin-panel-settings"
                size={24}
                color="black"
              />
            </View>
          </View>
          <View style={{ paddingVertical: 4, gap: 2 }}>
            <Text style={{ fontSize: 14, color: "black" }}>Estoque</Text>
            <View
              style={{
                borderRadius: 8,
                padding: 5,
                borderColor: "black",
                borderWidth: 1,
                flexWrap: "wrap",
                flexDirection: "row",
                gap: 20,
                justifyContent: "flex-start",
                width: 165,
                backgroundColor: "#5049A4",
                alignItems: "flex-start",
                height: 100,
              }}
            >
              <MaterialIcons name="content-paste" size={24} color="black" />
            </View>
          </View>
        </View>
        <View style={{alignItems: 'flex-start', height: '100%'}}>
          <View style={{ paddingVertical: 4, gap: 2}}>
            <Text style={{ fontSize: 14, color: "black" }}>Recepção</Text>
            <View
              style={{
                borderRadius: 8,
                padding: 5,
                borderColor: "black",
                borderWidth: 1,
                flexWrap: "wrap",
                flexDirection: "row",
                gap: 20,
                justifyContent: "flex-start",
                width: 100,
                height: 225,
                backgroundColor: "#A4499E",
                alignItems: "flex-start",
              }}
            >
              <MaterialIcons name="person" size={24} color="black" />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
