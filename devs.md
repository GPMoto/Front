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

## TODO IMPORTANTES!

- O tipo da moto sempre tem largura e comprimentos fixos, logo, podemos calcular a área ocupada pela quantidade de motos!

- Combinamos de pegar apenas algo para ler a placa da moto e crud para alterar o local da moto, logo tem que ter uma seção para alterar as informações da moto!!!!

- Fazer com que o 401 dê um alert "Faça login novamente. Sessão expirou!" e jogar ele para a tela de login.... É a forma certa de usar a validação de token -> o useEffect faz MUITAS requisições.