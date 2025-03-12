# Especificação do projeto

<span style="color:red">Pré-requisitos: <a href="01-Contexto.md"> Documentação de contexto</a></span>

Definição do problema e ideia de solução a partir da perspectiva do usuário. É composta pela definição do  diagrama de personas, histórias de usuários, requisitos funcionais e não funcionais além das restrições do projeto.

Apresente uma visão geral do que será abordado nesta parte do documento, enumerando as técnicas e/ou ferramentas utilizadas para realizar a especificações do projeto.

## Personas

Personas

Carlos, o Cliente:

Idade: 35 anos

Profissão: Servidor Público

Necessidades: Um sistema intuitivo para abrir e acompanhar chamados técnicos.

Frustrações: Falta de atualizações rápidas sobre o status dos chamados.


Mariana, a Analista:

Idade: 28 anos

Profissão: Analista de TI

Necessidades: Ferramentas para gerenciar e responder chamados eficientemente.

Frustrações: Volume excessivo de chamados sem um sistema de priorização adequado.


Roberto, o Gestor:

Idade: 45 anos

Profissão: Gerente de suporte

Necessidades: Monitoramento da equipe e métricas sobre atendimentos.

Frustrações: Dificuldade em identificar gargalos e avaliar desempenho da equipe


Enumere e detalhe as personas da sua solução. Para tanto, baseie-se tanto nos documentos disponibilizados na disciplina e/ou nos seguintes links:

> **Links úteis**:
> - [Rock content](https://rockcontent.com/blog/personas/)
> - [Hotmart](https://blog.hotmart.com/pt-br/como-criar-persona-negocio/)
> - [O que é persona?](https://resultadosdigitais.com.br/blog/persona-o-que-e/)
> - [Persona x público-alvo](https://flammo.com.br/blog/persona-e-publico-alvo-qual-a-diferenca/)
> - [Mapa de empatia](https://resultadosdigitais.com.br/blog/mapa-da-empatia/)
> - [Mapa de stalkeholders](https://www.racecomunicacao.com.br/blog/como-fazer-o-mapeamento-de-stakeholders/)
>
Lembre-se que você deve ser enumerar e descrever precisamente e personalizada todos os clientes ideais que sua solução almeja.

## Histórias de usuários

Com base na análise das personas, foram identificadas as seguintes histórias de usuários:

|EU COMO... `PERSONA`        | QUERO/PRECISO ... `FUNCIONALIDADE`           |PARA ... `MOTIVO/VALOR`                    |
|----------------------------|----------------------------------------------|-------------------------------------------|
|Servidor Público            | Abrir e acompanhar chamados técnicos         | Resolver problemas rapidamente            |
|Analista de Suporte Técnico |Gerenciar e responder chamados rapidamente    | Resolver problemas sem atrasos            |
|Gerente de TI               | Obter métricas detalhadas sobre a equipe     | Melhorar a eficiência e tomada de decisão |
|Usuário Final               |Registrar problemas técnicos de forma simples | Solicitar suporte sem dificuldades        |


Histórias de Usuários

Cliente abre chamado:
Como cliente, quero poder abrir um chamado informando detalhes da minha solicitação para que o suporte possa resolvê-la rapidamente.

Analista gerencia chamados:
Como analista, quero visualizar e filtrar os chamados atribuídos a mim para gerenciar melhor meu tempo e prioridades.

Gestor acompanha desempenho:
Como gestor, quero acessar um dashboard com métricas dos chamados para tomar decisões estratégicas baseadas em dados.


> **Links úteis**:
> - [Histórias de usuários com exemplos e template](https://www.atlassian.com/br/agile/project-management/user-stories)
> - [Como escrever boas histórias de usuário (user stories)](https://medium.com/vertice/como-escrever-boas-users-stories-hist%C3%B3rias-de-usu%C3%A1rios-b29c75043fac)
> - [User stories: requisitos que humanos entendem](https://www.luiztools.com.br/post/user-stories-descricao-de-requisitos-que-humanos-entendem/)
> - [Histórias de usuários: mais exemplos](https://www.reqview.com/doc/user-stories-example.html)
> - [9 common user story mistakes](https://airfocus.com/blog/user-story-mistakes/)

## Requisitos

As tabelas a seguir apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto. Para determinar a prioridade dos requisitos, aplique uma técnica de priorização e detalhe como essa técnica foi aplicada.

### Requisitos funcionais

|ID    | Descrição do Requisito  | Prioridade |
|------|-----------------------------------------|----|
|RF-001| O sistema deve permitir que clientes realizem cadastro informando nome, matrícula, e-mail e gerência. | 🔴 ALTA | 
|RF-002| O sistema deve permitir que clientes abram chamados informando: assunto, descrição, tipo de demanda e prioridade. O sistema deve gerar automaticamente um número de protocolo. | 🔴 ALTA |
|RF-003| O cliente deve visualizar seus chamados em uma tela dedicada, acompanhando o status da demanda (ex.: aberto, em análise, resolvido). | 🔴 ALTA |
|RF-004| O cliente deve poder enviar mensagens dentro do chamado após sua abertura, permitindo comunicação contínua com o analista. | 🟠 MÉDIA |
|RF-005| O analista deve visualizar todos os chamados em aberto e filtrá-los conforme necessidade. | 🔴 ALTA |
|RF-006| O analista deve poder atribuir um chamado a si mesmo, movendo-o para sua fila de atendimento. | 🔴 ALTA |
|RF-007| O analista deve poder enviar mensagens no chamado e alterar o status da demanda, mantendo o fluxo do atendimento. | 🔴 ALTA |
|RF-008| O gestor deve ser um perfil pré-determinado, responsável por cadastrar e gerenciar os perfis dos analistas e visualizar todos os usuários do sistema. | 🟠 MÉDIA |
|RF-009| O gestor deve poder configurar os parâmetros do sistema, como status das demandas, níveis de prioridade e gerências. | 🟠 MÉDIA |
|RF-010| O gestor deve ter acesso a um dashboard gerencial, exibindo métricas sobre chamados atendidos, chamados em aberto e desempenho dos analistas. | 🟠 MÉDIA |
|RF-011| O sistema deve permitir anexar arquivos nos chamados, possibilitando o envio de documentos e imagens para complementar as solicitações. | 🟢 BAIXA |
|RF-012| O sistema deve notificar clientes e analistas sobre atualizações no chamado, como mudanças de status ou novas mensagens. | 🟢 BAIXA |


### Requisitos não funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF-001| O sistema deve ser desenvolvido utilizando Node.js no backend e React no frontend, garantindo modularidade e escalabilidade. | 🔴 ALTA | 
|RNF-002| O banco de dados deve utilizar MySQL, com estrutura relacional para garantir integridade e eficiência nas consultas. | 🔴 ALTA | 
|RNF-003| O tempo médio de resposta para operações comuns (cadastro de chamados, atualizações, visualizações) deve ser inferior a 2 segundos. | 🟢 BAIXA | 

## Restrições

O projeto está restrito aos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|001| O sistema não deve depender de serviços pagos para rodar, priorizando ferramentas open-source e opções gratuitas na nuvem para hospedagem e banco de dados. |
|002| Os clientes, os analistas e o gestor não podem excluir chamados, apenas alterá-los ou arquivá-los, garantindo rastreabilidade. |
|003| As funcionalidades do sistema devem estar alinhadas apenas ao escopo da ASTIN, não sendo projetadas para um helpdesk genérico. |
|004| O tempo de desenvolvimento do projeto deve respeitar o prazo da disciplina Trabalho Interdisciplinar: Aplicações para Processos de Negócios da PUC Minas, com entrega final na última sprint. |

## Diagrama de casos de uso

O diagrama de casos de uso abaixo descreve o sistema apresentado e seus três atores principais: **Cliente**, **Analista** e **Gestor**: 

![Diagrama de casos de uso](images/diagrama-de-casos-de-uso.png)

- O **Cliente** pode realizar ações como Cadastrar-se no sistema, Abrir chamado, Acompanhar status do chamado e Responder comentários. 
- O **Analista** tem a capacidade de Visualizar Chamados Abertos, Pegar um chamado para atender, Atualizar status do chamado e Responder ao cliente. 
- O **Gestor** pode Gerenciar cadastro de analistas, Visualizar dashboard e Configurar parâmetros. 
