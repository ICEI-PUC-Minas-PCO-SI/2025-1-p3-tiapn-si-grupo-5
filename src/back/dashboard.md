# Dashboard API

Esta estrutura foi criada para fornecer dados otimizados para o dashboard do sistema TrackIT, permitindo consultas rápidas e filtradas de chamados por diferentes critérios.

## Endpoints

Todos os endpoints aceitam parâmetros via query string.

- **Por Tipo de Demanda**
  - `GET /dashboard/tickets-by-type?idTipoChamado=1`
  - Retorna todos os chamados do tipo informado.

- **Por Status**
  - `GET /dashboard/tickets-by-status?idStatus=2`
  - Retorna todos os chamados com o status informado.

- **Por Prioridade**
  - `GET /dashboard/tickets-by-priority?idPrioridade=3`
  - Retorna todos os chamados com a prioridade informada.

- **Por Analista**
  - `GET /dashboard/tickets-by-analyst?idAnalista=5`
  - Retorna todos os chamados atribuídos ao analista informado.

## Organização

- **Controllers:** `dashboardController.ts` — Recebe as requisições e chama o service.
- **Services:** `dashboardService.ts` — Executa as queries otimizadas no banco.
- **Routes:** `dashboardRoutes.ts` — Define os endpoints RESTful.
- **Registro:** As rotas são adicionadas ao app principal em `app.ts`.

## Performance

- As queries usam índices e filtros diretos, retornando apenas os chamados necessários.
- O frontend pode consumir os dados de forma simples, apenas passando o parâmetro desejado.
- Caso precise de agregações (contagem, agrupamento), pode-se expandir o service para retornar dados já agrupados.

## Exemplo de uso

```http
GET /dashboard/tickets-by-type?idTipoChamado=2
```

Resposta:
```json
[
  {
    "idChamado": 1,
    "protocolo": "00000124",
    "assunto": "Problema X",
    ...
  },
  ...
]
```

## Expansão

- Para novos filtros, basta adicionar métodos ao `DashboardService` e endpoints ao controller/route.
- Para agregações (ex: contagem por status), pode-se criar endpoints como `/dashboard/count-by-status`.

---
