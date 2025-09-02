import { Cidade } from "./Cidade";

interface Endereco {
  idEndereco: number;
  nomeLogradouro: string;
  numLogradouro: string;
  cep: string;
  cidade: Cidade;
}

export { Endereco };
