/*
    Esse script é utilizado para popular o banco de dados com dados fictícios.
*/

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
('Admin'),
('Analista'),
('Usuario');

SELECT * FROM tipoUsuario;