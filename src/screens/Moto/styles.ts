import { StyleSheet } from 'react-native';
import { useDarkColors } from '@/styles/theme-config';

export const createStyles = (colors: ReturnType<typeof useDarkColors>, isDarkTheme: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.containerBg,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.containerBg,
    },
    loadingText: {
      marginTop: 16,
      fontSize: 16,
      color: colors.primaryText,
    },
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.containerBg,
      padding: 20,
    },
    errorText: {
      fontSize: 16,
      color: '#FF6B6B',
      textAlign: 'center',
    },
    scrollContainer: {
      flexGrow: 1,
      padding: 16,
    },
    card: {
      backgroundColor: colors.cardBg,
      borderRadius: 12,
      padding: 20,
      shadowColor: isDarkTheme ? '#000' : '#ccc',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    headerText: {
      marginLeft: 12,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.primaryText,
    },
    subtitle: {
      fontSize: 14,
      color: colors.secondaryText,
      marginTop: 4,
    },
    infoContainer: {
      gap: 16,
    },
    infoRow: {
      marginBottom: 16,
    },
    infoLabel: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.primaryText,
      marginBottom: 8,
    },
    infoValue: {
      fontSize: 16,
      color: colors.secondaryText,
      backgroundColor: colors.cardBg,
      padding: 12,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.borderColor,
    },
    editableInput: {
      fontSize: 16,
      backgroundColor: colors.cardBg,
      padding: 12,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.borderColor,
      color: colors.primaryText,
    },
    pickerContainer: {
      backgroundColor: colors.cardBg,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.borderColor,
    },
    picker: {
      color: colors.primaryText,
    },
    errorInputContainer: {
      borderColor: '#FF6B6B',
      borderWidth: 2,
    },
    validationErrorText: {
      color: '#FF6B6B',
      fontSize: 12,
      marginTop: 4,
      fontStyle: 'italic',
    },
  });