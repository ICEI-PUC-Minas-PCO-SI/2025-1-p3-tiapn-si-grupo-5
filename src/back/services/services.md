# Services

Os services são responsáveis por implementar a lógica de negócio da aplicação. Eles centralizam operações como manipulação de dados, regras de validação, integrações com outros sistemas e acesso ao banco de dados, mantendo essas responsabilidades isoladas dos controllers e das rotas.

## Boas práticas

- **Centralização da lógica de negócio:** Toda regra de negócio deve estar nos services, nunca nos controllers.
- **Reutilização:** Services podem ser reutilizados por diferentes controllers.
- **Testabilidade:** Como não dependem de objetos HTTP, são facilmente testáveis.
- **Organização:** Cada service deve tratar de um domínio/recurso específico (ex: `UserService`, `TicketService`).

## Exemplo de uso

Um controller chama métodos do service para executar operações, e o service interage com o banco de dados ou outros sistemas.

Dessa forma, os services ajudam a manter o código desacoplado, modular e mais fácil de evoluir, separando claramente as responsabilidades dentro da aplicação.
