import { UserLoginErrors } from "./UserLogin";

interface AuthResponse {
  data?: any;
  status?: number;
  success: boolean;
  message?: string;
  errors?: UserLoginErrors;  
}

export { AuthResponse}