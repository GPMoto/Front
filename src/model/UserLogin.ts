import { object, Schema, string } from "yup";

interface UserLogin {
  email: string;
  password: string;
}

const userLoginSchema: Schema<UserLogin> = object({
  email: string().required().email("É obrigatório um email válido"),
  password: string().required("Insira uma senha"),
});

type UserLoginErrors = Partial<UserLogin>

export { UserLogin, userLoginSchema, UserLoginErrors };
