### 3.3.2 Processo 2 – FLUXO DE RELATORIOS INTERNOS
O diagrama abaixo motra o fluxo atual da produção de relatórios, logo após será mostrado como um sistema automatizado, centralizando as funcionalidades, pode aprimorar a eficiência dos processos.
![Modelo AS IS](../images/relatorios-ASTIN.png "Modelo BPMN AS IS do Processo 2.")

Detalhamento das atividades no modelo AS IS

Atualmente, a geração dos relatórios ocorre de forma manual, na qual o analista possuem algumas informações previamente definidas dos relatórios de cada gerente e ir manualmente no banco de dados inserir as tabelas e os dados necessários, analisar os dados retornados, tratar os dados para que eles sejam passados para uma planilha Excel e aí sim enviados manualmente para todos os gerentes interessados em cada relatório.Essa abordagem resulta em ineficiência, retrabalho, grande risco de conflinto de informações e dificuldades para atender todas as solicitações.

O fluxo envolve dois atores principais:

Gerentes (Solicitante): Recebe os relatórios mensalmente.

Analista de Atendimento: Recebe a solicitação e gera o relatório.

Fluxo do Processo
Informações dos Relatórios
As informações dos relatórios já são pré-definidas pelos gerentes, podendo haver ou não alteração, no qual caso haja, o gerente solicitante deve enviar un email para para a caixa de entrada da ASTIN e informá-los dessa alteração. A maior problema disso é que caso a troca de informações sobre essa alteração não seja clara e objetiva, haverá um desgaste tanto por parte do analista, por ter que refazer todos os processos novamente. quanto do gerente que fez a solicitação por receber um relatório incompleto e ter que aguardar por mais tempo até que um novo seja gerado.
Análise das Informações
O analista terá que analisar todas as informações solicitadas no relatório para que assim ele saiba quais tabelas, colunas e dados ele terá que buscar no banco para que ele consiga obter os dados necessários. Como essa análise é feita de forma manual, erros de interpretação ou mesmo de buscas no banco podem ocorrer, tornando um processo cansativo e necessário de alta cautela para minimizar os possíveis erros.
Acesso ao Banco de Dados
Após a análise das informações, o analista acessa o Banco de Dados e realiza manualmente todas as consultas necessárias, informando quais tabelas, períodos e dados específicos serão necessários, para assim obter os dados que serão utilizados no relatório. 
Análise dos Dados Retornados
Após feitas todas consultas necessárias, o analista precisa realizar uma análise dos dados que possuem e ver se eles são o que se esperava para que possam ser adicionados nos relatórios. Caso ele entenda que os dados retornados não são os dados que ele precisa, ele terá que refazer todo o processo de análise novamente e posteriormente todos os processos de consulta até que os dados obtidos sejam os que ele precisa ter para o gerar o seu relatório.
Tratamento dos Dados
Após o analista ter a confirmação de que os dados retornados estão corretos para o relatório, ele faz o tratamento manual desses dados passando-os para uma tabela em Excel e posteriormente enviá-los ao gerente solicitante. O problema disso é que se torna um trabalho redundante e de desgaste, tomando uma grande parte do tempo do analista em um processo que não deveria demorar tanto.
Envio do Relatório
Após concluído todos os processos anteriores, o analista envia por email o relatório gerado para o gerente e fica no aguardo de uma resposta do mesmo.
Análise do Gerente
Antes do gerente analisar o relatório em si, ele precisa analisar as informações que estão contidas nele, quando as informações são as que se eram esperadas, o gerente fornece um feedback positivo ao analista e assim a solicitação se encerra, caso contrário, ele envia um novo email com as informações que precisam ser alteradas, adicionadas ou excluídas, e assim o analista volta para o primeiro processo, Análise das Informações.
