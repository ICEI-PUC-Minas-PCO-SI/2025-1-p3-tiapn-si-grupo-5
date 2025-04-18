## 3.3.1 Processo 1 – FLUXO DE ATENDIMENTO DE DEMANDAS

_O diagrama abaixo descreve o fluxo atual desses atendimentos. Ao decorrer da análise, iremos expor como um sistema automatizado que integra todas as funcionalidades em um único local poderia melhorar a eficiência dos processos._
 
![Modelo AS IS](../images/modelagem-as-is-processo1.jpeg "Modelo BPMN AS IS do Processo 1.")

### Detalhamento das atividades no modelo AS IS

Atualmente, o processo de atendimento a demandas ocorre de forma manual, onde utiliza-se um e-mail institucional próprio pelo qual chegam as demandas dos usuários e uma planilha de Excel (chamada internamente de _PDU_) para registrar e acompanhar as solicitações. Essa abordagem resulta em ineficiências, retrabalho e dificuldades no monitoramento das demandas.

O fluxo envolve três atores principais:

- **Usuário (Solicitante)**: Envia a solicitação para o email da ASTIN.

- **Analista de Atendimento**: Recebe, registra e analisa a solicitação.

- **Gestor**: Supervisiona o andamento das solicitações e intervém quando necessário.

### Fluxo do Processo

**Envio da solicitação**

O usuário envia um e-mail para a caixa de entrada da ASTIN. Não há padronização nessas solicitações: algumas chegam sem assunto, outras são mal explicadas e, em certos casos, o e-mail é enviado por engano, pois o usuário não sabe exatamente qual setor é responsável pelo atendimento ou processo solicitado.

**Visualização da solicitação e cadastro no PDU**

O analista identifica a chegada de uma nova solicitação na caixa de entrada e, em seguida, abre a planilha do Excel (_PDU_) para cadastrar a demanda. Os principais campos utilizados nesse registro são: nome do solicitante, tipo da demanda, prioridade e data da solicitação. Como as informações fornecidas pelo usuário não seguem um padrão, o preenchimento pode conter inconsistências.

**Geração de protocolo e resposta por e-mail**

Após preencher os campos da planilha, é gerado automaticamente um número de protocolo sequencial para controle interno das demandas. Com base nas informações registradas, o analista utiliza uma resposta pronta, que varia conforme o tipo da solicitação. Por exemplo, se a demanda estiver relacionada ao problema X, há uma resposta específica; se for sobre Y, aplica-se outra.

**Organização por tag de e-mail**

Para organizar o atendimento, o analista utiliza tags no e-mail, movendo a solicitação para a sua tag específica após o cadastro no _PDU_. Essas tags geralmente levam o nome do analista. Em alguns casos, são criadas subtags como "aguardando retorno" ou "resolvido" para controle interno da equipe de atendimento, embora não exista um padrão formal para isso.

**Envio do protocolo e primeira análise**

Após organizar a demanda com a tag, o analista responde ao solicitante com a mensagem pronta contendo o número do protocolo, seguida de uma primeira análise sobre a solicitação.

**Loop do atendimento**

Forma-se então um ciclo de atendimento: o usuário avalia se a primeira análise resolve sua demanda. Caso não resolva, ele responde ao e-mail com mais detalhes ou correções. O analista, por sua vez, realiza novas análises, que são reenviadas ao usuário, até que a demanda seja finalmente solucionada.

**Participação do gestor**

Em determinados casos, é necessária a intervenção do gestor, seja para articular entre áreas ou tratar questões mais sensíveis relacionadas às regras de negócio. Nesses momentos, o gestor intervém diretamente na demanda através do email, apontando suas considerações e orientações.

**Demanda solucionada**

Quando a resposta do analista (e, se houver, a intervenção do gestor) resolve a demanda do usuário, o atendimento é encerrado. Isso é feito por meio da alteração do status da solicitação no _PDU_, de "em aberto/aguardando análise" para "resolvido". Paralelamente, o gestor consegue visualizar métricas dos atendimentos por meio de um gráfico simples presente na planilha. Esse gráfico exibe a quantidade de demandas iniciadas e concluídas por cada analista, além dos tipos de demandas mais frequentes, servindo como um recurso básico para análise de desempenho.

### Identificação de Gargalos no Processo Atual (AS-IS)

**1. Falta de padronização nas solicitações dos usuários**

- Os e-mails chegam sem padrão de formato, assunto ou conteúdo, o que dificulta a triagem e o entendimento da demanda.
- Isso gera retrabalho para o analista, que precisa interpretar informações mal explicadas ou incompletas.

**2. Registro manual e suscetível a erros no PDU (planilha Excel)**

- O preenchimento da planilha é feito manualmente, com base em informações não padronizadas.
- Isso pode gerar inconsistências nos dados, dificultando o controle e rastreabilidade das demandas.
- Além disso, a planilha não oferece recursos avançados de validação ou automação.

**3. Respostas automáticas baseadas em preenchimento manual**

- As mensagens de resposta são dependentes da forma como os campos da planilha são preenchidos.
- Caso o analista preencha incorretamente ou de forma incompleta, a resposta automática pode ser inadequada ou até gerar mal-entendidos com o solicitante.

**4. Organização informal via tags de e-mail**

- O uso de tags para controle de demandas por e-mail é individual e sem padronização.
- Isso dificulta a colaboração entre analistas e a rastreabilidade por parte de gestores.
- Subtags criadas livremente como "aguardando retorno" ou "resolvido" não garantem visibilidade uniforme para a equipe.

**5. Processo de atendimento com muitos ciclos (loop de atendimento)**

- A ausência de formulários padronizados ou ferramentas de suporte ao analista leva a múltiplas trocas de e-mail para solucionar a demanda.
- Esse "loop" de ida e volta pode atrasar significativamente a resolução das demandas.
- A falta de histórico estruturado das interações dificulta o entendimento do progresso da solicitação. Muitos usuários respodem um retorno do analista encaminhando um novo email, tornando a rastreabilidade a demanda totalmente dificultada. Além disso, muitos também não utilizam a opção "Responder pra todos" quando há vários envolvidos no email, com isso, as áreas incluídas não visualizam o retorno, o que atrasa ainda mais o processo.

**6. Intervenção do gestor de forma não sistematizada**

- A participação do gestor ocorre de forma reativa, quando o analista percebe a necessidade.
- Não há um fluxo definido para escalonamento ou registro claro da intervenção, o que pode levar à perda de informações importantes e atrasos.

**7. Encerramento da demanda e acompanhamento pouco eficiente**

- O fechamento do atendimento é feito de forma manual, com alteração de status na planilha.
- O acompanhamento por parte da gestão é baseado em gráficos simples, limitando a análise detalhada de produtividade e tipos de demandas recorrentes.


### Consequências dos Gargalos Identificados

- **Atraso na resolução das demandas**
- **Retrabalho para analistas e usuários**
- **Baixa visibilidade e controle por parte da gestão**
- **Dificuldade na mensuração de desempenho**
- **Falta de escalabilidade do processo**


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

**8. Redução drástica de retrabalho e loops de e‑mai**

– Com campos validados, histórico unificado e triagem automática, elimina‑se grande parte dos retornos para esclarecimentos e trocas repetitivas de mensagens. Isso acelera o ciclo de atendimento, diminui a sobrecarga dos analistas e melhora a experiência do usuário.

### Consequências dos ganhos identificados

- **Maior eficiência e agilidade no atendimento**
- **Diminuição de erros e inconsistências nos registros**
- **Transparência total do fluxo para usuários e gestores**
- **Melhoria na satisfação do usuário e cumprimento de SLA**
- **Decisões gerenciais embasadas em métricas precisas e atualizadas**

##