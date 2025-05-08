import { Text, View } from "react-native";
import CameraSecao from "./components/CameraSecao/CameraSecao";
import { styles } from "../../styles/styles";


export default function AdicionarRastreador() {
  return (
    <View style={[styles.container]}>
        <Text>AdicionarRastreador</Text>
        <CameraSecao></CameraSecao>
    </View>
  )
}
