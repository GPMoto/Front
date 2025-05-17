import React from 'react'
import { ListRenderItemInfo, Text, View } from 'react-native'
import { motoInterface } from '../../../../utils/Interfaces'
import { motoInterfaceTeste } from '../../../../utils/interfacesTeste'

export default function MotoItem(props: ListRenderItemInfo<motoInterfaceTeste>) {
  return (
    <View style={{
      margin: 10,
      padding: 5,
    }}>
        <Text style={{fontWeight: 'bold'}}>Identificador {props.item.identificador}</Text>
        <Text>Conserto: {props.item.condicoesManutencao}</Text>
        <Text>Localização: {Math.floor(Math.random() * 100)} x, {Math.floor(Math.random() * 100)} y</Text>
    </View>
  )
}
