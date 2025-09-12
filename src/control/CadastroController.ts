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
      return (await new ProfileService(null).getPerfis()).find(
        (perfil) => perfil.nmPerfil === "Convidado"
      );
    },
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  const [form, setForm] = useState<CreateUser>({
    nome: "",
    email: "",
    filial: 0,
    perfil: 0,
    password: "",
  });

  useEffect(() => {
    if (perfilLoaded && perfilConvidado) {
      setForm((form) => ({ ...form, perfil: perfilConvidado.idPerfil }));
    }
  }, [perfilLoaded, perfilConvidado]);

  const [formErrors, setFormErrors] = useState<Partial<CreateUser>>({});

  const { data, isLoading, error } = useQuery({
    queryKey: ["filiais"],
    queryFn: async () => {
      console.log("Todas as filiais sendo puxadas");
      return await new FilialService(null).getAllFiliais();
    },
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  const handleForm = (text: string, field: keyof CreateUser) => {
    if (field === "filial" || field === "perfil") {
      const number = Number(text);
      setForm((form) => ({ ...form, [field]: number }));
    }

    setForm((form) => ({ ...form, [field]: text }));
  };

  const cadastroMutation = useMutation({
    mutationFn: (createUser: CreateUser) => {
      console.log(createUser);
      return new AuthService().register(createUser);
    },
    onSuccess: (result: AuthResponse) => {
      if (result.success) {
        setForm({
          nome: "",
          email: "",
          filial: 0,
          perfil: perfilConvidado?.idPerfil ?? 0,
          password: "",
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
