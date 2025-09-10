import { SecaoFilial } from "@/model/SecaoFilial";
import axios, { AxiosInstance, AxiosResponse } from "axios";
import filialMockApi from "../mock/fetcher/FilialFetcherMock";

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
  }

  private interceptors() {
    this.apiClient.interceptors.request.use((config) => {
      if (this.token) {
        config.headers.Authorization = `Bearer ${this.token}`;
      }
      return config;
    });
  }

  async getSecoes(idFilial: number): Promise<SecaoFilial[]> {
    const response: AxiosResponse<SecaoFilial[]> = await this.apiClient.get(
      `${this.baseUrl}/filial/${idFilial}/secao`
    );
    return response.data;
  }
}

export default FilialFetcher;
