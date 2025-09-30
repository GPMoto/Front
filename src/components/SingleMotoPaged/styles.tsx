import { useDarkColors } from "@/styles/theme-config";
import { StyleSheet } from "react-native";

export const createStyles = (colors: ReturnType<typeof useDarkColors>, isDarkTheme: boolean) => StyleSheet.create({
  container: {
    backgroundColor: colors.cardBg,
    padding: 18,
    marginVertical: 8,
    borderRadius: 16,
    shadowColor: colors.shadowColor,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: isDarkTheme ? 0.3 : 0.1,
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
    color: "#4ae25cff", // Mantendo o verde característico
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
  separatorText: {
    color: colors.secondaryText,
    fontSize: 18,
    fontWeight: "400",
  },
  identificadorText: {
    color: "#c59326ff", // Mantendo o dourado característico
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
    backgroundColor: isDarkTheme ? "#333" : "#E0E0E0",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    shadowColor: colors.shadowColor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: isDarkTheme ? 0.2 : 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  chipLabel: {
    color: colors.secondaryText,
    fontSize: 10,
    fontWeight: "500",
    textTransform: "uppercase",
    marginBottom: 4,
  },
  chipValue: {
    color: colors.primaryText,
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
  },
  actionContainer: {
    marginTop: 8,
  },
  deleteIcon: {
    marginLeft: 10,
  },
});