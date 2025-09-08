import { useAuth } from "@/context/AuthContext";
import { Moto } from "@/model/Moto";
import MotoService from "@/services/MotoService";
import { notEmptyString } from "@/utils/helpers";
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
    const [debouncedBusca, setDebouncedBusca] = useState<string | null>(null);
  
    const limparBusca = () => {
      setBusca(null)
    }
    useEffect(() => {
      const timer = setTimeout(() => {
        setDebouncedBusca(busca);
      }, 3000);
  
      return () => clearTimeout(timer);
    }, [busca]);

  const { data, isLoading, error, isSuccess } = useQuery({
    queryKey: ["motos", page, size, debouncedBusca],
    queryFn: async () => {
      const result = await motoService.getPagedMotos(debouncedBusca, page, size);
      return result;
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
    motos: data,
    isSuccess,
    isLoading,
    error,
    salvarMoto,
    page,
    setPage,
    motoErrors,
    busca,
    setBusca,
    limparBusca
  };
};

export { useMoto };
