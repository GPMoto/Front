Alguns dados de mock:

Usuário de admin:

```ts
idUsuario: 1,
nmEmail: "admin@example.com",
nmUsuario: "Administrador Principal",
senha: "admin123",
idFilial: mockFiliais[0],
idPerfil: mockPerfis[0], // Administrador
```

Veja o restante em `src/mock/mock-list.ts`.

Valores de mock de status:

```ts
status: faker.helpers.arrayElement([
    "Ativo",
    "Inativo",
    "Manutenção",
    "Vendido",
]),
```

Valores de mock de condicoesManutencao:

```ts
condicoesManutencao: faker.helpers.arrayElement([
    "Excelente",
    "Boa",
    "Regular",
    "Ruim",
    "Péssima",
]),
```