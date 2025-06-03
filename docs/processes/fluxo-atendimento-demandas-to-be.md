## 3.3.2 Processo 1 – TRACK IT

_O diagrama abaixo descreve o fluxo do sistema automatizado desses atendimentos, TRACK IT, integra todas as funcionalidades em um único local, afim  de melhorar a eficiência dos processos._
 
![Modelagem_TO_BE_Processo1](https://github.com/user-attachments/assets/950fcf9f-48df-499b-858c-92c7777396d8)

### Detalhamento das atividades no modelo TO BE 

No TRACK IT, o usuário acessa uma interface web segura e preenche um formulário padronizado contendo campos obrigatórios (assunto, descrição, tipo de demanda, prioridade e anexos). Ao submeter, o sistema valida automaticamente os dados, gera um número de protocolo único e registra o chamado no banco de dados. Em seguida, o analista recebe uma notificação em seu painel de trabalho, com triagem automática baseada em regras configuráveis (tipo de demanda, prioridade, área responsável). Toda a comunicação entre usuário e analista ocorre dentro do próprio chamado, por meio de comentários e anexos, mantendo o histórico centralizado. O gestor monitora o andamento pelos dashboards em tempo real, com indicadores de SLA, tempo médio de resolução e volume de demandas, e pode configurar regras de escalonamento automático para casos críticos. Ao resolver a demanda, o analista encerra o chamado no sistema, que envia ao solicitante um questionário de satisfação e registra métricas para relatórios gerenciais.

O fluxo envolve três atores principais:

- **Usuário (Solicitante)**: acessa o TRACK IT, preenche o formulário padronizado e acompanha o status do chamado em tempo real.

- **Analista de Atendimento**: recebe notificações, triageia automaticamente os chamados, interage via comentários no sistema e atualiza o status até a resolução.

- **Gestor**: configura parâmetros (prioridades, tipos de demanda, regras de escalonamento), monitora indicadores em dashboards e intervém quando necessário, com base em dados consolidados.

### Fluxo do Processo

**Abertura do chamado**

Usuário submete formulário padronizado no TRACK IT.

**Validação e registro**

Sistema valida campos, gera protocolo e armazena no banco de dados.

**Notificação ao analista**

Chamada é encaminhada ao painel do analista com triagem automática.

**Triagem inteligente**

O TRACK IT aplica regras de categorização e prioridade configuradas pelo gestor.

**Comunicação centralizada**

Analista e usuário trocam mensagens e anexos nos comentários do chamado.

**Atualização de status e alertas**

Sistema atualiza automaticamente o status e envia alertas de pendência ou SLA.

**Escalonamento automático**

Chamados críticos ou não atendidos no prazo são escalonados conforme regras definidas.

**Encerramento e feedback**

Analista fecha o chamado, usuário recebe pesquisa de satisfação e dados são consolidados em relatórios.

### Identificação de melhorias no Processo Futuro (TO BE)

**1. Padronização de entradas via formulário estruturado**

– O TRACK IT disponibiliza um formulário com campos obrigatórios e máscaras de entrada (datas, e‑mails, listas de seleção), garantindo que todos os dados necessários (assunto, descrição, tipo de demanda, prioridade) sejam coletados de forma uniforme. Isso elimina ambiguidades e reduz retrabalho decorrente de informações faltantes ou mal formatadas.

**2. Registro e triagem automáticos, eliminando o PDU manual**

– Ao submeter o formulário, o sistema valida e registra o chamado no banco de dados sem intervenção humana. Regras de negócio pré‑configuradas (por exemplo, “todas as demandas de acesso são direcionadas ao analista X”) fazem a triagem automática, distribuindo as tarefas de forma instantânea e correta, sem necessidade de abrir ou atualizar planilhas.

**3. Comunicação e histórico centralizados em cada chamado**

– Todas as interações entre usuário e analista ocorrem dentro do próprio registro do chamado, em um mural de comentários que aceita anexos. Isso consolida o histórico completo — inclusive respostas do gestor — em um único lugar, facilitando a rastreabilidade e evitando perdas de contexto ou trocas de e‑mail desencontradas.

**4. Monitoramento em tempo real com dashboards interativos**

– Usuários, analistas e gestores acessam dashboards customizados que exibem status dos chamados, contagens por prioridade, tempo médio de atendimento e alertas visuais para pendências. Filtros dinâmicos permitem explorar dados por período, tipo de demanda ou responsável, dando visibilidade imediata ao fluxo de trabalho.

**5. Escalonamento proativo e baseado em regras configuráveis**

– O gestor define SLAs e políticas de escalonamento (por exemplo, “se não houver resposta em 24 horas, escalar para gestor”). O sistema monitora esses prazos e, ao identificar violações, encaminha automaticamente o chamado para níveis superiores ou envia lembretes, garantindo que demandas críticas não fiquem paradas.

**6. Coleta de feedback do usuário ao final de cada atendimento**

– Após o fechamento do chamado, o TRACK IT envia automaticamente um breve formulário de satisfação ao solicitante, com perguntas de múltipla escolha e campo para comentários livres. Essas respostas são armazenadas e agregadas em relatórios de qualidade de serviço.

**7. Relatórios gerenciais detalhados para análise de desempenho**

– O sistema gera relatórios periódicos (diários, semanais, mensais) com métricas como tempo médio de resolução por analista, volume de chamados por tipo, taxa de satisfação e cumprimento de SLA. Esses relatórios podem ser exportados em PDF ou Excel e agendados para envio automático ao gestor.

**8. Redução drástica de retrabalho e loops de e‑mail**

– Com campos validados, histórico unificado e triagem automática, elimina‑se grande parte dos retornos para esclarecimentos e trocas repetitivas de mensagens. Isso acelera o ciclo de atendimento, diminui a sobrecarga dos analistas e melhora a experiência do usuário.

### Consequências dos ganhos identificados

- **Maior eficiência e agilidade no atendimento**
- **Diminuição de erros e inconsistências nos registros**
- **Transparência total do fluxo para usuários e gestores**
- **Melhoria na satisfação do usuário e cumprimento de SLA**
- **Decisões gerenciais embasadas em métricas precisas e atualizadas**