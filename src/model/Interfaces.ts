import { ParamListBase } from "@react-navigation/native";

export interface optionsInterface{
    value:string
}



export interface loginInterface{
    nome:string;
    senha:string;
}

export interface tipoMotoInterface{
    id_tipo_moto:number;
    nmTipo:string
}



export interface contatoInterface{
    idContato:number;
    nmEmail:string;
    nmDono:string;
    status:number;
    idTelefone:telefoneInterface;
}

//precisa de status tbm btw
export interface telefoneInterface{
    id_telefone:number;
    ddi:string;
    ddd:string;
    numero:string;
}

export interface enderecoInterface{
    idEndereco:number;
    nmlogradouro:string;
    nrLogradouro:string;
    cep:string;
    idCidade:cidadeInterface;
}

export interface cidadeInterface{
    idCidade:number;
    nmCidade:string;
    idEstado:estadoInterface;
}

export interface estadoInterface{
    idEstado:number;
    nmEstado:string;
    idPais:paisInterface;
}
export interface paisInterface{
    idPais:number;
    nmPais:string;
}
