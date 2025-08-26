import { Text, View } from "react-native";
import { styles } from "../../styles/styles";
import MapaComponent from "../../components/MapaComponent/MapaComponent";
import { ScrollView } from "react-native";

export default function Inicio() {
  return (
    <View style={styles.container_center}>
       
        <View style={{ height: 20 }}></View>
        <MapaComponent />
    </View>
  );
}
