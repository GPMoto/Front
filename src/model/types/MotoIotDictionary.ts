export interface IMotoIot {
    condicao:          string;
    descricaoDeEstado: string;
    distrito:          IDistrito;
    id:                number;
    nome:              string;
}

export interface IDistrito {
    nome:     string;
    posicaoX: number;
    posicaoY: number;
}

export type IMotoDictionary = Record<string, IMotoIot>

export type CallMotoIotResponse = {
  message : string
}
