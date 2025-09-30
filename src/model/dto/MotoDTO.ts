import { Moto } from "../Moto";

interface MotoDTO {
    status : string;
    condicoesManutencao : string;
    identificador : string;
    idSecaoFilial : number;
    idTipoMoto : number;
}

export const convertToMotoDto = (moto : Partial<Moto>): MotoDTO => {
    return {
        condicoesManutencao: moto.condicoesManutencao!,
        identificador: moto.identificador!,
        idSecaoFilial: moto.idSecaoFilial!.idSecao,
        idTipoMoto: moto.idTipoMoto!.id_tipo_moto,
        status: moto.status!,
    }
}

export default MotoDTO;