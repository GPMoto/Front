import {
  MOCK_TOKEN,
  mockFiliais,
  mockPerfis,
  mockUsers,
} from "@/mock/mock-list";
import { UserData } from "@/model/User";
import { getTokenFromAuth } from "@/utils/helpers";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

const authMockApi = axios.create({
  baseURL: "https://meu-servidor.com",
});

const mock = new AxiosMockAdapter(authMockApi, { delayResponse: 1000 });

mock.onPost("/auth/login").reply((config) => {
  const { email, password } = JSON.parse(config.data);

  if (!email || !password) {
    return [400, { message: "Dados inválidos" }];
  }

  const userData = mockUsers.find(
    (user) => user.nmEmail === email && user.senha === password
  );

  if (!userData) {
    return [401, { message: "Email ou senha incorretos" }];
  }

  return [200, { token: MOCK_TOKEN }];
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

mock.onPost("/auth/register").reply((config) => {
  const { email, password } = JSON.parse(config.data);

  if (!email || !password) {
    return [400, { message: "Dados inválidos" }];
  }

  const userExists = mockUsers.find((user) => user.nmEmail === email);

  if (userExists) {
    return [400, { message: "Usuário já existe" }];
  }

  mockUsers.push({
    idUsuario: mockUsers[mockUsers.length - 1].idUsuario + 1,
    idFilial: mockFiliais[0],
    idPerfil: mockPerfis[0],
    nmEmail: email,
    nmUsuario: "José",
    senha: password,
  });

  return [201, { message: "Usuário criado com sucesso!" }];
});

export default authMockApi;
