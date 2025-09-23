import { useAuth } from "@/context/AuthContext";
import ProfileService from "@/services/ProfileService";
import { formatCNPJ } from "@/utils/helpers";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

const useProfile = () => {
  const { token, isAuthenticated } = useAuth();

  const queryClient = useQueryClient();

  useEffect(() => {
    if (!isAuthenticated) {
      queryClient.invalidateQueries({ queryKey: ["profile-data"] });
    }
  }, [isAuthenticated, queryClient]);

  const profileService = new ProfileService(token!);

  const profile = useQuery({
    queryKey: ["profile-data"],
    queryFn: async () => await profileService.get(),
    enabled: !!token,
    retry: 2,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  return {
    profile: profile.data,
    isLoading: profile.isLoading,
    error: profile.error,
    isError: profile.isError,
    refetch: profile.refetch,
    formatCNPJ,
  };
};

export { useProfile };
