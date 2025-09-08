import { useMoto } from "@/control/MotoControl";
import { FlatList, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Pagination from "@cherry-soft/react-native-basic-pagination";
import SingleMotoPaged from "@/components/SingleMotoPaged/SingleMotoPaged";
import { procurarMotoStyles } from "./ProcurarMotoStyles";
import { globalStyles } from "@/styles/styles";
import LoadingScreen from "@/components/shared/LoadingScreen";
import { FontAwesome6 as Icon } from "@expo/vector-icons";

export default function ProcurarMoto() {
  const {
    isLoading,
    error,
    motos,
    setPage,
    page,
    busca,
    setBusca,
    limparBusca,
  } = useMoto(2);

  if (isLoading) {
    return (
      <View
        style={[globalStyles.container_center, { justifyContent: "center" }]}
      >
        <LoadingScreen>
          <Text style={[globalStyles.TextInput, { marginTop: 16 }]}>
            Carregando motos...
          </Text>
        </LoadingScreen>
      </View>
    );
  }

  if (error) {
    return (
      <View
        style={[globalStyles.container_center, { justifyContent: "center" }]}
      >
        <Text
          style={[
            globalStyles.TextInput,
            { color: "#FF6B6B", textAlign: "center" },
          ]}
        >
          Erro ao carregar motos: {error.message}
        </Text>
      </View>
    );
  }

  return (
    <View
      style={[globalStyles.container_center, procurarMotoStyles.mainContainer]}
    >
      <View style={procurarMotoStyles.inputContainer}>
        <View style={procurarMotoStyles.inputWrapper}>
          <TextInput
            placeholder="Digite o identificador da moto..."
            placeholderTextColor="#999"
            style={[globalStyles.Input, procurarMotoStyles.textInput]}
            onChangeText={setBusca}
            value={busca ?? ""}
          />
          {busca && (
            <Icon
              name="circle-xmark"
              color={"red"}
              size={20}
              onPress={limparBusca}
              style={procurarMotoStyles.clearButton}
            />
          )}
        </View>
      </View>

      <View style={procurarMotoStyles.contentArea}>
        <View style={procurarMotoStyles.listArea}>
          <View style={procurarMotoStyles.totalMotosContainer}>
            <Text
              style={[
                procurarMotoStyles.pageText,
                {
                  fontWeight: "bold",
                  fontSize: 18,
                },
              ]}
            >
              Total de motos: {motos?.totalElements || 0}
            </Text>
          </View>

          <FlatList
            data={motos?.content}
            keyExtractor={(item, index) =>
              item.idMoto?.toString() || index.toString()
            }
            renderItem={({ item }) => <SingleMotoPaged {...item} />}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={procurarMotoStyles.emptyStateContainer}>
                <Text style={[globalStyles.TextInput, { textAlign: "center" }]}>
                  Nenhuma moto encontrada
                </Text>
              </View>
            }
          />
          {motos && motos?.totalPages! > 1 ? (
            <View style={procurarMotoStyles.paginationContainer}>
              <Pagination
                currentPage={page}
                onPageChange={setPage}
                pageSize={motos?.size}
                totalItems={motos.totalElements}
                showLastPagesButtons={motos?.totalPages! > 5}
              />
            </View>
          ) : null}
        </View>
      </View>
    </View>
  );
}
