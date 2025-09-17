import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { globalStyles } from "../../styles/styles";
import useInicio from "@/control/InicioController";
import { FontAwesome as Icon } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function Inicio() {
  const { appTitle, subtitle, goToMapa, goToProcurar, sections, motorcycles } =
    useInicio();

  return (
    <View style={globalStyles.container}>
      <View style={styles.hero}>
        <View style={styles.heroLeft}>
          <Text style={styles.subtitle}>{subtitle}</Text>
          <Text style={styles.title}>{appTitle}</Text>
        </View>
        <View style={styles.heroRight}>
          <Icon name="motorcycle" size={40} color="#41C526" />
        </View>
      </View>

      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.actionCard} onPress={goToMapa}>
          <Icon name="map" size={28} color="#FFFFFF" />
          <Text style={styles.actionText}>Mapa</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionCard} onPress={goToProcurar}>
          <Icon name="search" size={28} color="#FFFFFF" />
          <Text style={styles.actionText}>Procurar Moto</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoRow}>
        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Seções</Text>
          <Text style={styles.infoValue}>{sections}</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Motos</Text>
          <Text style={styles.infoValue}>{motorcycles}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 18,
    backgroundColor: "#141414",
    borderRadius: 12,
    marginBottom: 18,
  },
  heroLeft: {
    flex: 1,
  },
  heroRight: {},
  title: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "bold",
  },
  subtitle: {
    color: "#BFC9B8",
    marginTop: 6,
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 18,
  },
  actionCard: {
    flex: 1,
    backgroundColor: "#1F1F1F",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  actionText: {
    color: "#FFFFFF",
    marginTop: 6,
    fontWeight: "600",
  },
  infoRow: {
    flexDirection: "row",
    gap: 12,
  },
  infoCard: {
    width: (width - 44) / 2,
    backgroundColor: "#232323",
    padding: 12,
    borderRadius: 12,
  },
  infoLabel: {
    color: "#A3B39A",
  },
  infoValue: {
    color: "#41C526",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 6,
  },
});
