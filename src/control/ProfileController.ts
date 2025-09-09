import { useAuth } from "@/context/AuthContext";
import ProfileService from "@/services/ProfileService";
import { formatCNPJ } from "@/utils/helpers";
import { useQuery } from "@tanstack/react-query";

const useProfile = () => {
  
  const { token } = useAuth(); 

  const profileService = new ProfileService(token!);
  
  const profile = useQuery({
    queryKey: ['profile-data'],
    queryFn: async () => await profileService.get(),
    enabled: !!token,
    retry: 2,
    refetchOnMount: true,
    refetchOnWindowFocus: false
  })

  return {
    profile : profile.data,
    isLoading: profile.isLoading,
    error : profile.error,
    isError: profile.isError,
    refetch: profile.refetch,
    formatCNPJ
  };
};

export { useProfile };
