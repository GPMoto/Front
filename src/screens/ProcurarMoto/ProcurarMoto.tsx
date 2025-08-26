import { Pressable, Text, View } from "react-native";
import { globalStyles } from "../../styles/styles";
import InputLabel from "../../components/InputLabel/InputLabel";
import { useEffect } from "react";
import ListaMotos from "./components/ListaMotos/ListaMotos";
import { useProcurarMoto } from "@/control/ProcurarMotoControl";
import { procurarMotoStyles } from "./ProcurarMotoStyles";

export default function ProcurarMoto() {
  const {
    mockFetch,
    onPressMock,
    clearSearch,
    identificador,
    setIdentificador,
    isSearched,
    paginas,
    motos,
  } = useProcurarMoto();

  useEffect(() => {
    mockFetch();
  }, []);

  return (
    <View
      style={[
        globalStyles.pageColor,
        globalStyles.container,
        procurarMotoStyles.mainContainer,
      ]}
    >
      <View style={procurarMotoStyles.inputContainer}>
        <InputLabel
          onPress={onPressMock}
          show={true}
          title="Procurar Moto"
          value={identificador}
          setValue={setIdentificador}
          placeholder="Identificador da moto"
          isSearched={isSearched}
          clearSearch={clearSearch}
        ></InputLabel>
      </View>
      <View style={[procurarMotoStyles.contentArea]}>
        <View style={[procurarMotoStyles.listArea]}>
          <ListaMotos data={motos}></ListaMotos>
        </View>
      </View>

      <View style={procurarMotoStyles.paginationContainer}>
        {paginas.map((page) => {
          return (
            <Pressable
              key={page}
              onPress={() => {
                mockFetch();
              }}
            >
              <Text style={procurarMotoStyles.pageText}>{page}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
