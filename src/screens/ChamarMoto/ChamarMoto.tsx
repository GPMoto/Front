import { FlatList, RefreshControl, Text, TouchableOpacity, View } from "react-native";
import { createStyles } from "./styles";
import { globalStyles } from "@/styles/styles";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/context/ThemeContext";
import { useDarkColors } from "@/styles/theme-config";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMotoIOT } from "@/control/MotoIotController";
import LoadingScreen from "@/components/shared/LoadingScreen";
import { SingleMotoDispositivo } from "./SingleMotoDispositivo";

export const ChamarMoto = () => {
  const { t } = useTranslation();
  const { isDarkTheme } = useTheme();
  const colors = useDarkColors();
  const localStyles = createStyles(colors, isDarkTheme);

  const { motos, loading, callMotoData, callMotoLoading, call, refetch, isRefetching } = useMotoIOT();

  if (loading || callMotoLoading)
    return (
      <LoadingScreen>
        {loading && (
          <Text style={localStyles.loadingText}>{t('callMoto.loadingDevices')}</Text>
        )}
        {callMotoLoading && (
          <Text style={localStyles.loadingText}>{t('callMoto.callingMoto')}</Text>
        )}
      </LoadingScreen>
    );

  return (
    <SafeAreaView style={localStyles.container}>
      <FlatList
        data={motos || []}
        keyExtractor={(item) => String(item.id)}
        ListHeaderComponent={
          <>
            {/* Header Section */}
            <View style={localStyles.headerSection}>
              <Text style={globalStyles.highlight}>{t('callMoto.title')}</Text>
              <Text style={localStyles.subtitle}>
                {t('callMoto.subtitle')}
              </Text>
            </View>
          </>
        }
        ListEmptyComponent={
          /* Empty State */
          <View style={localStyles.emptyContainer}>
            <Text style={localStyles.emptyText}>
              {t('callMoto.noMotosAvailable')}
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <SingleMotoDispositivo
            item={item}
            localStyles={localStyles}
            t={t}
            call={call}
          />
        )}
        ListFooterComponent={
          /* Success Message */
          callMotoData ? (
            <View style={localStyles.successContainer}>
              <Text style={localStyles.successText}>
                {t('callMoto.successMessage')} {callMotoData.message}
              </Text>
            </View>
          ) : null
        }
        contentContainerStyle={localStyles.listContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={refetch}
            tintColor={colors.primaryText}
            colors={[colors.primaryText]}
          />
        }
      />
    </SafeAreaView>
  );
};