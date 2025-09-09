import { number, object, Schema, string } from "yup";
import { TipoMoto } from "./TipoMoto";
import { PageableResponse } from "./types/PageableResponse";
import { Identificador } from "./Identificador";

interface Moto {
  idMoto?: number;
  identificador: Identificador;
  status: string;
  condicoesManutencao: string;
  idTipoMoto: TipoMoto;
  placa : string;
}

interface MotoResponse {
  data?: Moto[] | PageableResponse<Moto>;
  status?: number;
  message: string;
  success: boolean;
  errors?: Partial<Moto>
}

const createMotoSchema = object({
  idMoto: number().nullable().optional().positive(),
  identificador: number().required(),
  status: string().required(),
  condicoesManutencao: string().required(),
  idTipoMoto: number().required(),
});


type MotoData = MotoResponse["data"];

export { Moto, MotoResponse, MotoData, createMotoSchema };
