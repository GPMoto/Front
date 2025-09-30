import { number, object, string } from "yup";
import { TipoMoto } from "./TipoMoto";
import { PageableResponse } from "./types/PageableResponse";
import { SecaoFilial } from "./SecaoFilial";

interface Moto {
  idMoto?: number;
  identificador: string;
  status: string;
  condicoesManutencao: string;
  idTipoMoto: TipoMoto;
  idSecaoFilial: SecaoFilial;
}

interface MotoResponse {
  data?: Moto[] | PageableResponse<Moto>;
  status?: number;
  message: string;
  success: boolean;
  errors?: { [key: string]: string };
}

const createMotoSchema = object({
  idMoto: number()
    .nullable()
    .optional()
    .positive("ID da moto deve ser um número positivo"),
  identificador: string()
    .required("Identificador é obrigatório")
    .min(6, "Identificador/placa deve ter no mínimo 6 caracteres"),
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
  idSecaoFilial: number()
    .required("Seção filial é obrigatória")
    .positive("Seção filial deve ser um número positivo"),
});

const updateMotoSchema = object({
  idMoto: number()
    .required("ID da moto é obrigatório para atualização")
    .positive("ID da moto deve ser um número positivo"),
  identificador: string()
    .required("Identificador é obrigatório")
    .min(6, "Identificador/placa deve ter no mínimo 6 caracteres"),
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
  idSecaoFilial: number()
    .required("Seção filial é obrigatória")
    .positive("Seção filial deve ser um número positivo"),
});

type MotoData = MotoResponse["data"];

export { Moto, MotoResponse, MotoData, createMotoSchema, updateMotoSchema };
