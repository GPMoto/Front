import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import profileMockApi from "./ProfileFetcherMock";
import { UserData } from "@/model/UserLogin";
import {
  ProfileResponse,
  UserDataErrorResponse,
} from "@/model/ProfileResponse";
import { getErrorMessage } from "@/utils/helpers";

class ProfileFetcher {
  private apiClient: AxiosInstance;
  private endpoint: string = "/usuario";
  private mockApi: boolean = true;
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.EXPO_PUBLIC_API_URL;
    this.apiClient = this.mockApi
      ? profileMockApi
      : axios.create({
          baseURL: this.baseUrl,
          timeout: 10000,
          headers: {
            "Content-Type": "application/json",
          },
        });
  }

  async get(token: string): Promise<ProfileResponse> {
    console.log("Iniciando req em get do ProfileFetcher!")
    try {
      const response: AxiosResponse<UserData> = await this.apiClient.get(
        this.endpoint,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
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
