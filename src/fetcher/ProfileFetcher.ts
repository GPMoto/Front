import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import profileMockApi from "./ProfileFetcherMock";
import { UserData, UserDataErrorResponse } from "@/model/User";
import { ProfileResponse } from "@/model/User";
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

  async get(): Promise<UserData> {
    const response : AxiosResponse<UserData> = await this.apiClient.get(this.endpoint);
    return response.data;
  }


}

export default ProfileFetcher;
