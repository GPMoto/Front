import React, { useState } from "react";
import { ListRenderItemInfo, Pressable, Text, View } from "react-native";
import { motoInterface } from "../../../../utils/Interfaces";
import { motoInterfaceTeste } from "../../../../utils/interfacesTeste";
import ModalMapaComponent from "../../../../components/MapaComponent/ModalMapaComponent";

export default function MotoItem(
  props: ListRenderItemInfo<motoInterfaceTeste>
) {
  return (
    <>
      <Pressable
        style={{
          margin: 10,
          padding: 5,
        }}
        // onPress={
        //   () => props.setVisible(true)
        // }
      >
        <Text style={{ fontWeight: "bold" }}>
          Identificador {props.item.identificador}
        </Text>
        <Text style={{ fontWeight: "700" }}>
          {" "}
          {props.item.idTipoMoto.nmTipo}
        </Text>
        <Text>Conserto: {props.item.condicoesManutencao}</Text>
        <Text>
          Localização: {Math.floor(Math.random() * 100)} x,{" "}
          {Math.floor(Math.random() * 100)} y
        </Text>
      </Pressable>
      {/* {visible ? (<ModalMapaComponent
        setModalVisible={setVisible}
        motoData={props.item}
        modalVisible={visible}
      />) : null} */}
    </>
  );
}
