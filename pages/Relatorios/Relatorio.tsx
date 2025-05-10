import { ParamListBase } from "@react-navigation/native";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { styles } from "../../styles/styles";
import { AntDesign, Entypo, FontAwesome, Ionicons } from "@expo/vector-icons";

interface Relatorio {
  incidente: string;
}

interface RelatorioProps {
  relatorio: Relatorio;
}

export default function Relatorio() {
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
          }}
        >
          <View>
            <Text style={{ color: "#49A44C", fontWeight: "bold" }}>
              Principal incidente
            </Text>
            <Text style={{ color: "white" }}>Chassi enferrujado</Text>
          </View>
          <View>
            <Text style={{ color: "#49A44C", fontWeight: "bold" }}>
              Outros incidentes
            </Text>
            <Pressable
              style={{
                paddingVertical: 3,
                paddingHorizontal: 12,
                backgroundColor: "#3D3D3D",
                borderRadius: 8,
                flexDirection: 'row'
              }}
            >
              <Text
                style={{
                  color: "white",
                }}
              >
                Motor falhando...
              </Text>
              <Ionicons name="resize-sharp" size={24} color="#49A44C" />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}
