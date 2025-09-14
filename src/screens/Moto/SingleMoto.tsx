import { DrawerParamList } from "@/navigators/NavigationTypes";
import { RouteProp, useRoute } from "@react-navigation/native";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import { useMoto } from "@/control/MotoControl";
import ButtonArea from "@/components/Button/ButtonArea";

const SingleMoto = () => {
  const route = useRoute<RouteProp<DrawerParamList, "Moto">>();

  if (!route.params?.moto) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Erro: Moto não encontrada</Text>
      </View>
    );
  }

  const { editing, moto: routeMoto } = route.params;
  const { editingMoto, handleEditingMoto, handleEditingMode } = useMoto({});

  const moto = editingMoto ?? routeMoto;

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          {/* Header */}
          <View style={styles.header}>
            <MaterialIcons name="motorcycle" size={32} color="#41C526" />
            <View style={styles.headerText}>
              <Text style={styles.title}>Moto #{moto.idMoto}</Text>
              <Text style={styles.subtitle}>Informações detalhadas</Text>
            </View>
          </View>

          {/* Informações */}
          <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Placa</Text>
              {!editing ? (
                <Text style={styles.infoValue}>{moto.placa}</Text>
              ) : (
                <TextInput
                  value={moto.placa}
                  onChangeText={(text) => handleEditingMoto(text, "placa")}
                  style={[styles.infoValue, { backgroundColor: "gray" }]}
                />
              )}
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Status</Text>
              <Text style={styles.infoValue}>{moto.status}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Condições de Manutenção</Text>
              <Text style={styles.infoValue}>{moto.condicoesManutencao}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Tipo da Moto</Text>
              <Text style={styles.infoValue}>
                {moto.idTipoMoto?.nmTipo || "Não informado"}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Identificador</Text>
              <Text style={styles.infoValue}>
                {moto.identificador?.vlrIdentificador || "Não informado"}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <ButtonArea title={!editing ? "Editar" : "Salvar"} size="medium" action={() => handleEditingMode(moto)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0C0C0C",
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  card: {
    backgroundColor: "#1A1A1A",
    borderRadius: 8,
    padding: 32,
    shadowColor: "#41C526",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 1,
    borderColor: "#2A2A2A",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
  },
  headerText: {
    marginLeft: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  subtitle: {
    fontSize: 16,
    color: "#8B8B8B",
    marginTop: 4,
  },
  infoContainer: {
    gap: 20,
  },
  infoRow: {
    marginBottom: 4,
  },
  infoLabel: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "600",
    marginBottom: 8,
  },
  infoValue: {
    fontSize: 16,
    color: "#8B8B8B",
    backgroundColor: "#2A2A2A",
    padding: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#3A3A3A",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0C0C0C",
  },
  errorText: {
    color: "#FF6B6B",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default SingleMoto;
