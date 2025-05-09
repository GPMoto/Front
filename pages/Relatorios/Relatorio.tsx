import { ParamListBase } from '@react-navigation/native'
import React from 'react'
import { Text, View } from 'react-native'
import { styles } from '../../styles/styles'
import { AntDesign, Entypo, FontAwesome } from '@expo/vector-icons'



interface Relatorio {
    incidente : string    

}


interface RelatorioProps {
    relatorio : Relatorio

}

export default function Relatorio() {
  return (
    <View style={styles.container_center}>
        <Text style={{
            color: '#41C526',
            fontSize: 20,
            marginBottom: 10
        }}>
            Consertos - Insights
        </Text>
        <View style={{
            backgroundColor: "#3D3D3D",
            borderColor: '#2C2C2C',
            borderRadius: 16,
            padding: 15,
            borderWidth: 3,
            gap: 10,
            width: "90%"
        }}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 10
            }}>
                <Text style={{fontWeight: 'bold', color: "white"}}>Motos</Text>
                <AntDesign name="calendar" size={24} color="#41C526" />
            </View>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                gap: 10
            }}>
                <Entypo name="triangle-down" size={24} color="#41C526" />
                <Text style={{fontWeight: 'bold', color: "#41C526"}}>Jan/2025</Text>
            </View>

        </View>
    </View>
  )
}
