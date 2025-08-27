import { AuthFetcher } from "@/fetcher/AuthFetcher";
import { AuthResponse } from "@/model/AuthResponse";
import {
  UserLogin,
  UserLoginErrors,
  userLoginSchema,
} from "@/model/UserLogin";
import { ValidationError } from "yup";

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
      try {
        await userLoginSchema.validate(userLogin, {
          abortEarly: false,
        });
      } catch (err: any) {
        if (err instanceof ValidationError) {
          err.inner.forEach((error: ValidationError) => {
            userLoginErros = {
              ...userLoginErros,
              [error.path as keyof UserLoginErrors]: error.message,
            };
          });
        }
      }

      return {
        success: false,
        errors: userLoginErros
      };
    }
    return await this.authFetcher.login(userLogin);
  }
}

export { AuthService };
