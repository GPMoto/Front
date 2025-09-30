import { Telefone } from "./Telefone";

interface Contato {
  idContato: number;
  nmDono: string;
  status: number;
  idTelefone: Telefone;
}

export { Contato };
