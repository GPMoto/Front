import { uwbInterfaceTeste } from "./interfacesTeste";

export const uwbMockList: uwbInterfaceTeste[] = [
  {
    idUwb: 1,
    moto: {
      idMoto: 1,
      idFilial: 1,
      idTipoMoto: {
        id_tipo_moto: 1,
        nmTipo: "Mottu Sport",
      },
      condicoes: "Disponível",
      condicoesManutencao: "Sem necessidade de manuntenção",
      identificador: "ABC-9090",
      lastPage: 10,
    },
    vlUwb: "UWB-MOTO-001",
  },
  {
    idUwb: 2,
    moto: {
      idMoto: 2,
      idFilial: 1,
      idTipoMoto: {
        id_tipo_moto: 2,
        nmTipo: "Mottu E",
      },
      condicoes: "Em manutenção",
      condicoesManutencao: "Troca de bateria",
      identificador: "DEF-2020",
      lastPage: 10,
    },
    vlUwb: "UWB-MOTO-002",
  },
  {
    idUwb: 3,
    moto: {
      idMoto: 3,
      idFilial: 1,
      idTipoMoto: {
        id_tipo_moto: 3,
        nmTipo: "Mottu Pop",
      },
      condicoes: "Funcionando",
      condicoesManutencao: "Sem necessidade de manuntenção",
      identificador: "GHI-3030",
      lastPage: 10,
    },
    vlUwb: "UWB-MOTO-003",
  },
];
