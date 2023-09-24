# site-teste-bd

Este é um projeto de página que registra em um database postgres, os dados
submetidos pelo usuário (email e senha).

Este projeto contém um backend (crud-server) e um frontend (login-app)
dentro da pasta site-teste-bd. O backend é responsável por fornecer
operações CRUD (Create, Read, Update, Delete) para uma aplicação
enquanto o frontend é uma aplicação de login simples.

A seguir, será mostrado o passo a passo de como executar o projeto e o
que cada linha de código faz.

# Baixando/Clonando o repositório

Para clonar o repositório, execute o seguinte comando:

```bash
git clone https://github.com/Redsway75/site-teste-bd.git
```

# Instalando as dependências

Após baixar ou clonar o repositório do projeto, em seu terminal, navegue
até a pasta do backend e do frontend através (crud-server e login-app) e
execute o seguinte comando em cada uma delas:

```bash
npm install
```

Isso irá baixar as dependências necessárias para o projeto seja executado

# Executando o projeto

Para executar o frontend (login-app), navegue até a respectiva pasta e
execute:

```bash
npm start
```

e para o backend (crud-app):

```bash
npm run dev
```

Estes comandos iniciarão os dois serviços essenciais para que funcione
a aplicação.

No momento, o repositório de sua aplicação irá ficar mais ou menos
parecido com esta estrutura:

site-teste-bd
|-- crud-server
| |-- /node_modules
| |-- /src
| |-- |'--> index.ts
| |-- ...
|-- login-app
| |-- /node_modules
| |-- /public
| |-- /src
| |-- |'--> /components
| |-- |'--> /css
| |-- |'--> /img
| |-- ...
| |-- App.tsx
| |-- ...
|-- README.md

# Como a aplicação funciona?

Como dito anteriormente, a aplicação é separada em microsserviços que
funcionam de forma "independente". A parte mais básica da aplicação é
o frontend que é a parte mais visual e atrativa para o usuário. Nela,
além da interface no qual o usuário interage, há dois campos que
esperam receber "email" e "senha". Assim que o usuário submeter, o
frontend irá encaminhar a requisição para o servidor backend e este,
será responsável por fazer a integração entre o frontend (a página que
o usuário interage) e o banco de dados.

# Frontend - como funciona?

O frontend foi construido utilizando a framework reactstrap e linguagem
typescript e os principais arquivos que são importantes para aplicação
são o App.tsx, arquivo que renderiza a página e importa componentes
como o css ou outros componentes; /components/forms.tsx que é um
componente que é importado no arquivo de execução da aplicação (App.tsx)
e /css/... que é uma pasta de arquivos de estilização da página.

# Backend - como funciona?

O backend, neste contexto, é o microsserviço da aplicação que serve para
fazer a integração entre o banco de dados e a página do usuário. No caso,
o serviço é excutado pelo arquivo index.ts. Neste arquivo podemos constatar
que:

-As primeiras linhas importam os módulos necessários para o servidor,
incluindo o express, Request, Response, Pool e cors.

-Em seguida, uma instância do aplicativo Express é criada usando
const app = express(); O número da porta em que o servidor será
executado é definido como const port = 8000;.

-O middleware cors é configurado para permitir solicitações de
origem http://localhost:3000 do frontend. (Certifique-se de substituir essa
URL pela URL correta do seu servidor React).

-Uma instância do Pool é criada para se conectar ao banco de dados PostgreSQL.
Certifique-se de fornecer as informações corretas de conexão do seu
banco de dados, como nome de usuário, senha, host, banco de dados e porta.

-O middleware express.json() é usado para analisar o corpo das solicitações como JSON.

-Uma rota POST é definida em /api/data. Quando essa rota é acessada, o servidor executa uma função assíncrona que insere os dados recebidos no banco de dados e retorna o primeiro registro inserido.
Se ocorrer algum erro durante o processamento da rota, uma resposta de status 500 com uma mensagem de erro em JSON será enviada. Por fim, o servidor é iniciado na porta especificada e uma mensagem é exibida no console para indicar que o servidor está em execução.

Em resumo, o código fornecido configura um servidor Node.js usando o framework Express, conecta-se a um banco de dados PostgreSQL e fornece uma rota POST para inserir dados no banco de dados. Certifique-se de fornecer as informações corretas de conexão com o banco de dados e ajustar as rotas e lógica de acordo com as necessidades do seu projeto.
