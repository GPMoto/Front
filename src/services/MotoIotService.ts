import { MotoIotFetcher } from "@/fetcher/MotoIotFetcher";
import { IMotoIot } from "@/model/types/MotoIotDictionary";

export class MotoIotService {
  private motoFetcher: MotoIotFetcher;

  constructor() {
    this.motoFetcher = new MotoIotFetcher();
  }

  async getMotoWithDevices() : Promise<IMotoIot[]> {
    return await this.motoFetcher.getMotoWithDevices();
  }

  async callMoto(toggleCall : boolean) {
    const toggleCallNumber = toggleCall ? 1 : 0;
    return await this.motoFetcher.callMoto(toggleCallNumber);
  }
}
