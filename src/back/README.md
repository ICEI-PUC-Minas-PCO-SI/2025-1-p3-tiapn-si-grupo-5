## Configurando o Back-End:

Para instalar as dependências do projeto automaticamente, basta rodar, no diretório `./src/back/`:

```bash
npm i
```

Crie um arquivo .env que contenha a variável DATABASE_URL, ela será lida pelo Prisma e estabelecerá a conexçao com o banco, conteúdo do .env na raiz do projeto:

````bash
DATABASE_URL="mysql://[seu usuário do MySQL]:[sua senha do MySQL, evite caracteres especiais]@localhost:3306/db_trackit?schema=public"```

Gerar os objetos do Prisma:

```bash
npx prisma generate
````

- Caso ele não crie o arquivo .env, você deverá ser criado.

### Estrutura de pastas

back/  
├── controllers/ # Lógica de controle das rotas  
├── generated/ # Arquivos gerados pelo Prisma  
├── middlewares/ # Middlewares de autenticação e validação  
├── prisma/ # Arquivos de configuração do Prisma  
├── routes/ # Definição das rotas da API  
├── services/ # Lógica de negócio e integração com o banco  
├── tests/ # Arquivos de teste (Jest)  
├── utils/ # Funções utilitárias e auxiliares  
├── .env # Variáveis de ambiente  
├── app.ts # Arquivo principal da aplicação  
├── server.ts # Inicialização do servidor  
└── README.md # Documentação

## Explicando sobre as dependências

### Express

O [Express](https://expressjs.com/) é um framework web para Node.js, utilizado para criar a API REST do TrackIT. Ele oferece recursos para lidar com rotas, requisições, respostas e middleware. A estrutura inicial é apenas para teste e demonstrativo, as implementações devem modificá-las de acordo com a necessidade.

### Prisma

O [Prisma](https://www.prisma.io/docs) é um ORM (Object-Relational Mapping) utilizado para interagir com o banco de dados. Ele facilita a manipulação das tabelas usando modelos definidos no arquivo `schema.prisma`. As operações e maiores detalhes podem ser lidas na documentação, no `app.ts` tem um pequeno demonstrativo. O Prisma já está totalmente configurado com a estrutura do banco de dados presente em `src/db/createDBbtrackIT`.

### Jest

O [Jest](https://jestjs.io/pt-BR/docs/getting-started) é um framework de testes para JavaScript e TypeScript, utilizado para garantir a qualidade do código. Os testes são criados na pasta tests/ e seguem a convenção de arquivo `*.test.ts`.

### Rodar a aplicação:

Execute o comando, isso com a aplicação de demonstração que foi desenvolvida:

```bash
npm run start
```

## Guia de Desenvolvimento - Back-End

### Boas Práticas

- Utilize a estrutura do Express para modularização das rotas, controllers e middlewares.
- Use o Prisma para assegurar consistência na manipulação dos dados.
- Implemente testes unitários e de integração com o Jest.
- Documente cada endpoint e lógica de negócio.

### Estrutura de Código

- Organize o código separando controllers, middlewares, serviços e utilitários.
- Utilize TypeScript para tipagem forte e melhor manutenibilidade.
- Implemente tratamento de erros centralizado com middlewares.

### Testes e Debug

- Utilize o Jest para criar testes que garantam a confiabilidade dos endpoints.
- Rode testes com `npm run test` sempre que alterar lógicas críticas.
- Configure logs para facilitar a identificação e solução de problemas.

### Versionamento e Pull Requests

- Faça commits com mensagens claras e significativas.
- Use branches de feature para desenvolvimento e realize code reviews antes do merge.
- Mantenha a branch principal protegida.
