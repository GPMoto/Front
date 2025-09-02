import { useAuth } from "@/context/AuthContext";
import { UserLogin, UserLoginErrors, UserLoginResponse } from "@/model/User";
import { AuthService } from "@/services/AuthService";
import { useState } from "react";

const useAuthControl = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [loginErrors, setLoginErrors] = useState<UserLoginErrors>({})
  const [error, setError] = useState<string | null>()
  const { login } = useAuth();

  const loginUser = async (userLogin: UserLogin) => {
    setLoading(true);
    const authService = new AuthService();
    const result = await authService.login(userLogin);
    if (!result.success) {
      const errors = result.errors || {};
      setLoading(false);
      setLoginErrors(errors)
      setError(result.message)
      return;
    }
    
    const loginResponse = result.data as UserLoginResponse;
    await login(loginResponse.token);
    setLoading(false);
  };

  return {
    loginUser,
    loading,
    loginErrors,
    error
  };
};

export { useAuthControl };
