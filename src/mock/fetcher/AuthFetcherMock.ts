import { MOCK_TOKEN, mockUsers } from "@/mock/mock-list";
import { UserData } from "@/model/User";
import { getTokenFromAuth } from "@/utils/helpers";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

const authMockApi = axios.create({
  baseURL: "https://meu-servidor.com",
});

const mock = new AxiosMockAdapter(authMockApi, { delayResponse: 1000 });

const USER_MOCK_DATA: UserData = mockUsers.find((user) => user.idUsuario == 1)!;
const EMAIL_MOCK = USER_MOCK_DATA.nmEmail;
const PASSWORD_MOCK = USER_MOCK_DATA.senha;

mock.onPost("/auth/login").reply((config) => {
  const { email, password } = JSON.parse(config.data);

  if (!email || !password) {
    return [400, { message: "Dados inválidos" }];
  }

  if (email === EMAIL_MOCK && password === PASSWORD_MOCK) {
    return [200, { token: MOCK_TOKEN }];
  }

  return [401, { message: "Email ou senha incorretos" }];
});

mock.onGet("/auth/validate").reply((config) => {
  const requestToken = getTokenFromAuth(config);

  if (requestToken === null) {
    return [400, { message: "Bearer token é obrigatório" }];
  }

  if (!(requestToken === MOCK_TOKEN)) {
    return [403, { message: "Usuário não encontrado!" }];
  }
  return [200, { message: "Token válido!" }];
});

export default authMockApi;
