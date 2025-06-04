# Middlewares

Os middlewares são funções intermediárias que processam as requisições antes que elas cheguem aos controllers ou após a resposta ser enviada. Eles permitem adicionar funcionalidades reutilizáveis e centralizadas, como autenticação, validação, tratamento de erros, logging, entre outros.

## Boas práticas

- **Centralização:** Todos os middlewares ficam na pasta `middlewares/`.
- **Responsabilidade única:** Cada middleware trata de uma única responsabilidade (ex: autenticação, validação, logging).
- **Nomenclatura padronizada:** Use nomes descritivos e padrão kebab-case, como `auth-jwt.ts`, `error-handler.ts`, `validate-payload.ts`.
- **Reutilização:** Middlewares podem ser aplicados em múltiplas rotas ou globalmente.

## Exemplos de middlewares

- `auth-jwt.ts` — Autenticação JWT.
- `error-handler.ts` — Tratamento global de erros.
- `validate-payload.ts` — Validação de payloads de entrada.

Assim, os middlewares ajudam a manter o código modular, reutilizável e organizado, facilitando a manutenção e a implementação de regras transversais à aplicação.
