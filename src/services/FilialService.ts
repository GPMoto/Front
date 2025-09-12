import FilialFetcher from "@/fetcher/FilialFetcher";
import { Filial } from "@/model/Filial";
import { SecaoFilial } from "@/model/SecaoFilial";

class FilialService {
    private filialFetcher : FilialFetcher;

    constructor(token : string | null) {
        this.filialFetcher = new FilialFetcher(token);
    }
    
    async getSecoes(idFilial : number) : Promise<SecaoFilial[]> {
        return await this.filialFetcher.getSecoes(idFilial);
    }

    async getAllFiliais() : Promise<Filial[]>{
        console.log("Passando no service e puxando as filiais!")
        return await this.filialFetcher.getAllFiliais();
    }
}

export default FilialService;