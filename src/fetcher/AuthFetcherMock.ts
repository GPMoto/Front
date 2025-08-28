import { getTokenFromAuth } from "@/utils/helpers";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

const authMockApi = axios.create({
  baseURL: "https://meu-servidor.com",
});

const mock = new AxiosMockAdapter(authMockApi, { delayResponse: 1000 });
const TOKEN_MOCK = "fake.jwt.token.aqui";
const EMAIL_MOCK = "teste@email.com";
const PASSWORD_MOCK = "123456";

mock.onPost("/auth/login").reply((config) => {
  const { email, password } = JSON.parse(config.data);

  if (!email || !password) {
    return [400, { message: "Dados inválidos" }];
  }

  if (email === EMAIL_MOCK && password === PASSWORD_MOCK) {
    return [200, { token: "fake.jwt.token.aqui" }];
  }

  return [401, { message: "Email ou senha incorretos" }];
});

mock.onGet("/auth/validate").reply((config) => {
  const requestToken = getTokenFromAuth(config);

  if (requestToken === null) {
    return [400, { message: "Bearer token é obrigatório" }];
  }

  if (!(requestToken === TOKEN_MOCK)) {
    return [403, { message: "Usuário não encontrado!" }];
  }
  return [200, { message: "Token válido!" }];
});

export default authMockApi;
