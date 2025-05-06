import React from 'react'
import { ListRenderItemInfo, Text, View } from 'react-native'
import { motoInterface } from '../../../../Util/Interfaces'

export default function MotoItem(props: ListRenderItemInfo<motoInterface>) {
  return (
    <View>
        <Text>Identificador {props.item.identificador}</Text>
        <Text>Conserto: {props.item.condicoesManutencao}</Text>
        <Text>Localização: {props.item.idFilial.idEndereco.nmlogradouro}</Text>
    </View>
  )
}
