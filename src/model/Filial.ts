import { Contato } from "./Contato";
import { Endereco } from "./Endereco";

interface Filial {
  idFilial: number;
  cnpjFilial: string;
  senhaFilial: string;
  idEndereco: Endereco;
  idContato: Contato;
}

export { Filial };
