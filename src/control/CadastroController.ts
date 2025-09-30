import ButtonArea from "@/components/Button/ButtonArea";
import { useAuth } from "@/context/AuthContext";
import { Filial } from "@/model/Filial";
import { AuthResponse } from "@/model/types/AuthResponse";
import { CreateUser } from "@/model/User";
import { AuthService } from "@/services/AuthService";
import FilialService from "@/services/FilialService";
import ProfileService from "@/services/ProfileService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { Alert } from "react-native";

const useAllFiliais = () => {
  const { data: perfilConvidado, isSuccess: perfilLoaded } = useQuery({
    queryKey: ["perfis"],
    queryFn: async () => {
      const perfis = await new ProfileService(null).getPerfis();
      return perfis[0];
    },
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  const [form, setForm] = useState<CreateUser>({
    nome: "",
    email: "",
    idFilial: 0,
    idPerfil: 0,
    senha: "",
  });

  useEffect(() => {
    if (perfilLoaded && perfilConvidado) {
      setForm((form) => ({ ...form, idPerfil: perfilConvidado.idPerfil }));
    }
  }, [perfilLoaded, perfilConvidado]);

  const [formErrors, setFormErrors] = useState<Partial<CreateUser>>({});

  const { data, isLoading, error } = useQuery({
    queryKey: ["filiais"],
    queryFn: async () => {
      return await new FilialService(null).getAllFiliais();
    },
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  const handleForm = (text: string, field: keyof CreateUser) => {
    if (field === "idFilial" || field === "idPerfil") {
      const number = Number(text);
      setForm((form) => ({ ...form, [field]: number }));
    }

    setForm((form) => ({ ...form, [field]: text }));
  };

  const cadastroMutation = useMutation({
    mutationFn: (createUser: CreateUser) => {
      return new AuthService().register(createUser);
    },
    onSuccess: (result: AuthResponse) => {
      if (result.success) {
        setForm({
          nome: "",
          email: "",
          idFilial: 0,
          idPerfil: perfilConvidado?.idPerfil ?? 0,
          senha: "",
        });
        setFormErrors({});
        Alert.alert("Usuário criado com sucesso!");
      } else if (result.errors) {
        setFormErrors({});
        setFormErrors(result.errors);
      }
    },
  });

  const salvar = () => {
    cadastroMutation.mutate(form);
  };

  const [selectedFilial, setSelectedFilial] = useState<Filial | null>(null);

  return {
    data,
    isLoading,
    error,
    setSelectedFilial,
    selectedFilial,
    form,
    handleForm,
    salvar,
    formErrors,
    cadastroForm: cadastroMutation,
  };
};

export default useAllFiliais;
