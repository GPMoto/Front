import { motoInterfaceTeste } from "@/utils/interfacesTeste";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useState } from "react";
import { motoInterfaceTesteList } from "@/utils/motoInterfaceList";
import { ToastAndroid } from "react-native";

const useProcurarMoto = () => {
  const [identificador, setIdentificador] = useState("");
  const [moto, setMoto] = useState<motoInterfaceTeste>();
  const [motos, setMotos] = useState<motoInterfaceTeste[]>([]);
  const [paginas, setPaginas] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [isSearched, setIsSearched] = useState<boolean>(false);

  const api = axios.create({
    baseURL: "http://localhost:8080/",
  });
  const fetchMotos = async (pagina: number, quantidade: number) => {
    try {
      const response = await api.get(
        `/moto/filial/1/paginados/?pagina=${pagina}&quantidade=${quantidade}`
      );

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

  const mockFetch = async () => {
    try {
      // Tenta buscar do AsyncStorage
      const stored = await AsyncStorage.getItem("motos");
      let data: motoInterfaceTeste[] = [];
      if (stored) {
        data = JSON.parse(stored);
      } else {
        data = motoInterfaceTesteList;
        await AsyncStorage.setItem("motos", JSON.stringify(data));
      }
      setMotos(data);
      const tempPages: number[] = [];
      let x = 0;
      for (let i = 1; i <= data.length; i += 2) {
        x += 1;
        tempPages.push(x);
      }
      setPaginas(tempPages);
    } catch (error) {
      console.error("Erro ao buscar motos:", error);
    }
  };

  const clearSearch = () => {
    setIdentificador("");
    mockFetch();
    setIsSearched(false);
  };

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

  const onPressMock = async () => {
    if (identificador) {
      try {
        const stored = await AsyncStorage.getItem("motos");
        let motosList: motoInterfaceTeste[] = [];
        if (stored) {
          motosList = JSON.parse(stored);
        } else {
          motosList = motoInterfaceTesteList;
          await AsyncStorage.setItem("motos", JSON.stringify(motosList));
        }
        const resultado = motosList.filter((moto) =>
          moto.identificador.toUpperCase().includes(identificador)
        );
        if (resultado.length > 0) {
          setMotos(resultado);
          setIsSearched(true);
        } else {
          ToastAndroid.show("Moto não encontrada!", ToastAndroid.LONG);
        }
      } catch (error) {
        ToastAndroid.show("Erro ao procurar moto!", ToastAndroid.LONG);
      }
    } else {
      ToastAndroid.show("Digite um identificador!", ToastAndroid.LONG);
    }
  };
  return {
    onPress,
    onPressMock,
    clearSearch,
    mockFetch,
    fetchMotos,
    isSearched,
    identificador,
    setIdentificador,
    paginas,
    motos
  };
};

export { useProcurarMoto };
