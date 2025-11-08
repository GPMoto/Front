# 🏍️ GPMoto - Sistema de Gestão de Motocicletas

## 📱 Nome do App
**GPMoto** - Aplicativo móvel para gestão completa de motocicletas em concessionárias e pátios organizacionais.

[Link para baixar o app aqui!](https://appdistribution.firebase.dev/i/4f8d4b0cb7841a39)
## 🎯 Proposta e Funcionalidades

### Proposta
O GPMoto é uma solução mobile desenvolvida para facilitar a organização, visualização e gestão de motocicletas em ambientes empresariais como concessionárias, locadoras e pátios de manutenção. O sistema oferece uma interface intuitiva que permite controle total sobre o inventário de motos.

[Link do vídeo](https://youtu.be/hFBAfMo3u8w)

## 📁 Estrutura de Pastas

```
src/
├── components/           # Componentes reutilizáveis
│   ├── Button/          # Botões customizados
│   ├── DrawerNav/       # Navegação drawer
│   ├── FloatingButton/  # Botões flutuantes
│   ├── InputLabel/      # Inputs com label
│   ├── MapaComponent/   # Componentes do mapa
│   ├── MotoDetailCard/  # Cards de detalhes
│   ├── PickerArea/      # Seletores
│   ├── QrCode/         # Componentes QR Code
│   ├── shared/         # Componentes compartilhados
│   └── SingleMotoPaged/ # Paginação de motos
│
├── context/             # Contextos React
│   ├── AuthContext.tsx # Contexto de autenticação
│   └── ThemeContext.tsx # Contexto de tema
│
├── control/             # Controllers/Hooks
│   ├── AdicionarRastreadorController.ts
│   ├── AuthController.ts
│   ├── CadastroController.ts
│   ├── FilialController.ts
│   ├── IdentificadorController.ts
│   ├── InicioController.ts
│   ├── LeitorQrCodeController.ts
│   ├── MotoControl.ts
│   ├── ProfileController.ts
│   ├── QrCodeController.ts
│   └── TipoMotoController.ts
│
├── fetcher/             # Camada de dados
│   ├── AuthFetcher.ts
│   ├── Fetcher.ts
│   ├── FilialFetcher.ts
│   ├── IdentificadorFetcher.ts
│   ├── MotoFetcher.ts
│   ├── ProfileFetcher.ts
│   └── TipoMotoFetcher.ts
│
├── model/               # Modelos de dados
│   ├── dto/            # Data Transfer Objects
│   ├── types/          # Tipos TypeScript
│   ├── Cidade.ts
│   ├── Contato.ts
│   ├── Endereco.ts
│   ├── Estado.ts
│   ├── Filial.ts
│   ├── Identificador.ts
│   ├── Moto.ts         # Modelo principal
│   ├── Pais.ts
│   ├── Perfil.ts
│   ├── SecaoFilial.ts
│   ├── Telefone.ts
│   ├── TipoMoto.ts
│   ├── TipoSecao.ts
│   └── User.ts
│
├── navigators/          # Configuração de navegação
│   ├── AppNavigator.tsx
│   ├── AuthNavigator.tsx
│   ├── DrawerNavigator.tsx
│   ├── NavigationTypes.ts
│   ├── RootNavigator.tsx
│   └── SplashApp.tsx
│
├── screens/             # Telas do aplicativo
│   ├── AdicionarRastreador/
│   ├── Cadastro/
│   ├── Filial/
│   ├── Inicio/
│   ├── LoginCadastro/
│   ├── Mapa/
│   ├── Moto/
│   ├── ProcurarMoto/
│   └── Settings/
│
├── services/            # Serviços e APIs
│   ├── AuthService.ts
│   ├── FilialService.ts
│   ├── IdentificadorService.ts
│   ├── MotoService.ts
│   ├── NetworkInterceptor.ts
│   ├── ProfileService.ts
│   ├── TipoMotoService.ts
│   └── UnauthorizedHandler.ts
│
├── styles/              # Estilos e temas
│   ├── styles.ts
│   └── theme-config.ts
│
└── utils/               # Utilitários
    ├── axiosDebug.ts
    ├── helpers.ts
    └── useDebounce.ts
```

## 👥 Integrantes do Projeto

| Nome | RM | GitHub |
|------|----| -------|
| **Gustavo Dias da Silva Cruz** | RM556448 | [@gustavodscruz](https://github.com/gustavodscruz) |
| **Julia Angelozi** | RM556364 | [@JuliaAngelozi](https://github.com/JuliaAngelozi) |
| **Felipe Ribeiro Tardochi da Silva** | RM555100 | [@feliperibeiroa](https://github.com/feliperibeiroa) |


### Execução
- **Dispositivo físico**: Escaneie o QR Code com o app Expo Go
- **Emulador Android**: Pressione `a` no terminal
- **Simulador iOS**: Pressione `i` no terminal

## 🛠️ Tecnologias Utilizadas

### Frontend Mobile
- **React Native** - Framework principal
- **Expo** - Plataforma de desenvolvimento
- **TypeScript** - Tipagem estática
- **React Navigation** - Navegação entre telas

### Gerenciamento de Estado
- **TanStack React Query** - Cache e sincronização de dados
- **React Context** - Estado global (Auth, Theme)

### UI/UX
- **Expo Vector Icons** - Ícones
- **React Native Picker** - Seletores
- **Lottie React Native** - Animações

### Validação e Formulários
- **Yup** - Validação de schemas

### Networking
- **Axios** - Cliente HTTP
- **JWT** - Autenticação

## 📋 Funcionalidades Implementadas

- ✅ Sistema de autenticação completo
- ✅ CRUD de motocicletas com validação
- ✅ Gestão de filiais e seções
- ✅ Interface com tema claro/escuro
- ✅ Navegação drawer responsiva
- ✅ Mapa interativo do pátio
- ✅ Sistema de busca e filtros
- ✅ Validação em tempo real
- ✅ Cache offline de dados
- ✅ QR Code scanner/generator
