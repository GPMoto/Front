import { Telefone } from "./Telefone";

interface Contato {
  idContato: number;
  nmEmail: string;
  nmDono: string;
  status: number;
  telefone: Telefone;
}

export { Contato };
