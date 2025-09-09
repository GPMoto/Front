import { MOCK_TOKEN, mockUsers } from "@/mock/mock-list";
import { UserData } from "@/model/User";
import { getTokenFromAuth } from "@/utils/helpers";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

const profileMockApi = axios.create({
  baseURL: "https://meu-servidor.com",
});

const mock = new AxiosMockAdapter(profileMockApi, { delayResponse: 1000 });

//para testes, sempre será o usuario 1
mock.onGet("/usuario").reply((config) => {
  const requestToken = getTokenFromAuth(config);

  if (requestToken === null) {
    return [400, { message: "Token é obrigatório." }];
  }
  if (!(requestToken === MOCK_TOKEN)) {
    return [403, { message: "Usuário não encontrado!" }];
  }

  const userData: UserData = mockUsers.find((user) => user.idUsuario === 1)!;

  return [200, userData];
});

export default profileMockApi;
