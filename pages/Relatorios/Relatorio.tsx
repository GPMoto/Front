import { ParamListBase } from "@react-navigation/native";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { styles } from "../../styles/styles";
import {
  AntDesign,
  Entypo,
  FontAwesome,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import ModalIncidentes from "./ModalIncidentes";
import { incidentes } from "../../Util/listaIncidentes";

interface Relatorio {
  incidente: string;
}

interface RelatorioProps {
  relatorio: Relatorio;
}

export default function Relatorio() {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  return (
    <View style={styles.container_center}>
      <Text
        style={{
          color: "#41C526",
          fontSize: 20,
          marginBottom: 10,
        }}
      >
        Consertos - Insights
      </Text>
      <View
        style={{
          backgroundColor: "#2C2C2C",
          borderColor: "#1A1A1A",
          borderRadius: 16,
          padding: 15,
          borderWidth: 3,
          gap: 10,
          width: "90%",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Text style={{ fontWeight: "bold", color: "white" }}>Motos</Text>
          <AntDesign name="calendar" size={24} color="#41C526" />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Entypo name="triangle-down" size={24} color="#41C526" />
          <Text style={{ fontWeight: "bold", color: "#41C526" }}>Jan/2025</Text>
          <Text style={{ color: "white", fontWeight: "bold" }}>
            - 200 consertos feitos{" "}
          </Text>
        </View>
        <Text style={{ color: "#A44949", fontWeight: "bold" }}>
          33 consertos a fazer
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 15,
          }}
        >
          <View style={{ gap: 5 }}>
            <Text style={{ color: "#49A44C", fontWeight: "bold" }}>
              Principal incidente
            </Text>
            <Text style={{ color: "white" }}>Chassi enferrujado</Text>
          </View>
          <View style={{ gap: 5 }}>
            <Text style={{ color: "#49A44C", fontWeight: "bold" }}>
              Outros incidentes
            </Text>
            <Pressable
              style={{
                paddingVertical: 3,
                paddingHorizontal: 12,
                backgroundColor: "#3D3D3D",
                borderRadius: 8,
                flexDirection: "row",
              }}
              onPress={() => {
                setModalVisible(true);
              }}
            >
              <Text
                style={{
                  color: "white",
                }}
              >
                {incidentes[0].substring(0, 11)}...
              </Text>
              <Ionicons name="resize-sharp" size={24} color="#49A44C" />
            </Pressable>
          </View>
        </View>
      </View>
      <View
        style={{
          backgroundColor: "#2C2C2C",
          borderColor: "#1A1A1A",
          borderRadius: 16,
          padding: 15,
          borderWidth: 3,
          gap: 10,
          width: "90%",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
              backgroundColor: "#3D3D3D",
              paddingVertical: 16,
              paddingHorizontal: 9,
              borderRadius: 8,
            }}
          >
            <Text style={{ fontWeight: "bold", color: "#41C526" }}>
              Jan/25{" "}
            </Text>
            <AntDesign name="calendar" size={24} color="#41C526" />
          </View>
          <View
            style={{
              gap: 10,
              alignItems: "center",
            }}
          >
            <MaterialIcons name="compare-arrows" size={24} color="#41C526" />
            <Text style={{ color: "white", fontSize: 12 }}>Comparar</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
              backgroundColor: "#3D3D3D",
              paddingVertical: 16,
              paddingHorizontal: 9,
              borderRadius: 8,
            }}
          >
            <Text style={{ fontWeight: "bold", color: "#41C526" }}>
              Mai/25{" "}
            </Text>
            <AntDesign name="calendar" size={24} color="#41C526" />
          </View>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
            flexDirection: "row",

          }}
        >
          <Entypo name="triangle-up" size={24} color="#A44949" />
          <Text style={{ fontWeight: "bold", color: "#A44949" }}>33%</Text>
        </View>
        <Text style={{ color: "white", textAlign: 'center', fontSize: 14 }}>
          200 consertos a mais no mês de Janeiro de 2025
        </Text>
      </View>
      <ModalIncidentes
        listaIncidentes={incidentes}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </View>
  );
}
