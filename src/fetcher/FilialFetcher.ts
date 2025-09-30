import { SecaoFilial } from "@/model/SecaoFilial";
import axios, { AxiosInstance, AxiosResponse } from "axios";
import filialMockApi from "../mock/fetcher/FilialFetcherMock";
import { Filial } from "@/model/Filial";
import { setupAxiosDebug } from "@/utils/axiosDebug";
import { attachUnauthorizedInterceptor } from "@/services/NetworkInterceptor";

class FilialFetcher {
  private apiClient: AxiosInstance;
  private baseUrl: string = process.env.EXPO_PUBLIC_API_URL;
  private mockApi: boolean = !!!this.baseUrl;
  private token: string | null;

  constructor(token: string | null) {
    this.apiClient = this.mockApi
      ? filialMockApi
      : axios.create({
          baseURL: this.baseUrl,
          timeout: 3000,
        });
    this.token = token;
    this.interceptors();

    setupAxiosDebug(this.apiClient, "FilialFetcher");
    attachUnauthorizedInterceptor(this.apiClient);
  }

  private interceptors() {
    // Request interceptor
    this.apiClient.interceptors.request.use((config) => {
      if (this.token && !config.headers["X-Skip-Auth"]) {
        config.headers.Authorization = `Bearer ${this.token}`;
      }
      
      delete config.headers["X-Skip-Auth"];
      return config;
    });
  }

  async getSecoes(idFilial: number): Promise<SecaoFilial[]> {
    const response: AxiosResponse<SecaoFilial[]> = await this.apiClient.get(
      `filial/${idFilial}/secao`
    );
    return response.data;
  }

  async getAllFiliais(): Promise<Filial[]> {
    const response: AxiosResponse<Filial[]> = await this.apiClient.get(
      `filial`,
      {
        headers: {
          "X-Skip-Auth": "true",
        },
      }
    );
    return response.data;
  }
}

export default FilialFetcher;
