# Guarda-Chuva Farmácias

## Descrição do Projeto
Guarda-Chuva Farmácias é um sistema de gestão de estoque e movimentação de produtos entre filiais de farmácias. Ele permite que administradores, filiais e motoristas gerenciem e monitorem o estoque e as entregas, garantindo controle logístico eficiente.

## Problema que Resolve
A dificuldade no controle de estoque e na movimentação de produtos entre diferentes filiais pode gerar falta de organização e atraso nas entregas. Este sistema centraliza o gerenciamento, possibilitando a movimentação controlada de itens entre filiais e o acompanhamento do status de entregas.

## Funcionalidades
- **Administrador**:
  - Gerenciar usuários
  - Gerenciar estoque geral
  - Visualizar perfil
  - Monitorar e administrar movimentações de todas as filiais
- **Filial**:
  - Gerenciar o próprio estoque
  - Adicionar novas movimentações de produtos entre filiais
- **Motorista**:
  - Visualizar e atualizar o status de suas entregas
  - Capturar selfie para confirmar coleta e entrega de produtos

## Tecnologias Utilizadas
- **Frontend**: React Native
- **Backend**: Node.js e Express
- **Banco de Dados**: SQLite para armazenamento local de dados
- **Armazenamento de Sessão**: AsyncStorage

## Diagrama de Casos de Uso
![Diagrama de Casos de Uso](https://github.com/user-attachments/assets/fed941c2-760c-440a-ba3b-af3619a63593)

## Interface do Aplicativo
## Tela Principal (Home)**:
  ![image](https://github.com/user-attachments/assets/97d5b688-327b-40b7-8b76-602da00cc18e)

## Tela de Movimentação do Motorista**:
  ![image](https://github.com/user-attachments/assets/0f7a2d7f-ea4d-432a-a6b1-bde3c17fa91f)

## Como Executar o Projeto

### Pré-requisitos
- Node.js e npm instalados
- Expo CLI para execução do app mobile
- Emulador Android ou dispositivo físico com Expo Go

### Passos para Execução

1. Clone o repositório backend:
   git clone https://github.com/DEVinHouse-Clamed-V3/template_m1.git
   cd seu-repositorio

2. Instale as dependências:
   npm install

3. Inicie o servidor backend:
   npm run start

4. Clone o repositório:
   git clone https://github.com/ruhanrmacedo/control-service-front.git

5. Instale as dependências:
   npm install

6. inicie o servidor
   npm run start

7. Use o aplicativo Expo Go no dispositivo ou o emulador Android para abrir o app.
   

## Melhorias Futuras
  - Implementar um CRUD completo para produtos, usuários, filiais e movimentações
  - Implementação de autenticação com criptografia de senha
  - Adição de relatórios com estatísticas de movimentações e estoque
  - Interface aprimorada para visualização de estoque
  - Notificações de novas movimentações para usuários
   
