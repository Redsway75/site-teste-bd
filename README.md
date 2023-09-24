# site-teste-bd (^_^.)

Este é um projeto de página que registra em um database postgres, os dados
submetidos pelo usuário (email e senha).

Este projeto contém um backend (crud-server) e um frontend (login-app)
dentro da pasta site-teste-bd. O backend é responsável por fornecer
operações CRUD (Create, Read, Update, Delete) para uma aplicação
enquanto o frontend é uma aplicação de login simples.

A seguir, será mostrado o passo a passo de como executar o projeto e o
que cada linha de código faz.

## Baixando/Clonando o repositório

Para clonar o repositório, execute o seguinte comando:

```bash
git clone https://github.com/Redsway75/site-teste-bd.git
```

## Instalando as dependências

Após baixar ou clonar o repositório do projeto, em seu terminal, navegue
até a pasta do backend e do frontend através (crud-server e login-app) e
execute o seguinte comando em cada uma delas:

```bash
npm install
```

Isso irá baixar as dependências necessárias para o projeto seja executado

## Executando o projeto

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

<!-- tree.md -->
```plaintext
site-teste-bd
├── crud-server
│   ├── /node_modules
│   ├── /src
│   │   └── index.ts
│   └── ...
├── login-app
│   ├── /node_modules
│   ├── /public
│   ├── /src
│   │   ├── /components
│   │   ├── /css
│   │   └── /img
│   └── ...
└── README.md
```

## Como a aplicação funciona?

Como dito anteriormente, a aplicação é separada em microsserviços que
funcionam de forma "independente". A parte mais básica da aplicação é
o frontend que é a parte mais visual e atrativa para o usuário. Nela,
além da interface no qual o usuário interage, há dois campos que
esperam receber "email" e "senha". Assim que o usuário submeter, o
frontend irá encaminhar a requisição para o servidor backend e este,
será responsável por fazer a integração entre o frontend (a página que
o usuário interage) e o banco de dados.

## Frontend - como funciona?

O frontend foi construído utilizando a framework reactstrap e a linguagem
TypeScript. Os principais arquivos que são importantes para a aplicação
são:
- App.tsx: arquivo que renderiza a página e importa componentes como o CSS ou outros componentes.
- /components/forms.tsx: um componente que é importado no arquivo de execução da aplicação(App.tsx).
- /css/...: uma pasta de arquivos de estilização da página.

Outros arquivos estarão presentes no diretório, porém são apenas dependências e arquivos de configuração da framework e da linguagem que você estiver usando.

## Backend - como funciona?

O backend, neste contexto, é o microsserviço da aplicação que serve para fazer a integração entre o banco de dados e a página do usuário. No caso, o serviço é executado pelo arquivo `index.ts`. Neste arquivo podemos constatar que:

- As primeiras linhas importam os módulos necessários para o servidor, incluindo o `express`, `Request`, `Response`, `Pool` e `cors`.

- Em seguida, uma instância do aplicativo Express é criada usando:
  ```typescript
  const app = express();
  ```
  O número da porta em que o servidor será executado é definido como:
  ```javascript
  const port = 8000;
  ```

- O middleware `cors` é configurado para permitir solicitações de origem `http://localhost:3000` do frontend. Certifique-se de substituir essa URL pela URL correta do seu servidor React. É ele que permite que duas aplicações estejam autorizadas para comunicar-se entre si.

- Uma instância do `Pool` é criada para se conectar ao banco de dados PostgreSQL. Certifique-se de fornecer as informações corretas de conexão do seu banco de dados, como nome de usuário, senha, host, banco de dados e porta.
```typescript
const pool = new Pool({
  user: "seu_usuario",
  host: "localhost",
  database: "nome_do_seu_database",
  password: "senha_de_seu_database",
  port: 5432,
});
```

- O middleware `express.json()` é usado para analisar o corpo das solicitações como JSON.

- Uma rota POST é definida em `/api/data`. Quando essa rota é acessada, o servidor executa uma função assíncrona que insere os dados recebidos no banco de dados e retorna o primeiro registro inserido. Se ocorrer algum erro durante o processamento da rota, uma resposta de status 500 com uma mensagem de erro em JSON será enviada.
```typescript
app.post("/api/data", async (req: Request, res: Response) => {
  try {
    const { email, senha } = req.body;

    const result = await pool.query(
      "INSERT INTO usuario (email, senha) VALUES ($1, $2) RETURNING *",
      [email, senha]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao acessar o banco de dados" });
  }
});
```

- Por fim, o servidor é iniciado na porta especificada e uma mensagem é exibida no console para indicar que o servidor está em execução.
```typescript
app.listen(port, () => {
  console.log(`Servidor em execução na porta ${port}`);
});
```

Em resumo, o código fornecido configura um servidor Node.js usando o framework Express, conecta-se a um banco de dados PostgreSQL e fornece uma rota POST para inserir dados no banco de dados. Certifique-se de fornecer as informações corretas de conexão com o banco de dados e ajustar as rotas e lógica de acordo com as necessidades do seu projeto.

Fique a vontade para usar este projeto para estudos, fazer futuras alterações e até mesmo melhora-lo ('・ω・')
