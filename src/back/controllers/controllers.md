# Controllers

Controllers são responsáveis por receber e processar as requisições feitas pelos clientes (por exemplo, via API REST). Eles atuam como intermediários entre as rotas e a lógica de negócio, organizando o fluxo de dados entre o frontend e o backend.

## Boas práticas

- **Sem lógica de negócio:** Controllers apenas orquestram chamadas de services e retornam respostas HTTP.
- **Sem uso direto de middlewares:** Controllers não utilizam middlewares diretamente; os middlewares são aplicados nas rotas, garantindo que os dados cheguem já processados e validados.
- **Responsabilidade única:** Cada controller deve tratar de um recurso/domínio específico.
- **Organização:** Controllers ficam na pasta `controllers/` e seguem padrão de nomenclatura, como `UserController.ts`, `TicketController.ts`.

## Exemplo de fluxo

1. Rota recebe a requisição.
2. Middlewares processam autenticação/validação (nas rotas, não nos controllers).
3. Controller recebe a requisição, chama o service e retorna a resposta.

Dessa forma, os controllers ajudam a manter o código organizado, separando a lógica de manipulação de requisições da lógica de negócio e do acesso ao banco de dados.
