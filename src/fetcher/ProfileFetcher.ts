import axios, { AxiosInstance, AxiosResponse } from "axios";
import profileMockApi from "../mock/fetcher/ProfileFetcherMock";
import { UserData } from "@/model/User";
import { Perfil } from "@/model/Perfil";
import { setupAxiosDebug } from "@/utils/axiosDebug";
import { attachUnauthorizedInterceptor } from "@/services/NetworkInterceptor";

class ProfileFetcher {
  private apiClient: AxiosInstance;
  private endpoint: string = "/usuario";
  private baseUrl: string = process.env.EXPO_PUBLIC_API_URL;
  private mockApi: boolean = !!!this.baseUrl;
  private token: string | null;

  constructor(token: string | null) {
    this.apiClient = this.mockApi
      ? profileMockApi
      : axios.create({
          baseURL: this.baseUrl,
          timeout: 10000,
          headers: {
            "Content-Type": "application/json",
          },
        });
    this.token = token;
    this.interceptors();

    // ✅ Debug isolado
    setupAxiosDebug(this.apiClient, "ProfileFetcher");
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

  async get(): Promise<UserData> {
    const response: AxiosResponse<UserData> = await this.apiClient.get(
      this.endpoint
    );
    return response.data;
  }

  async getPerfis(): Promise<Perfil[]> {
    this.endpoint = "/perfil";
    const response: AxiosResponse<Perfil[]> = await this.apiClient.get(
      this.endpoint,
      {
        headers: { "X-Skip-Auth": "true" },
      }
    );

    return response.data;
  }
}

export default ProfileFetcher;
