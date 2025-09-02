import { useAuth } from "@/context/AuthContext";
import { ProfileResponse } from "@/model/User";
import { UserData } from "@/model/User";
import ProfileService from "@/services/ProfileService";
import { useState } from "react";

const useProfile = () => {
  const [usuario, setUsuario] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { token } = useAuth(); // Hook deve ser chamado aqui no topo
  const profileService = new ProfileService();

  const getUserInfo = async () => {
    console.log("Iniciando getUserInfo...");
    console.log(`Token: ${token}`);
    
    if (!token) {
      console.log("Token não encontrado, encerrando...");
      setLoading(false);
      return;
    }
    
    setLoading(true);
    console.log("Fazendo requisição para getUserInfo()");
    
    try {
      const usuario: ProfileResponse = await profileService.get(token);
      console.log("Feito pedido para profile service.");
      console.log(usuario);
      
      if (!usuario.success) {
        console.log("Resposta não foi sucesso");
        setLoading(false);
        return;
      }
      
      console.log("Sucesso! Definindo usuário...");
      setUsuario(usuario.data as UserData);
    } catch (error) {
      console.error("Erro ao buscar dados do usuário:", error);
    } finally {
      setLoading(false);
    }
  };
  return {
    usuario,
    loading,
    getUserInfo
  };
};

export { useProfile };
