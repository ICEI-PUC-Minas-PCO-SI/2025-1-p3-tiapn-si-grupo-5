# API Layer - Visão Geral

A pasta `api/` centraliza todas as funções responsáveis por consumir a API RESTful do backend. Cada arquivo representa um domínio/recurso da aplicação (ex: usuários, tipos de chamados, status, etc.), facilitando a manutenção, reutilização e padronização das chamadas HTTP.

## Estrutura dos Arquivos

- **Users.ts**  
  Funções para registrar, autenticar, buscar, atualizar e alterar status de usuários.  
  Exemplo: `registerNewUser`, `loginUser`, `getAllUsers`, `updateUser`, etc.

- **UserTypes.ts**  
  Função para buscar todos os tipos de usuários disponíveis no sistema.

- **TicketType.ts**  
  Funções para buscar, criar, atualizar e deletar tipos de chamados.

- **Ticket.ts**  
  Função para abrir um novo chamado (ticket) no sistema.

- **Status.ts**  
  Função para buscar todos os status de chamados.

- **Management.ts**  
  Função para buscar todas as gerências/departamentos ativos.

- **Auth.ts**  
  Função para buscar os dados do usuário autenticado (`getMe`), utilizando o token JWT.

- **Dashboard.ts**  
  Funções para buscar chamados filtrados para o dashboard (por tipo, status, prioridade, analista).

## Boas Práticas

- **Responsabilidade única:** Cada arquivo trata apenas de um recurso/domínio.
- **Padronização:** Todas as funções retornam Promises e utilizam o padrão RESTful de endpoints.
- **Tipagem:** As funções são tipadas com TypeScript, garantindo segurança e previsibilidade.
- **Centralização da base URL:** Recomenda-se centralizar a base da URL da API em um arquivo de configuração para facilitar mudanças futuras.

## Exemplo de Uso

```typescript
import { getAllUsers, registerNewUser } from "@/api/users";

async function exemplo() {
  const users = await getAllUsers();
  await registerNewUser({ /* dados do usuário */ });
}
```

## Exemplo de Uso - Dashboard

```typescript
import { getTicketsByType, getTicketsByStatus, getTicketsByPriority, getTicketsByAnalyst } from "@/api/dashboard";

async function exemploDashboard() {
  const chamadosTipo = await getTicketsByType(1);
  const chamadosStatus = await getTicketsByStatus(2);
  const chamadosPrioridade = await getTicketsByPriority(3);
  const chamadosAnalista = await getTicketsByAnalyst(5);
}
```

## Observações

- Os componentes do frontend devem consumir apenas as funções da camada `api/`, nunca fazer fetch diretamente.
- Trate erros de API nos componentes para fornecer feedback ao usuário.
- Ajuste os endpoints conforme a evolução do backend.

