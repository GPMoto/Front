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
        moto.placa.toLowerCase().includes(search.toLowerCase())
      )
    : mockMotos;

  const pageData = getSpringPage(filteredMotos, page, size);

  return [200, pageData];
});

export default motoMockApi;
