import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import MockSessionManager from "../MockSessionManager";
import { mockIdentificadores } from "../mock-list";
import { getSpringPage, getTokenFromAuth } from "@/utils/helpers";
import { Identificador } from "@/model/Identificador";

export const identificarMockApi = axios.create({
  baseURL: "https://meu-servidor.com",
});

const mock = new AxiosMockAdapter(identificarMockApi, { delayResponse: 1000 });
const sessionManager = MockSessionManager.getInstance();

mock.onGet(new RegExp("^/identificador/filial/\\d+$")).reply((config) => {
  const requestToken = getTokenFromAuth(config);

  const url = config.url || "";
  const matches = url.match(/\/identificador\/filial\/(\d+)$/);
  const filialId = matches ? Number(matches[1]) : null;

  const params = config.params || {};
  const page = params.page ? Number(params.page) : 1;
  const size = params.size ? Number(params.size) : 10;

  console.log("filialId: ", filialId);
  console.log("page:", page);
  console.log("size:", size);

  if (sessionManager.getCurrentToken() !== requestToken) {
    return [401, { message: "Você não está autorizado!" }];
  }

  const identificadores = filialId ? mockIdentificadores.filter(
    (identificador) => identificador.idFilial.idFilial === filialId
  ) : mockIdentificadores;

  console.log("identificadores: ", identificadores);

  const result = getSpringPage<Identificador>(
    identificadores,
    page,
    size
  );

  return [200, result];
});
