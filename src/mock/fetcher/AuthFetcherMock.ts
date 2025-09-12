import {
  MOCK_TOKEN,
  mockFiliais,
  mockPerfis,
  mockUsers,
} from "@/mock/mock-list";
import { UserData } from "@/model/User";
import { getTokenFromAuth } from "@/utils/helpers";
import MockSessionManager from "../MockSessionManager";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

const authMockApi = axios.create({
  baseURL: "https://meu-servidor.com",
});

const mock = new AxiosMockAdapter(authMockApi, { delayResponse: 1000 });
const sessionManager = MockSessionManager.getInstance();

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

  // ✅ Salvar sessão no mock
  sessionManager.setSession(MOCK_TOKEN, userData);

  return [200, { token: MOCK_TOKEN }];
});

mock.onGet("/auth/validate").reply((config) => {
  const requestToken = getTokenFromAuth(config);

  if (requestToken === null) {
    return [400, { message: "Bearer token é obrigatório" }];
  }

  if (!sessionManager.isValidToken(requestToken)) {
    return [403, { message: "Token inválido!" }];
  }
  
  return [200, { message: "Token válido!" }];
});

mock.onPost("/auth/register").reply((config) => {
  const data = JSON.parse(config.data);

  const { email, password, nome } = data;
  const filial = Number(data.filial);
  const perfil = Number(data.perfil);
  // { nome, email, password, filial, perfil }
  if (!email || !password || !nome || !filial || !perfil) {
    return [400, { message: "Dados inválidos" }];
  }

  const userExists = mockUsers.find((user) => user.nmEmail === email);

  if (userExists) {
    return [400, { message: "Usuário já existe" }];
  }

  const filialUser = mockFiliais.find((f) => f.idFilial == filial);
  if (!filialUser) {
    return [400, { message: "Filial inválida!" }];
  }

  const perfilUser = mockPerfis.find((p) => p.idPerfil === perfil);

  if (!perfilUser) {
    return [400, { message: "Perfil inválido!" }];
  }

  mockUsers.push({
    idUsuario: mockUsers[mockUsers.length - 1].idUsuario + 1,
    idFilial: filialUser,
    idPerfil: perfilUser,
    nmEmail: email,
    nmUsuario: nome,
    senha: password,
  });

  return [201, { message: "Usuário criado com sucesso!" }];
});

export default authMockApi;
