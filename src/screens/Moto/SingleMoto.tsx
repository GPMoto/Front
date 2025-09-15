import { DrawerParamList } from "@/navigators/NavigationTypes";
import { RouteProp, useRoute } from "@react-navigation/native";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import { useMoto } from "@/control/MotoControl";
import ButtonArea from "@/components/Button/ButtonArea";
import { Picker } from "@react-native-picker/picker";
import { useTipoMoto } from "@/control/TipoMotoController";
import { capitalize } from "@/utils/helpers";
import { useIdentificador } from "@/control/IdentificadorController";

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
  const { tipoMotos } = useTipoMoto();
  const { identificadoresFilial } = useIdentificador();

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
                  onChangeText={(text) => handleEditingMoto("placa", text)}
                  style={[styles.infoValue, styles.editableInput]}
                />
              )}
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Status</Text>
              {!editing ? (
                <Text style={styles.infoValue}>{moto.status}</Text>
              ) : (
                <View style={[styles.pickerContainer, styles.editableInput]}>
                  <Picker
                    selectedValue={moto.status}
                    onValueChange={(text) => handleEditingMoto("status", text)}
                    style={styles.picker}
                    dropdownIconColor="#8B8B8B"
                  >
                    <Picker.Item
                      label="Disponível"
                      value="Disponível"
                      color="#000000"
                    />
                    <Picker.Item
                      label="Manutenção"
                      value="Manutenção"
                      color="#000000"
                    />
                    <Picker.Item
                      label="Vendida"
                      value="Vendida"
                      color="#000000"
                    />
                  </Picker>
                </View>
              )}
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Condições de Manutenção</Text>
              {!editing ? (
                <Text style={styles.infoValue}>{moto.condicoesManutencao}</Text>
              ) : (
                <View style={[styles.pickerContainer, styles.editableInput]}>
                  <Picker
                    selectedValue={moto.condicoesManutencao}
                    onValueChange={(text) =>
                      handleEditingMoto("condicoesManutencao", text)
                    }
                    style={styles.picker}
                    dropdownIconColor="#8B8B8B"
                  >
                    <Picker.Item
                      label="Excelente"
                      value="Excelente"
                      color="#000000"
                    />
                    <Picker.Item label="Boa" value="Boa" color="#000000" />
                    <Picker.Item
                      label="Regular"
                      value="Regular"
                      color="#000000"
                    />
                    <Picker.Item label="Ruim" value="Ruim" color="#000000" />
                    <Picker.Item
                      label="Péssima"
                      value="Péssima"
                      color="#000000"
                    />
                  </Picker>
                </View>
              )}
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Tipo da Moto</Text>
              {!editing ? (
                <Text style={styles.infoValue}>{moto.idTipoMoto.nmTipo}</Text>
              ) : (
                <View style={[styles.pickerContainer, styles.editableInput]}>
                  <Picker
                    selectedValue={moto.idTipoMoto}
                    onValueChange={(value) =>
                      handleEditingMoto("idTipoMoto", value)
                    }
                    style={styles.picker}
                    dropdownIconColor="#8B8B8B"
                  >
                    {tipoMotos.data?.map((tipoMoto) => (
                      <Picker.Item
                        label={capitalize(tipoMoto.nmTipo)}
                        value={tipoMoto}
                        key={tipoMoto.id_tipo_moto}
                      />
                    ))}
                  </Picker>
                </View>
              )}
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Identificador</Text>
              {!editing ? (
                <Text style={styles.infoValue}>
                  {moto.identificador.vlrIdentificador}
                </Text>
              ) : (
                <View style={[styles.pickerContainer, styles.editableInput]}>
                  <Picker
                    selectedValue={moto.identificador}
                    onValueChange={(value) =>
                      handleEditingMoto("idTipoMoto", value)
                    }
                    style={styles.picker}
                    dropdownIconColor="#8B8B8B"
                  >
                    {identificadoresFilial.data?.content?.map(
                      (identificador) => (
                        <Picker.Item
                          label={capitalize(identificador.vlrIdentificador)}
                          value={identificador}
                          key={identificador.idIdentificador}
                        />
                      )
                    )}
                  </Picker>
                </View>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
      <ButtonArea
        title={!editing ? "Editar" : "Salvar"}
        size="medium"
        action={() => handleEditingMode(moto)}
      />
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
  pickerContainer: {
    backgroundColor: "#2A2A2A",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#3A3A3A",
    minHeight: 50,
    justifyContent: "center",
  },
  picker: {
    color: "#FFFFFF",
    fontSize: 16,
    height: 50,
  },
  editableInput: {
    backgroundColor: "#404040",
    borderColor: "#41C526",
    borderWidth: 2,
  },
});

export default SingleMoto;
