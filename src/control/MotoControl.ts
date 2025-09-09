import { useAuth } from "@/context/AuthContext";
import { Moto } from "@/model/Moto";
import MotoService from "@/services/MotoService";
import { notEmptyString } from "@/utils/helpers";
import { useDebounce } from "@/utils/useDebounce";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { ValidationError } from "yup";

const useMoto = (size: number = 2) => {
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
      return await motoService.getPagedMotos(
        debouncedBusca,
        page,
        size
      );
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

  return {
    pagedMotos,
    salvarMoto,
    page,
    setPage,
    motoErrors,
    busca,
    setBusca,
    limparBusca,
  };
};

export { useMoto };
