import { number, object, Schema, string } from "yup";
import { ErrorResponseApi } from "./ErrorResponseApi";
import { Filial } from "./Filial";
import { TipoMoto } from "./TipoMoto";
import { PageableResponse } from "./types/PageableResponse";

interface Moto {
  idMoto?: number;
  identificador: string;
  condicoes: string;
  condicoesManutencao: string;
  tipoMoto: TipoMoto | number;
  filial: Filial | number;
}

interface MotoResponse {
  data?: Moto[] | MotoError | PageableResponse<Moto>;
  status?: number;
  message: string;
  success: boolean;
  errors?: Partial<Moto>
}

const motoSchema = object({
  idMoto: number().nullable().optional().positive(),
  identificador: string().required(),
  condicoes: string().required(),
  condicoesManutencao: string().required(),
  tipoMoto: number().required(),
  filial: number().required(),
});



type MotoData = MotoResponse["data"];

interface MotoError extends ErrorResponseApi {}

export { Moto, MotoResponse, MotoData, motoSchema };
