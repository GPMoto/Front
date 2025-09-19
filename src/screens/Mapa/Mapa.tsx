import { FlatList, Text, View, StyleSheet, Dimensions } from "react-native";
import { globalStyles } from "../../styles/styles";
import useFilial from "@/control/FilialController";
import LoadingScreen from "@/components/shared/LoadingScreen";
import { FontAwesome as Icon } from "@expo/vector-icons";
import ButtonArea from "@/components/Button/ButtonArea";
import { useNavigation } from "@react-navigation/native";
import { AppDrawerNavigationProps } from "@/navigators/NavigationTypes";

const { width: windowWidth } = Dimensions.get('window');
const ITEM_WIDTH = Math.round(windowWidth);

export default function Mapa() {
  const { secoes, error, loading } = useFilial();
  const { height } = Dimensions.get("window");
  const navigation = useNavigation<AppDrawerNavigationProps>();

  const handleVerMotos = (idSecaoFilial: number) => {
    navigation.navigate("Procurar Moto", { idSecaoFilial });
  };

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Icon name="exclamation-triangle" size={48} color="#FF6B6B" />
        <Text style={styles.errorTitle}>Ops! Algo deu errado</Text>
        <Text style={styles.errorMessage}>
          Erro ao carregar seções da filial: {error.message}
        </Text>
      </View>
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
    <View style={styles.container}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F1F1F',
  },
  header: {
    backgroundColor: '#2C2C2C',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(65,197,38,0.08)',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#BFC9B8',
    marginTop: 4,
  },
  listContainer: {
    paddingVertical: 16,
  },
  sectionCard: {
    backgroundColor: '#2B2B2B',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#1B1B1B',
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
    color: '#E8F6E6',
  },
  sectionId: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 2,
  },
  measurementsContainer: {
    padding: 16,
  },
  measurementsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#E6F7E8',
    marginBottom: 12,
  },
  measurementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  measurementItem: {
    // use windowWidth constant to avoid undefined `width` in this scope
    width: (windowWidth - 64) / 2,
    backgroundColor: '#232323',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    alignItems: 'center',
  },
  measurementLabel: {
    fontSize: 12,
    color: '#A3B39A',
    fontWeight: '500',
    marginBottom: 4,
  },
  measurementValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#41C526',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1F1F1F',
    padding: 32,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 16,
    marginBottom: 8,
  },
  errorMessage: {
    fontSize: 16,
    color: '#BFC9B8',
    textAlign: 'center',
    lineHeight: 24,
  },
  loadingText: {
    fontSize: 16,
    color: '#BFC9B8',
    marginTop: 16,
  },
});
