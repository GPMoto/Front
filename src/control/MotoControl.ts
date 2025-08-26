import { MotoViewTeste } from "@/utils/interfacesTeste";
import { motoViewMockList } from "@/utils/motoMockList";
import { useState } from "react";
import { ListRenderItemInfo } from "react-native";

const useMoto = () => {
  const [listaMotos, setListaMotos] =
    useState<MotoViewTeste[]>(motoViewMockList);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const [motoView, setMotoView] = useState<MotoViewTeste | null>();

  const atualizarCorMoto = (motoId: number) => {
    setListaMotos((listaAntiga) =>
      listaAntiga.map((moto) =>
        moto.id === motoId
          ? {
              ...moto,
              clicked: !moto.clicked,
              color: !moto.clicked ? "#41C526" : "black",
            }
          : moto
      )
    );
  };

  const abrirModal = (item : MotoViewTeste) => {
    atualizarCorMoto(item.id!);
    setMotoView(item);
    setModalVisible(true);
  };

  return {
    atualizarCorMoto,
    listaMotos,
    modalVisible,
    motoView,
    abrirModal,
    setModalVisible
  };
};

export { useMoto };
