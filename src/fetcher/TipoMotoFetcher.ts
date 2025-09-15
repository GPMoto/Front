import tipoMotoApiMock from "@/mock/fetcher/TipoMotoFetcherMock";
import { TipoMoto } from "@/model/TipoMoto";
import { setupAxiosDebug } from "@/utils/axiosDebug";
import axios, { AxiosInstance, AxiosResponse } from "axios";

export default class TipoMotoFetcher {
  private apiClient: AxiosInstance;
  private baseUrl = process.env.EXPO_PUBLIC_API_URL;
  private token: string | null;

  constructor(token: string | null) {
    this.apiClient = !this.baseUrl
      ? tipoMotoApiMock
      : axios.create({
          baseURL: this.baseUrl,
        });
    this.token = token;
    setupAxiosDebug(this.apiClient, "TipoMotoFetcher");

    this.interceptors();
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

  async findAll() : Promise<TipoMoto[]> {
    const response : AxiosResponse<TipoMoto[]> = await this.apiClient.get("/tipo-moto");
    return response.data;
  }

}
