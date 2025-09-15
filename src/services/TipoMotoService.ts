import TipoMotoFetcher from "@/fetcher/TipoMotoFetcher";

export default class TipoMotoService {
  private tipoMotoFetcher: TipoMotoFetcher;

  constructor(token: string | null) {
    this.tipoMotoFetcher = new TipoMotoFetcher(token);
  }

  async findAll() {
    return await this.tipoMotoFetcher.findAll();
  }
}
