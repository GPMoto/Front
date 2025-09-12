import { AxiosInstance } from "axios";

export const setupAxiosDebug = (
  apiClient: AxiosInstance,
  serviceName: string = ""
) => {
  if (!__DEV__) return null;
  // Request interceptor
  apiClient.interceptors.request.use(
    (config) => {
      console.log(`🌐 ${serviceName} Request:`, {
        method: config.method?.toUpperCase(),
        url: config.url,
        baseURL: config.baseURL,
        headers: config.headers,
        data: config.data,
      });
      return config;
    },
    (error) => {
      console.error(`❌ ${serviceName} Request Error:`, error);
      return Promise.reject(error);
    }
  );

  // Response interceptor
  apiClient.interceptors.response.use(
    (response) => {
      console.log(`✅ ${serviceName} Response:`, {
        status: response.status,
        statusText: response.statusText,
        url: response.config.url,
        data: response.data,
      });
      return response;
    },
    (error) => {
      console.error(`❌ ${serviceName} Response Error:`, {
        status: error.response?.status,
        statusText: error.response?.statusText,
        url: error.config?.url,
        data: error.response?.data,
        message: error.message,
      });
      return Promise.reject(error);
    }
  );
};
