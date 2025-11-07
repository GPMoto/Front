import { useDarkColors } from "@/styles/theme-config";
import { StyleSheet } from "react-native";

export const createStyles = (
  colors: ReturnType<typeof useDarkColors>,
  isDarkTheme: boolean,
) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.containerBg,
      padding: 16,
    },
    text: {
      color: colors.primaryText,
    },
    listContainer: {
      paddingVertical: 8,
      gap: 8,
    },
    card: {
      backgroundColor: "#121212",
      borderRadius: 12,
      padding: 12,
      borderWidth: 1,
      borderColor: "#222",
      marginBottom: 8,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 2,
    },
    cardHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    cardTitle: {
      color: "#FFFFFF",
      fontSize: 18,
      fontWeight: "700",
    },
    badge: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
      minWidth: 70,
      alignItems: "center",
    },
    badgeText: {
      color: "#FFFFFF",
      fontWeight: "600",
      fontSize: 12,
    },
    cardBody: {
      marginTop: 8,
    },
    cardSubtitle: {
      color: "#CFCFCF",
      fontSize: 14,
      marginBottom: 4,
    },
    cardText: {
      color: "#AFAFAF",
      fontSize: 13,
    },
    emptyContainer: {
      padding: 20,
      alignItems: "center",
    },
    emptyText: {
      color: "#888",
    },
    button: {
      backgroundColor: colors.primary ?? "#41C526",
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: isDarkTheme ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.06)",
    },
    buttonText: {
      color: colors.onPrimary ?? "#FFFFFF",
      fontSize: 16,
      fontWeight: "700",
    },
  });
