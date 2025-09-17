import MockSessionManager from "@/mock/MockSessionManager";
import { triggerUnauthorized } from "@/services/UnauthorizedHandler";
import { AxiosInstance } from "axios";
import { Alert } from "react-native";

export function attachUnauthorizedInterceptor(api: AxiosInstance) {
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      const status = error?.response?.status;
      if (status === 401) {
        const sessionManager = MockSessionManager.getInstance();
        sessionManager.clearSession();

        Alert.alert("Sessão expirada", "Faça login novamente. Sessão expirou!");
        // trigger an external handler (registered at app startup) so we don't import navigation here
        triggerUnauthorized();
      }
      return Promise.reject(error);
    }
  );
}
