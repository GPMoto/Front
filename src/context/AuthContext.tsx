import { AuthService } from "@/services/AuthService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useState, useContext, useEffect } from "react";

interface AuthContextProps {
  token: string | null;
  isAuthenticated: boolean;
  login: (authToken: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    loadStoredToken();
  }, []);

  const loadStoredToken = async () => {
    const authService = new AuthService();
    try {
      const storedToken = await AsyncStorage.getItem("TOKEN");
      if (!storedToken) {
        return;
      }

      const isValidToken = await authService.validateToken(storedToken);
      if (!isValidToken) {
        return;
      }

      setToken(storedToken);
    } catch (error) {
      console.error("Erro ao carregar token:", error);
    }
  };

  const login = async (authToken: string) => {
    setToken(authToken);
    await AsyncStorage.setItem("TOKEN", authToken);
  };

  const logout = async () => {
    setToken(null);
    await AsyncStorage.removeItem("TOKEN");
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated: !!token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
