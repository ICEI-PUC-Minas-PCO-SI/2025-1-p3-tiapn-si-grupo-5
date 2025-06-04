## Instruções iniciais para uso do banco de dados

Este projeto utiliza **MySQL** como banco de dados relacional e **Prisma ORM** para gerenciamento de migrations e acesso aos dados.

### Passos iniciais

1. **Instale o MySQL** em sua máquina, se ainda não tiver.
2. Crie um usuário e senha de fácil acesso (exemplo: usuário `root`).
3. Utilize o MySQL Workbench ou outro cliente para executar o script de criação do banco (`create_db_trackit.sql`) localizado nesta pasta.
4. Após criar o banco e as tabelas, configure a variável `DATABASE_URL` no arquivo `.env` do backend, seguindo o padrão:

   ```
   DATABASE_URL="mysql://<usuario>:<senha>@localhost:3306/db_trackit"
   ```

5. Para manter o banco atualizado com as últimas alterações de modelo, utilize os comandos do Prisma ORM, como `npx prisma migrate dev`.

### Dicas rápidas

- Sempre confira se o serviço MySQL está rodando antes de iniciar o backend.
- Use o Prisma para gerenciar alterações futuras no banco, evitando editar tabelas manualmente.
- Scripts de mock e criação inicial estão nesta pasta para facilitar testes e desenvolvimento.

Para detalhes sobre as tabelas e relações, consulte os arquivos `.sql` desta pasta.

