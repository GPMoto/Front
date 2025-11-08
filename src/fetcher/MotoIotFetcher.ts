import {
  CallMotoIotResponse,
  IMotoDictionary,
  IMotoIot,
} from "@/model/types/MotoIotDictionary";
import axios, { AxiosInstance, AxiosResponse } from "axios";

export class MotoIotFetcher {
  private apiClient: AxiosInstance;
  private baseUrl: string = process.env.EXPO_PUBLIC_IOT_API_URL;

  constructor() {
    this.apiClient = axios.create({
      baseURL: this.baseUrl,
    });

    this.interceptors();
  }

  private interceptors() {
    this.apiClient.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${process.env.EXPO_PUBLIC_IOT_API_TOKEN}`;

      return config;
    });
  }

  async getMotoWithDevices(): Promise<IMotoIot[]> {
    const response: AxiosResponse<IMotoDictionary> =
      await this.apiClient.get("motos");

    const motoList = Object.values(response.data);

    return motoList;
  }

  async callMoto(toggleCall: number): Promise<CallMotoIotResponse> {
    const response: AxiosResponse<CallMotoIotResponse> =
      await this.apiClient.post("ligarLedMoto", {
        in: toggleCall,
      });

    console.log(response.data);
    return response.data;
  }
}
