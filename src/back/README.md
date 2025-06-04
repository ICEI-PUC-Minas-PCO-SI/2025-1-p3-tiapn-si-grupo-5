# Visão Geral do Back-End

Este projeto implementa o back-end da aplicação TrackIT utilizando Node.js, Express, TypeScript e Prisma ORM. O objetivo é fornecer uma API RESTful organizada, escalável e de fácil manutenção, seguindo boas práticas de arquitetura e desenvolvimento.

## Instalação

No diretório `./src/back/`, execute:

```bash
npm install
```

## Configuração do Prisma ORM

1. **Variáveis de Ambiente:**  
   Crie um arquivo `.env` na raiz do projeto com a variável `DATABASE_URL` para conexão com o banco de dados e uma `PORT` para configurar a porta que o backend irá rodar. Exemplo:
   ```
   DATABASE_URL="mysql://[usuario]:[senha]@localhost:3306/db_trackit?schema=public"
   PORT=[porta de sua preferência]
   ```

2. **Gerar Cliente Prisma:**  
   Gere os arquivos necessários do Prisma com:
   ```bash
   npx prisma generate
   ```

3. **Migrações:**  
   Para atualizar o banco de dados, utilize:
   ```bash
   npx prisma migrate dev
   ```

## Funcionamento Geral

- **Estrutura Modular:**  
  O código está organizado em pastas para controllers, services, middlewares, rotas, utilitários e testes.
- **Controllers:** Recebem requisições e delegam a lógica para os services.
- **Services:** Centralizam a lógica de negócio e interagem com o banco via Prisma.
- **Middlewares:** Realizam autenticação, validação e tratamento de erros.
- **Rotas:** Seguem padrão RESTful, agrupadas por recurso.

### Inicialização

Para rodar a aplicação:

```bash
npm run dev
```

O servidor estará disponível em `http://localhost:3000` (ou porta definida em `PORT`).

## Script para Usuário Padrão

Existe um script para criar um usuário padrão no banco de dados, útil para testes iniciais ou acesso administrativo:

- **Arquivo:** `src/back/scripts/createDefaultUser.ts`
- **Como executar:**  
  No diretório `src/back`, rode:
  ```bash
  npx ts-node scripts/createDefaultUser.ts
  ```
- O usuário criado terá senha `Trackit123` (já hasheada), e você pode ajustar os dados no próprio script conforme necessário.

## Testes de API

Você pode testar os endpoints utilizando ferramentas como **Postman** ou **Insomnia**.  
Basta importar as rotas e realizar requisições HTTP conforme a documentação das rotas.


## Testes Automatizados

- Os testes unitários e de integração estão localizados na pasta `tests/`.
- Execute todos os testes com:
  ```bash
  npm run test
  ```

## Estrutura de Pastas

back/  
├── controllers/ # Lógica de controle das rotas  
├── generated/ # Arquivos gerados pelo Prisma  
├── middlewares/ # Middlewares de autenticação e validação  
├── prisma/ # Arquivos de configuração do Prisma  
├── routes/ # Definição das rotas da API  
├── services/ # Lógica de negócio e integração com o banco  
├── tests/ # Arquivos de teste (Jest)  
├── utils/ # Funções utilitárias e auxiliares  
├── scripts/ # Scripts utilitários (ex: criação de usuário padrão)  
├── .env # Variáveis de ambiente  
├── app.ts # Arquivo principal da aplicação  
├── server.ts # Inicialização do servidor  
└── README.md # Documentação

## // TODO

- Documentação automática dos endpoints com Swagger/OpenAPI.
