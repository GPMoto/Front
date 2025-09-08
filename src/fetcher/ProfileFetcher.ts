import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import profileMockApi from "./ProfileFetcherMock";
import { UserData } from "@/model/User";
import { ProfileResponse, UserDataErrorResponse } from "@/model/User";
import { getErrorMessage } from "@/utils/helpers";

class ProfileFetcher {
  private apiClient: AxiosInstance;
  private endpoint: string = "/usuario";
  private baseUrl: string = process.env.EXPO_PUBLIC_API_URL;
  private mockApi: boolean = !!!this.baseUrl;
  private token: string;

  constructor(token: string) {
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
  }

  private interceptors(){
    this.apiClient.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${this.token}`;
      return config;
    })
  }

  async get(): Promise<ProfileResponse> {
    console.log("Iniciando req em get do ProfileFetcher!");
    try {
      const response: AxiosResponse<UserData> = await this.apiClient.get(
        this.endpoint,
      );
      return {
        data: response.data,
        status: response.status,
        success: true,
        message: "Dados do usuário obtidos com sucesso!",
      };
    } catch (error) {
      const axiosError = error as AxiosError<UserDataErrorResponse>;

      return {
        data: (axiosError.response?.data as UserDataErrorResponse) || null,
        status: axiosError.response?.status || 0,
        success: false,
        message: getErrorMessage(axiosError),
      };
    }
  }


}

export default ProfileFetcher;
