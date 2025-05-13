## Configurando o Back-End:

Para instalar as dependências do projeto automaticamente, basta rodar, no diretório `./src/back/`:

```bash
npm i
```

Gerar os objetos do Prisma:

```bash
npx prisma generate
```

- Caso ele não crie o arquivo .env, você deverá ser criado.

### Estrutura de pastas

back/             
├── controllers/       # Lógica de controle das rotas              
├── generated/         # Arquivos gerados pelo Prisma  
├── middlewares/       # Middlewares de autenticação e validação  
├── prisma/            # Arquivos de configuração do Prisma  
├── routes/            # Definição das rotas da API  
├── services/          # Lógica de negócio e integração com o banco  
├── tests/             # Arquivos de teste (Jest)  
├── utils/             # Funções utilitárias e auxiliares  
├── .env               # Variáveis de ambiente  
├── app.ts             # Arquivo principal da aplicação  
├── server.ts          # Inicialização do servidor  
└── README.md          # Documentação  

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



