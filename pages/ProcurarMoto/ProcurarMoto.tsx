import { Pressable, StyleSheet, Text, ToastAndroid, View } from "react-native";
import axios from "axios";
import { styles } from "../../styles/styles";
import InputLabel from "../../components/InputLabel/InputLabel";
import { use, useEffect, useState } from "react";
import { motoInterface } from "../../utils/Interfaces";
import ListaMotos from "./components/ListaMotos/ListaMotos";
import { motoViewMockList } from "../../utils/motoMockList";
import { motoInterfaceTesteList } from "../../utils/motoInterfaceList";
import { motoInterfaceTeste } from "../../utils/interfacesTeste";

export default function ProcurarMoto() {
  const [identificador, setIdentificador] = useState("");
  const [moto, setMoto] = useState<motoInterfaceTeste>();
  const [motos, setMotos] = useState<motoInterfaceTeste[]>([]);
  const [paginas, setPaginas] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [isSearched, setIsSearched] = useState<boolean>(false)

  // const mockFetch = () => {
  //   setMotos(motoInterfaceTesteList)
  // }
  console.log(process.env.EXPO_PUBLIC_API)
  const api = axios.create({
    baseURL: 'http://localhost:8080/',
  });
  const fetchMotos = async (pagina: number, quantidade: number) => {
    try {
      //procurar so a da filial da conta da pessoa porque se nn vai ter moto dms se for de todas as filiais
      const response = await api.get(`/moto/filial/1/paginados/?pagina=${pagina}&quantidade=${quantidade}`);

      /*
        export interface motoInterfaceTeste{
            idMoto:number;
            identificador:string;
            condicoes:string;
            condicoesManutencao:string;
            lastPage:number;
            idTipoMoto:tipoMotoInterfaceTeste;
            idFilial:number;
        }
      */
      const data = response.data.content as motoInterfaceTeste[];
      setMotos(data);
      const tempPages: number[] = [];
      for (let i = 1; i <= response.data.totalPages; i++) {
        tempPages.push(i);
      }
      setPaginas(tempPages);
    } catch (error) {
      console.error("Erro ao buscar motos:", error);
    }
  };

  const mockFetch = () => {
    try {
      const data = motoInterfaceTesteList
      setMotos(data)
      const tempPages : number[] = []
      for (let i = 1; i <= tempPages.length; i++) {
        tempPages.push(i);
      }
      setPaginas(tempPages);
    } catch (error) {
      console.error("Erro ao buscar motos:", error);
      
    }
  }

  const clearSearch = () => {
    setIdentificador("")
    mockFetch()
    setIsSearched(false)
  }

  useEffect(() => {
    // fetchMotos(0,10);
    mockFetch()
  }, []);

  const onPress = () => {
    if (identificador) {
      axios
        .get(`http://procura/motos/${identificador}`)
        .then((data) => {
          let moto = data.data as motoInterfaceTeste;
          setMoto(moto);
          setIdentificador("");
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status == 404) {
            ToastAndroid.show("Moto não encontrada!", ToastAndroid.LONG);
          } else {
            ToastAndroid.show("Erro ao procurar moto!", ToastAndroid.LONG);
          }
        });
    } else {
      ToastAndroid.show("Digite um identificador!", ToastAndroid.LONG);
    }
  };

  const onPressMock = () => {
  if (identificador) {
    const resultado = motoInterfaceTesteList.filter(moto => moto.identificador.toUpperCase().includes(identificador));
    if (resultado) {
      setMotos(resultado);
      setIsSearched(true)
    } else {
      ToastAndroid.show("Moto não encontrada!", ToastAndroid.LONG);
    }
  } else {
    ToastAndroid.show("Digite um identificador!", ToastAndroid.LONG);
  }
}

  return (
    <View
      style={[
        styles.pageColor,
        styles.container,
        { alignItems: "center", gap: 16 },
      ]}
    >
      <View style={{ width: "80%" }}>
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
      <View style={[estiloLocal.contentArea]}>
        <View style={[estiloLocal.listArea]}>
          <ListaMotos data={motos}></ListaMotos>
        </View>
      </View>

      <View>
        {paginas.map((page) => {
          return (
            <Pressable
              key={page}
              onPress={() => {
                // fetchMotos(page, 10);
                mockFetch()
              }}
            >
              <Text>{page}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const estiloLocal = StyleSheet.create({
  listArea: {
    display: "flex",
    flexDirection: "column",
    padding: 8,
    width: "80%",
    height: "80%",
    backgroundColor: "#C4C4C4",
    borderRadius: 16,
  },
  contentArea: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
});
