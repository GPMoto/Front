import { useAuth } from "@/context/AuthContext";
import TipoMotoFetcher from "@/fetcher/TipoMotoFetcher";
import { useQuery } from "@tanstack/react-query";

export const useTipoMoto = () => {
  const { token } = useAuth();

  const tipoMotos = useQuery({
    queryKey: ["tipo-moto"],
    queryFn: async () => await new TipoMotoFetcher(token).findAll(),
  });

  return {
    tipoMotos,
  };
};
