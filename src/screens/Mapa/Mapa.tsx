import { Text, View } from "react-native";
import MapaComponent from "../../components/MapaComponent/MapaComponent";
import { globalStyles } from "../../styles/styles";

export default function Mapa() {
  return (
    <View style={globalStyles.container}>
      <MapaComponent />
    </View>
  );
}
