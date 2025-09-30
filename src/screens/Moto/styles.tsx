import { useDarkColors } from "@/styles/theme-config";
import { StyleSheet } from "react-native";

export const createStyles = (colors: ReturnType<typeof useDarkColors>, isDarkTheme: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.containerBg,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  card: {
    backgroundColor: colors.cardBg,
    borderRadius: 8,
    padding: 32,
    shadowColor: isDarkTheme ? "#41C526" : colors.shadowColor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: isDarkTheme ? 0.3 : 0.1,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 1,
    borderColor: isDarkTheme ? "#2A2A2A" : "#E0E0E0",
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
    color: colors.primaryText,
  },
  subtitle: {
    fontSize: 16,
    color: colors.secondaryText,
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
    color: colors.primaryText,
    fontWeight: "600",
    marginBottom: 8,
  },
  infoValue: {
    fontSize: 16,
    color: colors.secondaryText,
    backgroundColor: isDarkTheme ? "#2A2A2A" : "#F5F5F5",
    padding: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: isDarkTheme ? "#3A3A3A" : "#E0E0E0",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.containerBg,
    padding: 20,
  },
  errorText: {
    color: "#FF6B6B",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  pickerContainer: {
    backgroundColor: isDarkTheme ? "#2A2A2A" : "#F5F5F5",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: isDarkTheme ? "#3A3A3A" : "#E0E0E0",
    minHeight: 50,
    justifyContent: "center",
  },
  picker: {
    color: colors.primaryText,
    fontSize: 16,
    height: 50,
  },
  editableInput: {
    backgroundColor: isDarkTheme ? "#404040" : "#FFFFFF",
    borderColor: "#41C526",
    borderWidth: 2,
    shadowColor: "#41C526",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.containerBg,
  },
  loadingText: {
    color: colors.secondaryText,
    fontSize: 16,
    marginTop: 16,
  },
});