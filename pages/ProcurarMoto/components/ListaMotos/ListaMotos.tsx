import React from 'react'
import { FlatList, View } from 'react-native'
import { motoInterface } from '../../../../utils/Interfaces'
import { ParamListBase } from '@react-navigation/native';
import MotoItem from '../MotoItem/MotoItem';


interface ListaMotosProps extends ParamListBase {
    data:motoInterface[];
}

export default function ListaMotos(props:ListaMotosProps) {
  return (
    <View>
        <FlatList data={props.data} renderItem={MotoItem}></FlatList>

    </View>
  )
}
