import { 
  FlatList, 
  Text, 
  View, 
  Dimensions, 
  SafeAreaView, 
  StatusBar 
} from "react-native";
import useFilial from "@/control/FilialController";
import LoadingScreen from "@/components/shared/LoadingScreen";
import { FontAwesome as Icon } from "@expo/vector-icons";
import ButtonArea from "@/components/Button/ButtonArea";
import { useNavigation } from "@react-navigation/native";
import { AppDrawerNavigationProps } from "@/navigators/NavigationTypes";
import { useTheme } from "@/context/ThemeContext";
import { useDarkColors } from "@/styles/theme-config";
import { createStyles } from "./styles";

const { width: windowWidth } = Dimensions.get('window');
const ITEM_WIDTH = Math.round(windowWidth);

export default function Mapa() {
  const { secoes, error, loading } = useFilial();
  const { height } = Dimensions.get("window");
  const navigation = useNavigation<AppDrawerNavigationProps>();
  const { isDarkTheme } = useTheme();
  const colors = useDarkColors();
  const styles = createStyles(colors, isDarkTheme);

  const handleVerMotos = (idSecaoFilial: number) => {
    navigation.navigate("Procurar Moto", { idSecaoFilial });
  };

  if (error) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <StatusBar
          barStyle={isDarkTheme ? "light-content" : "dark-content"}
          backgroundColor={colors.containerBg}
        />
        <Icon name="exclamation-triangle" size={48} color="#FF6B6B" />
        <Text style={styles.errorTitle}>Ops! Algo deu errado</Text>
        <Text style={styles.errorMessage}>
          Erro ao carregar seções da filial: {error.message}
        </Text>
      </SafeAreaView>
    );
  }

  if (loading) {
    return (
      <LoadingScreen>
        <Text style={styles.loadingText}>Carregando mapa da filial...</Text>
      </LoadingScreen>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={isDarkTheme ? "light-content" : "dark-content"}
        backgroundColor={colors.containerBg}
      />
      <View style={styles.header}>
        <Icon name="map" size={24} color="#007AFF" />
        <Text style={styles.headerTitle}>Mapa da Filial</Text>
        <Text style={styles.headerSubtitle}>
          {secoes?.length || 0} seções encontradas
        </Text>
      </View>

      <FlatList
        data={secoes!}
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate={'fast'}
        snapToInterval={ITEM_WIDTH} // full width items
        snapToAlignment={'center'}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <View style={[styles.sectionCard, {height: Math.max(300, height * 0.6), width: ITEM_WIDTH}]}>
            <View style={styles.cardHeader}>
              <View style={styles.sectionIconContainer}>
                <Icon name="cube" size={20} color="#FFF" />
              </View>
              <View style={styles.cardHeaderText}>
                <Text style={styles.sectionName}>{item.idTipoSecao.nmSecao}</Text>
                <Text style={styles.sectionId}>Seção #{item.idSecao}</Text>
              </View>
            </View>

            <View style={styles.measurementsContainer}>
              <Text style={styles.measurementsTitle}>Dimensões (metros)</Text>
              <View style={styles.measurementsGrid}>
                <View style={styles.measurementItem}>
                  <Text style={styles.measurementLabel}>Lado 1</Text>
                  <Text style={styles.measurementValue}>{item.lado1}m</Text>
                </View>
                <View style={styles.measurementItem}>
                  <Text style={styles.measurementLabel}>Lado 2</Text>
                  <Text style={styles.measurementValue}>{item.lado2}m</Text>
                </View>
                <View style={styles.measurementItem}>
                  <Text style={styles.measurementLabel}>Lado 3</Text>
                  <Text style={styles.measurementValue}>{item.lado3}m</Text>
                </View>
                <View style={styles.measurementItem}>
                  <Text style={styles.measurementLabel}>Lado 4</Text>
                  <Text style={styles.measurementValue}>{item.lado4}m</Text>
                </View>
              </View>
              <ButtonArea size="medium" title="Ver as motos" additionalStyles={{
                marginTop: 12,
              }} action={() => handleVerMotos(item.idSecao)} />
            </View>
          </View>
        )}
        keyExtractor={(item, index) => `${item.idSecao}-${index}`}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
