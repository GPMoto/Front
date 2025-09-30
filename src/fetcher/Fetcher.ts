import { attachUnauthorizedInterceptor } from "@/services/NetworkInterceptor";
import axios, { AxiosInstance } from "axios";

abstract class Fetcher {
  private apiClient: AxiosInstance;
  private token: string | null;

  constructor(token: string | null) {
    this.apiClient = axios.create({ baseURL: process.env.EXPO_PUBLIC_API_URL });
    this.token = token;
    this.interceptors();
  }

  protected interceptors() {
    attachUnauthorizedInterceptor(this.apiClient);
    this.apiClient.interceptors.request.use((config) => {
      if (this.token && !config.headers["X-Skip-Auth"]) {
        config.headers.Authorization = `Bearer ${this.token}`;
      }

      delete config.headers["X-Skip-Auth"];
      return config;
    });
  }
}

