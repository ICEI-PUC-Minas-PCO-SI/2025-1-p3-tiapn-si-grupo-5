# Especificação do projeto

Nesse tópico abordaremos a definição do problema e da solução proposta para o projeto, a partir da perspectiva do usuário. Nesta seção, serão descritos:

**Personas:** Perfis fictícios que representam os usuários do sistema, com base em dados reais.

**Histórias de usuários:** Descrições curtas que detalham as necessidades e expectativas dos usuários em relação ao sistema.

**Requisitos funcionais e não funcionais:** Características e funcionalidades essenciais do sistema, além de requisitos relacionados à performance, segurança, etc.

<span style="color:red">Pré-requisitos: <a href="01-Contexto.md"> Documentação de contexto</a></span>

## Personas

Analisando o escopo do projeto, definimos as seguintes personas:

<div align="center">
  <img src="images/imagem-persona-1.png" alt="Imagem Persona 1" />
</div>


**Carlos, o Servidor:** Carlos tem 35 anos e é um servidor público da PBH que precisa abrir e acompanhar chamados técnicos relacionadoS a suas atividades nos sistemas de RH. Sua frustação é a falta de atualizações rápidas sobre o status dos chamados.

<div align="center">
  <img src="images/imagem-persona-2.png" alt="Imagem Persona 2" />
</div>

**Mariana, a Analista:** Mariana tem 28 anos e é uma analista de TI da ASTIN que precisa de ferramentas para gerenciar e responder chamados eficientemente. Sua frustração é o volume excessivo de chamados que chegam por e-mail sem um sistema de priorização e organização adequado.

<div align="center">
  <img src="images/imagem-persona-3.png" alt="Imagem Persona 3" />
</div>


**Roberto, o Gestor:** Roberto tem 45 anos e é gerente da ASTIN. Ele precisa monitorar sua equipe e obter métricas sobre os atendimentos. Sua frustração é a dificuldade em identificar gargalos e avaliar o desempenho da equipe.

## Histórias de usuários

Com base na análise das personas, foram identificadas as seguintes histórias de usuários:

|EU COMO... `PERSONA`        | QUERO/PRECISO ... `FUNCIONALIDADE`           |PARA ... `MOTIVO/VALOR`                    |
|----------------------------|----------------------------------------------|-------------------------------------------|
|**Servidor Público**           | Abrir e acompanhar chamados técnicos         | Resolver problemas dos sistemas de RH rapidamente            |
|**Analista de Suporte Técnico** |Organizar, filtrar e responder os chamados rapidamente    | Solucionar as demandas sem atrasos            |
|**Gerente de TI**               | Obter métricas detalhadas sobre a equipe     | Melhorar a eficiência e tomada de decisão |

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
