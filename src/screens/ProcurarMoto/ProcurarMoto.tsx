import { useMoto } from "@/control/MotoControl";
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  ScrollView,
  RefreshControl,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Pagination from "@cherry-soft/react-native-basic-pagination";
import SingleMotoPaged from "@/components/SingleMotoPaged/SingleMotoPaged";
import { createStyles } from "./ProcurarMotoStyles";
import { FontAwesome6 as Icon } from "@expo/vector-icons";
import { RouteProp, useRoute } from "@react-navigation/native";
import {
  AppDrawerNavigationProps,
  DrawerParamList,
} from "@/navigators/NavigationTypes";
import FloatingButton from "@/components/FloatingButton/FloatingButton";
import { useTheme } from "@/context/ThemeContext";
import { useDarkColors } from "@/styles/theme-config";

export default function ProcurarMoto() {
  const route = useRoute<RouteProp<DrawerParamList, "Procurar Moto">>();
  const params = route.params;
  const { isDarkTheme } = useTheme();
  const colors = useDarkColors();
  const styles = createStyles(colors, isDarkTheme);

  const {
    pagedMotos,
    setPage,
    page,
    busca,
    setBusca,
    limparBusca,
    goToSingleMoto,
    reloadPage,
    handleDelete,
    deletingId,
    goToCreateMoto
  } = useMoto({ size: 10, idSecaoFilial: params?.idSecaoFilial });

  if (pagedMotos.isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <StatusBar
          barStyle={isDarkTheme ? "light-content" : "dark-content"}
          backgroundColor={colors.containerBg}
        />
        <ActivityIndicator size="large" color="#41C526" />
      </SafeAreaView>
    );
  }

  if (pagedMotos.isError) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <StatusBar
          barStyle={isDarkTheme ? "light-content" : "dark-content"}
          backgroundColor={colors.containerBg}
        />
        <Text style={styles.errorText}>
          Erro ao carregar motos: {pagedMotos.error.message}
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={isDarkTheme ? "light-content" : "dark-content"}
        backgroundColor={colors.containerBg}
      />
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Digite a placa da moto..."
            placeholderTextColor="#999"
            style={styles.textInput}
            onChangeText={setBusca}
            value={busca ?? ""}
          />
          {busca && (
            <Icon
              name="circle-xmark"
              color={"red"}
              size={20}
              onPress={limparBusca}
              style={styles.clearButton}
            />
          )}
        </View>
      </View>

      <View style={styles.contentArea}>
        <View style={styles.listArea}>
          <FlatList
            data={pagedMotos.data!.content}
            keyExtractor={(item, index) =>
              item.idMoto?.toString() || index.toString()
            }
            renderItem={({ item }) => (
              <SingleMotoPaged
                verMais={goToSingleMoto}
                handleDelete={handleDelete}
                deletingId={deletingId}
                {...item}
              />
            )}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={pagedMotos.isRefetching}
                onRefresh={() => {
                  reloadPage();
                  pagedMotos.refetch();
                }}
                tintColor="#41C526"
                colors={["#41C526"]}
              />
            }
            ListHeaderComponent={
              <View style={styles.totalMotosContainer}>
                <Text style={[styles.pageText, { color: "#FFFFFF" }]}>
                  Total de motos: {pagedMotos.data!.totalElements || 0}
                </Text>
              </View>
            }
            ListEmptyComponent={
              <View style={styles.emptyStateContainer}>
                <Text style={styles.emptyStateText}>
                  Nenhuma moto encontrada
                </Text>
              </View>
            }
            ListFooterComponent={
              pagedMotos.data && pagedMotos.data.totalPages! > 1 ? (
                <View style={styles.paginationContainer}>
                  <Pagination
                    currentPage={page}
                    onPageChange={setPage}
                    pageSize={pagedMotos.data.size}
                    totalItems={pagedMotos.data.totalElements}
                    showLastPagesButtons={pagedMotos.data.totalPages! > 5}
                  />
                </View>
              ) : null
            }
          />
        </View>
      </View>

      <FloatingButton 
        onPress={goToCreateMoto}
      />
    </SafeAreaView>
  );
}
