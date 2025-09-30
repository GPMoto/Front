import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import MockSessionManager from "../MockSessionManager";
import { mockTipoMotos } from "../mock-list";
import { getTokenFromAuth } from "@/utils/helpers";

const tipoMotoApiMock = axios.create({
  baseURL: "https://meu-servidor.com",
});

const mock = new AxiosMockAdapter(tipoMotoApiMock, { delayResponse: 1000 });
const sessionManager = MockSessionManager.getInstance();

mock.onGet("/tipo-moto").reply((config) => {
  const requestToken = getTokenFromAuth(config);

  if (requestToken === null) {
    return [400, { message: "Bearer token é obrigatório" }];
  }

  if (!sessionManager.isValidToken(requestToken)) {
    return [403, { message: "Token inválido!" }];
  }

  return [200, mockTipoMotos];
});

export default tipoMotoApiMock;
