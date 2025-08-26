import { Entypo, Ionicons, MaterialIcons } from "@expo/vector-icons";
import Fontisto from "@expo/vector-icons/Fontisto";
import React from "react";
import { FlatList, ListRenderItemInfo, Text, View } from "react-native";
import { globalStyles } from "../../styles/styles";
import ModalMapaComponent from "./ModalMapaComponent";
import { mapaComponentStyles } from "./MapaComponentStyles";
import SecaoMapa from "./SecaoMapa";
import { MotoViewTeste } from "../../utils/interfacesTeste";
import { useMoto } from "@/control/MotoControl";
import VisualizadorMotos from "./VisualizadorMotos";

export default function MapaComponent() {
  const {
    atualizarCorMoto,
    listaMotos,
    modalVisible,
    abrirModal,
    motoView,
    setModalVisible,
  } = useMoto();
  return (
    <View style={mapaComponentStyles.container}>
      <Text style={globalStyles.paragraph_black}>Pátio</Text>
      <VisualizadorMotos listaMotos={listaMotos} abrirModal={abrirModal}  /> 
      <View style={mapaComponentStyles.sectionsRow}>
        <SecaoMapa titulo="Conserto" areaStyle={mapaComponentStyles.consertoArea}>
          <MaterialIcons name="report-problem" size={16} color="black" />
        </SecaoMapa>
        <SecaoMapa titulo="Qualidade" areaStyle={mapaComponentStyles.qualidadeArea}>
          <Ionicons name="ribbon-sharp" size={20} color="black" />
        </SecaoMapa>
      </View>
      <View style={mapaComponentStyles.bottomSectionsRow}>
        <View style={mapaComponentStyles.leftSectionsContainer}>
          <SecaoMapa titulo="Administrativo" areaStyle={mapaComponentStyles.administrativoArea}>
            <MaterialIcons
              name="admin-panel-settings"
              size={24}
              color="black"
            />
          </SecaoMapa>
          <SecaoMapa titulo="Estoque" areaStyle={mapaComponentStyles.estoqueArea}>
            <Entypo name="box" size={24} color="black" />
          </SecaoMapa>
        </View>
        <View style={mapaComponentStyles.rightSectionsContainer}>
          <SecaoMapa titulo="Recepção" areaStyle={mapaComponentStyles.recepcaoArea}>
            <MaterialIcons name="person" size={24} color="black" />
          </SecaoMapa>
        </View>
      </View>
      {motoView && (
        <ModalMapaComponent
          motoView={motoView}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          atualizarComMoto={atualizarCorMoto}
        />
      )}
    </View>
  );
}
