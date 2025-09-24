import { Moto } from "@/model/Moto";
import { statusBadge, formatIdentificador } from "@/utils/helpers";
import { StyleSheet, Text, View } from "react-native";
import { FontAwesome as Icon } from "@expo/vector-icons";
import ButtonArea from "../Button/ButtonArea";
import { ActivityIndicator } from "react-native";

interface SingleMotoPagedProps extends Moto {
  verMais: (moto: Moto) => void;
  handleDelete : (idMoto : number) => void
  deletingId?: number | null;
}

export default function SingleMotoPaged({
  verMais,
  handleDelete,
  deletingId,
  ...item
}: SingleMotoPagedProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.tipoText}>{item.idTipoMoto.nmTipo}</Text>
        <Text style={styles.separatorText}> - </Text>
        <Text style={styles.identificadorText}>#{formatIdentificador(item.identificador)}</Text>
        {deletingId && deletingId === item.idMoto ? (
          <ActivityIndicator color="#ff5252" />
        ) : (
          <Icon name="trash-o" color={"red"} size={18} onPress={() => handleDelete(item.idMoto!)} />
        )}
      </View>

      <View style={styles.secondaryInfo}>
        <View style={styles.infoChip}>
          <Text style={styles.chipLabel}>Status</Text>
          <Text style={styles.chipValue}>{item.status}</Text>
        </View>
        
        <View style={styles.infoChip}>
          <Text style={styles.chipLabel}>Manutenção</Text>
          <Text style={styles.chipValue}>{item.condicoesManutencao}</Text>
        </View>
      </View>

      <View style={styles.actionContainer}>
        <ButtonArea
          size="small"
          title="Ver detalhes"
          action={() => verMais(item)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1E1E1E",
    padding: 18,
    marginVertical: 8,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    flexWrap: "wrap",
  },
  tipoText: {
    color: "#4ae25cff",
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
  separatorText: {
    color: "#888",
    fontSize: 18,
    fontWeight: "400",
  },
  identificadorText: {
    color: "#c59326ff",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 1,
    fontFamily: "monospace",
  },
  secondaryInfo: {
    flexDirection: "row",
    marginBottom: 16,
    justifyContent: "space-between",
    gap: 8,
  },
  infoChip: {
    flex: 1,
    backgroundColor: "#333",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  chipLabel: {
    color: "#999",
    fontSize: 10,
    fontWeight: "500",
    textTransform: "uppercase",
    marginBottom: 4,
  },
  chipValue: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
  },
  actionContainer: {
    marginTop: 8,
  },
});
