import IdentificadorFetcher from "@/fetcher/IdentificadorFetcher";
import { Identificador } from "@/model/Identificador";
import { PageableResponse } from "@/model/types/PageableResponse";
import { PhotoFile } from "@/model/types/PhotoFile";

export default class IdentificadorService {
  private identificadorFetcher: IdentificadorFetcher;

  constructor(token: string | null) {
    this.identificadorFetcher = new IdentificadorFetcher(token);
  }

  async findByFilial(
    idFilial: number
  ): Promise<PageableResponse<Identificador>> {
    return await this.identificadorFetcher.findByFilial(idFilial);
  }

  async uploadPhoto(photo: PhotoFile) {
    if (!photo) throw new Error("Nenhuma foto selecionada");
    console.log("photo: ", photo);
    return await this.identificadorFetcher.uploadPhoto(photo);
  }
}
