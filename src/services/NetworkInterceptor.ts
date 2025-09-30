import { triggerUnauthorized } from "@/services/UnauthorizedHandler";
import { AxiosInstance } from "axios";

export function attachUnauthorizedInterceptor(api: AxiosInstance) {
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      const status = error?.response?.status;
      if (status === 401) {
        triggerUnauthorized();
      }
      return Promise.reject(error);
    }
  );
}