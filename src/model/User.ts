import { number, object, Schema, string } from "yup";
import { ErrorResponseApi } from "./types/ErrorResponseApi";
import { Filial } from "./Filial";
import { Perfil } from "./Perfil";

interface UserData {
  idUsuario: number;
  nmEmail: string;
  nmUsuario: string;
  senha: string;
  idFilial: Filial;
  idPerfil: Perfil;
}

interface UserLogin {
  email: string;
  senha: string;
}

  // String nome,
  //       String email,
  //       String senha,
  //       Long idFilial,
  //       Long idPerfil

interface CreateUser {
  nome: string;
  email: string;
  senha: string;
  idFilial: number;
  idPerfil: number;
}

const userLoginSchema = object({
  email: string()
    .required("Insira o seu nome")
    .min(2, "Mínimo de 2 caracteres"),
  senha: string().required("Insira sua senha"),
});

const createUserSchema: Schema<CreateUser> = object({
  nome: string()
    .required("O nome é obrigatório")
    .min(2, "O nome deve ter pelo menos 2 caracteres")
    .max(50, "O nome deve ter no máximo 50 caracteres"),
  email: string()
    .required("O email é obrigatório")
    .email("Digite um email válido"),
  senha: string()
    .required("A senha é obrigatória")
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    .max(20, "A senha deve ter no máximo 20 caracteres"),
  idFilial: number()
    .required("Selecione uma filial")
    .positive("Selecione uma filial válida")
    .integer("Selecione uma filial válida"),
  idPerfil: number()
    .required("Selecione um perfil")
    .positive("Selecione um perfil válido")
    .integer("Selecione um perfil válido"),
});

type UserLoginErrors = Partial<UserLogin>;

type UserLoginResponse = string;

interface UserLoginErrorResponse extends ErrorResponseApi {}

interface UserDataErrorResponse extends ErrorResponseApi {}

interface ProfileResponse {
  data: UserData;
  success: boolean;
  message?: string;
}

type ProfileData = ProfileResponse["data"];

export {
  UserLogin,
  userLoginSchema,
  UserLoginErrors,
  UserLoginResponse,
  UserLoginErrorResponse,
  UserData,
  UserDataErrorResponse,
  ProfileResponse,
  ProfileData,
  CreateUser,
  createUserSchema,
};
