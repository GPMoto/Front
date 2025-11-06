import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import useInicio from "@/control/InicioController";
import { FontAwesome as Icon } from "@expo/vector-icons";
import { useTheme } from "@/context/ThemeContext";
import { useDarkColors } from "@/styles/theme-config";
import { createStyles } from "./styles";

import { useTranslation } from "react-i18next";
import { usePushNotifications } from "@/hooks/usePushNotifications";

export default function Inicio() {
  usePushNotifications(() => console.log("Notification received"));

  const { t } = useTranslation();
  const { goToMapa, goToProcurar, sections, motorcycles } = useInicio();
  const { isDarkTheme } = useTheme();
  const colors = useDarkColors();
  const styles = createStyles(colors, isDarkTheme);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.containerBg }}>
      <StatusBar
        barStyle={isDarkTheme ? "light-content" : "dark-content"}
        backgroundColor={colors.containerBg}
      />
      <View
        style={{ flex: 1, backgroundColor: colors.containerBg, padding: 20 }}
      >
        <View style={styles.hero}>
          <View style={styles.heroLeft}>
            <Text style={styles.subtitle}>{t("home.subtitle")}</Text>
            <Text style={styles.title}>{t("home.title")}</Text>
          </View>
          <View style={styles.heroRight}>
            <Icon name="motorcycle" size={40} color="#41C526" />
          </View>
        </View>

        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.actionCard} onPress={goToMapa}>
            <Icon name="map" size={28} color={colors.iconColor} />
            <Text style={styles.actionText}>{t("home.mapButton")}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard} onPress={goToProcurar}>
            <Icon name="search" size={28} color={colors.iconColor} />
            <Text style={styles.actionText}>{t("home.searchButton")}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>{t("home.sectionsLabel")}</Text>

            <Text style={styles.infoValue}>{sections}</Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>{t("home.motosLabel")}</Text>

            <Text style={styles.infoValue}>{motorcycles}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
