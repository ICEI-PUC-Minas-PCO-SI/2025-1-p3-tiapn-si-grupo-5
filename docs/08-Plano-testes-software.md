# Plano de testes de software

<span style="color:red">Pré-requisitos: <a href="02-Especificacao.md"> Especificação do projeto</a></span>, <a href="05-Projeto-interface.md"> Projeto de interface</a>


Não deixe de enumerar os casos de teste de forma sequencial e garantir que o(s) requisito(s) associado(s) a cada um deles esteja(m) correto(s) — de acordo com o que foi definido na <a href="02-Especificacao.md">Especificação do projeto</a>.

Por exemplo:

<br>

| **Caso de teste**  | **CT-001 – Efetuar cadastro**  |
|:---: |:---: |
| Requisito associado | RF-001 - A aplicação deve possuir opção de fazer cadastro, sendo necessário preencher campos: Nome completo, Matrícula, Ramal, Gerência, Email, Senha e Confirmar a senha |
| Objetivo do teste | Verificar se o usuário consegue realizar o cadastro. |
| Passos | - Acessar o navegador <br> - https://trackit-front.onrender.com <br> - Clicar no botão "Cadastrar-se" <br> - Preencher o campo nome <br> - Preencher o campo matrícula <br> - Preencher o campo ramal <br> - Preencher o campo gerência <br> - Preencher o campo email <br> - Preencher o campo senha <br> - Preencher o campo confirmar senha <br> - Clicar em "Cadastre-se" |
| Critério de êxito | - O cadastro foi realizado com sucesso. O usuário é redirecionado para a tela de login |
| Responsável pela elaboração do caso de teste | Eduardo Versiani de Melo Penna |

<br>

| **Caso de teste**  | **CT-002 – Efetuar login**  |
|:---: |:---: |
| Requisito associado | RF-001 - A aplicação deve possuir opção de fazer login, sendo necessário preencher os campos: Email e Senha. |
| Objetivo do teste | Verificar se o usuário consegue realizar login com email e senha válidos. |
| Passos | - Acessar o navegador <br> - https://trackit-front.onrender.com <br> - Possuir uma conta, caso necessário seguir o passo RF-001 <br> - Preencher o campo email <br> - Preencher o campo senha <br> - Clicar em "Login" |
| Critério de êxito | - O login é realizado com sucesso e o usuário é redirecionado para a página inicial do sistema. |
| Responsável pela elaboração do caso de teste | Eduardo Versiani de Melo Penna |

<br>

| **Caso de teste**  | **CT-003 – Recuperar a senha**  |
|:---: |:---: |
| Requisito associado | RF-002 - A aplicação deve permitir que o usuário recupere sua senha informando o e-mail cadastrado. |
| Objetivo do teste | Verificar se o usuário consegue recuperar e redefinir sua senha com sucesso. |
| Passos | - Acessar o navegador <br> - https://trackit-front.onrender.com <br> - Na tela de login, clicar no texto "Esqueceu a senha?" <br> - Preencher o campo de e-mail com o e-mail cadastrado <br> - Clicar em "Enviar verificação" <br> - Verificar o recebimento de uma mensagem de sucesso na tela <br> - Acessar o e-mail informado <br> - Clicar no link recebido para redefinir a senha <br> - Preencher e confirmar a nova senha <br> - Confirmar a redefinição <br> - Ser redirecionado para a tela de login |
| Critério de êxito | - O usuário recebe o e-mail de recuperação, consegue redefinir a senha e é redirecionado para a tela de login. |
| Responsável pela elaboração do caso de teste | Eduardo Versiani de Melo Penna |

<br>

| **Caso de teste**  | **CT-004 – Abrir chamado**  |
|:---: |:---: |
| Requisito associado | RF-003 - A aplicação deve permitir que o usuário, após logado, abra um chamado preenchendo os campos: Assunto da demanda, Prioridade da demanda, Tipo da demanda, Descrição da demanda e, opcionalmente, anexar arquivo. |
| Objetivo do teste | Verificar se o usuário consegue abrir um chamado preenchendo todos os campos obrigatórios e, se desejar, anexar um arquivo. |
| Passos | - Acessar o navegador <br> - https://trackit-front.onrender.com <br> - Realizar login com uma conta válida <br> - Na sidebar, clicar em "Abrir Chamado" <br> - Preencher o campo "Assunto da demanda" <br> - Selecionar a "Prioridade da demanda" <br> - Selecionar o "Tipo da demanda" <br> - Preencher o campo "Descrição da demanda" <br> - (Opcional) Anexar um arquivo <br> - Clicar em "Abrir chamado" |
| Critério de êxito | - O chamado é criado com sucesso e o usuário é redirecionado para a tela "Meus chamados". |
| Responsável pela elaboração do caso de teste | Eduardo Versiani de Melo Penna |

<br>

| **Caso de teste**  | **CT-005 – Visualizar meus chamados**  |
|:---: |:---: |
| Requisito associado | RF-004 - A aplicação deve permitir que o usuário visualize seus chamados, incluindo: número do protocolo, assunto, data de abertura, prioridade, status, analista responsável (se atribuído) e acesso ao chat ao vivo. |
| Objetivo do teste | Verificar se o usuário consegue visualizar todos os detalhes dos seus chamados e acessar o chat ao vivo com o analista/gestor. |
| Passos | - Acessar o navegador <br> - https://trackit-front.onrender.com <br> - Realizar login com uma conta válida <br> - Na sidebar, clicar em "Meus chamados" <br> - Verificar a lista de chamados exibidos <br> - Conferir se cada chamado mostra: número do protocolo, assunto, data de abertura, prioridade, status, analista responsável (caso atribuído) <br> - Clicar no botão de chat ao vivo de um chamado <br> - Ser redirecionado para a tela de chat com o analista e/ou gestor responsável |
| Critério de êxito | - Todos os detalhes dos chamados são exibidos corretamente. <br> - O botão de chat ao vivo redireciona para o chat correspondente ao chamado selecionado, além dos botões de filtro para facilitar a visualização. |
| Responsável pela elaboração do caso de teste | Eduardo Versiani de Melo Penna |

<br>

| **Caso de teste**  | **CT-006 – Chat do chamado**  |
|:---: |:---: |
| Requisito associado | RF-005 - A aplicação deve permitir que o usuário utilize o chat do chamado para enviar mensagens e anexos, visualizar a descrição original do chamado e receber mensagens/arquivos de analistas e/ou gestores. |
| Objetivo do teste | Verificar se o usuário consegue interagir no chat do chamado, enviando mensagens e arquivos, visualizando a descrição do chamado e recebendo mensagens/arquivos dos responsáveis. |
| Passos | - Acessar o navegador <br> - https://trackit-front.onrender.com <br> - Realizar login com uma conta válida <br> - Na sidebar, clicar em "Meus chamados" <br> - Selecionar um chamado e clicar no botão de chat ao vivo <br> - Visualizar a descrição original do chamado <br> - Digitar uma mensagem no campo de texto <br> - (Opcional) Anexar um arquivo à mensagem <br> - Enviar a mensagem <br> - Verificar se a mensagem e o arquivo aparecem no chat <br> - Verificar se mensagens e arquivos enviados por analistas e/ou gestores aparecem no chat em tempo real |
| Critério de êxito | - O usuário consegue visualizar a descrição do chamado, enviar mensagens e anexos, e receber mensagens/arquivos dos analistas/gestores no chat do chamado. |
| Responsável pela elaboração do caso de teste | Eduardo Versiani de Melo Penna |

<br>

| **Caso de teste**  | **CT-007 – Analista - Visualizar e Filtrar Chamados**  |
|:---: |:---: |
| Requisito associado | RF-006 - O analista deve visualizar todos os chamados em aberto e filtrá-los conforme necessidade.|
| Objetivo do teste | Verificar se o analista consegue visualizar quais demandas estão pendentes e filtra-las da forma em que ele se sentir mais confortável para organizar os chamados na tela. |
| Passos | - Acessar o navegador <br> - https://trackit-front.onrender.com <br> - Realizar login com uma conta de analista válida <br> - Na sidebar, clicar em "Atribuir Chamados" <br> - Clicar nas setas à frente do parâmetro que deseja ordenar a listagem dos chamados. - <br> Para filtrá-los pela sua orioridade, clique no ícone de filtros no canto superior direito acima da lista de chamados. <br> - Selecione por qual prioridade deseja filtrar. |
| Critério de êxito | - O analista conseguir visualizar os chamados em aberto e filtrar/organizar os mesmos. |
| Responsável pela elaboração do caso de teste | Arthur Marques Araujo Pena |

<br>

| **Caso de teste**  | **CT-008 – Analista - Atribuir um Chamado para Si**  |
|:---: |:---: |
| Requisito associado | RF-007 - O analista deve poder atribuir um chamado a si mesmo, movendo-o para sua fila de atendimento.|
| Objetivo do teste | Verificar se o analista consegue associar um chamado para si e impedir que mais de de analista associado ao mesmo chamado. |
| Passos | - Acessar o navegador <br> - https://trackit-front.onrender.com <br> - Realizar login com uma conta de analista válida <br> - Na sidebar, clicar em "Atribuir Chamados" <br> - Clicar no ícone em azul à frente do chamado que será atribuído e confirmar. - <br> - O analista será redirecionado para a página de detalhes do chamado. <br> - Na sidebar, clicar em "Atribuir Chamados" e verificar se o chamado atribuído foi retirado da listagem. <br> - Na sidebar, clicar em "Meus Chamados" e verificar se os chamados atribuídos irão ser listados. |
| Critério de êxito | - O analista atribuir um chamado para si mesmo e o chamado for retirado da listagem geral de chamados e adicionado na listagem pessoal do analista. |
| Responsável pela elaboração do caso de teste | Arthur Marques Araujo Pena |

<br>

| **Caso de teste**  | **CT-009 – Analista - Responder e Alterar Status de um Chamado**  |
|:---: |:---: |
| Requisito associado | RF-008 - O analista deve poder enviar mensagens no chamado e alterar o status da demanda, mantendo o fluxo do atendimento. |
| Objetivo do teste | Verificar se o analista consegue trocar informações com o requerente através do bate-papo do chamado, além de alterar o status do chamado ao longo do decorrer da demanda. |
| Passos | - Acessar o navegador <br> - https://trackit-front.onrender.com <br> - Realizar login com uma conta de analista válida <br> - Na sidebar, clicar em "Meus Chamados" <br> - Clicar no ícone da coluna "Ações" à frente do chamado que será respondido. <br> - No campo "Digite sua mensagem..." do bate-papo, digite uma mensagem para responder ou iniciar um bate papo com o requerente. <br> - Para enviar a mensagem pressione a tecla "Enter" ou o ícone em azul na perte inferior direita da página. <br> - Clique no botão "Alterar Status" no canto superior direito da tela. <br> - Selecione o estado atual do chamado e confirme. | 
| Critério de êxito | - O analista conseguir trocar mensagens no chat do chamado e alterar o status do mesmo e essas ações serem vistas pelo analista e pelo requerente. |
| Responsável pela elaboração do caso de teste | Arthur Marques Araujo Pena |

<br>

| **Caso de teste**  | **CT-010 – Analista - Fechar e Reabrir um Chamado**  |
|:---: |:---: |
| Requisito associado | RF-009 - A aplicação deve permitir que o analista troque mensagens com o usuário que abriu o chamado, além de alterar o status do chamado ao longo do decorrer do chamado. |
| Objetivo do teste | Verificar se o analista consegue trocar informações com o requerente além de mudar o status do chamado, podendo fechar e reabrir o chamado. |
| Passos | - Acessar o navegador <br> - https://trackit-front.onrender.com <br> - Realizar login com uma conta de analista válida <br> - Na sidebar, clicar em "Meus Chamados" <br> - Clicar no ícone da coluna "Ações" à frente do chamado que está com status "Concluído". <br> Para fechar o chamado, clique no botão "Encerrar" e confirme a ação. <br> - Para reabrir o chamado, clique em "Meus Chamados" na sidebar, localize o chamado com status "Concluído", clique no ícone da coluna "Ações", no canto superior direito, clique em "Reabrir" e confirme.| 
| Critério de êxito | - O analista conseguir fechar e reabrir os chamados desejados. |
| Responsável pela elaboração do caso de teste | Arthur Marques Araujo Pena |

<br>

| **Caso de teste**  | **CT-011 – Analista - Visualizar Dashboard**  |
|:---: |:---: |
| Requisito associado | RF-010 - O analista deve conseguir ver dados sobre seu desempenho, através de gráfico e números de chamados atendidos. |
| Objetivo do teste | Verificar se o analista consegue ter acesso aos dados relacionados aos seus atendimentos realizados. |
| Passos | - Acessar o navegador <br> - https://trackit-front.onrender.com <br> - Realizar login com uma conta de analista válida <br> - Na sidebar, clicar em "Desempenho" <br> - Nessa tela deve ser mostrada uma visão geral dos seus atendimentos | 
| Critério de êxito | - O analista conseguir visualizar os relatórios de seus atendimentos. |
| Responsável pela elaboração do caso de teste | Arthur Marques Araujo Pena |

<br>

| **Caso de teste**  | **CT-012 – Gerenciar Parâmetros**  |
|:---: |:---: |
| Requisito associado | RF-011 - A aplicação deve permitir que os usuários que possuem perfil de gestor possam visualizar, criar, editar e deletar (se aplicável), as gerências, prioridades, status e tipos de demandas do TrackIT |
| Objetivo do teste | Verificar se o usuário com perfil de gestor consegue realizar as 4 operações de um CRUD para cada parâmetro |
| Passos | - Logar no sistema com um perfil de gestor <br> - Ir na seção Parâmetros na sidebar e selecionar um dos parâmetros. <br> - Verificar se todos os parâmetros aparecem para visualização <br> - Criar um novo parâmetro <br> - Editar o parâmetro criado <br> - Deletar o parâmetro criado|
| Critério de êxito | - Todas as operações saem conforme esperado, sem gerar nenhum comportamento estranho |
| Responsável pela elaboração do caso de teste | Lucas Fernandes Nascimento |

