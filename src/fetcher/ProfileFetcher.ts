import axios, { AxiosInstance, AxiosResponse } from "axios";
import profileMockApi from "../mock/fetcher/ProfileFetcherMock";
import { LanguagePreferenceResponse, UserData } from "@/model/User";
import { Perfil } from "@/model/Perfil";
import { setupAxiosDebug } from "@/utils/axiosDebug";
import { attachUnauthorizedInterceptor } from "@/services/NetworkInterceptor";
import { PushNotificationDto } from "@/model/dto/PushNotificationDTO";

class ProfileFetcher {
  private apiClient: AxiosInstance;
  private endpoint: string = "usuario";
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
    console.log("token: \n\n\n", this.token);
    this.endpoint = "usuario/me";
    const response: AxiosResponse<UserData> = await this.apiClient.get(
      this.endpoint,
    );
    return response.data;
  }

  async getPerfis(): Promise<Perfil[]> {
    this.endpoint = "perfil";
    const response: AxiosResponse<Perfil[]> = await this.apiClient.get(
      this.endpoint,
      {
        headers: { "X-Skip-Auth": "true" },
      },
    );

    return response.data;
  }

  async savePushToken(pushToken: string): Promise<PushNotificationDto> {
    this.endpoint = "usuario/token";
    const response: AxiosResponse<PushNotificationDto> =
      await this.apiClient.post(this.endpoint, { token: pushToken });

    return response.data;
  }

  async saveLanguagePreference(
    lang: string,
  ): Promise<LanguagePreferenceResponse> {
    this.endpoint = "usuario/language";
    const response: AxiosResponse<LanguagePreferenceResponse> =
      await this.apiClient.post(this.endpoint, { language: lang });
    return response.data;
  }
}

export default ProfileFetcher;
