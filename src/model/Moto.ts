import { number, object, Schema, string } from "yup";
import { TipoMoto } from "./TipoMoto";
import { PageableResponse } from "./types/PageableResponse";
import { Identificador } from "./Identificador";
import { SecaoFilial } from "./SecaoFilial";

interface Moto {
  idMoto?: number;
  identificador: string;
  status: string;
  condicoesManutencao: string;
  idTipoMoto: TipoMoto;
  idSecaoFilial : SecaoFilial;
}

interface MotoResponse {
  data?: Moto[] | PageableResponse<Moto>;
  status?: number;
  message: string;
  success: boolean;
  errors?: Partial<Moto>
}

const createMotoSchema = object({
  idMoto: number()
    .nullable()
    .optional()
    .positive("ID da moto deve ser um número positivo"),
  identificador: number()
    .required("Identificador é obrigatório")
    .positive("Identificador deve ser um número positivo"),
  status: string()
    .required("Status é obrigatório")
    .oneOf(
      ["Disponível", "Manutenção", "Vendida"], 
      "Status deve ser: Disponível, Manutenção ou Vendida"
    ),
  condicoesManutencao: string()
    .required("Condições de manutenção são obrigatórias")
    .oneOf(
      ["Excelente", "Boa", "Regular", "Ruim", "Péssima"],
      "Condições de manutenção devem ser: Excelente, Boa, Regular, Ruim ou Péssima"
    ),
  idTipoMoto: number()
    .required("Tipo da moto é obrigatório")
    .positive("Tipo da moto deve ser um número positivo"),
  placa: string()
    .required("Placa é obrigatória")
    // .matches(
    //   /^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/,
    //   "Placa deve ter o formato válido (ABC1234 ou ABC1D23)"
    // ),
    ,
  idSecaoFilial: object()
    .required("Seção filial é obrigatória"),
});

const updateMotoSchema = object({
  idMoto: number()
    .required("ID da moto é obrigatório para atualização")
    .positive("ID da moto deve ser um número positivo"),
  identificador: object()
    .required("Identificador é obrigatório"),
  status: string()
    .required("Status é obrigatório")
    .oneOf(
      ["Disponível", "Manutenção", "Vendida"], 
      "Status deve ser: Disponível, Manutenção ou Vendida"
    ),
  condicoesManutencao: string()
    .required("Condições de manutenção são obrigatórias")
    .oneOf(
      ["Excelente", "Boa", "Regular", "Ruim", "Péssima"],
      "Condições de manutenção devem ser: Excelente, Boa, Regular, Ruim ou Péssima"
    ),
  idTipoMoto: object()
    .required("Tipo da moto é obrigatório"),
  placa: string()
    .required("Placa é obrigatória")
    .matches(
      /^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/,
      "Placa deve ter o formato válido (ABC1234 ou ABC1D23)"
    ),
  idSecaoFilial: object()
    .required("Seção filial é obrigatória"),
});


type MotoData = MotoResponse["data"];

export { Moto, MotoResponse, MotoData, createMotoSchema, updateMotoSchema };
