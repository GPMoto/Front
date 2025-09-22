import {
  getSpringPage,
  getTokenFromAuth,
  notEmptyString,
} from "@/utils/helpers";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import { MOCK_TOKEN, mockMotos } from "../mock-list";

const motoMockApi = axios.create({
  baseURL: "https://meu-servidor.com",
});

const mock = new AxiosMockAdapter(motoMockApi, { delayResponse: 1000 });

mock.onGet("/moto/paginado/").reply((config) => {
  console.log("Opa baum");

  const token = getTokenFromAuth(config);

  if (!(token === MOCK_TOKEN)) return [403, "Token é obrigatório!"];

  console.log("Olha o token aeee");
  const page = Number(config.params?.page!);
  const size = Number(config.params?.size!);
  const search = config.params?.search!;

  if (page === null)
    return [400, { message: "É obrigatório o número da página." }];

  const filteredMotos = notEmptyString(search)
    ? mockMotos.filter((moto) =>
        moto.identificador.toLowerCase().includes(search.toLowerCase())
      )
    : mockMotos;

  const pageData = getSpringPage(filteredMotos, page, size);

  return [200, pageData];
});

mock.onPut(new RegExp("^/moto/\\d+$")).reply((config) => {
  const token = getTokenFromAuth(config);

  if (!(token === MOCK_TOKEN)) return [403, "Token é obrigatório!"];

  const url = config.url || "";
  const matches = url.match(/\/moto\/(\d+)$/);
  const motoId = matches ? Number(matches[1]) : null;

  if (!motoId) {
    return [400, { message: "ID da moto é obrigatório" }];
  }

  const updatedMoto = JSON.parse(config.data);
  
  // Encontrar a moto no mock
  const motoIndex = mockMotos.findIndex(moto => moto.idMoto === motoId);
  
  if (motoIndex === -1) {
    return [404, { message: "Moto não encontrada" }];
  }

  // Atualizar a moto no array mock
  const originalMoto = mockMotos[motoIndex];
  const motoAtualizada = {
    ...originalMoto,
    ...updatedMoto,
    idMoto: motoId // Garantir que o ID não seja alterado
  };
  
  mockMotos[motoIndex] = motoAtualizada;

  console.log("Moto atualizada:", motoAtualizada);

  return [200, motoAtualizada];
});

mock.onGet(new RegExp("^/moto/\\d+$")).reply((config) => {
  const token = getTokenFromAuth(config);

  if (!(token === MOCK_TOKEN)) return [403, "Token é obrigatório!"];

  const url = config.url || "";
  const matches = url.match(/\/moto\/(\d+)$/);
  const motoId = matches ? Number(matches[1]) : null;

  if (!motoId) {
    return [400, { message: "ID da moto é obrigatório" }];
  }

  const moto = mockMotos.find(moto => moto.idMoto === motoId);
  
  if (!moto) {
    return [404, { message: "Moto não encontrada" }];
  }

  console.log("Moto encontrada:", moto);

  return [200, moto];
});

mock.onGet(new RegExp("^/moto/secao-filial/\\d+$")).reply((config) => {
  const token = getTokenFromAuth(config);

  if (!(token === MOCK_TOKEN)) return [403, "Token é obrigatório!"];

  const url = config.url || "";
  const matches = url.match(/\/moto\/secao-filial\/(\d+)$/);
  const idSecaoFilial = matches ? Number(matches[1]) : null;
  console.log("no mock o id da seção é", idSecaoFilial);
  if (!idSecaoFilial) {
    return [400, { message: "ID da seção filial é obrigatório" }];
  }

  const page = Number(config.params?.page || 0);
  const size = Number(config.params?.size || 10);
  const search = config.params?.search;

  console.log(`Buscando motos da seção filial ${idSecaoFilial}, página ${page}, tamanho ${size}`);

  // Filtrar motos pela seção filial
  let filteredMotos = mockMotos.filter(moto => 
    moto.idSecaoFilial && moto.idSecaoFilial.idSecao === idSecaoFilial
  );

  let filterMotosTeste = mockMotos.filter(moto => moto.idSecaoFilial.idSecao === 2);
  console.log("motos da secao filial 1 são: ", filterMotosTeste);

  // Aplicar filtro de busca se fornecido
  if (notEmptyString(search)) {
    filteredMotos = filteredMotos.filter((moto) =>
      moto.identificador.toLowerCase().includes(search.toLowerCase())
    );
  }

  const pageData = getSpringPage(filteredMotos, page, size);

  console.log(`Encontradas ${filteredMotos.length} motos para seção ${idSecaoFilial}`);

  return [200, pageData];
});

export default motoMockApi;
