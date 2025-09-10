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
import { TipoSecao } from "@/model/TipoSecao";
import { SecaoFilial } from "@/model/SecaoFilial";

faker.seed(100);
faker_mx.seed(101);


export const MOCK_TOKEN = "fake.jwt.token";

// 1. DADOS BASE (sem dependências)
export const mockPaises: Pais[] = [
  { idPais: 1, nmPais: "Brasil" },
  { idPais: 2, nmPais: "Mexico" },
];

export const mockPerfis: Perfil[] = [
  { idPerfil: 1, nmPerfil: "Administrador" },
  { idPerfil: 2, nmPerfil: "Gerente" },
  { idPerfil: 3, nmPerfil: "Operador" },
  { idPerfil: 4, nmPerfil: "Visualizador" },
  { idPerfil: 5, nmPerfil: "Técnico" },
];

export const mockTipoSecao: TipoSecao[] = [
  {idTipoSecao: 1, nmSecao: "Estoque"},
  {idTipoSecao: 2, nmSecao: "Manutenção"},
  {idTipoSecao: 3, nmSecao: "Vendas"},
  {idTipoSecao: 4, nmSecao: "Atendimento"},
  {idTipoSecao: 5, nmSecao: "Pátio"},
  {idTipoSecao: 6, nmSecao: "Almoxarifado"},
];

// 2. PRIMEIRA CAMADA (dependem apenas dos dados base)
const estadosBrasil = faker.helpers.uniqueArray(faker.location.state, 10);
const estadosMexico = faker_mx.helpers.uniqueArray(faker_mx.location.state, 10);

export const mockEstados: Estado[] = Array.from({ length: 20 }, (_, i) => ({
  idEstado: i + 1,
  idPais: i + 1 <= 10 ? mockPaises[0] : mockPaises[1],
  nmEstado: i + 1 <= 10 ? estadosBrasil[i] : estadosMexico[i - 10],
}));

export const mockTelefones: Telefone[] = Array.from({ length: 50 }, (_, i) => ({
  id_telefone: i + 1,
  ddi: faker.helpers.arrayElement(["+55", "+52"]),
  ddd: faker.string.numeric(2),
  numero: faker.string.numeric(9),
}));

// 3. SEGUNDA CAMADA (dependem da primeira camada)
export const mockCidades: Cidade[] = Array.from({ length: 40 }, (_, i) => ({
  idCidade: i + 1,
  idEstado: mockEstados[Math.floor(i / 2)], // Distribuição mais controlada
  nmCidade: i + 1 <= 20 ? faker.location.city() : faker_mx.location.city(),
}));

export const mockContatos: Contato[] = Array.from({ length: 30 }, (_, i) => ({
  idContato: i + 1,
  nmDono: faker.person.fullName(),
  status: faker.helpers.arrayElement([0, 1]),
  idTelefone: mockTelefones[i % mockTelefones.length], // Distribuição controlada
}));

export const mockEnderecos: Endereco[] = Array.from({ length: 35 }, (_, i) => ({
  idEndereco: i + 1,
  nmLogradouro: faker.location.streetAddress(),
  nrLogradouro: faker.location.buildingNumber(),
  cep: faker.string.numeric(8),
  idCidade: mockCidades[i % mockCidades.length], // Distribuição controlada
}));

// 4. TERCEIRA CAMADA
export const mockFiliais: Filial[] = Array.from({ length: 15 }, (_, i) => ({
  idFilial: i + 1,
  nome: faker.company.name(),
  cnpjFilial: faker.string.numeric(14),
  senhaFilial: faker.internet.password(),
  idEndereco: mockEnderecos[i % mockEnderecos.length],
  idContato: mockContatos[i % mockContatos.length],
}));

// 5. TIPOS DE MOTO COM SEEDS FIXAS PARA CONSISTÊNCIA
export const mockTipoMotos: TipoMoto[] = [
  { id_tipo_moto: 1, nmTipo: "Sport", comprimento: 2.10, largura: 0.80 },
  { id_tipo_moto: 2, nmTipo: "Cruiser", comprimento: 2.40, largura: 0.90 },
  { id_tipo_moto: 3, nmTipo: "Touring", comprimento: 2.30, largura: 0.85 },
  { id_tipo_moto: 4, nmTipo: "Standard", comprimento: 2.15, largura: 0.75 },
  { id_tipo_moto: 5, nmTipo: "Adventure", comprimento: 2.25, largura: 0.85 },
  { id_tipo_moto: 6, nmTipo: "Naked", comprimento: 2.05, largura: 0.78 },
  { id_tipo_moto: 7, nmTipo: "Scooter", comprimento: 1.85, largura: 0.70 },
];

// 6. IDENTIFICADORES E MOTOS
export const mockIdentificadores: Identificador[] = Array.from(
  { length: 100 },
  (_, i) => ({
    idIdentificador: faker.string.alphanumeric(8).toUpperCase(),
    idFilial: mockFiliais[i % mockFiliais.length],
    vlrIdentificador: faker.vehicle.vin(),
  })
);

export const mockMotos: Moto[] = Array.from({ length: 80 }, (_, i) => ({
  idMoto: i + 1,
  identificador: mockIdentificadores[i],
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
  idTipoMoto: mockTipoMotos[i % mockTipoMotos.length],
  placa: faker.vehicle.vrm(),
}));

// 7. DADOS MAIS COMPLEXOS
export const mockSecaoFilial: SecaoFilial[] = mockFiliais.flatMap((filial, filialIndex) => {
  return Array.from({ length: 6 }, (_, i) => ({ // Reduzido para 6 por filial
    idSecao: filialIndex * 6 + i + 1,
    lado1: faker.number.float({ min: 1.0, max: 10.0, fractionDigits: 2 }),
    lado2: faker.number.float({ min: 1.0, max: 10.0, fractionDigits: 2 }),
    lado3: faker.number.float({ min: 1.0, max: 10.0, fractionDigits: 2 }),
    lado4: faker.number.float({ min: 1.0, max: 10.0, fractionDigits: 2 }),
    idTipoSecao: mockTipoSecao[i % mockTipoSecao.length],
    idFilial: filial,
  }));
});

export const mockUsers: UserData[] = Array.from({ length: 20 }, (_, i) => {
  if (i === 0) { // Usuário admin sempre o primeiro
    return {
      idUsuario: 1,
      nmEmail: "admin@example.com",
      nmUsuario: "Administrador Principal",
      senha: "admin123",
      idFilial: mockFiliais[0],
      idPerfil: mockPerfis[0],
    };
  }
  return {
    idUsuario: i + 1,
    nmEmail: faker.internet.email(),
    nmUsuario: faker.person.fullName(),
    senha: faker.internet.password(),
    idFilial: mockFiliais[i % mockFiliais.length],
    idPerfil: mockPerfis[(i % (mockPerfis.length - 1)) + 1], // Evita admin para outros usuários
  };
});