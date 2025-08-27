import { AuthFetcher } from "@/fetcher/AuthFetcher";
import {
  AuthResponse,
  UserLogin,
  UserLoginErrors,
  userLoginSchema,
} from "@/model/UserLogin";
import { ValidationError } from "yup";

interface AuthResult {
  success: boolean;
  data?: any;
  errors?: UserLoginErrors;
  message?: string;
}

class AuthService {
  private authFetcher: AuthFetcher;

  constructor() {
    this.authFetcher = new AuthFetcher();
  }

  async validateToken(token: string): Promise<boolean> {
    // TODO: fazer um endpoint para validar token
    return true;
  }

  async login(userLogin: UserLogin): Promise<AuthResponse> {
    const isValid = await userLoginSchema.isValid(userLogin);
    if (!isValid) {
      let userLoginErros: UserLoginErrors = {};
      userLoginSchema
        .validate(userLogin, {
          abortEarly: false,
        })
        .then(() => ({ errors: [] }))
        .catch((err: ValidationError) => {
          err.inner.forEach((error: ValidationError) => {
            userLoginErros = {
              ...userLoginErros,
              [error.path as keyof UserLoginErrors]: error.message,
            };
          });
        });

      return {
        success: false,
        errors: userLoginErros,
        message: "Dados inválidos",
      };
    }
    return await this.authFetcher.login(userLogin);
  }
}

export { AuthService };
