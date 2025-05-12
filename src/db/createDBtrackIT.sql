SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- Criação do schema
CREATE SCHEMA IF NOT EXISTS `db_trackit` DEFAULT CHARACTER SET utf8mb4;
USE `db_trackit`;

-- Tabela de Gerências
CREATE TABLE IF NOT EXISTS `Gerencia` (
  `idGerencia` INT NOT NULL AUTO_INCREMENT,
  `nomeGerencia` VARCHAR(50) NOT NULL,
  `ativo` TINYINT NOT NULL DEFAULT 1,
  PRIMARY KEY (`idGerencia`)
) ENGINE=InnoDB;

-- Tabela de Tipos de Usuário
CREATE TABLE IF NOT EXISTS `tipoUsuario` (
  `idTipoUsuario` INT NOT NULL AUTO_INCREMENT,
  `tipoUsuario` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`idTipoUsuario`)
) ENGINE=InnoDB;

-- Tabela de Usuários
CREATE TABLE IF NOT EXISTS `Usuario` (
  `idUsuario` INT NOT NULL AUTO_INCREMENT,
  `matricula` INT NOT NULL,
  `nomeUsuario` VARCHAR(50) NOT NULL,
  `email` VARCHAR(75) NOT NULL,
  `senha` VARCHAR(255) NOT NULL,
  `dataCadastro` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ativo` TINYINT NOT NULL DEFAULT 1,
  `ramal` INT,
  `fotoPerfil` TEXT,
  `idGerencia` INT,
  `idTipoUsuario` INT,
  PRIMARY KEY (`idUsuario`),
  UNIQUE INDEX `email_UNIQUE` (`email`),
  UNIQUE INDEX `matricula_UNIQUE` (`matricula`),
  FOREIGN KEY (`idGerencia`) REFERENCES `Gerencia` (`idGerencia`),
  FOREIGN KEY (`idTipoUsuario`) REFERENCES `tipoUsuario` (`idTipoUsuario`)
) ENGINE=InnoDB;

-- Tabela de Tipos de Chamado
CREATE TABLE IF NOT EXISTS `tipoChamado` (
  `idTipoChamado` INT NOT NULL AUTO_INCREMENT,
  `nomeTipo` VARCHAR(50) NOT NULL,
  `ativo` TINYINT NOT NULL DEFAULT 1,
  PRIMARY KEY (`idTipoChamado`)
) ENGINE=InnoDB;

-- Tabela de Status de Chamado
CREATE TABLE IF NOT EXISTS `statusChamado` (
  `idStatus` INT NOT NULL AUTO_INCREMENT,
  `nomeStatus` VARCHAR(50) NOT NULL,
  `ativo` TINYINT NOT NULL DEFAULT 1,
  PRIMARY KEY (`idStatus`)
) ENGINE=InnoDB;

-- Tabela de Prioridade de Chamado
CREATE TABLE IF NOT EXISTS `prioridadeChamado` (
  `idPrioridade` INT NOT NULL AUTO_INCREMENT,
  `nomePrioridade` VARCHAR(50) NOT NULL,
  `ativo` TINYINT NOT NULL DEFAULT 1,
  PRIMARY KEY (`idPrioridade`)
) ENGINE=InnoDB;

-- Tabela de Chamados
CREATE TABLE IF NOT EXISTS `Chamado` (
  `idChamado` INT NOT NULL AUTO_INCREMENT,
  `protocolo` VARCHAR(8) NOT NULL,
  `assunto` VARCHAR(100) NOT NULL,
  `descricao` LONGTEXT NOT NULL,
  `dataAbertura` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dataAtualizacao` DATETIME DEFAULT NULL,
  `dataFechamento` DATETIME DEFAULT NULL,
  `idSolicitante` INT,
  `idAnalista` INT,
  `idTipoChamado` INT,
  `idStatus` INT,
  `idPrioridade` INT,
  PRIMARY KEY (`idChamado`),
  UNIQUE INDEX `protocolo_UNIQUE` (`protocolo`),
  FOREIGN KEY (`idSolicitante`) REFERENCES `Usuario` (`idUsuario`),
  FOREIGN KEY (`idAnalista`) REFERENCES `Usuario` (`idUsuario`),
  FOREIGN KEY (`idTipoChamado`) REFERENCES `tipoChamado` (`idTipoChamado`),
  FOREIGN KEY (`idStatus`) REFERENCES `statusChamado` (`idStatus`),
  FOREIGN KEY (`idPrioridade`) REFERENCES `prioridadeChamado` (`idPrioridade`)
) ENGINE=InnoDB;

-- Tabela de Mensagens de Chamado
CREATE TABLE IF NOT EXISTS `msgChamado` (
  `idMensagem` INT NOT NULL AUTO_INCREMENT,
  `mensagem` TEXT NOT NULL,
  `timestamp` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `remetente` ENUM('usuario', 'analista') NOT NULL,
  `urlAnexo` TEXT,
  `nomeArquivo` VARCHAR(255),
  `idChamado` INT NOT NULL,
  `idRemetente` INT NOT NULL,
  PRIMARY KEY (`idMensagem`),
  FOREIGN KEY (`idChamado`) REFERENCES `Chamado` (`idChamado`),
  FOREIGN KEY (`idRemetente`) REFERENCES `Usuario` (`idUsuario`)
) ENGINE=InnoDB;

-- Tabela para Logs de Atividade
CREATE TABLE IF NOT EXISTS `logAtividade` (
  `idLog` INT NOT NULL AUTO_INCREMENT,
  `descricao` TEXT NOT NULL,
  `dataHora` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `idUsuario` INT,
  PRIMARY KEY (`idLog`),
  FOREIGN KEY (`idUsuario`) REFERENCES `Usuario` (`idUsuario`)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `notificacao` (
  `idNotificacao` INT NOT NULL AUTO_INCREMENT,
  `titulo` VARCHAR(100) NOT NULL,
  `mensagem` TEXT NOT NULL,
  `lida` TINYINT NOT NULL DEFAULT 0,
  `dataHora` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `idUsuario` INT NOT NULL,
  `idChamado` INT NULL,
  PRIMARY KEY (`idNotificacao`),
  FOREIGN KEY (`idUsuario`) REFERENCES `Usuario` (`idUsuario`) ON DELETE CASCADE,
  FOREIGN KEY (`idChamado`) REFERENCES `Chamado` (`idChamado`) ON DELETE CASCADE
) ENGINE=InnoDB;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;