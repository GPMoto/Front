import { Pais } from "@/model/Pais";
import { fakerPT_BR as faker, fakerES_MX as faker_mx } from "@faker-js/faker";
import { Estado } from "@/model/Estado";
import { Cidade } from "@/model/Cidade";
import { Telefone } from "@/model/Telefone";
import { Contato } from "@/model/Contato";
import { Endereco } from "@/model/Endereco";
import { Filial } from "@/model/Filial";
import { Perfil } from "@/model/Perfil";
import { TipoMoto } from "@/model/TipoMoto";
import { Identificador } from "@/model/Identificador";
import { Moto } from "@/model/Moto";
import { UserData } from "@/model/User";

export const mockPaises: Pais[] = [
  { idPais: 1, nmPais: "Brasil" },
  { idPais: 2, nmPais: "Mexico" },
];

faker.seed(100);
faker_mx.seed(101);

export const MOCK_TOKEN = "fake.jwt.token";

const estadosBrasil = faker.helpers.uniqueArray(faker.location.state, 10);
const estadosMexico = faker_mx.helpers.uniqueArray(faker_mx.location.state, 10);

export const mockEstados: Estado[] = Array.from({ length: 20 }, (_, i) => ({
  idEstado: i + 1,
  idPais: i + 1 <= 10 ? mockPaises[0] : mockPaises[1],
  nmEstado: i + 1 <= 10 ? estadosBrasil[i] : estadosMexico[i - 10],
}));

export const mockCidades: Cidade[] = Array.from({ length: 40 }, (_, i) => ({
  idCidade: i + 1,
  idEstado: i + 1 <= 20 ? mockEstados[i] : mockEstados[i - 20],
  nmCidade: i + 1 <= 20 ? faker.location.city() : faker_mx.location.city(),
}));

export const mockTelefones: Telefone[] = Array.from({ length: 50 }, (_, i) => ({
  id_telefone: i + 1,
  ddi: faker.helpers.arrayElement(["+55", "+52"]),
  ddd: faker.string.numeric(2),
  numero: faker.string.numeric(9),
}));

export const mockContatos: Contato[] = Array.from({ length: 30 }, (_, i) => ({
  idContato: i + 1,
  nmDono: faker.person.fullName(),
  status: faker.helpers.arrayElement([0, 1]),
  idTelefone: faker.helpers.arrayElement(mockTelefones),
}));

export const mockEnderecos: Endereco[] = Array.from({ length: 35 }, (_, i) => ({
  idEndereco: i + 1,
  nmLogradouro: faker.location.streetAddress(),
  nrLogradouro: faker.location.buildingNumber(),
  cep: faker.string.numeric(8),
  idCidade: faker.helpers.arrayElement(mockCidades),
}));

export const mockFiliais: Filial[] = Array.from({ length: 15 }, (_, i) => ({
  idFilial: i + 1,
  nome: faker.company.name(),
  cnpjFilial: faker.string.numeric(14),
  senhaFilial: faker.internet.password(),
  idEndereco: faker.helpers.arrayElement(mockEnderecos),
  idContato: faker.helpers.arrayElement(mockContatos),
}));

export const mockPerfis: Perfil[] = [
  { idPerfil: 1, nmPerfil: "Administrador" },
  { idPerfil: 2, nmPerfil: "Gerente" },
  { idPerfil: 3, nmPerfil: "Operador" },
  { idPerfil: 4, nmPerfil: "Visualizador" },
  { idPerfil: 5, nmPerfil: "Técnico" },
];

export const mockTipoMotos: TipoMoto[] = [
  { id_tipo_moto: 1, nmTipo: "Sport" },
  { id_tipo_moto: 2, nmTipo: "Cruiser" },
  { id_tipo_moto: 3, nmTipo: "Touring" },
  { id_tipo_moto: 4, nmTipo: "Standard" },
  { id_tipo_moto: 5, nmTipo: "Adventure" },
  { id_tipo_moto: 6, nmTipo: "Naked" },
  { id_tipo_moto: 7, nmTipo: "Scooter" },
];

export const mockIdentificadores: Identificador[] = Array.from(
  { length: 100 },
  (_, i) => ({
    idIdentificador: faker.string.alphanumeric(8).toUpperCase(),
    idFilial: faker.helpers.arrayElement(mockFiliais),
    vlrIdentificador: faker.vehicle.vin(),
  })
);

export const mockMotos: Moto[] = Array.from({ length: 80 }, (_, i) => ({
    idMoto: i + 1,
    identificador: faker.helpers.arrayElement(mockIdentificadores),
    status: faker.helpers.arrayElement([
        "Ativo",
        "Inativo",
        "Manutenção",
        "Vendido",
    ]),
    condicoesManutencao: faker.helpers.arrayElement([
        "Excelente",
        "Boa",
        "Regular",
        "Ruim",
        "Péssima",
    ]),
    idTipoMoto: faker.helpers.arrayElement(mockTipoMotos),
    placa: faker.vehicle.vrm(),
}));

export const mockUsers: UserData[] = Array.from({ length: 20 }, (_, i) => {
  if (i + 1 === 1) {
    return {
      idUsuario: 1,
      nmEmail: "admin@example.com",
      nmUsuario: "Administrador Principal",
      senha: "admin123",
      idFilial: mockFiliais[0],
      idPerfil: mockPerfis[0], // Administrador
    };
  }
  return {
    idUsuario: i + 1,
    nmEmail: faker.internet.email(),
    nmUsuario: faker.person.fullName(),
    senha: faker.internet.password(),
    idFilial: faker.helpers.arrayElement(mockFiliais),
    idPerfil: faker.helpers.arrayElement(mockPerfis),
  };
});
