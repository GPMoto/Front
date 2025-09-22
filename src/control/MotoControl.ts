import { useAuth } from "@/context/AuthContext";
import { Moto } from "@/model/Moto";
import { PageableResponse } from "@/model/types/PageableResponse";
import {
  AppDrawerNavigationProps,
  DrawerParamList,
} from "@/navigators/NavigationTypes";
import MotoService from "@/services/MotoService";
import { useDebounce } from "@/utils/useDebounce";
import { useNavigation } from "@react-navigation/native";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { ValidationError } from "yup";
import { useProfile } from "./ProfileController";

interface UseMotoProps {
  size?: number;
  motoId?: number; // Novo parâmetro opcional
  idSecaoFilial? : number;
}

const useMoto = ({ size = 2, motoId, idSecaoFilial }: UseMotoProps) => {
  const [editingMoto, setEditingMoto] = useState<Moto | null>(null);
  const [routeMoto, setRouteMoto] = useState<Moto | null>(null);

  const [page, setPage] = useState<number>(1);

  const queryClient = useQueryClient();

  const { token } = useAuth();

  const motoService = new MotoService(token);

  const [motoErrors, setMotoErrors] = useState<Partial<Moto>>({});

  const [busca, setBusca] = useState<string | null>(null);

  const limparBusca = () => {
    setBusca(null);
  };

  const hasChanges = () => {
    console.log("routeMoto", routeMoto);
    console.log("editingMoto", editingMoto);
    if (!routeMoto || !editingMoto) return false;

    return (
      editingMoto.status !== routeMoto.status ||
      editingMoto.condicoesManutencao !== routeMoto.condicoesManutencao ||
      editingMoto.idTipoMoto.id_tipo_moto !==
        routeMoto.idTipoMoto.id_tipo_moto ||
      editingMoto.identificador !==
        routeMoto.identificador
    );
  };

  
  const debouncedBusca = useDebounce(busca, 1000);
  
  const getPagedMotosBySecaoFilial = useQuery({
    queryKey: ["motos", page, size, debouncedBusca, idSecaoFilial],
    queryFn: async () => {
      if (debouncedBusca) {
        setPage(1);
      }
      console.log("Cheguei aqui!")
      const response = await motoService.getPagedMotosBySecaoFilial(idSecaoFilial!, debouncedBusca, page, size)
      console.log("Olha esse dado: ", response);
      return response;

    },
    enabled: idSecaoFilial != undefined,
  })

  const { profile } = useProfile()

  const idFilial = profile && profile.idFilial.idFilial;

  const pagedMotos = useQuery({
    queryKey: ["motos", page, size, debouncedBusca],
    queryFn: async () => {
      if (debouncedBusca) {
        setPage(1);
      }
      
      return await motoService.getPagedMotos(idFilial ?? 1, debouncedBusca, page, size);
    },
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  // Nova query para buscar moto específica
  const singleMoto = useQuery({
    queryKey: ["moto", motoId],
    queryFn: async () => {
      if (!motoId) return null;
      return await motoService.getMotoById(motoId);
    },
    enabled: !!motoId, // Só executa se motoId existir
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  const saveMotoMutation = useMutation({
    mutationFn: async (newMoto: Partial<Moto>) =>
      await motoService.save(newMoto),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["motos"] }),
    onError: (error: Error) => {
      if (error instanceof ValidationError) {
        error.inner.forEach((err: ValidationError) => {
          setMotoErrors((motoErrors) => ({
            ...motoErrors,
            [err.path as keyof typeof motoErrors]: err.message,
          }));
        });
      }
    },
  });

  const drawerNavigator = useNavigation<AppDrawerNavigationProps>();

  const updateMotoMutation = useMutation({
    mutationFn: async (updateMoto: Moto) => {
      const result = hasChanges();
      console.log("Tem mudanças? ", result);
      if (!result) {
        return undefined;
      }
      return await motoService.update(updateMoto);
    },
    onSuccess: (updatedMoto: Moto | undefined) => {
      if (updatedMoto) {
        // Invalida todas as queries relacionadas a motos
        queryClient.invalidateQueries({ queryKey: ["motos"] });
        queryClient.refetchQueries({ queryKey: ["motos"] });
        // Atualiza a moto sendo editada
        setRouteMoto(updatedMoto);
        setEditingMoto(null);
        drawerNavigator.navigate("Procurar Moto");
      }
    },
    onError: (error) => {
      if (error instanceof ValidationError) {
        error.inner.forEach((err: ValidationError) => {
          setMotoErrors((motoErrors) => ({
            ...motoErrors,
            [err.path as keyof typeof motoErrors]: err.message,
          }));
        });
      }
    },
  });

  const atualizarMoto = () => {
    console.log("Tentando atualizar moto:", editingMoto);
    if (!editingMoto) {
      console.log("editingMoto está vazio!");
      return;
    }
    updateMotoMutation.mutate(editingMoto);
  };

  const salvarMoto = (newMoto: Partial<Moto>) =>
    saveMotoMutation.mutate(newMoto);

  const goToSingleMoto = (moto: Moto) => {
    drawerNavigator.navigate("Moto", { moto });
  };

  const enterEditMode = (moto: Moto) => {
    setEditingMoto(moto);
    drawerNavigator.navigate("Moto", { moto, editing: true });
  };

  const reloadPage = () => {
    drawerNavigator.replaceParams(undefined);
  }

  const saveChanges = () => {
    if (editingMoto && hasChanges()) {
      atualizarMoto();
    } else {
      console.log("Nenhuma mudança detectada ou editingMoto está vazio");
    }
  };

  const cancelEdit = () => {
    setEditingMoto(null);
  };

  const handleEditingMode = (isEditing: boolean, moto?: Moto) => {
    if (isEditing) {
      // Modo edição - salvar
      saveChanges();
    } else {
      // Entrar no modo edição
      if (moto) {
        enterEditMode(moto);
      }
    }
  };

  const handleEditingForm = (field: keyof Moto, value?: string | object) => {
    setEditingMoto((moto) => {
      if (!moto) return null;
      return { ...moto, [field]: value as any };
    });
  };

  return {
    pagedMotos: idSecaoFilial ? getPagedMotosBySecaoFilial : pagedMotos,
    singleMoto, // Nova query retornada
    salvarMoto,
    page,
    setPage,
    motoErrors,
    busca,
    setBusca,
    limparBusca,
    goToSingleMoto,
    handleEditingForm,
    editingMoto,
    handleEditingMode,
    atualizarMoto,
    setRouteMoto,
    routeMoto,
    enterEditMode,
    saveChanges,
    cancelEdit,
    hasChanges,
    reloadPage
  };
};

export { useMoto };
