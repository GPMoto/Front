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
    loadingText: {
      color: colors.primaryText,
      fontSize: 16,
      marginTop: 16,
    },
    listContainer: {
      paddingVertical: 8,
      gap: 8,
    },
    headerSection: {
      marginBottom: 20,
      alignItems: 'center',
    },
    subtitle: {
      color: colors.secondaryText,
      fontSize: 16,
      marginTop: 8,
      opacity: 0.8,
      textAlign: 'center',
    },
    card: {
      backgroundColor: colors.cardBg,
      borderRadius: 12,
      padding: 12,
      borderWidth: 1,
      borderColor: colors.borderColor,
      marginBottom: 8,
      shadowColor: colors.shadowColor,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: isDarkTheme ? 0.3 : 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    cardHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    cardTitle: {
      color: colors.primaryText,
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
      color: colors.primaryText,
      fontSize: 14,
      marginBottom: 4,
    },
    cardText: {
      color: colors.secondaryText,
      fontSize: 13,
    },
    emptyContainer: {
      padding: 20,
      alignItems: "center",
    },
    emptyText: {
      color: colors.secondaryText,
    },
    button: {
      backgroundColor: "#41C526",
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: colors.borderColor,
      shadowColor: colors.shadowColor,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: isDarkTheme ? 0.3 : 0.1,
      shadowRadius: 3,
      elevation: 2,
      marginTop: 12,
    },
    buttonText: {
      color: "#FFFFFF",
      fontSize: 16,
      fontWeight: "700",
    },
    successContainer: {
      backgroundColor: isDarkTheme
        ? "rgba(65, 197, 38, 0.15)"
        : "rgba(65, 197, 38, 0.1)",
      borderRadius: 8,
      padding: 12,
      marginTop: 16,
      borderLeftWidth: 4,
      borderLeftColor: "#41C526",
    },
    successText: {
      color: "#41C526",
    },
  });