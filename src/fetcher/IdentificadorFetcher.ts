import { identificarMockApi } from "@/mock/fetcher/IdentificadorFetcherMock";
import { Identificador } from "@/model/Identificador";
import { PageableResponse } from "@/model/types/PageableResponse";
import { setupAxiosDebug } from "@/utils/axiosDebug";
import axios, { AxiosInstance, AxiosResponse } from "axios";

export default class IdentificadorFetcher {
  private apiClient: AxiosInstance;
  private baseUrl = process.env.EXPO_PUBLIC_API_URL;
  private token: string | null;

  constructor(token: string | null) {
    this.apiClient = !this.baseUrl
      ? identificarMockApi
      : axios.create({
          baseURL: this.baseUrl,
        });
    this.token = token;

    this.interceptors();

    setupAxiosDebug(this.apiClient, "IdentificadorFetcher");
  }

  private interceptors() {
    this.apiClient.interceptors.request.use((config) => {
      if (this.token && !config.headers["X-Skip-Auth"]) {
        config.headers.Authorization = `Bearer ${this.token}`;
      }

      delete config.headers["X-Skip-Auth"];
      return config;
    });
  }

  async findByFilial(
    idFilial: number
  ): Promise<PageableResponse<Identificador>> {
    const response: AxiosResponse<PageableResponse<Identificador>> =
      await this.apiClient.get(`/identificador/filial/${idFilial}`);

    return response.data;
  }
}
