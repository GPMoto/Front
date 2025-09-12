import { AuthFetcher } from "@/fetcher/AuthFetcher";
import { AuthResponse } from "@/model/types/AuthResponse";
import { CreateUser, createUserSchema, UserLogin, UserLoginErrors, userLoginSchema } from "@/model/User";
import { ValidationError } from "yup";

class AuthService {
  private authFetcher: AuthFetcher;

  constructor() {
    this.authFetcher = new AuthFetcher();
  }

  async validateToken(token: string): Promise<boolean> {
    const result = await this.authFetcher.validateToken(token);
    console.log(result);
    return result;
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
        errors: userLoginErros,
      };
    }
    return await this.authFetcher.login(userLogin);
  }

  async register(createUser: CreateUser) {
    let userLoginErros: UserLoginErrors = {};
    try {
      await createUserSchema.validate(createUser);
      return await this.authFetcher.register(createUser);
    } catch (err) {
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
      errors: userLoginErros,
    };
  }
}

export { AuthService };
