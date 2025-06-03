# Middlewares

São funções intermediárias que processam as requisições antes que elas cheguem aos controllers ou após a resposta ser enviada. Eles permitem adicionar funcionalidades reutilizáveis e centralizadas, como autenticação, validação, tratamento de erros, logging, entre outros.

Na prática, os middlewares deverão ser usados para:

- Verificar autenticação e permissões de acesso.
- Validar dados das requisições antes de chegar aos controllers.
- Registrar logs de acesso ou de erros.
- Tratar erros de forma centralizada.

Assim, os middlewares ajudam a manter o código modular, reutilizável e organizado, facilitando a manutenção e a implementação de regras transversais à aplicação.
