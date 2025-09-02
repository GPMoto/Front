import axios, { AxiosError, AxiosInstance } from "axios";
import motoMockApi from "./MotoFetcherMock";
import { Moto} from "@/model/Moto";
import { PageableResponse } from "@/model/types/PageableResponse";

class MotoFetcher {
  private apiClient: AxiosInstance;
  private baseUrl: string =
    process.env.EXPO_PUBLIC_API_URL;
  private mockApi: boolean = true;

  constructor(token : string | null) {
    this.apiClient = this.mockApi
      ? motoMockApi
      : axios.create({
          baseURL: this.baseUrl,
          timeout: 10000,
        });
    this.interceptors(token);
  }

  private interceptors(token : string | null) {
    this.apiClient.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  async getPagedMotos(
    page: number = 0,
    size: number = 10,
  ): Promise<PageableResponse<Moto>> {
    const response = await this.apiClient.get<PageableResponse<Moto>>(
      "/moto/paginado/",
      {
        params: {
          page,
          size,
        },
      }
    );
    return response.data;
  }

  async save(novaMoto: Partial<Moto>) {
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
}

export default MotoFetcher;
