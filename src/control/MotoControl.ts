import { useAuth } from "@/context/AuthContext";
import { Moto } from "@/model/Moto";
import { AppDrawerNavigationProps } from "@/navigators/NavigationTypes";
import MotoService from "@/services/MotoService";
import { useDebounce } from "@/utils/useDebounce";
import { useNavigation } from "@react-navigation/native";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { ValidationError } from "yup";

interface UseMotoProps {
  size?: number;
}

const useMoto = ({ size = 2 }: UseMotoProps) => {
  const [editingMoto, setEditingMoto] = useState<Moto | null>(null);

  const [page, setPage] = useState<number>(1);

  const queryClient = useQueryClient();

  const { token } = useAuth();

  const motoService = new MotoService(token);

  const [motoErrors, setMotoErrors] = useState<Partial<Moto>>({});

  const [busca, setBusca] = useState<string | null>(null);


  const limparBusca = () => {
    setBusca(null);
  };

  const debouncedBusca = useDebounce(busca, 1000);

  const pagedMotos = useQuery({
    queryKey: ["motos", page, size, debouncedBusca],
    queryFn: async () => {
      if (debouncedBusca) {
        setPage(1);
      }
      return await motoService.getPagedMotos(debouncedBusca, page, size);
    },
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

  const salvarMoto = (newMoto: Partial<Moto>) =>
    saveMotoMutation.mutate(newMoto);

  const stackNavigation = useNavigation<AppDrawerNavigationProps>();

  const goToSingleMoto = (moto: Moto) => {
    stackNavigation.navigate("Moto", { moto });
  };

  const handleEditingMode = (moto: Moto) => {
    if (editingMoto !== null) {
      // Se já está editando uma moto, cancela a edição
      setEditingMoto(null);
      stackNavigation.navigate("Moto", { moto });
      return;
    }

    // Se não está editando, entra no modo de edição
    setEditingMoto(moto);
    stackNavigation.navigate("Moto", { moto, editing: true });
  };

  const handleEditingMoto = (field: keyof Moto, value?: string | object) => {
    setEditingMoto((moto) => {
      if (!moto) return null;
      return { ...moto, [field]: value as any };
    });
  };

  return {
    pagedMotos,
    salvarMoto,
    page,
    setPage,
    motoErrors,
    busca,
    setBusca,
    limparBusca,
    goToSingleMoto,
    handleEditingMoto,
    editingMoto,
    handleEditingMode,
  };
};

export { useMoto };
