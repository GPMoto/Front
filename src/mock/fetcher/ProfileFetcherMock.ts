import { MOCK_TOKEN, mockPerfis, mockUsers } from "@/mock/mock-list";
import { UserData } from "@/model/User";
import { getTokenFromAuth } from "@/utils/helpers";
import MockSessionManager from "../MockSessionManager";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

const profileMockApi = axios.create({
  baseURL: "https://meu-servidor.com",
});

const mock = new AxiosMockAdapter(profileMockApi, { delayResponse: 1000 });
const sessionManager = MockSessionManager.getInstance();

//para testes, sempre será o usuario logado na sessão
mock.onGet("/usuario").reply((config) => {
  const requestToken = getTokenFromAuth(config);

  if (requestToken === null) {
    return [400, { message: "Token é obrigatório." }];
  }

  const userData = sessionManager.getUserByToken(requestToken);
  
  if (!userData) {
    return [403, { message: "Usuário não encontrado!" }];
  }

  return [200, userData];
});

mock.onGet("/perfil").reply(() => [200, mockPerfis]);

export default profileMockApi;
