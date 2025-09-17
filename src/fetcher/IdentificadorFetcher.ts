import { identificarMockApi } from "@/mock/fetcher/IdentificadorFetcherMock";
import { Identificador } from "@/model/Identificador";
import { PageableResponse } from "@/model/types/PageableResponse";
import { PhotoFile } from "@/model/types/PhotoFile";
import {QrCodeResponse} from "@/model/types/QrCodeResponse";
import { attachUnauthorizedInterceptor } from "@/services/NetworkInterceptor";
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
    attachUnauthorizedInterceptor(this.apiClient);
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

  async uploadPhoto (photo : PhotoFile) : Promise<QrCodeResponse>{
    const fd = new FormData();
    // @ts-ignore - RN FormData expects this shape
    fd.append("file", { uri: photo.uri, name: photo.name, type: photo.type });
    
    const response : AxiosResponse<QrCodeResponse> = await this.apiClient.post("/identificador/foto", fd, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  }
}
