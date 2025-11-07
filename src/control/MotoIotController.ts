import { MotoIotService } from "@/services/MotoIotService";
import MotoService from "@/services/MotoService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const useMotoIOT = () => {
  const [toggleIot, setToggleIot] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["motos-iot"],
    queryFn: async () => await new MotoIotService().getMotoWithDevices(),
  });

  const {
    isPending: callMotoLoading,
    data: callMotoData,
    mutate: call,
  } = useMutation({
    mutationKey: ["chamar-moto"],
    mutationFn: async () => {
      setToggleIot(!toggleIot)
      console.log("toggleIot", toggleIot);
      return await new MotoIotService().callMoto(toggleIot);
    },
  });

  return {
    motos: data,
    loading: isLoading,
    callMotoLoading,
    callMotoData,
    call,
  };
};
