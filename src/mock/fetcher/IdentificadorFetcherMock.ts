import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import MockSessionManager from "../MockSessionManager";
import { mockIdentificadores } from "../mock-list";
import { getSpringPage, getTokenFromAuth } from "@/utils/helpers";
import { Identificador } from "@/model/Identificador";
import { QrCodeResponse } from "@/model/types/QrCodeResponse";

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

  const identificadores = filialId
    ? mockIdentificadores.filter(
        (identificador) => identificador.idFilial.idFilial === filialId
      )
    : mockIdentificadores;

  console.log("identificadores: ", identificadores);

  const result = getSpringPage<Identificador>(identificadores, page, size);

  return [200, result];
});

mock.onPost("/identificador/foto").reply((config) => {
  const requestToken = getTokenFromAuth(config);

  if (sessionManager.getCurrentToken() !== requestToken) {
    return [401, { message: "Você não está autorizado!" }];
  }

  // Simula delay de processamento da foto
  setTimeout(() => {
    console.log("Mock: Processando upload de foto...");
  }, 500);

  // Mock de identificadores possíveis baseado na "foto"
  const mockResults = [
    { identificador: "ABC-1234", confianca: 0.95 },
    { identificador: "XYZ-5678", confianca: 0.87 },
    { identificador: "DEF-9012", confianca: 0.73 },
  ];

  // Simula escolher o resultado com maior confiança
  const bestMatch = mockResults[0];

  // Busca dados completos do identificador mockado
  const identificadorCompleto = mockIdentificadores.find(
    (id) => id.vlrIdentificador === bestMatch.identificador
  );

  // if (identificadorCompleto) {
  //   return [200, {
  //     success: true,
  //     qrcode: "moto123",
  //     message: "Identificador reconhecido com sucesso!"
  //   }];
  // } else {
  //   // Se não encontrar nos mocks, retorna um resultado genérico
  //   return [200, {
  //     success: true,
  //     qrcode: "moto123",
  //     message: "Identificador reconhecido mas não encontrado na base local"
  //   }];
  // }
  const result: QrCodeResponse = {
    qrCode: "moto123",
  };
  return [200, result];
});

export default identificarMockApi;
