import { Filial } from "./Filial";
import { TipoSecao } from "./TipoSecao";

interface SecaoFilial {
  idSecao: number;
  lado1: number;
  lado2: number;
  lado3: number;
  lado4: number;
  idTipoSecao: TipoSecao;
  idFilial: Filial;
}

export { SecaoFilial };
