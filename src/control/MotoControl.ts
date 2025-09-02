import { useAuth } from "@/context/AuthContext";
import { Moto } from "@/model/Moto";
import MotoService from "@/services/MotoService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const useMoto = (size: number = 2) => {
  const [page, setPage] = useState<number>(1);
  
  const queryClient = useQueryClient();

  const { token } = useAuth();

  const motoService = new MotoService(token);

  const { data, isLoading, error, isSuccess } = useQuery({
    queryKey: ["motos", page, size],
    queryFn: async () => {
      const result = await motoService.getPagedMotos(page, size);
      return result;
    },
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  const saveMotoMutation = useMutation({
    mutationFn: async(newMoto: Partial<Moto>) => await motoService.save(newMoto),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["motos"] }),
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
    setPage
  };
};

export { useMoto };
