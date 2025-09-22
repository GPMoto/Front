import { triggerUnauthorized } from "@/services/UnauthorizedHandler";
import { AxiosInstance } from "axios";

export function attachUnauthorizedInterceptor(api: AxiosInstance) {
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      const status = error?.response?.status;
      if (status === 401) {
        console.log("401 intercepted - triggering logout");
        triggerUnauthorized();
      }
      return Promise.reject(error);
    }
  );
}