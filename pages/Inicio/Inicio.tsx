import { Text, View } from 'react-native'
import { styles } from '../../styles/styles'
import Mapa from '../../components/MapaComponent/MapaComponent'

export default function Inicio() {
  return (
    <View style={styles.container_center}>
        <Text style={styles.paragraph}>Olá, seja bem vindo de volta</Text>
        <Text style={styles.highlight}>Gustavo</Text>
        <View style={{height: 20}}></View>
        <Mapa /> 
    </View>
  )
}
