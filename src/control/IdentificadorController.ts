import { useAuth } from "@/context/AuthContext";
import IdentificadorService from "@/services/IdentificadorService";
import { useQuery } from "@tanstack/react-query";

export const useIdentificador = () => {
  const { token } = useAuth();

  const identificadoresFilial = useQuery({
    queryKey: ["identificador-filial", 1],
    queryFn: async () => await new IdentificadorService(token).findByFilial(1),
  });

  return {
    identificadoresFilial,
  };
};
