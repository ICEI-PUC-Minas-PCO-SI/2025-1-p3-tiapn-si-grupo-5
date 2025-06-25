# Plano de testes de software

<span style="color:red">Pré-requisitos: <a href="02-Especificacao.md"> Especificação do projeto</a></span>, <a href="05-Projeto-interface.md"> Projeto de interface</a>


Não deixe de enumerar os casos de teste de forma sequencial e garantir que o(s) requisito(s) associado(s) a cada um deles esteja(m) correto(s) — de acordo com o que foi definido na <a href="02-Especificacao.md">Especificação do projeto</a>.

Por exemplo:

| **Caso de teste**  | **CT-009 – Gerenciar Parâmetros**  |
|:---: |:---: |
| Requisito associado | RF-009 - A aplicação deve permitir que os usuários que possuem perfil de gestor possam visualizar, criar, editar e deletar (se aplicável), as gerências, prioridades, status e tipos de demandas do TrackIT |
| Objetivo do teste | Verificar se o usuário com perfil de gestor consegue realizar as 4 operações de um CRUD para cada parâmetro |
| Passos | - Logar no sistema com um perfil de gestor <br> - Ir na seção Parâmetros na sidebar e selecionar um dos parâmetros. <br> - Verificar se todos os parâmetros aparecem para visualização <br> - Criar um novo parâmetro <br> - Editar o parâmetro criado <br> - Deletar o parâmetro criado|
| Critério de êxito | - Todas as operações saem conforme esperado, sem gerar nenhum comportamento estranho |
| Responsável pela elaboração do caso de teste | Lucas Fernandes Nascimento |

<br>

| **Caso de teste**  | **CT-002 – Efetuar login**  |
|:---: |:---: |
| Requisito associado | RF-00Y - A aplicação deve possuir opção de fazer login, sendo o login o endereço de e-mail. |
| Objetivo do teste | Verificar se o usuário consegue realizar login. |
| Passos | - Acessar o navegador <br> - Informar o endereço do site https://adota-pet.herokuapp.com/src/index.html <br> - Clicar no botão "Entrar" <br> - Preencher o campo de e-mail <br> - Preencher o campo de senha <br> - Clicar em "Login" |
| Critério de êxito | - O login foi realizado com sucesso. |
| Responsável pela elaboração do caso de teste | Nome do integrante da equipe. |
