# Projeto de Organização de Motos - Mottu

Este projeto foi desenvolvido para facilitar a organização e visualização das motos no pátio da Mottu. Ele utiliza uma interface interativa para exibir as motos, permitindo que os usuários selecionem e visualizem informações detalhadas sobre cada uma delas. Além disso, o sistema categoriza as motos por status e oferece uma visão geral das áreas administrativas, de estoque, recepção, entre outras.

## Funcionalidades Principais

- **Visualização de Motos**: Exibição das motos em um layout de grade, com cores indicando o status de cada moto.
- **Seleção de Motos**: Ao clicar em uma moto, é possível visualizar informações detalhadas e alterar seu status.
- **Categorias**: Áreas como Conserto, Qualidade, Administrativo, Estoque e Recepção são representadas visualmente para facilitar a navegação.

## Tecnologias Utilizadas

- **React Native**: Para a construção da interface do usuário.
- **Expo**: Para simplificar o desenvolvimento e execução do aplicativo.
- **TypeScript**: Para tipagem estática e maior segurança no código.

## Como Rodar o Projeto Localmente

Siga os passos abaixo para configurar e executar o projeto na sua máquina:

### Pré-requisitos

- Node.js (versão 22 ou superior)
- Expo CLI instalado globalmente (`npm install -g expo-cli`)
- Um emulador Android/iOS ou dispositivo físico com o aplicativo Expo Go instalado

### Passos

1. **Clone o repositório**:
   ```bash
   git clone https://https://github.com/GPMoto/Front.git
   cd Front
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento**:
   ```bash
   expo start
   ```

4. **Execute no dispositivo ou emulador**:
   - Escaneie o QR Code exibido no terminal ou no navegador com o aplicativo Expo Go.
   - Ou, se estiver usando um emulador, pressione `a` para Android ou `i` para iOS.

### Estrutura do Projeto

- **components**: Contém os componentes reutilizáveis, como `MapaComponent` e `ModalMapaComponent`.
- **styles**: Arquivos de estilo para o projeto.
- **Util**: Contém mocks e interfaces para simular dados e definir tipos.

## Colaboradores

- **@cotete**
- **@JuliaAngelozi**
- **@gustavodscruz**

