import { useDarkColors } from "@/styles/theme-config";
import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const createStyles = (colors: ReturnType<typeof useDarkColors>, isDarkTheme: boolean) => StyleSheet.create({
  hero: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 18,
    backgroundColor: colors.cardBg,
    borderRadius: 12,
    marginBottom: 18,
    shadowColor: colors.shadowColor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: isDarkTheme ? 0.3 : 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  heroLeft: {
    flex: 1,
  },
  heroRight: {},
  title: {
    color: colors.primaryText,
    fontSize: 28,
    fontWeight: "bold",
  },
  subtitle: {
    color: colors.secondaryText,
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
    backgroundColor: colors.cardBg,
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    shadowColor: colors.shadowColor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: isDarkTheme ? 0.3 : 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionText: {
    color: colors.primaryText,
    marginTop: 6,
    fontWeight: "600",
  },
  infoRow: {
    flexDirection: "row",
    gap: 12,
  },
  infoCard: {
    width: (width - 44) / 2,
    backgroundColor: colors.cardBg,
    padding: 12,
    borderRadius: 12,
    shadowColor: colors.shadowColor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: isDarkTheme ? 0.2 : 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  infoLabel: {
    color: colors.secondaryText,
  },
  infoValue: {
    color: "#41C526", // Mantendo a cor verde característica
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 6,
  },
});