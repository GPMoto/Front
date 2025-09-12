import {
  getTokenFromAuth,
} from "@/utils/helpers";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import { MOCK_TOKEN, mockFiliais, mockSecaoFilial } from "../mock-list";

const filialMockApi = axios.create({
  baseURL: "https://meu-servidor.com",
});

const mock = new AxiosMockAdapter(filialMockApi, { delayResponse: 1000 });

mock.onGet(/\/filial\/\d+\/secao/).reply((config) => {
  console.log("Buscando seções da filial");

  const token = getTokenFromAuth(config);

  if (!(token === MOCK_TOKEN)) return [403, "Token é obrigatório!"];

  // Extrair o ID da filial da URL
  const url = config.url || "";
  const filialIdMatch = url.match(/\/filial\/(\d+)\/secao/);
  
  if (!filialIdMatch) {
    return [400, { message: "ID da filial é obrigatório." }];
  }

  const filialId = Number(filialIdMatch[1]);

  // Verificar se a filial existe
  const filialExiste = mockFiliais.find(filial => filial.idFilial === filialId);
  
  if (!filialExiste) {
    return [404, { message: "Filial não encontrada." }];
  }

  // Buscar seções da filial
  const secoesFilial = mockSecaoFilial.filter(secao => secao.idFilial.idFilial === filialId);

  return [200, secoesFilial];
});


mock.onGet("/filial").reply((config) => [200, mockFiliais]);

export default filialMockApi;
