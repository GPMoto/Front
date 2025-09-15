import IdentificadorFetcher from "@/fetcher/IdentificadorFetcher";
import { Identificador } from "@/model/Identificador";
import { PageableResponse } from "@/model/types/PageableResponse";

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
}
