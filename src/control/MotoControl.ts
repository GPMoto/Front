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
import { useProfile } from "./ProfileController";
import { Alert } from "react-native";
import TipoMotoService from "@/services/TipoMotoService";
import FilialService from "@/services/FilialService";
import ProfileService from "@/services/ProfileService";

interface UseMotoProps {
  size?: number;
  motoId?: number; // Novo parâmetro opcional
  idSecaoFilial?: number;
}

const useMoto = ({ size = 2, motoId, idSecaoFilial }: UseMotoProps) => {
  const [editingMoto, setEditingMoto] = useState<Moto | null>(null);
  const [routeMoto, setRouteMoto] = useState<Moto | null>(null);

  const [page, setPage] = useState<number>(1);

  const queryClient = useQueryClient();

  const { token } = useAuth();

  const motoService = new MotoService(token);

  const [motoErrors, setMotoErrors] = useState<{ [key: string]: string }>({});

  const [busca, setBusca] = useState<string | null>(null);

  const limparBusca = () => {
    setBusca(null);
  };

  const hasChanges = () => {
    if (!routeMoto || !editingMoto) return false;

    return (
      editingMoto.status !== routeMoto.status ||
      editingMoto.condicoesManutencao !== routeMoto.condicoesManutencao ||
      editingMoto.idTipoMoto.id_tipo_moto !==
        routeMoto.idTipoMoto.id_tipo_moto ||
      editingMoto.identificador !== routeMoto.identificador
    );
  };

  const debouncedBusca = useDebounce(busca, 1000);

  const getPagedMotosBySecaoFilial = useQuery({
    queryKey: ["motos", page, size, debouncedBusca, idSecaoFilial],
    queryFn: async () => {
      if (debouncedBusca) {
        setPage(1);
      }
      const response = await motoService.getPagedMotosBySecaoFilial(
        idSecaoFilial!,
        debouncedBusca,
        page,
        size
      );
      return response;
    },
    enabled: idSecaoFilial != undefined,
  });

  const { profile } = useProfile();

  const idFilial = profile && profile.idFilial.idFilial;

  const pagedMotos = useQuery({
    queryKey: ["motos", page, size, debouncedBusca],
    queryFn: async () => {
      if (debouncedBusca) {
        setPage(1);
      }

      return await motoService.getPagedMotos(
        idFilial ?? 1,
        debouncedBusca,
        page,
        size
      );
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
    mutationFn: async (newMoto: Partial<Moto>) => {
      console.log('saveMotoMutation.mutationFn called with:', newMoto);
      const result = await motoService.save(newMoto);
      console.log('saveMotoMutation.mutationFn result:', result);
      return result;
    },
    onSuccess: (result) => {
      console.log('saveMotoMutation.onSuccess called');
      if (result.success) {
        queryClient.invalidateQueries({ queryKey: ["motos"] });
        setMotoErrors({}); // Limpar erros
        // Só navega se salvou com sucesso
        setEditingMoto(null);
        drawerNavigator.navigate("Procurar Moto");
      } else if (result.errors) {
        // Definir erros de validação - mantém na tela atual
        setMotoErrors(result.errors);
      }
    },
    onError: (error: Error) => {
      console.log('saveMotoMutation.onError called:', error);
    },
  });

  const drawerNavigator = useNavigation<AppDrawerNavigationProps>();

  const updateMotoMutation = useMutation({
    mutationFn: async (updateMoto: Moto) => {
      const result = hasChanges();
      if (!result) {
        return { success: false, message: "Nenhuma alteração detectada" };
      }
      return await motoService.update(updateMoto);
    },
    onSuccess: (result) => {
      if (result?.success && result.data) {
        // Invalida todas as queries relacionadas a motos
        queryClient.invalidateQueries({ queryKey: ["motos"] });
        queryClient.refetchQueries({ queryKey: ["motos"] });
        // Atualiza a moto sendo editada
        setRouteMoto(result.data);
        setEditingMoto(null);
        setMotoErrors({}); // Limpar erros
        // Só navega se não há erros
        drawerNavigator.navigate("Procurar Moto");
      } else if (!result?.success && result?.errors) {
        // Definir erros de validação - mantém na tela atual
        setMotoErrors(result.errors);
      }
    },
    onError: (error) => {
      console.error("Erro ao atualizar moto:", error);
    },
  });

  const [saving, setSaving] = useState(false);
  const [updating, setUpdating] = useState(false);

  const atualizarMoto = () => {
    if (!editingMoto) {
      return;
    }
    setUpdating(true);
    updateMotoMutation.mutate(editingMoto, {
      onSettled: () => setUpdating(false),
    });
  };

  const salvarMoto = (newMoto: Partial<Moto>) => {
    setSaving(true);
    saveMotoMutation.mutate(newMoto, {
      onSettled: () => setSaving(false),
    });
  };

  const goToSingleMoto = (moto: Moto) => {
    drawerNavigator.navigate("Moto", { moto });
  };

  const enterEditMode = (moto: Moto) => {
    setEditingMoto(moto);
    drawerNavigator.navigate("Moto", { moto, editing: true });
  };

  const reloadPage = () => {
    drawerNavigator.replaceParams(undefined);
  };

  const saveChanges = () => {
    if (editingMoto && hasChanges()) {
      setUpdating(true);
      updateMotoMutation.mutate(editingMoto, {
        onSettled: () => setUpdating(false),
      });
    }
  };

  const cancelEdit = () => {
    setEditingMoto(null);
  };

  const handleEditingMode = (isEditing: boolean, moto?: Moto) => {
    if (isEditing) {
      saveChanges();
    } else {
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

  const deleteMotoMutation = useMutation({
    mutationFn: async (id: number) => await motoService.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["motos"] }),
  });

  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleDelete = (idMoto: number) => {
    Alert.alert(
      "Confirmar exclusão",
      "Tem certeza que deseja excluir esta moto?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          onPress: () => {
            setDeletingId(idMoto);
            deleteMotoMutation.mutate(idMoto, {
              onSettled: () => setDeletingId(null),
            });
          },
        },
      ]
    );
  };

  const handleSave = () => {
    if (!editingMoto) {
      console.log('handleSave: editingMoto is null');
      return null;
    }
    
    console.log('handleSave: editingMoto data:', editingMoto);
    console.log('handleSave: calling setSaving(true)');
    setSaving(true);
    console.log('handleSave: calling saveMotoMutation.mutate()');
    saveMotoMutation.mutate(editingMoto, {
      onSettled: () => {
        console.log('handleSave: onSettled called, calling setSaving(false)');
        setSaving(false);
      },
    });
    console.log('handleSave: mutate call completed');
  };

  const { data: tiposMoto, isSuccess: tipoMotoLoaded } = useQuery({
    queryKey: ["tipo-moto"],
    queryFn: async () => await new TipoMotoService(token).findAll(),
  });

  const { data: perfil, isSuccess: profileLoaded } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => await new ProfileService(token).get(),
  });

  const { data: secoesFilial, isSuccess: secoesLoaded } = useQuery({
    queryKey: ["secoes-filial"],
    queryFn: async () =>
      await new FilialService(token).getSecoes(perfil!.idFilial.idFilial),
  });

  const goToCreateMoto = () => {
    if (!(tipoMotoLoaded || profileLoaded || secoesLoaded)) return null;
    drawerNavigator.navigate("Moto", {
      moto: {
        identificador: "",
        status: "",
        condicoesManutencao: "",
        idTipoMoto: tiposMoto!.find((tipoMoto) => tipoMoto.id_tipo_moto === 1)!,
        idSecaoFilial: secoesFilial!.find(
          (secaoFilial) => secaoFilial.idFilial.idFilial === 1
        )!,
      },
      editing: true,
    });
  };

  const verifyIsCreating = (moto: Moto) => {
    // Se não tem idMoto ou idMoto é undefined/null, está criando
    return !moto.idMoto;
  };

  return {
    pagedMotos: idSecaoFilial ? getPagedMotosBySecaoFilial : pagedMotos,
    singleMoto,
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
    reloadPage,
    handleDelete,
    deletingId,
    goToCreateMoto,
    verifyIsCreating,
    handleSave,
    saveLoading: saving,
    updateLoading: updating
  };
};

export { useMoto };
