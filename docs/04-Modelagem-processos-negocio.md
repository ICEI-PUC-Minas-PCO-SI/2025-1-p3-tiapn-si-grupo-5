# Modelagem dos processos de negócio

<span style="color:red">Pré-requisitos: <a href="02-Especificacao.md"> Especificação do projeto</a></span>

> **Links úteis**:
> - [Modelagem de processos AS-IS x TO-BE](https://dheka.com.br/modelagem-as-is-to-be/)
> - [20 dicas práticas de modelagem de processos](https://dheka.com.br/20-dicas-praticas-de-modelagem-de-processos/)

## Modelagem da situação atual (Modelagem AS IS) PROCESSO 1

Atualmente, o processo do atendimento das demandas na ASTIN ocorre de maneira manual e descentralizada, sendo descrito por uma planilha de Excel para registro das solicitações e troca de mensagens por email para contato com o usuário solicitante. Esse processo gera ineficiências, retrabalho e dificuldades no acompanhamento das solicitações.

## Descrição geral da proposta (Modelagem TO BE) PROCESSO 1

Com a chegada do TRACK IT, o jeito de lidar com os pedidos na ASTIN vai mudar: tudo passará a ser feito automaticamente e reunido em um só lugar, numa plataforma online. Os próprios usuários cadastrados vão abrir seus pedidos ali, podendo ver o que está acontecendo com eles a qualquer momento. O trabalho vai seguir um padrão, com avisos automáticos e um registro de tudo que foi conversado, o que ajuda muito na comunicação entre o usuário e o pessoal técnico. Essa novidade vai diminuir a repetição de tarefas, acelerar o atendimento e permitir que os pedidos sejam controlados de forma mais inteligente, com telas de acompanhamento e relatórios.

## Modelagem da situação atual (Modelagem AS IS) PROCESSO 2

Hoje, na ASTIN, o processo de geração de relatórios é feito de forma manual e sem padronização, as informações necessárias para a geração são colhidas através de emails enviados pelo solicitante. O analista vai manualmente no Banco de Dados para realizar os processos necessários, depois manualmente passa os dados retornados para uma planilha Excel. Esse processo gera um alto volume de retrabalho, além de estar exposto a várias erros humanos.

## Descrição geral da proposta (Modelagem TO BE) PROCESSO 2

A TRACKIT têm como objetivo solucionar esse problema implementando uma de nossas aplicações: centralizando as informações e as trocas de mensagens entre o solicitante e o analista em um único local, além de automatizar a geração e o tratamento dos relatórios dentro da nossa própria plataforma. Com isso, diminuiremos o retrabalho, iremos melhorar a comunicação entre o solicitante e o técnico, aumentar a produtividade da equipe, além de minimizar os erros humanos.

## Modelagem dos processos

[PROCESSO 1 - Nome do processo](./processes/fluxo-atendimento-demandas.md "Detalhamento do processo 1.")

[PROCESSO 2 - Nome do processo](./processes/fluxo-de-relatorios.md "Detalhamento do processo 2.")


## Indicadores de desempenho

Apresente aqui os principais indicadores de desempenho e algumas metas para o processo. Atenção: as informações necessárias para gerar os indicadores devem estar contempladas no diagrama de classe. Coloque no mínimo 5 indicadores.

Use o seguinte modelo:

| **Indicador** | **Objetivos** | **Descrição** | **Fonte de dados** | **Fórmula de cálculo** |
| ---           | ---           | ---           | ---             | ---             |
| Tempo médio de atendimento | Avaliar a eficiência no atendimento das demandas | Tempo médio entre a abertura da solicitação e a resolução | PDU (as is) / TrackIT (to be) | soma dos tempos de atendimento / número de atendimentos |
| Taxa de retrabalho               | Identificar ineficiências ou falhas na primeira análise                      | Percentual de demandas que retornam para nova análise após resposta inicial | Histórico de Atendimentos do email da ASTIN (as is) / TrackIT (to be) | (nº de demandas reabertas / nº total de demandas) * 100                  |
| Percentual de atendimentos resolvidos sem escalonamento | Avaliar a autonomia e capacidade da equipe técnica                          | Proporção de atendimentos resolvidos sem envolvimento do gestor          | Histórico de Atendimentos do email da ASTIN (as is) / TrackIT (to be)  | (nº de atendimentos sem escalonamento / nº total de atendimentos) * 100 |
| Taxa de chamados cancelados        | Identificar inconsistências ou erros na abertura de chamados                | Mede o percentual de solicitações que foram canceladas antes do atendimento    | PDU (as is) / TrackIT (to be)    | (nº de chamados cancelados / nº total de chamados abertos) * 100             |
| Taxa de chamados duplicados        | Avaliar falhas no envio de solicitações repetidas                           | Percentual de chamados identificados como duplicados                            | PDU (as is) / TrackIT (to be)    | (nº de chamados duplicados / nº total de chamados abertos) * 100             |
