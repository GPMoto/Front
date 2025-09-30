import { useDarkColors } from "@/styles/theme-config";
import { StyleSheet, Dimensions } from "react-native";

const { width: windowWidth } = Dimensions.get('window');

export const createStyles = (colors: ReturnType<typeof useDarkColors>, isDarkTheme: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.containerBg,
  },
  header: {
    backgroundColor: colors.cardBg,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: isDarkTheme ? 'rgba(65,197,38,0.08)' : 'rgba(0,0,0,0.1)',
    alignItems: 'center',
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: isDarkTheme ? 0.2 : 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primaryText,
    marginTop: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    color: colors.secondaryText,
    marginTop: 4,
  },
  listContainer: {
    paddingVertical: 16,
  },
  sectionCard: {
    backgroundColor: colors.cardBg,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: isDarkTheme ? 0.25 : 0.1,
    shadowRadius: 10,
    elevation: 5,
    overflow: 'hidden',
    borderWidth: isDarkTheme ? 0 : 1,
    borderColor: isDarkTheme ? 'transparent' : '#E0E0E0',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: isDarkTheme ? '#1B1B1B' : '#F0F0F0',
  },
  sectionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(65,197,38,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  cardHeaderText: {
    flex: 1,
  },
  sectionName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primaryText,
  },
  sectionId: {
    fontSize: 14,
    color: colors.secondaryText,
    marginTop: 2,
  },
  measurementsContainer: {
    padding: 16,
  },
  measurementsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primaryText,
    marginBottom: 12,
  },
  measurementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  measurementItem: {
    width: (windowWidth - 64) / 2,
    backgroundColor: isDarkTheme ? '#232323' : '#F8F8F8',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    alignItems: 'center',
    borderWidth: isDarkTheme ? 0 : 1,
    borderColor: isDarkTheme ? 'transparent' : '#E8E8E8',
  },
  measurementLabel: {
    fontSize: 12,
    color: colors.secondaryText,
    fontWeight: '500',
    marginBottom: 4,
  },
  measurementValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#41C526', // Mantendo o verde característico
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.containerBg,
    padding: 32,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primaryText,
    marginTop: 16,
    marginBottom: 8,
  },
  errorMessage: {
    fontSize: 16,
    color: colors.secondaryText,
    textAlign: 'center',
    lineHeight: 24,
  },
  loadingText: {
    fontSize: 16,
    color: colors.secondaryText,
    marginTop: 16,
  },
});