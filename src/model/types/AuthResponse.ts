import { UserLoginErrorResponse, UserLoginErrors, UserLoginResponse } from "../User";

interface AuthResponse {
  data?: UserLoginResponse | UserLoginErrorResponse;
  status?: number;
  success: boolean;
  message?: string;
  errors?: UserLoginErrors;  
}

export { AuthResponse}