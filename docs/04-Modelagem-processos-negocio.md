# Modelagem dos processos de negócio

<span style="color:red">Pré-requisitos: <a href="02-Especificacao.md"> Especificação do projeto</a></span>

> **Links úteis**:
> - [Modelagem de processos AS-IS x TO-BE](https://dheka.com.br/modelagem-as-is-to-be/)
> - [20 dicas práticas de modelagem de processos](https://dheka.com.br/20-dicas-praticas-de-modelagem-de-processos/)

## Modelagem da situação atual (Modelagem AS IS) PROCESSO 1

Atualmente, o processo do atendimento das demandas na ASTIN ocorre de maneira manual e descentralizada, sendo descrito por uma planilha de Excel para registro das solicitações e troca de mensagens por email para contato com o usuário solicitante. Esse processo gera ineficiências, retrabalho e dificuldades no acompanhamento das solicitações.

## Descrição geral da proposta (Modelagem TO BE) PROCESSO 1

Tendo identificado os gargalos dos modelos AS-IS, apresentem uma descrição da proposta de solução, buscando maior eficiência com a introdução da tecnologia. Abordem também os limites dessa solução e seu alinhamento com as estratégias e objetivos do contexto de negócio escolhido.

Cole aqui os modelos da solução proposta (modelo TO-BE), elaborados com o apoio da ferramenta baseada em BPMN utilizada na disciplina. Cada processo identificado deve ter seu modelo TO-BE específico. Descrevam as oportunidades de melhoria de cada processo da solução proposta.

Apresente aqui uma descrição da sua proposta, abordando seus limites e suas ligações com as estratégias e objetivos do negócio. Apresente também as oportunidades de melhoria.

## Modelagem da situação atual (Modelagem AS IS) PROCESSO 2


## Descrição geral da proposta (Modelagem TO BE) PROCESSO 2



## Modelagem dos processos

[PROCESSO 1 - Nome do processo](./processes/fluxo-atendimento-demandas.md "Detalhamento do processo 1.")

[PROCESSO 2 - Nome do processo](./processes/processo-2-nome-do-processo.md "Detalhamento do processo 2.")


## Indicadores de desempenho

Apresente aqui os principais indicadores de desempenho e algumas metas para o processo. Atenção: as informações necessárias para gerar os indicadores devem estar contempladas no diagrama de classe. Coloque no mínimo 5 indicadores.

Use o seguinte modelo:

| **Indicador** | **Objetivos** | **Descrição** | **Fonte de dados** | **Fórmula de cálculo** |
| ---           | ---           | ---           | ---             | ---             |
| Tempo médio de atendimento | Avaliar a eficiência no atendimento das demandas | Tempo médio entre a abertura da solicitação e a resolução | PDU (as is) / TrackIT (to be) | soma dos tempos de atendimento / número de atendimentos |
| Taxa de retrabalho               | Identificar ineficiências ou falhas na primeira análise                      | Percentual de demandas que retornam para nova análise após resposta inicial | Histórico de Atendimentos do email da ASTIN (as is) / TrackIT (to be) | (nº de demandas reabertas / nº total de demandas) * 100                  |
| Percentual de atendimentos resolvidos sem escalonamento | Avaliar a autonomia e capacidade da equipe técnica                          | Proporção de atendimentos resolvidos sem envolvimento do gestor          | PDU (as is) / TrackIT (to be)  | (nº de atendimentos sem escalonamento / nº total de atendimentos) * 100 |
| Taxa de chamados cancelados        | Identificar inconsistências ou erros na abertura de chamados                | Mede o percentual de solicitações que foram canceladas antes do atendimento    | PDU (as is) / TrackIT (to be)    | (nº de chamados cancelados / nº total de chamados abertos) * 100             |
| Taxa de chamados duplicados        | Avaliar falhas no envio de solicitações repetidas                           | Percentual de chamados identificados como duplicados                            | PDU (as is) / TrackIT (to be)    | (nº de chamados duplicados / nº total de chamados abertos) * 100             |