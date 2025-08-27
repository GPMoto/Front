import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

const authMockApi = axios.create({
  baseURL: "https://meu-servidor.com",
});

const mock = new AxiosMockAdapter(authMockApi, { delayResponse: 1000 });

mock.onPost("/login").reply((config) => {
  const { email, password } = JSON.parse(config.data);
  const emailValido = "teste@email.com";
  const senhaValida = "123456";

  if (!email || !password) {
    return [400, { message: "Dados inválidos" }];
  }

  if (email === emailValido && password === senhaValida) {
    return [200, { token: "fake.jwt.token.aqui" }];
  }

  return [401, { message: "Email ou senha incorretos" }];
});

export default authMockApi;
