import { AuthResponse } from "@/model/AuthResponse";
import { GenericResponse } from "@/model/GenericResponse";
import { UserLogin } from "@/model/UserLogin";
import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";

class AuthFetcher {
  private endpoint: string = "/usuario";
  private baseUrl: string;
  private apiClient: AxiosInstance;

  constructor() {
    this.baseUrl = process.env.EXPO_PUBLIC_API_URL;
    this.apiClient = axios.create({
      baseURL: this.baseUrl,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    this.requestInterceptors();
  }

  private requestInterceptors() {
    this.apiClient.interceptors.response.use(
      (response) => response,
      (error: AxiosError<AuthResponse>) => {
        const errorResponse: AuthResponse = {
          data: error.response?.data || null,
          status: error.response?.status || 0,
          success: false,
          message: this.getErrorMessage(error),
        };

        return Promise.resolve({ data: errorResponse } as AxiosResponse);
      }
    );
  }

  private getErrorMessage(error: AxiosError<AuthResponse>): string {
    if (!error.response) return "Erro de conexão";

    const { status } = error.response;
    switch (status) {
      case 401:
        return "Email ou senha incorretos";
      case 400:
        return "Dados inválidos";
      case 500:
        return "Erro interno do servidor";
      default:
        return error.response.data.message || "Erro no login";
    }
  }

  async login(userLogin: UserLogin): Promise<AuthResponse> {
    const response: AxiosResponse = await this.apiClient.post(
      this.endpoint,
      userLogin
    );

    const data: AuthResponse = response.data;

    if (!data.success) return data;

    return {
      data,
      status: response.status,
      success: true,
      message: "Login realizado com sucesso",
    };
  }
}

export { AuthFetcher };
