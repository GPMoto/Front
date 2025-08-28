import { ProfileData, ProfileResponse } from "@/model/ProfileResponse";
import { getTokenFromAuth } from "@/utils/helpers";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";


const profileMockApi = axios.create({
  baseURL: "https://meu-servidor.com",
});

const mock = new AxiosMockAdapter(profileMockApi, { delayResponse: 1000 });
const TOKEN_MOCK = "fake.jwt.token.aqui";
const EMAIL_MOCK = "teste@email.com";
const NAME_MOCK = "Renato Silva";
const FILIAL_MOCK = "Butantã";
const GRUPO_MOCK = "Manuntenção";

mock.onGet("/usuario").reply((config) => {
  const requestToken = getTokenFromAuth(config);

  if (requestToken === null) {
    return [400, { message: "Token é obrigatório." } as ProfileData];
  }
  if (!(requestToken === TOKEN_MOCK)) {
    return [403, { message: "Usuário não encontrado!" } as ProfileData];
  }

  const userData: ProfileData = {
    email: EMAIL_MOCK,
    nome: NAME_MOCK,
    filial: FILIAL_MOCK,
    grupo: GRUPO_MOCK,
  };

  return [200, userData];
});

export default profileMockApi;