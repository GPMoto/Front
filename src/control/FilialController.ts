import { useAuth } from "@/context/AuthContext";
import FilialService from "@/services/FilialService";
import { useQuery } from "@tanstack/react-query";
import { useProfile } from "./ProfileController";

const useFilial = () => {
  const { token } = useAuth();

  const filialService: FilialService = new FilialService(token);

  const {
    profile,
    isLoading: profileLoading,
    error: profileError,
  } = useProfile();

  const filial = useQuery({
    queryKey: ["filial"],
    queryFn: async () => {
      return await filialService.getSecoes(profile!.idFilial.idFilial);
    },
    enabled: !!profile,
  });

  

  return {
    loading: profileLoading || filial.isLoading ,
    error: profileError || filial.error,
    secoes: filial.data
  };
};

export default useFilial;
