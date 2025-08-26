import { Text, View } from "react-native";
import { globalStyles } from "../../styles/styles";
import MapaComponent from "../../components/MapaComponent/MapaComponent";
import { ScrollView } from "react-native";

export default function Inicio() {
  return (
    <View style={globalStyles.container_center}>
       
        <View style={{ height: 20 }}></View>
        <MapaComponent />
    </View>
  );
}
