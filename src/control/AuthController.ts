import { useAuth } from "@/context/AuthContext";
import { UserLogin, UserLoginErrors } from "@/model/UserLogin";
import { AuthService } from "@/services/AuthService";
import { useState } from "react";

const useAuthControl = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [loginErrors, setLoginErrors] = useState<UserLoginErrors>({})
  const { login } = useAuth();

  const loginUser = async (userLogin: UserLogin) => {
    setLoading(true);
    console.log(userLogin)
    const authService = new AuthService();
    const result = await authService.login(userLogin);
    if (!result.success) {
      const errors = result.errors!;
      console.log(errors)
      setLoading(false);
      setLoginErrors(errors)
      return;
    }
    
    await login(result.data);
    setLoading(false);
  };

  return {
    loginUser,
    loading,
    loginErrors
  };
};

export { useAuthControl };
