import { ErrorResponseApi } from "@/model/ErrorResponseApi";
import { PageableResponse } from "@/model/types/PageableResponse";
import { AxiosError, AxiosRequestConfig } from "axios";

export const statusBadge = (status: string) => {
  switch (status) {
    case "Excelente":
      return "#41C526";
    case "Boa":
      return "lightgreen";
    case "Regular":
      return "yellow";
    default:
      return "red";
  }
};

export const getTokenFromAuth = (config: AxiosRequestConfig) => {
  const auth: string = config.headers?.Authorization ?? "";
  const token = auth.split("Bearer ")[1];
  if (token.length === 0) return null;
  return token;
};

export const getErrorMessage = (error: AxiosError): string => {
  if (!error.response) return "Erro de conexão";

  const { status } = error.response;
  const data: ErrorResponseApi = error.response.data as ErrorResponseApi;
  if (data.message) return data.message;
  switch (status) {
    case 401:
      return "Email ou senha incorretos";
    case 400:
      return "Dados inválidos";
    case 422:
      return "Dados de entrada inválidos";
    case 500:
      return "Erro interno do servidor";
    case 503:
      return "Serviço temporariamente indisponível";
    default:
      return data.message ?? "Erro no login";
  }
};

export function getSpringPage<T>(
  data: T[],
  page: number,
  size: number
): PageableResponse<T> {
  const zeroBasedPage = page - 1;
  const start = zeroBasedPage * size;
  const end = start + size;
  const content = data.slice(start, end);

  const totalElements = data.length;
  const totalPages = Math.ceil(totalElements / size);

  return {
    content,
    totalElements,
    totalPages,
    size,
    number: page,
    first: page === 1,
    last: page === totalPages,
    empty: content.length === 0,
  };
}
