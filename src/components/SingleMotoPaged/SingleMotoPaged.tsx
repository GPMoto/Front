import { Moto } from "@/model/Moto";
import { Text, View } from "react-native";

export default function SingleMotoPaged(item : Moto){
    return (
        <View
            style={{
              padding: 10,
              borderBottomWidth: 1,
              borderBottomColor: "#ccc",
            }}
          >
            <Text>ID: {item.idMoto}</Text>
            <Text>Identificador: {item.identificador}</Text>
            <Text>Condições: {item.condicoes}</Text>
            <Text>Manutenção: {item.condicoesManutencao}</Text>
          </View>
    )
}