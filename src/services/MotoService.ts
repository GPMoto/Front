import MotoFetcher from "@/fetcher/MotoFetcher";
import { Moto, MotoResponse, createMotoSchema } from "@/model/Moto";
import { PageableResponse } from "@/model/types/PageableResponse";
import { ValidationError } from "yup";

class MotoService {
  private motoFetcher: MotoFetcher;

  constructor(token: string | null) {
    this.motoFetcher = new MotoFetcher(token);
  }

  async getPagedMotos(
    search: string | null,
    page: number,
    size: number
  ): Promise<PageableResponse<Moto>> {
    const data = await this.motoFetcher.getPagedMotos(search, page, size);
    return data;
  }

  async save(novaMoto: Partial<Moto>): Promise<MotoResponse> {
    let motoErrors: Partial<Moto> = {};
    try {
      await createMotoSchema.validate(novaMoto, { abortEarly: false });
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

  async update(updateMoto: Moto): Promise<Moto> {
    return await this.motoFetcher.update(updateMoto);
  }

  async getMotoById(idMoto: number): Promise<Moto> {
    return await this.motoFetcher.getMotoById(idMoto);
  }

  async searchMotos(query: string) {
    return await this.motoFetcher.searchMotos(query);
  }

  async getPagedMotosBySecaoFilial (idSecaoFilial : number) {
    return await this.motoFetcher.getPagedMotosBySecaoFilial(idSecaoFilial);
  }
}

export default MotoService;
