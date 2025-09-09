import { useAuth } from "@/context/AuthContext";
import { ProfileResponse } from "@/model/User";
import { UserData } from "@/model/User";
import ProfileService from "@/services/ProfileService";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

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
    refetch: profile.refetch
  };
};

export { useProfile };
