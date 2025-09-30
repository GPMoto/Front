import MotoFetcher from "@/fetcher/MotoFetcher";
import MotoDTO, { convertToMotoDto } from "@/model/dto/MotoDTO";
import { Moto, MotoResponse, createMotoSchema, updateMotoSchema } from "@/model/Moto";
import { PageableResponse } from "@/model/types/PageableResponse";
import { ValidationError } from "yup";

class MotoService {
  private motoFetcher: MotoFetcher;

  constructor(token: string | null) {
    this.motoFetcher = new MotoFetcher(token);
  }

  async getPagedMotos(
    idFilial: number,
    search: string | null,
    page: number,
    size: number
  ): Promise<PageableResponse<Moto>> {
    const data = await this.motoFetcher.getPagedMotos(
      idFilial,
      search,
      page,
      size
    );
    return data;
  }

  async save(novaMoto: Partial<Moto>): Promise<MotoResponse> {
    let motoErrors: { [key: string]: string } = {};
    try {
      // Preparar dados para validação (converter objetos para IDs)
      const motoParaValidacao = {
        ...novaMoto,
        idTipoMoto: typeof novaMoto.idTipoMoto === 'object' && novaMoto.idTipoMoto?.id_tipo_moto 
          ? novaMoto.idTipoMoto.id_tipo_moto 
          : novaMoto.idTipoMoto,
        idSecaoFilial: typeof novaMoto.idSecaoFilial === 'object' && novaMoto.idSecaoFilial?.idSecao 
          ? novaMoto.idSecaoFilial.idSecao 
          : novaMoto.idSecaoFilial,
      };

      await createMotoSchema.validate(motoParaValidacao, { abortEarly: false });
      return await this.motoFetcher.save(convertToMotoDto(novaMoto));
    } catch (error) {
      if (error instanceof ValidationError) {
        error.inner.forEach((err) => {
          if (err.path) {
            motoErrors[err.path] = err.message;
          }
        });
      }

      return {
        success: false,
        errors: motoErrors,
        message: "Moto inválida",
      };
    }
  }

  async update(updateMoto: Moto): Promise<{ success: boolean; data?: Moto; errors?: { [key: string]: string }; message?: string }> {
    let motoErrors: { [key: string]: string } = {};
    try {
      // Preparar dados para validação (converter objetos para IDs)
      const motoParaValidacao = {
        ...updateMoto,
        idTipoMoto: typeof updateMoto.idTipoMoto === 'object' && updateMoto.idTipoMoto?.id_tipo_moto 
          ? updateMoto.idTipoMoto.id_tipo_moto 
          : updateMoto.idTipoMoto,
        idSecaoFilial: typeof updateMoto.idSecaoFilial === 'object' && updateMoto.idSecaoFilial?.idSecao 
          ? updateMoto.idSecaoFilial.idSecao 
          : updateMoto.idSecaoFilial,
      };

      // Validar dados antes de atualizar
      await updateMotoSchema.validate(motoParaValidacao, { abortEarly: false });
      
      const updatedMoto = await this.motoFetcher.update(updateMoto.idMoto!, {
        ...updateMoto,
        idSecaoFilial: updateMoto.idSecaoFilial.idSecao,
        idTipoMoto: updateMoto.idTipoMoto.id_tipo_moto,
      });

      return {
        success: true,
        data: updatedMoto,
        message: "Moto atualizada com sucesso"
      };
    } catch (error) {
      if (error instanceof ValidationError) {
        error.inner.forEach((err) => {
          if (err.path) {
            motoErrors[err.path] = err.message;
          }
        });

        return {
          success: false,
          errors: motoErrors,
          message: "Dados inválidos para atualização"
        };
      }

      return {
        success: false,
        message: "Erro ao atualizar moto"
      };
    }
  }

  async getMotoById(idMoto: number): Promise<Moto> {
    return await this.motoFetcher.getMotoById(idMoto);
  }

  async searchMotos(query: string) {
    return await this.motoFetcher.searchMotos(query);
  }

  async getPagedMotosBySecaoFilial(
    idSecaoFilial: number,
    search: string | null = null,
    page: number = 1,
    size: number = 10
  ): Promise<PageableResponse<Moto>> {
    const data = await this.motoFetcher.getPagedMotosBySecaoFilial(
      idSecaoFilial,
      search,
      page,
      size
    );
    return data;
  }

  async delete(idMoto : number) {
    return await this.motoFetcher.delete(idMoto);
  }
}

export default MotoService;
