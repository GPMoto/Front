import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import motoMockApi from "../mock/fetcher/MotoFetcherMock";
import { Moto } from "@/model/Moto";
import { PageableResponse } from "@/model/types/PageableResponse";
import { setupAxiosDebug } from "@/utils/axiosDebug";
import { attachUnauthorizedInterceptor } from "@/services/NetworkInterceptor";
import MotoDTO from "@/model/dto/MotoDTO";

class MotoFetcher {
  private apiClient: AxiosInstance;
  private baseUrl: string = process.env.EXPO_PUBLIC_API_URL;
  private mockApi: boolean = !!!this.baseUrl;
  private token: string | null;

  constructor(token: string | null) {
    this.apiClient = this.mockApi
      ? motoMockApi
      : axios.create({
          baseURL: this.baseUrl,
          timeout: 10000,
        });

    this.token = token;
    this.interceptors();

    setupAxiosDebug(this.apiClient, "MotoFetcher");
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

  async getPagedMotos(
    idFilial: number,
    search: string | null,
    page: number = 0,
    size: number = 10
  ): Promise<PageableResponse<Moto>> {
    const response = await this.apiClient.get<PageableResponse<Moto>>(
      `moto/filial/${idFilial}/paginados/full`,
      {
        params: {
          search,
          page,
          size,
        },
      }
    );
    return response.data;
  }

  async save(novaMoto: MotoDTO) {
    try {
      await this.apiClient.post("/moto", novaMoto);
      return {
        message: "Paginação de motos obtida com sucesso!",
        success: true,
      };
    } catch (error) {
      let additionalMessage = "";
      if (error instanceof AxiosError) {
        additionalMessage = " " + error.message;
      }
      return {
        message: "Não foi possível salvar moto!",
        success: false,
      };
    }
  }

  async update(idMoto: number, updateMoto: MotoDTO): Promise<Moto> {
    const response: AxiosResponse<Moto> = await this.apiClient.put(
      `/moto/${idMoto}`,
      updateMoto
    );
    return response.data;
  }

  async getMotoById(idMoto: number): Promise<Moto> {
    const response: AxiosResponse<Moto> = await this.apiClient.get(
      `/moto/${idMoto}/full`,
      {
        params: {
          full: true,
        },
      }
    );
    return response.data;
  }

  async searchMotos(query: string) {
    return query;
  }

  async getPagedMotosBySecaoFilial(
    idSecaoFilial: number,
    search: string | null,
    page: number = 0,
    size: number = 10
  ): Promise<PageableResponse<Moto>> {
    const response: AxiosResponse<PageableResponse<Moto>> =
      await this.apiClient.get(`/moto/secao-filial/${idSecaoFilial}`, {
        params: {
          search,
          page,
          size,
        },
      });
    return response.data;
  }

  async delete(idMoto: number) : Promise<boolean> {
    try {
      await this.apiClient.delete(`/moto/${idMoto}`);
      return true;
    } catch (error) {
      return false;
    }
  }
}

export default MotoFetcher;
