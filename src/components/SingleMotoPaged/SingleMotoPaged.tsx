import { Moto } from "@/model/Moto";
import { statusBadge, formatIdentificador } from "@/utils/helpers";
import { StyleSheet, Text, View } from "react-native";
import { FontAwesome as Icon } from "@expo/vector-icons";
import ButtonArea from "../Button/ButtonArea";
import { ActivityIndicator } from "react-native";
import { useTheme } from "@/context/ThemeContext";
import { useDarkColors } from "@/styles/theme-config";
import { createStyles } from "./styles";

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
  const { isDarkTheme } = useTheme();
  const colors = useDarkColors();
  const styles = createStyles(colors, isDarkTheme);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.tipoText}>{item.idTipoMoto.nmTipo}</Text>
        <Text style={styles.separatorText}> - </Text>
        <Text style={styles.identificadorText}>#{formatIdentificador(item.identificador)}</Text>
        {deletingId && deletingId === item.idMoto ? (
          <ActivityIndicator style={styles.deleteIcon} color="#ff5252" />
        ) : (
          <Icon style={styles.deleteIcon} name="trash-o" color={"red"} size={18} onPress={() => handleDelete(item.idMoto!)} />
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
