import { AuthResponse } from "@/model/types/AuthResponse";
import {
  CreateUser,
  UserLogin,
  UserLoginErrorResponse,
  UserLoginResponse,
} from "@/model/User";
import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import authMockApi from "../mock/fetcher/AuthFetcherMock";
import { getErrorMessage } from "@/utils/helpers";
import { setupAxiosDebug } from "@/utils/axiosDebug";
import { attachUnauthorizedInterceptor } from "@/services/NetworkInterceptor";

class AuthFetcher {
  private endpoint: string = "/auth";
  private baseUrl: string = process.env.EXPO_PUBLIC_API_URL;
  private apiClient: AxiosInstance;
  private mockApi: boolean = !!!this.baseUrl;

  constructor() {
    console.log(this.baseUrl)
    this.apiClient = this.mockApi 
    ? authMockApi
    : axios.create({
          baseURL: this.baseUrl,
          timeout: 10000,
          headers: {
            "Content-Type": "application/json",
          },
        });
    
    setupAxiosDebug(this.apiClient, 'AuthFetcher');
    attachUnauthorizedInterceptor(this.apiClient);
  }

  async login(userLogin: UserLogin): Promise<AuthResponse> {
    this.endpoint = "/autenticacao/login";
    try {
      const response: AxiosResponse<UserLoginResponse> =
        await this.apiClient.post(`${this.endpoint}?username=${userLogin.email}&password=${userLogin.password}` );

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
        message: getErrorMessage(axiosError),
      };
    }
  }

  async register(createUser : CreateUser) : Promise<AuthResponse> {
    this.endpoint = "/auth/register";
    try {
      await this.apiClient.post(this.endpoint, createUser);
      return {
        success: true, 
        message: "Conta criada com sucesso!",
      }
    } catch (error) {
      const axiosError = error as AxiosError<UserLoginErrorResponse>;

      return {
        data: (axiosError.response?.data as UserLoginErrorResponse) || null,
        status: axiosError.response?.status || 0,
        success: false,
        message: getErrorMessage(axiosError),
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
