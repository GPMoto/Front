import { Moto } from "@/model/Moto";
import { statusBadge, formatIdentificador } from "@/utils/helpers";
import { StyleSheet, Text, View } from "react-native";
import ButtonArea from "../Button/ButtonArea";

interface SingleMotoPagedProps extends Moto {
  verMais: (moto: Moto) => void;
}

export default function SingleMotoPaged({
  verMais,
  ...item
}: SingleMotoPagedProps) {
  return (
    <View
      style={[styles.container, { borderLeftColor: statusBadge(item.status) }]}
    >
      <View style={styles.header}>
        <Text style={styles.idText}>ID: {item.idMoto}</Text>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: statusBadge(item.status) },
          ]}
        >
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Text style={styles.labelText}>Identificador:</Text>
          <Text style={styles.valueText}>
            {formatIdentificador(item.identificador)}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.labelText}>Tipo da moto:</Text>
          <Text style={styles.valueText}>{item.idTipoMoto.nmTipo}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.labelText}>Condições:</Text>
          <Text style={styles.valueText}>{item.status}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.labelText}>Manutenção:</Text>
          <Text style={styles.valueText}>{item.condicoesManutencao}</Text>
        </View>

        <ButtonArea
          size="small"
          title="Ver mais"
          action={() => verMais(item)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1E1E1E",
    padding: 16,
    marginVertical: 8,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#41C526",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  idText: {
    color: "#41C526",
    fontSize: 18,
    fontWeight: "bold",
  },
  statusBadge: {
    backgroundColor: "#41C526",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    color: "black",
    fontSize: 12,
    fontWeight: "bold",
  },
  infoContainer: {
    gap: 6,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  labelText: {
    color: "#888",
    fontSize: 14,
    fontWeight: "500",
    minWidth: 90,
  },
  valueText: {
    color: "white",
    fontSize: 14,
    flex: 1,
  },
});
