import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useState, useContext, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

interface AuthContextProps {
  token: string | null;
  isAuthenticated: boolean;
  login: (authToken: string) => Promise<void>;
  logout: () => void;
  splashScreen : boolean;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [splashScreen, setSplashScreen] = useState<boolean>(true);
  const queryClient = useQueryClient();

  useEffect(() => {
    loadStoredToken();
  }, []);

  const loadStoredToken = async () => {
    try {
      const storedToken = await AsyncStorage.getItem("TOKEN");
      if (storedToken) {
        setToken(storedToken);
      }
    } catch (error) {
      console.error("Erro ao carregar token:", error);
    } finally {
      setSplashScreen(false)
    }
  };

  const login = async (authToken: string) => {
    setToken(authToken);
    await AsyncStorage.setItem("TOKEN", authToken);
    
    // Invalidar queries específicas primeiro
    await queryClient.invalidateQueries({ queryKey: ["perfil"] });
    await queryClient.invalidateQueries({ queryKey: ["motos"] });
    await queryClient.invalidateQueries({ queryKey: ["filiais"] });
    await queryClient.invalidateQueries({ queryKey: ["tipos-moto"] });
    
    // Invalidar todas as outras queries para garantir dados atualizados
    await queryClient.invalidateQueries();
  };

  const logout = async () => {
    setToken(null);
    await AsyncStorage.removeItem("TOKEN");
    
    // Limpar todas as queries do cache no logout
    queryClient.clear();
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated: !!token,
        login,
        logout,
        splashScreen
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
