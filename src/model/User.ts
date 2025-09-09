import { object, Schema, string } from "yup";
import { ErrorResponseApi } from "./types/ErrorResponseApi";
import { Filial } from "./Filial";
import { Perfil } from "./Perfil";

interface UserData {
  idUsuario : number;
  nmEmail: string;
  nmUsuario: string;
  senha : string;
  idFilial: Filial;
  idPerfil: Perfil;
}

interface UserLogin {
  email: string;
  password: string;
}

const userLoginSchema: Schema<UserLogin> = object({
  email: string()
    .required("Insira seu email")
    .email("É obrigatório um email válido"),
  password: string().required("Insira sua senha"),
});

type UserLoginErrors = Partial<UserLogin>;

interface UserLoginResponse {
  token: string;
}

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
};
