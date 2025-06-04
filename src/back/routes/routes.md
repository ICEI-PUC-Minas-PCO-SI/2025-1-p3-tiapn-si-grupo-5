# Rotas

As rotas do projeto seguem o padrão RESTful, agrupadas por recurso e utilizando prefixos claros para cada domínio. Isso facilita a manutenção, entendimento e expansão da API.

## Organização das Rotas

- **Agrupamento por recurso:** Cada conjunto de rotas está relacionado a um recurso do sistema (ex: usuários, departamentos, tipos de chamados).
- **Prefixos padronizados:** Os endpoints seguem o padrão `/resource` ou `/resource/:id` para operações sobre coleções e itens individuais.
- **Nomenclatura em inglês:** Os arquivos de rotas utilizam nomes em inglês e padrão camel-case, por exemplo: `userRoutes.ts`, `ticketTypeRoutes.ts`.
- **Separação de domínios:** Não há mistura de rotas de diferentes domínios na raiz (`/`). Cada recurso possui seu próprio prefixo.

### Exemplos de Endpoints

- `/users` - Operações relacionadas a usuários
- `/departments` - Operações relacionadas a departamentos
- `/ticket-types` - Operações relacionadas a tipos de chamados
- `/statuses` - Operações relacionadas a status de chamados

Dessa forma, as rotas ajudam a estruturar a API, facilitando o entendimento, manutenção e expansão dos pontos de acesso da aplicação.
