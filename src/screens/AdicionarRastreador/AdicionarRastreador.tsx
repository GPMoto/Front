import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { globalStyles } from "../../styles/styles";
import useAdicionarRastreador from "@/control/AdicionarRastreadorController";
import { FontAwesome as Icon } from "@expo/vector-icons";
import { Identificador } from "@/model/Identificador";

export default function AdicionarRastreador() {
  const { identificadoresFilial, openCamera } = useAdicionarRastreador();

  const loading = identificadoresFilial.isLoading;
  const error = identificadoresFilial.isError;
  const identificadores = identificadoresFilial.data?.content ?? [];

  return (
    <View style={[globalStyles.container, globalStyles.pageColor]}>
      <View style={styles.header}>
        <Text style={styles.title}>Adicionar Rastreador</Text>
        <Text style={styles.subtitle}>
          Tire uma foto da placa ou selecione um identificador abaixo.
        </Text>
      </View>

      {loading ? (
        <View style={styles.emptyContainer}>
          <Text style={globalStyles.whiteText}>
            Carregando identificadores...
          </Text>
        </View>
      ) : error ? (
        <View style={styles.emptyContainer}>
          <Text style={globalStyles.whiteText}>Erro carregando dados</Text>
        </View>
      ) : (
        <FlatList
          data={identificadores}
          keyExtractor={(item: Identificador) => `${item.idIdentificador}`}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardLeft}>
                <Icon name="id-badge" size={20} color="#41C526" />
              </View>
              <View style={styles.cardBody}>
                <Text style={styles.identificadorText}>
                  {item.vlrIdentificador}
                </Text>
                <Text style={styles.identificadorSub}>
                  {item.idFilial?.idContato.nmDono || ""}
                </Text>
              </View>
            </View>
          )}
        />
      )}

      <TouchableOpacity style={styles.fab} onPress={openCamera}>
        <Icon name="camera" size={24} color="#0C0C0C" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: 16,
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "bold",
  },
  subtitle: {
    color: "#BFC9B8",
    marginTop: 6,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  list: {
    paddingBottom: 120,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1F1F1F",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(65,197,38,0.08)",
  },
  cardLeft: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(65,197,38,0.12)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  cardBody: {
    flex: 1,
  },
  identificadorText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 16,
  },
  identificadorSub: {
    color: "#BFC9B8",
    fontSize: 12,
    marginTop: 4,
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 28,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#41C526",
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
  },
});
