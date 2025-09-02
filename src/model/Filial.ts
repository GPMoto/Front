import { Contato } from "./Contato";
import { Endereco } from "./Endereco";

interface Filial {
  idFilial: number;
  nome : string;
  cnpj: string;
  senha: string;
  endereco: Endereco;
  contato: Contato;
}

export { Filial };
