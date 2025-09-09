import { Contato } from "./Contato";
import { Endereco } from "./Endereco";

interface Filial {
  idFilial: number;
  nome : string;
  cnpjFilial: string;
  senhaFilial: string;
  idEndereco: Endereco;
  idContato: Contato;
}

export { Filial };
