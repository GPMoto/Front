import { Text, View } from "react-native";
import MapaComponent from "../../components/MapaComponent/MapaComponent";
import { styles } from "../../styles/styles";

export default function Mapa() {
  return (
    <View style={styles.container}>
      <MapaComponent />
    </View>
  );
}
