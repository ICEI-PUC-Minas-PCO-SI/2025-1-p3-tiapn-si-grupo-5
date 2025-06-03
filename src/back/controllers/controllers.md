# Controllers

São responsáveis por receber e processar as requisições feitas pelos clientes (por exemplo, via API REST). Eles atuam como intermediários entre as rotas e a lógica de negócio, organizando o fluxo de dados entre o frontend e o backend.

Na prática, os controllers deverão ser usados para:
- Receber e validar dados enviados nas requisições.
- Chamar os serviços ou modelos apropriados para manipular os dados.
- Retornar respostas adequadas ao cliente, como dados solicitados ou mensagens de erro.

Dessa forma, os controllers ajudam a manter o código organizado, separando a lógica de manipulação de requisições da lógica de negócio e do acesso ao banco de dados.
