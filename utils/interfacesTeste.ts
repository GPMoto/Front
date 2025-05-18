import { ParamListBase } from "@react-navigation/native";

export interface optionsInterfaceTeste{
    value:string
}

export interface motoInterfaceTeste{
    idMoto:number;
    identificador:string;
    condicoes:string;
    condicoesManutencao:string;
    lastPage:number;
    idTipoMoto:tipoMotoInterfaceTeste;
    idFilial:number;
}

export interface uwbInterfaceTeste {
    idUwb: number;
    vlUwb: string;
    moto: motoInterfaceTeste;
}




export interface loginInterfaceTeste{
    nome:string;
    senha:string;
}

export interface tipoMotoInterfaceTeste{
    id_tipo_moto:number;
    nmTipo:string
}

export interface filialInterfaceTeste{
    idFilial:number;
    cnpjFilial:string;
    senhaFilial:string;
    idEndereco:number;
    idContato:number;
}

export interface contatoInterfaceTeste{
    idContato:number;
    nmEmail:string;
    nmDono:string;
    status:number;
    idTelefone:number;
}

//precisa de status tbm btw
export interface telefoneInterfaceTeste{
    id_telefone:number;
    ddi:string;
    ddd:string;
    numero:string;
}

export interface enderecoInterfaceTeste{
    idEndereco:number;
    nmlogradouro:string;
    nrLogradouro:string;
    cep:string;
    idCidade:cidadeInterfaceTeste;
}

export interface cidadeInterfaceTeste{
    idCidade:number;
    nmCidade:string;
    idEstado:estadoInterfaceTeste;
}

export interface estadoInterfaceTeste{
    idEstado:number;
    nmEstado:string;
    idPais:paisInterfaceTeste;
}
export interface paisInterfaceTeste{
    idPais:number;
    nmPais:string;
}

export interface MotoViewTeste {
    id?: number;
    uwb: number;
    color: string;
    motoData: motoInterfaceTeste;
    clicked: boolean;
}

export interface MotoDataTeste {
    id: number;
    uwb: number;
    nome: string;
    status: string;
    identificador: string;
}
