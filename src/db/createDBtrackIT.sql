-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema db_trackit
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema db_trackit
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `db_trackit` DEFAULT CHARACTER SET utf8 ;
USE `db_trackit` ;

-- -----------------------------------------------------
-- Table `db_trackit`.`tipoUsuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_trackit`.`tipoUsuario` (
  `idTipoUsuario` INT(2) NOT NULL,
  `tipoUsuario` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`idTipoUsuario`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_trackit`.`Usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_trackit`.`Usuario` (
  `idUsuario` INT NOT NULL AUTO_INCREMENT,
  `nivelUsuario` INT NOT NULL,
  `nomeUsuario` VARCHAR(50) NOT NULL,
  `email` VARCHAR(75) NOT NULL,
  `senhaHash` VARCHAR(20) NOT NULL,
  `dataCadastro` DATE NOT NULL,
  `ativo` TINYINT NOT NULL,
  PRIMARY KEY (`idUsuario`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  INDEX `fk_Usuario_tipoUsuario1_idx` (`nivelUsuario` ASC) VISIBLE,
  CONSTRAINT `fk_Usuario_tipoUsuario1`
    FOREIGN KEY (`nivelUsuario`)
    REFERENCES `db_trackit`.`tipoUsuario` (`idTipoUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_trackit`.`statusChamado`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_trackit`.`statusChamado` (
  `idStatus` INT NOT NULL AUTO_INCREMENT,
  `nomeStatus` VARCHAR(15) NOT NULL,
  PRIMARY KEY (`idStatus`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_trackit`.`categoriaChamado`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_trackit`.`categoriaChamado` (
  `idCategoria` INT NOT NULL,
  `tipoCategoria` VARCHAR(15) NOT NULL,
  PRIMARY KEY (`idCategoria`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_trackit`.`prioridadeChamado`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_trackit`.`prioridadeChamado` (
  `idPriorChamado` INT NOT NULL,
  `tipoPrior` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idPriorChamado`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_trackit`.`chamado`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_trackit`.`chamado` (
  `idChamado` INT(6) NOT NULL AUTO_INCREMENT,
  `protocolo` VARCHAR(45) NOT NULL,
  `titulo` LONGTEXT NOT NULL,
  `dataAbertura` DATETIME NOT NULL,
  `dataAtualizacao` DATETIME NULL,
  `dataFechamento` DATETIME NULL,
  `idUsuaAbriu` INT NOT NULL,
  `idResponsavel` INT NOT NULL,
  `statusAtual` INT NOT NULL,
  `categoria` INT NOT NULL,
  `prioridade` INT NOT NULL,
  PRIMARY KEY (`idChamado`),
  UNIQUE INDEX `protocolo_UNIQUE` (`protocolo` ASC) VISIBLE,
  INDEX `fk_chamado_Usuario1_idx` (`idUsuaAbriu` ASC) VISIBLE,
  INDEX `fk_chamado_Usuario2_idx` (`idResponsavel` ASC) VISIBLE,
  INDEX `fk_chamado_statusChamado1_idx` (`statusAtual` ASC) VISIBLE,
  INDEX `fk_chamado_categoriaChamado1_idx` (`categoria` ASC) VISIBLE,
  INDEX `fk_chamado_prioridadeChamado1_idx` (`prioridade` ASC) VISIBLE,
  CONSTRAINT `fk_chamado_Usuario1`
    FOREIGN KEY (`idUsuaAbriu`)
    REFERENCES `db_trackit`.`Usuario` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_chamado_Usuario2`
    FOREIGN KEY (`idResponsavel`)
    REFERENCES `db_trackit`.`Usuario` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_chamado_statusChamado1`
    FOREIGN KEY (`statusAtual`)
    REFERENCES `db_trackit`.`statusChamado` (`idStatus`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_chamado_categoriaChamado1`
    FOREIGN KEY (`categoria`)
    REFERENCES `db_trackit`.`categoriaChamado` (`idCategoria`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_chamado_prioridadeChamado1`
    FOREIGN KEY (`prioridade`)
    REFERENCES `db_trackit`.`prioridadeChamado` (`idPriorChamado`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_trackit`.`msgChamado`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_trackit`.`msgChamado` (
  `idMsg` INT NOT NULL AUTO_INCREMENT,
  `idChamado` INT NOT NULL,
  `idUsuario` INT NOT NULL,
  `idAnalista` INT NOT NULL,
  `mensagem` TEXT NOT NULL,
  `timestamp` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `remetente` ENUM('usuario', 'analista') NOT NULL,
  PRIMARY KEY (`idMsg`),
  INDEX `fk_msgChamado_chamado1_idx` (`idChamado` ASC) VISIBLE,
  INDEX `fk_msgChamado_chamado2_idx` (`idUsuario` ASC) VISIBLE,
  INDEX `fk_msgChamado_chamado3_idx` (`idAnalista` ASC) VISIBLE,
  CONSTRAINT `fk_msgChamado_chamado1`
    FOREIGN KEY (`idChamado`)
    REFERENCES `db_trackit`.`chamado` (`idChamado`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_msgChamado_chamado2`
    FOREIGN KEY (`idUsuario`)
    REFERENCES `db_trackit`.`chamado` (`idUsuaAbriu`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_msgChamado_chamado3`
    FOREIGN KEY (`idAnalista`)
    REFERENCES `db_trackit`.`chamado` (`idResponsavel`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
