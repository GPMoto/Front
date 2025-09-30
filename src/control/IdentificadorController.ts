import { useAuth } from "@/context/AuthContext";
import IdentificadorService from "@/services/IdentificadorService";
import { useQuery } from "@tanstack/react-query";

interface UseIdentificadorProps {
  idFilial?: number;
}

export const useIdentificador = (props : UseIdentificadorProps) => {
  const { token } = useAuth();

  const { idFilial } = props;

  const identificadoresFilial = useQuery({
    queryKey: ["identificador-filial", idFilial ?? 1],
    queryFn: async () => await new IdentificadorService(token).findByFilial(idFilial ?? 1),
  });


  return {
    identificadoresFilial,
  };
};
