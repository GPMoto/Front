import { Cidade } from "./Cidade";

interface Endereco {
  idEndereco: number;
  nmLogradouro: string;
  nrLogradouro: string;
  cep: string;
  idCidade: Cidade;
}

export { Endereco };
