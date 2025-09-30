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

  async readTextFromImage(imageData: Uint8Array): Promise<string[]> {
    const key = process.env.EXPO_PUBLIC_AZ_COG_KEY;
    const endpoint = process.env.EXPO_PUBLIC_AZ_COG_ENDPOINT;

    if (!key) throw new Error("Azure key not found");
    if (!endpoint) throw new Error("Azure endpoint not found");

    const analyzeUrl = `${endpoint}/vision/v3.2/read/analyze`;
    const postResponse = await axios.post(analyzeUrl, imageData, {
      headers: {
        "Ocp-Apim-Subscription-Key": key,
        "Content-Type": "application/octet-stream",
      },
      validateStatus: () => true, 
    });

    if (postResponse.status !== 202) {
      throw new Error(`Erro ao enviar imagem: ${postResponse.statusText}`);
    }

    const operationLocation = postResponse.headers["operation-location"];
    if (!operationLocation) throw new Error("Não recebeu Operation-Location do Azure");

    let result: any;
    while (true) {
      await new Promise((r) => setTimeout(r, 1000)); // esperar 1s
      const getResponse = await axios.get(operationLocation, {
        headers: { "Ocp-Apim-Subscription-Key": key },
      });
      result = getResponse.data;
      if (result.status === "succeeded" || result.status === "failed") break;
    }

    if (result.status === "failed") throw new Error("Falha no OCR do Azure");

    const texts: string[] = [];
    const readResults = result.analyzeResult?.readResults || [];
    for (const page of readResults) {
      for (const line of page.lines || []) {
        texts.push(line.text);
      }
    }

    return texts;
  }
}
