import MotoFetcher from "@/fetcher/MotoFetcher";
import { Moto, MotoResponse, motoSchema } from "@/model/Moto";
import { PageableResponse } from "@/model/types/PageableResponse";
import { ValidationError } from "yup";

class MotoService {
  private motoFetcher: MotoFetcher;

  constructor(token : string | null) {
    this.motoFetcher = new MotoFetcher(token);
  }

  async getPagedMotos(page: number, size: number): Promise<PageableResponse<Moto>> {
    const data = await this.motoFetcher.getPagedMotos(page, size);
    return data;
  }

  async save(novaMoto: Partial<Moto>): Promise<MotoResponse> {
    let motoErrors: Partial<Moto> = {};
    try {
      await motoSchema.validate(novaMoto, { abortEarly: false });
      return await this.motoFetcher.save(novaMoto);
    } catch (error) {
      if (error instanceof ValidationError) {
        error.inner.forEach((err) => {
          motoErrors = {
            ...motoErrors,
            [err.path as keyof typeof motoErrors]: err.message,
          };
        });
      }

      return {
        success: false,
        errors: motoErrors,
        message: "Moto inválida",
      };
    }
  }
}

export default MotoService;
