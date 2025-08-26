import { FlatList, ListRenderItemInfo, View } from "react-native";
import { mapaComponentStyles } from "./MapaComponentStyles";
import { MotoData } from "@/utils/Interfaces";
import { MotoViewTeste } from "@/utils/interfacesTeste";
import { Fontisto } from "@expo/vector-icons";

interface VisualizadorMotosProps {
  listaMotos: MotoViewTeste[];
  abrirModal: (item: MotoViewTeste) => void;
}

export default function VisualizadorMotos(props: VisualizadorMotosProps) {
  return (
    <View style={mapaComponentStyles.patioContainer}>
      <FlatList
        numColumns={8}
        data={props.listaMotos}
        renderItem={({ item }: ListRenderItemInfo<MotoViewTeste>) => (
          <Fontisto
            name="motorcycle"
            size={20}
            color={item.color}
            onPress={() => {
              props.abrirModal(item);
            }}
          />
        )}
        keyExtractor={(item: MotoViewTeste) => "moto_key_" + item.id}
        contentContainerStyle={mapaComponentStyles.flatListContent}
        columnWrapperStyle={mapaComponentStyles.flatListColumn}
        style={mapaComponentStyles.flatListStyle}
      />
    </View>
  );
}
