import { MotoView } from "./Interfaces";
import { MotoViewTeste } from "./interfacesTeste";
/*
export interface motoViewInterface {
    id?: number;
    uwb: number;
    color: string;
    motoData: motoInterface;
    clicked: boolean;
}

export interface motoInterface{
    idMoto:number;
    identificador:string;
    condicoes:string;
    condicoesManutencao:string;
    lastPage:number;
    idTipoMoto:tipoMotoInterface;
    idFilial:filialInterface;
}

*/

export const motoViewMockList: MotoViewTeste[] = [
  {
    id: 1,
    uwb: 100,
    color: "black",
    motoData: {
      idMoto: 1,
      idTipoMoto: {
        id_tipo_moto: 1,
        nmTipo: "Mottu E",
      },
      identificador: "DOG-1010",
      condicoesManutencao: "Problema no motor",
      condicoes: "Manuntenção",
      idFilial: 1,
      lastPage: 10,
    },
    clicked: false,
  },
  {
    id: 2,
    uwb: 200,
    color: "black",
    motoData: {
      idMoto: 2,
      idTipoMoto: {
        id_tipo_moto: 2,
        nmTipo: "Mottu Sport",
      },
      identificador: "DOG-1010",
      condicoesManutencao: "Problema no motor",
      condicoes: "Manuntenção",
      idFilial: 1,
      lastPage: 10,
    },
    clicked: false,
  },
  {
    id: 3,
    uwb: 300,
    color: "black",
    motoData: {
      idMoto: 3,
      idTipoMoto: {
        id_tipo_moto: 3,
        nmTipo: "Mottu Pop",
      },
      identificador: "ABC-1234",
      condicoesManutencao: "Funcionando",
      condicoes: "Operacional",
      idFilial: 1,
      lastPage: 10,
    },
    clicked: false,
  },
  {
    id: 4,
    uwb: 400,
    color: "black",
    motoData: {
      idMoto: 4,
      idTipoMoto: {
        id_tipo_moto: 3,
        nmTipo: "Mottu Pop",
      },
      identificador: "DEF-5678",
      condicoesManutencao: "Em manutenção",
      condicoes: "Manuntenção",
      idFilial: 1,
      lastPage: 10,
    },
    clicked: false,
  },
  {
    id: 5,
    uwb: 500,
    color: "black",
    motoData: {
      idMoto: 5,
      idTipoMoto: {
        id_tipo_moto: 2,
        nmTipo: "Mottu Sport",
      },
      identificador: "GHI-9012",
      condicoesManutencao: "Disponível",
      condicoes: "Operacional",
      idFilial: 1,
      lastPage: 10,
    },
    clicked: false,
  },
  {
    id: 6,
    uwb: 600,
    color: "black",
    motoData: {
      idMoto: 6,
      idTipoMoto: {
        id_tipo_moto: 1,
        nmTipo: "Mottu E",
      },
      identificador: "JKL-3456",
      condicoesManutencao: "Em manutenção",
      condicoes: "Manuntenção",
      idFilial: 1,
      lastPage: 10,
    },
    clicked: false,
  },
  {
    id: 7,
    uwb: 700,
    color: "black",
    motoData: {
      idMoto: 7,
      idTipoMoto: {
        id_tipo_moto: 2,
        nmTipo: "Mottu Sport",
      },
      identificador: "MNO-7890",
      condicoesManutencao: "Disponível",
      condicoes: "Operacional",
      idFilial: 1,
      lastPage: 10,
    },
    clicked: false,
  },
  {
    id: 8,
    uwb: 800,
    color: "black",
    motoData: {
      idMoto: 8,
      idTipoMoto: {
        id_tipo_moto: 1,
        nmTipo: "Mottu E",
      },
      identificador: "PQR-1234",
      condicoesManutencao: "Em manutenção",
      condicoes: "Manuntenção",
      idFilial: 1,
      lastPage: 10,
    },
    clicked: false,
  },
  {
    id: 9,
    uwb: 900,
    color: "black",
    motoData: {
      idMoto: 9,
      idTipoMoto: {
        id_tipo_moto: 3,
        nmTipo: "Mottu Pop",
      },
      identificador: "STU-5678",
      condicoesManutencao: "Funcionando",
      condicoes: "Operacional",
      idFilial: 1,
      lastPage: 10,
    },
    clicked: false,
  },
  {
    id: 10,
    uwb: 1000,
    color: "black",
    motoData: {
      idMoto: 10,
      idTipoMoto: {
        id_tipo_moto: 2,
        nmTipo: "Mottu Sport",
      },
      identificador: "VWX-9012",
      condicoesManutencao: "Problema no motor",
      condicoes: "Manuntenção",
      idFilial: 1,
      lastPage: 10,
    },
    clicked: false,
  },
  {
    id: 11,
    uwb: 1100,
    color: "black",
    motoData: {
      idMoto: 11,
      idTipoMoto: {
        id_tipo_moto: 1,
        nmTipo: "Mottu E",
      },
      identificador: "YZA-3456",
      condicoesManutencao: "Disponível",
      condicoes: "Operacional",
      idFilial: 1,
      lastPage: 10,
    },
    clicked: false,
  },
  {
    id: 12,
    uwb: 1200,
    color: "black",
    motoData: {
      idMoto: 12,
      idTipoMoto: {
        id_tipo_moto: 3,
        nmTipo: "Mottu Pop",
      },
      identificador: "BCD-7890",
      condicoesManutencao: "Em manutenção",
      condicoes: "Manuntenção",
      idFilial: 1,
      lastPage: 10,
    },
    clicked: false,
  },
  {
    id: 13,
    uwb: 1300,
    color: "black",
    motoData: {
      idMoto: 13,
      idTipoMoto: {
        id_tipo_moto: 2,
        nmTipo: "Mottu Sport",
      },
      identificador: "EFG-1234",
      condicoesManutencao: "Funcionando",
      condicoes: "Operacional",
      idFilial: 1,
      lastPage: 10,
    },
    clicked: false,
  },
  {
    id: 14,
    uwb: 1400,
    color: "black",
    motoData: {
      idMoto: 14,
      idTipoMoto: {
        id_tipo_moto: 1,
        nmTipo: "Mottu E",
      },
      identificador: "HIJ-5678",
      condicoesManutencao: "Problema no motor",
      condicoes: "Manuntenção",
      idFilial: 1,
      lastPage: 10,
    },
    clicked: false,
  },
  {
    id: 15,
    uwb: 1500,
    color: "black",
    motoData: {
      idMoto: 15,
      idTipoMoto: {
        id_tipo_moto: 3,
        nmTipo: "Mottu Pop",
      },
      identificador: "KLM-9012",
      condicoesManutencao: "Disponível",
      condicoes: "Operacional",
      idFilial: 1,
      lastPage: 10,
    },
    clicked: false,
  },
  {
    id: 16,
    uwb: 1600,
    color: "black",
    motoData: {
      idMoto: 16,
      idTipoMoto: {
        id_tipo_moto: 2,
        nmTipo: "Mottu Sport",
      },
      identificador: "NOP-3456",
      condicoesManutencao: "Em manutenção",
      condicoes: "Manuntenção",
      idFilial: 1,
      lastPage: 10,
    },
    clicked: false,
  },
];
