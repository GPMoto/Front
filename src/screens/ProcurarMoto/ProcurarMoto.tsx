import { useMoto } from "@/control/MotoControl";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Pagination from "@cherry-soft/react-native-basic-pagination";
import SingleMotoPaged from "@/components/SingleMotoPaged/SingleMotoPaged";

export default function ProcurarMoto() {
  const { isLoading, error, motos, setPage, page } = useMoto(2);

  if (isLoading) {
    return <ActivityIndicator size="large" />;
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Erro ao carregar motos: {error.message}</Text>
      </View>
    );
  }

  return (
    <View
      style={{
        paddingHorizontal: 10,
        paddingVertical: 5,
      }}
    >
      <TextInput
        placeholder="Digite a moto"
        style={{
          borderWidth: 1,
          borderColor: "black",
          borderRadius: 12,
          padding: 10,
        }}
      />

      <Text>Total de motos: {motos?.totalElements}</Text>

      <FlatList
        data={motos?.content}
        keyExtractor={(item, index) =>
          item.idMoto?.toString() || index.toString()
        }
        renderItem={({ item }) => <SingleMotoPaged {...item} />}
        ListEmptyComponent={
          <View style={{ padding: 20, alignItems: "center" }}>
            <Text>Nenhuma moto encontrada</Text>
          </View>
        }
        ListFooterComponent={
          motos && motos?.totalPages! > 1 ? (
            <View>
              <Pagination
                currentPage={page}
                onPageChange={setPage}
                pageSize={motos?.size}
                totalItems={motos.totalElements}
                showLastPagesButtons={motos?.totalPages! > 5}
              />
            </View>
          ) : null
        }
      />
    </View>
  );
}
