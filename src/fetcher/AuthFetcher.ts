import { AuthResponse } from "@/model/AuthResponse";
import { ErrorResponseApi } from "@/model/ErrorResponseApi";
import {
  UserLogin,
  UserLoginErrorResponse,
  UserLoginResponse,
} from "@/model/UserLogin";
import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import authMockApi from "./AuthFetcherMock";

class AuthFetcher {
  private endpoint: string = '/auth';
  private baseUrl: string;
  private apiClient: AxiosInstance;
  private mockApi: boolean = true;

  constructor() {
    this.baseUrl = process.env.EXPO_PUBLIC_API_URL;
    this.apiClient = this.mockApi
      ? authMockApi
      : axios.create({
          baseURL: this.baseUrl,
          timeout: 10000,
          headers: {
            "Content-Type": "application/json",
          },
        });
  }

  private getErrorMessage(error: AxiosError): string {
    if (!error.response) return "Erro de conexão";

    const { status } = error.response;
    const data: ErrorResponseApi = error.response.data as ErrorResponseApi;
    if (data.message) return data.message;
    switch (status) {
      case 401:
        return "Email ou senha incorretos";
      case 400:
        return "Dados inválidos";
      case 422:
        return "Dados de entrada inválidos";
      case 500:
        return "Erro interno do servidor";
      case 503:
        return "Serviço temporariamente indisponível";
      default:
        return data.message ?? "Erro no login";
    }
  }

  async login(userLogin: UserLogin): Promise<AuthResponse> {
    this.endpoint = "/auth/login";
    try {
      const response: AxiosResponse<UserLoginResponse> =
        await this.apiClient.post(this.endpoint, userLogin);

      return {
        data: response.data,
        status: response.status,
        success: true,
        message: "Login realizado com sucesso",
      };
    } catch (error) {
      const axiosError = error as AxiosError<UserLoginErrorResponse>;

      return {
        data: (axiosError.response?.data as UserLoginErrorResponse) || null,
        status: axiosError.response?.status || 0,
        success: false,
        message: this.getErrorMessage(axiosError),
      };
    }
  }

  async validateToken(token: string) {
    this.endpoint = "/auth/validate";
    try {
      await this.apiClient.get(this.endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return true;
    } catch (error) {
      return false;
    }
  }
}

export { AuthFetcher };
