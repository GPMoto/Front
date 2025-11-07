import { FlatList, Text, TouchableOpacity, View } from "react-native";
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

  const { motos, loading, callMotoData, callMotoLoading, call } = useMotoIOT();

  if (loading || callMotoLoading)
    return (
      <LoadingScreen>
        {loading && (
          <Text style={globalStyles.whiteText}>Carregando dispositivos...</Text>
        )}
        {callMotoLoading && (
          <Text style={globalStyles.whiteText}>Chamando moto...</Text>
        )}
      </LoadingScreen>
    );

  return (
    <SafeAreaView style={[localStyles.container, globalStyles.pageColor]}>
      {/* Header Section */}
      <View style={{ marginBottom: 20, alignItems: 'center' }}>
        <Text style={globalStyles.highlight}>Chamar Moto</Text>
        <Text style={[globalStyles.paragraph_center, { marginTop: 8, opacity: 0.8 }]}>
          Selecione uma moto disponível
        </Text>
      </View>

      {/* Empty State */}
      {(!motos || motos.length === 0) && (
        <View style={localStyles.emptyContainer}>
          <Text style={[globalStyles.paragraph_center, { opacity: 0.6 }]}>
            Nenhuma moto disponível no momento
          </Text>
        </View>
      )}

      {/* Motos List */}
      {motos && motos.length > 0 && (
        <FlatList
          data={motos}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <SingleMotoDispositivo
              item={item}
              localStyles={localStyles}
              t={t}
              call={call}
            />
          )}
          contentContainerStyle={localStyles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Success Message */}
      {callMotoData && (
        <View
          style={{
            backgroundColor: 'rgba(65, 197, 38, 0.1)',
            borderRadius: 8,
            padding: 12,
            marginTop: 16,
            borderLeftWidth: 4,
            borderLeftColor: globalStyles.highlight.color,
          }}
        >
          <Text style={[globalStyles.paragraph, { color: globalStyles.highlight.color }]}>
            ✓ {callMotoData.message}
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};