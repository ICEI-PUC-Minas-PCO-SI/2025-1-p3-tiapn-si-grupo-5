### 3.3.1 Processo 1 – FLUXO DE ATENDIMENTO DE DEMANDAS

_O diagrama abaixo descreve o fluxo atual desses atendimentos. Ao decorrer da análise, iremos expor como um sistema automatizado que integra todas as funcionalidades em um único local poderia melhorar a eficiência dos processos._
 
![Modelo AS IS](../images/modelagem-as-is-processo1.jpeg "Modelo BPMN AS IS do Processo 1.")

#### Detalhamento das atividades no modelo AS IS

Atualmente, o processo de atendimento a demandas ocorre de forma manual, onde utiliza-se um e-mail institucional próprio onde chegam as demandas dos usuários e uma planilha de Excel (chamada internamente de _PDU_) para registrar e acompanhar as solicitações. Essa abordagem resulta em ineficiências, retrabalho e dificuldades no monitoramento das demandas.

O fluxo envolve três atores principais:

- **Usuário (Solicitante)**: Envia a solicitação para o email da ASTIN.

- **Analista de Atendimento**: Recebe, registra e analisa a solicitação.

- **Gestor**: Supervisiona o andamento das solicitações e intervém quando necessário.

#### Fluxo do Processo

**Envio da solicitação**
O usuário envia um email para a caixa de entrada da ASTIN. Não existe uma padronização nessas solicitações que chegam por email, algumas chegam sem assunto, outras chegam mal explicadas e outras são enviadas por engano pois o usuário não sabe direito o setor responsável por realizar determinado processo.

**Visualização da solicitação e cadastro no PDU**
O analista verifica na caixa de email que chegou uma nova solicitação. A partir disto, ele abre a planilha de Excel (_PDU_) e cadastra a demanda nesta planilha. Os principais campos da planilha utilizados para o registro de uma nova solicitação são: Nome do solicitante, tipo da demanda, prioridade e data da solicitação. Como as informações do solicitante não possuem padrão, o preenchimento de uma nova demanda na planilha pode ser feito com inconsistências. Diante disso, após o preenchimento dos campos da planilha, é gerado automaticamente um número de protocolo sequencial para controle interno das demandas, além de uma reposta pronta para mandar para o soliciante. Essa resposta pronta depende do tipo de informações preenchidas nos campos da planilha. Por exemplo, caso for uma demanda para solucionar problema X, têm-se uma resposta específica, para Y, têm-se outra.










**Nome da atividade 1**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| [Nome do campo] | [tipo de dados]  |                |                   |
| ***Exemplo:***  |                  |                |                   |
| login           | Caixa de Texto   | formato de e-mail |                |
| senha           | Caixa de Texto   | mínimo de 8 caracteres |           |

| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                            | ---               |
| [Nome do botão/link] | Atividade/processo de destino  | (default/cancel/  ) |
| ***Exemplo:***       |                                |                   |
| entrar               | Fim do Processo 1              | default           |
| cadastrar            | Início do proceso de cadastro  |                   |


**Nome da atividade 2**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| [Nome do campo] | [tipo de dados]  |                |                   |
|                 |                  |                |                   |

| **Comandos**         |  **Destino**                   | **Tipo**          |
| ---                  | ---                            | ---               |
| [Nome do botão/link] | Atividade/processo de destino  | (default/cancel/  ) |
|                      |                                |                   |
