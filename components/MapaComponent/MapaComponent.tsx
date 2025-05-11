import { Entypo, Ionicons, MaterialIcons } from "@expo/vector-icons";
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
import { motoViewMockList } from "../../Util/motoMockList";
import { MotoView } from "../../Util/Interfaces";
import ModalMapaComponent from "./ModalMapaComponent";

export default function MapaComponent() {

  const [listaMotos, setListaMotos] = useState<MotoView[]>(motoViewMockList);

  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const [motoView, setMotoView] = useState<MotoView>({
    id: 2,
    clicked: false,
    color: "black",
    uwb: 900,
    motoData: {
      id: 2,
      identificador: "DOG-1010",
      nome: "Mottu",
      status: "Problema no motor",
      uwb: 900,
    }

  });

  const atualizarCorMoto = (motoId: number) => {
    setListaMotos((listaAntiga) =>
      listaAntiga.map((moto) =>
        moto.id === motoId
          ? {
            ...moto,
            clicked: !moto.clicked,
            color: !moto.clicked ? "#41C526" : "black",
          }
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
          renderItem={({ item }: ListRenderItemInfo<MotoView>) => (
            <Fontisto
              name="motorcycle"
              size={20}
              color={item.color}
              onPress={() => {
                atualizarCorMoto(item.id!);
                setMotoView(item);
                setModalVisible(true);
                ToastAndroid.show(
                  `Moto selecionada ${item.id}: uwb ${item.uwb}!`,
                  ToastAndroid.SHORT
                );

              }}
            />
          )}
          keyExtractor={(item: MotoView) => "moto_key_" + item.id}
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
          <Text style={{ fontSize: 14, color: "black" }}>Qualidade</Text>
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
              width: 170,
            }}
          >
            <Ionicons name="ribbon-sharp" size={20} color="black" />
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
              <Entypo name="box" size={24} color="black" />
            </View>
          </View>
        </View>
        <View style={{ alignItems: "flex-start", height: "100%" }}>
          <View style={{ paddingVertical: 4, gap: 2 }}>
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
      <ModalMapaComponent
        motoView={motoView}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        atualizarComMoto={atualizarCorMoto}
      />
    </View>
  );
}
