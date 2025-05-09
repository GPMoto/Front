export interface MotoView {
    id?: number;
    uwb: number;
    color: string;
    motoData: MotoData;
    clicked: boolean;
}

export interface MotoData {
    id: number;
    uwb: number;
    nome: string;
    status: string;
    identificador: string;
}