## Configurando o MySQL

- Na hora de cadastrar usuário e senha é preciso cadastrar um usuário e senha fáceis, de preferência o usuário sendo "root"
- É preciso utilizando o MySQL Workbench, executar o script de criação do banco de dados.
- Após rodar e criar as tabelas, no arquivo `.env` do backend, é preciso atualizar a variável DATABASE_URL, através do seguinte padrão:

DATABASE_URL="mysql://(nome do seu usuário):(senha)@(porta que o bando está rodando, provavelmente localhost:3306)/db_trackit?schema=public"

