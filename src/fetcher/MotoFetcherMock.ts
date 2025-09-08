import { useAuth } from "@/context/AuthContext";
import { Moto, MotoData, MotoResponse } from "@/model/Moto";
import { PageableResponse } from "@/model/types/PageableResponse";
import { getSpringPage, getTokenFromAuth, notEmptyString } from "@/utils/helpers";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

const motoMockApi = axios.create({
  baseURL: "https://meu-servidor.com",
});

const mock = new AxiosMockAdapter(motoMockApi, { delayResponse: 1000 });

const TOKEN_MOCK = "fake.jwt.token.aqui";

// Lista de países
const paisList = [{ idPais: 1, nmPais: "Brasil" }];

// Lista de estados
const estadoList = [
  {
    idEstado: 1,
    nomeEstado: "São Paulo",
    idPais: { idPais: 1, nmPais: "Brasil" },
  },
];

// Lista de cidades
const cidadeList = [
  {
    idEstado: 1,
    estado: {
      idEstado: 1,
      nomeEstado: "São Paulo",
      idPais: { idPais: 1, nmPais: "Brasil" },
    },
  },
];

// Lista de telefones
const telefoneList = [
  { idTelefone: 1, ddi: "55", ddd: "11", numero: "987654321" },
  { idTelefone: 2, ddi: "55", ddd: "11", numero: "876543210" },
];

// Lista de endereços
const enderecoList = [
  {
    idEndereco: 1,
    nomeLogradouro: "Rua das Flores",
    numLogradouro: "123",
    cep: "01234-567",
    cidade: {
      idEstado: 1,
      estado: {
        idEstado: 1,
        nomeEstado: "São Paulo",
        idPais: { idPais: 1, nmPais: "Brasil" },
      },
    },
  },
  {
    idEndereco: 2,
    nomeLogradouro: "Avenida Paulista",
    numLogradouro: "456",
    cep: "01310-100",
    cidade: {
      idEstado: 1,
      estado: {
        idEstado: 1,
        nomeEstado: "São Paulo",
        idPais: { idPais: 1, nmPais: "Brasil" },
      },
    },
  },
];

// Lista de contatos
const contatoList = [
  {
    idContato: 1,
    nmEmail: "contato@filial1.com",
    nmDono: "João Silva",
    status: 1,
    telefone: { idTelefone: 1, ddi: "55", ddd: "11", numero: "987654321" },
  },
  {
    idContato: 2,
    nmEmail: "contato@filial2.com",
    nmDono: "Maria Santos",
    status: 1,
    telefone: { idTelefone: 2, ddi: "55", ddd: "11", numero: "876543210" },
  },
];

// Lista de filiais
const filialList = [
  {
    idFilial: 1,
    nome: "Filial Centro",
    cnpj: "12.345.678/0001-90",
    senha: "senha123",
    endereco: {
      idEndereco: 1,
      nomeLogradouro: "Rua das Flores",
      numLogradouro: "123",
      cep: "01234-567",
      cidade: {
        idEstado: 1,
        estado: {
          idEstado: 1,
          nomeEstado: "São Paulo",
          idPais: { idPais: 1, nmPais: "Brasil" },
        },
      },
    },
    contato: {
      idContato: 1,
      nmEmail: "contato@filial1.com",
      nmDono: "João Silva",
      status: 1,
      telefone: { idTelefone: 1, ddi: "55", ddd: "11", numero: "987654321" },
    },
  },
  {
    idFilial: 2,
    nome: "Filial Paulista",
    cnpj: "98.765.432/0001-10",
    senha: "senha456",
    endereco: {
      idEndereco: 2,
      nomeLogradouro: "Avenida Paulista",
      numLogradouro: "456",
      cep: "01310-100",
      cidade: {
        idEstado: 1,
        estado: {
          idEstado: 1,
          nomeEstado: "São Paulo",
          idPais: { idPais: 1, nmPais: "Brasil" },
        },
      },
    },
    contato: {
      idContato: 2,
      nmEmail: "contato@filial2.com",
      nmDono: "Maria Santos",
      status: 1,
      telefone: { idTelefone: 2, ddi: "55", ddd: "11", numero: "876543210" },
    },
  },
];

// Lista de tipos de moto
const tipoMotoList = [
  { idTipoMoto: 1, nomeTipo: "Honda CB 600F" },
  { idTipoMoto: 2, nomeTipo: "Yamaha YZF-R3" },
  { idTipoMoto: 3, nomeTipo: "Kawasaki Ninja 300" },
];

// Lista de motos simplificada
const motosList: Moto[] = [
  {
    idMoto: 1,
    identificador: "MOTO001",
    condicoes: "Excelente",
    condicoesManutencao: "Em dia",
    tipoMoto: { idTipoMoto: 1, nomeTipo: "Honda CB 600F" },
    filial: {
      idFilial: 1,
      nome: "Filial Centro",
      cnpj: "12.345.678/0001-90",
      senha: "senha123",
      endereco: {
        idEndereco: 1,
        nomeLogradouro: "Rua das Flores",
        numLogradouro: "123",
        cep: "01234-567",
        cidade: {
          idEstado: 1,
          estado: {
            idEstado: 1,
            nomeEstado: "São Paulo",
            idPais: { idPais: 1, nmPais: "Brasil" },
          },
        },
      },
      contato: {
        idContato: 1,
        nmEmail: "contato@filial1.com",
        nmDono: "João Silva",
        status: 1,
        telefone: { idTelefone: 1, ddi: "55", ddd: "11", numero: "987654321" },
      },
    },
  },
  {
    idMoto: 2,
    identificador: "MOTO002",
    condicoes: "Boa",
    condicoesManutencao: "Necessita revisão",
    tipoMoto: { idTipoMoto: 2, nomeTipo: "Yamaha YZF-R3" },
    filial: {
      idFilial: 1,
      nome: "Filial Centro",
      cnpj: "12.345.678/0001-90",
      senha: "senha123",
      endereco: {
        idEndereco: 1,
        nomeLogradouro: "Rua das Flores",
        numLogradouro: "123",
        cep: "01234-567",
        cidade: {
          idEstado: 1,
          estado: {
            idEstado: 1,
            nomeEstado: "São Paulo",
            idPais: { idPais: 1, nmPais: "Brasil" },
          },
        },
      },
      contato: {
        idContato: 1,
        nmEmail: "contato@filial1.com",
        nmDono: "João Silva",
        status: 1,
        telefone: { idTelefone: 1, ddi: "55", ddd: "11", numero: "987654321" },
      },
    },
  },
  {
    idMoto: 3,
    identificador: "MOTO003",
    condicoes: "Regular",
    condicoesManutencao: "Manutenção urgente",
    tipoMoto: { idTipoMoto: 3, nomeTipo: "Kawasaki Ninja 300" },
    filial: {
      idFilial: 2,
      nome: "Filial Paulista",
      cnpj: "98.765.432/0001-10",
      senha: "senha456",
      endereco: {
        idEndereco: 2,
        nomeLogradouro: "Avenida Paulista",
        numLogradouro: "456",
        cep: "01310-100",
        cidade: {
          idEstado: 1,
          estado: {
            idEstado: 1,
            nomeEstado: "São Paulo",
            idPais: { idPais: 1, nmPais: "Brasil" },
          },
        },
      },
      contato: {
        idContato: 2,
        nmEmail: "contato@filial2.com",
        nmDono: "Maria Santos",
        status: 1,
        telefone: { idTelefone: 2, ddi: "55", ddd: "11", numero: "876543210" },
      },
    },
  },
];

mock.onGet("/moto/paginado/").reply((config) => {
  console.log("Opa baum");

  const token = getTokenFromAuth(config);

  if (!(token === TOKEN_MOCK)) return [403, "Token é obrigatório!"];

  console.log("Olha o token aeee");
  const page = Number(config.params?.page!);
  const size = Number(config.params?.size!);
  const search = config.params?.search!

  if (page === null)
    return [400, { message: "É obrigatório o número da página." } as MotoData];
  
  const filteredMotos = notEmptyString(search) ? motosList.filter(moto => 
    moto.identificador.toLowerCase().includes(search.toLowerCase())
  ) : motosList;
  
  const pageData = getSpringPage(filteredMotos, page, size);

  return [200, pageData];
});

export default motoMockApi;
