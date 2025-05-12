-- 🔧 Gerências
INSERT INTO Gerencia (nomeGerencia, ativo)
VALUES 
('ASTIN', 1),
('GETED', 1),
('GEVIF', 1),
('GESFO', 1);

SELECT * FROM Gerencia;

-- 🔧 Tipos de Usuário
INSERT INTO tipoUsuario (tipoUsuario)
VALUES 
('admin'),
('analista'),
('usuario');

SELECT * FROM tipoUsuario;

-- 🔧 Usuários (Clientes, Analistas e Administrador)
INSERT INTO Usuario (matricula, nomeUsuario, email, senha, ramal, fotoPerfil, idGerencia, idTipoUsuario)
VALUES 
(1001, 'Administrador', 'admin@trackit.com', 'senhaAdmin123', 1000, NULL, 1, 1),
(1002, 'Analista 1', 'analista1@trackit.com', 'senhaAnalista123', 2000, NULL, 1, 2),
(1003, 'Analista 2', 'analista2@trackit.com', 'senhaAnalista123', 2001, NULL, 2, 3),
(1004, 'Cliente 1', 'cliente1@trackit.com', 'senhaCliente123', 3000, NULL, 3, 3),
(1005, 'Cliente 2', 'cliente2@trackit.com', 'senhaCliente123', 3001, NULL, 4, 3);

SELECT * FROM Usuario;

-- 🔧 Tipos de Chamado
INSERT INTO tipoChamado (nomeTipo, ativo)
VALUES 
('Configuração de Usuário', 1),
('Erro de Validação', 1),
('Erro de Envio de Evento eSocial', 1);

SELECT * FROM tipoChamado;

-- 🔧 Status de Chamado
INSERT INTO statusChamado (nomeStatus, ativo)
VALUES 
('Em Aberto', 1),
('Em Análise', 1),
('Aguardando Resposta', 1),
('Finalizado', 1),
('Cancelado', 1);

SELECT * FROM statusChamado;

-- 🔧 Prioridade de Chamado
INSERT INTO prioridadeChamado (nomePrioridade, ativo)
VALUES 
('Baixa', 1),
('Média', 1),
('Alta', 1);

SELECT * FROM prioridadeChamado;

-- 🔧 Chamados (exemplo de chamados para teste)
INSERT INTO Chamado (protocolo, assunto, descricao, dataAbertura, dataAtualizacao, dataFechamento, idSolicitante, idAnalista, idTipoChamado, idStatus, idPrioridade)
VALUES 
('CHM0001', 'Erro de Login', 'Usuário não consegue acessar o sistema.', NOW(), NULL, NULL, 1004, 1002, 1, 1, 2),
('CHM0002', 'Configuração de Permissão', 'Permissão para acessar módulo financeiro.', NOW(), NOW(), NULL, 1005, 1003, 1, 2, 3),
('CHM0003', 'Erro de Envio eSocial', 'Erro ao enviar evento S-1200.', NOW(), NOW(), NOW(), 1004, 1002, 3, 4, 3),
('CHM0004', 'Erro de Validação', 'Validação falhou ao inserir dados.', NOW(), NULL, NULL, 1005, 1003, 2, 1, 1),
('CHM0005', 'Cancelamento de Acesso', 'Cancelamento de acesso ao sistema.', NOW(), NOW(), NOW(), 1004, 1003, 1, 5, 2);

SELECT * FROM Chamado;

-- 🔧 Mensagens nos Chamados (exemplo de conversas)
INSERT INTO msgChamado (mensagem, remetente, urlAnexo, nomeArquivo, idChamado, idRemetente)
VALUES 
('Bom dia, estou com problemas para acessar o sistema.', 'usuario', NULL, NULL, 1, 1004),
('Olá, estou verificando o problema. Você pode confirmar seu usuário?', 'analista', NULL, NULL, 1, 1002),
('É o usuário cliente1@trackit.com.', 'usuario', NULL, NULL, 1, 1004),
('Erro identificado, estou ajustando.', 'analista', NULL, NULL, 1, 1002);

SELECT * FROM msgChamado;

-- 🔧 Logs de Atividade (exemplo)
INSERT INTO logAtividade (descricao, idUsuario)
VALUES 
('Usuário Cliente 1 abriu o chamado CHM0001.', 1004),
('Analista 1 assumiu o chamado CHM0001.', 1002),
('Usuário Cliente 2 abriu o chamado CHM0002.', 1005),
('Analista 2 assumiu o chamado CHM0002.', 1003);

SELECT * FROM logAtividade;

-- 🔧 Notificações para Teste
INSERT INTO notificacao (titulo, mensagem, lida, idUsuario, idChamado)
VALUES 
('Novo Chamado Aberto', 'Seu chamado CHM0001 foi aberto com sucesso.', 0, 1004, 1),
('Chamado Atualizado', 'O status do seu chamado CHM0001 foi alterado para Em Análise.', 0, 1004, 1),
('Nova Mensagem', 'Você recebeu uma nova mensagem no chamado CHM0001.', 0, 1004, 1),
('Chamado Finalizado', 'O chamado CHM0003 foi finalizado.', 0, 1004, 3),
('Chamado Cancelado', 'O chamado CHM0005 foi cancelado.', 0, 1004, 5),
('Novo Chamado Recebido', 'Você foi atribuído ao chamado CHM0002.', 0, 1002, 2),
('Nova Mensagem Recebida', 'O cliente respondeu o chamado CHM0002.', 0, 1002, 2),
('Status do Chamado Atualizado', 'O status do chamado CHM0004 foi alterado para Em Análise.', 0, 1005, 4);

SELECT * FROM notificacao;
