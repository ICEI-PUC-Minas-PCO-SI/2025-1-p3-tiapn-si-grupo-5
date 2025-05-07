# Arquitetura da solução

<span style="color:red">Pré-requisitos: <a href="05-Projeto-interface.md"> Projeto de interface</a></span>

Definição de como o software é estruturado em termos dos componentes que fazem parte da solução e do ambiente de hospedagem da aplicação.

![Arquitetura da Solução](images/arquitetura.png)

## Diagrama de classes

O diagrama de classes ilustra graficamente a estrutura do software e como cada uma das classes estará interligada. Essas classes servem de modelo para materializar os objetos que serão executados na memória.

> **Links úteis**:
> - [Diagramas de classes - documentação da IBM](https://www.ibm.com/docs/pt-br/rational-soft-arch/9.7.0?topic=diagrams-class)
> - [O que é um diagrama de classe UML?](https://www.lucidchart.com/pages/pt/o-que-e-diagrama-de-classe-uml)

##  Modelo de dados

O desenvolvimento da solução proposta requer a existência de bases de dados que permitam realizar o cadastro de dados e os controles associados aos processos identificados, assim como suas recuperações.

Utilizando a notação do DER (Diagrama Entidade-Relacionamento), elabore um modelo, usando alguma ferramenta, que contemple todas as entidades e atributos associados às atividades dos processos identificados. Deve ser gerado um único DER que suporte todos os processos escolhidos, visando, assim, uma base de dados integrada. O modelo deve contemplar também o controle de acesso dos usuários (partes interessadas nos processos) de acordo com os papéis definidos nos modelos do processo de negócio.

Apresente o modelo de dados por meio de um modelo relacional que contemple todos os conceitos e atributos apresentados na modelagem dos processos.

### Modelo ER

Este modelo de banco de dados simplificado visa estruturar as informações essenciais para um sistema de abertura de chamados, focando nas entidades principais e seus relacionamentos. Cada tabela possui uma chave primária (PK) para identificar seus registros de forma única e chaves estrangeiras (FK) utilizadas para estabelecer os relacionamentos entre as tabelas, garantindo a integridade referencial. O Modelo ER abaixo representa, como as entidades (coisas, objetos) se relacionam entre si na aplicação interativa.

![Modelo ER da TrackIT](./images/EDRtrackIT.png "Modelo ER.")

### Esquema Relacional

O modelo de banco de dados a seguir foi projetado para que permita a interação entre usuários e analistas, o rastreamento de problemas e a gestão do ciclo de vida dos chamados. Cada tabela possui uma chave primária única para identificar seus registros além de possuir chaves estrangeiras que são utilizadas para estabelecer e reforçar os relacionamentos entre as tabelas, garantindo a integridade referencial dos dados buscando representar de forma clara e estruturada as entidades e seus relacionamentos no sistema de abertura de chamados, fornecendo uma base sólida para a criação do banco de dados físico. O Esquema Relacional abaixo corresponde à representação dos dados em tabelas juntamente com as restrições de integridade e chave primária. 
 

![Esquema Relacional da TrackIT](./images/ModeloRelacional.png "Modelo Lógico.")
---

### Modelo físico

```sql
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema db_trackit
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema db_trackit
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `db_trackit` DEFAULT CHARACTER SET utf8mb3 ;
USE `db_trackit` ;

-- -----------------------------------------------------
-- Table `db_trackit`.`categoriaChamado`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_trackit`.`categoriaChamado` (
  `idCategoria` INT NOT NULL,
  `tipoCategoria` VARCHAR(15) NOT NULL,
  `ativo` TINYINT NOT NULL,
  PRIMARY KEY (`idCategoria`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `db_trackit`.`Gerencia`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_trackit`.`Gerencia` (
  `idGerencia` INT NOT NULL,
  `nomeGerencia` VARCHAR(20) NOT NULL,
  `ativo` TINYINT NOT NULL,
  PRIMARY KEY (`idGerencia`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_trackit`.`tipoUsuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_trackit`.`tipoUsuario` (
  `idTipoUsuario` INT NOT NULL,
  `tipoUsuario` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`idTipoUsuario`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `db_trackit`.`Usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_trackit`.`Usuario` (
  `idUsuario` INT NOT NULL AUTO_INCREMENT,
  `matricula` INT NOT NULL,
  `nomeUsuario` VARCHAR(50) NOT NULL,
  `email` VARCHAR(75) NOT NULL,
  `senhaHash` VARCHAR(20) NOT NULL,
  `dataCadastro` DATE NOT NULL,
  `ativo` TINYINT NOT NULL,
  `ramal` INT NOT NULL,
  `fotoPerfil` TEXT NULL,
  `idGerencia` INT NOT NULL,
  `tipoUsuario` INT NOT NULL,
  PRIMARY KEY (`idUsuario`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  UNIQUE INDEX `matricula_UNIQUE` (`matricula` ASC) VISIBLE,
  UNIQUE INDEX `idGerencia_UNIQUE` (`idGerencia` ASC) VISIBLE,
  INDEX `fk_Usuario_tipoUsuario1_idx` (`tipoUsuario` ASC) VISIBLE,
  CONSTRAINT `fk_Usuario_Gerencia1`
    FOREIGN KEY (`idGerencia`)
    REFERENCES `db_trackit`.`Gerencia` (`idGerencia`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Usuario_tipoUsuario1`
    FOREIGN KEY (`tipoUsuario`)
    REFERENCES `db_trackit`.`tipoUsuario` (`idTipoUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `db_trackit`.`statusChamado`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_trackit`.`statusChamado` (
  `idStatus` INT NOT NULL AUTO_INCREMENT,
  `nomeStatus` VARCHAR(15) NOT NULL,
  `ativo` TINYINT NOT NULL,
  PRIMARY KEY (`idStatus`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `db_trackit`.`prioridadeChamado`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_trackit`.`prioridadeChamado` (
  `idPriorChamado` INT NOT NULL,
  `tipoPrior` VARCHAR(45) NOT NULL,
  `ativo` TINYINT NOT NULL,
  PRIMARY KEY (`idPriorChamado`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `db_trackit`.`Chamado`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_trackit`.`Chamado` (
  `idChamado` INT NOT NULL AUTO_INCREMENT,
  `protocolo` VARCHAR(8) NOT NULL,
  `assunto` VARCHAR(30) NOT NULL,
  `descricao` LONGTEXT NOT NULL,
  `dataAbertura` DATETIME NOT NULL,
  `dataAtualizacao` DATETIME NULL DEFAULT NULL,
  `dataFechamento` DATETIME NULL DEFAULT NULL,
  `idSolicitante` INT NOT NULL,
  `idAnalista` INT NOT NULL,
  `categoriaChamado` INT NOT NULL,
  `statusChamado` INT NOT NULL,
  `prioridadeChamado` INT NOT NULL,
  PRIMARY KEY (`idChamado`),
  UNIQUE INDEX `protocolo_UNIQUE` (`protocolo` ASC) VISIBLE,
  INDEX `fk_Chamado_categoriaChamado1_idx` (`categoriaChamado` ASC) VISIBLE,
  INDEX `fk_Chamado_Usuario1_idx` (`idAnalista` ASC) VISIBLE,
  INDEX `fk_Chamado_Usuario2_idx` (`idSolicitante` ASC) VISIBLE,
  INDEX `fk_Chamado_statusChamado1_idx` (`statusChamado` ASC) VISIBLE,
  INDEX `fk_Chamado_prioridadeChamado1_idx` (`prioridadeChamado` ASC) VISIBLE,
  CONSTRAINT `fk_Chamado_categoriaChamado1`
    FOREIGN KEY (`categoriaChamado`)
    REFERENCES `db_trackit`.`categoriaChamado` (`idCategoria`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Chamado_Usuario1`
    FOREIGN KEY (`idAnalista`)
    REFERENCES `db_trackit`.`Usuario` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Chamado_Usuario2`
    FOREIGN KEY (`idSolicitante`)
    REFERENCES `db_trackit`.`Usuario` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Chamado_statusChamado1`
    FOREIGN KEY (`statusChamado`)
    REFERENCES `db_trackit`.`statusChamado` (`idStatus`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Chamado_prioridadeChamado1`
    FOREIGN KEY (`prioridadeChamado`)
    REFERENCES `db_trackit`.`prioridadeChamado` (`idPriorChamado`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `db_trackit`.`msgChamado`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_trackit`.`msgChamado` (
  `idMensagem` INT NOT NULL AUTO_INCREMENT,
  `mensagem` TEXT NOT NULL,
  `timestamp` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `remetente` ENUM('usuario', 'analista') NOT NULL,
  `urlAnexo` VARCHAR(45) NULL,
  `nomeArquivo` VARCHAR(45) NULL,
  `idSolicitante` INT NOT NULL,
  `idResponsavel` INT NOT NULL,
  `idChamado` INT NOT NULL,
  PRIMARY KEY (`idMensagem`),
  INDEX `fk_msgChamado_Chamado1_idx` (`idChamado` ASC) VISIBLE,
  INDEX `fk_msgChamado_Chamado2_idx` (`idResponsavel` ASC) VISIBLE,
  INDEX `fk_msgChamado_Chamado3_idx` (`idSolicitante` ASC) VISIBLE,
  CONSTRAINT `fk_msgChamado_Chamado1`
    FOREIGN KEY (`idChamado`)
    REFERENCES `db_trackit`.`Chamado` (`idChamado`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_msgChamado_Chamado2`
    FOREIGN KEY (`idResponsavel`)
    REFERENCES `db_trackit`.`Chamado` (`idAnalista`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_msgChamado_Chamado3`
    FOREIGN KEY (`idSolicitante`)
    REFERENCES `db_trackit`.`Chamado` (`idSolicitante`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
```
Esse script deverá ser incluído em um arquivo .sql na pasta [de scripts SQL](../src/db).


## Tecnologias

Descreva qual(is) tecnologias você vai usar para resolver o seu problema, ou seja, implementar a sua solução. Liste todas as tecnologias envolvidas, linguagens a serem utilizadas, serviços web, frameworks, bibliotecas, IDEs de desenvolvimento, e ferramentas.

Apresente também uma figura explicando como as tecnologias estão relacionadas ou como uma interação do usuário com o sistema vai ser conduzida, por onde ela passa até retornar uma resposta ao usuário.


| **Dimensão**   | **Tecnologia**  |
| ---            | ---             |
| Front-end      | HTML + CSS + JS + React |
| Back-end       | Node.js         |
| SGBD           | MySQL           |
| Deploy         | Vercel          |


## Hospedagem

Explique como a hospedagem e o lançamento da plataforma foram realizados.

> **Links úteis**:
> - [Website com GitHub Pages](https://pages.github.com/)
> - [Programação colaborativa com Repl.it](https://repl.it/)
> - [Getting started with Heroku](https://devcenter.heroku.com/start)
> - [Publicando seu site no Heroku](http://pythonclub.com.br/publicando-seu-hello-world-no-heroku.html)

## Qualidade de software

Conceituar qualidade é uma tarefa complexa, mas ela pode ser vista como um método gerencial que, por meio de procedimentos disseminados por toda a organização, busca garantir um produto final que satisfaça às expectativas dos stakeholders.

No contexto do desenvolvimento de software, qualidade pode ser entendida como um conjunto de características a serem atendidas, de modo que o produto de software atenda às necessidades de seus usuários. Entretanto, esse nível de satisfação nem sempre é alcançado de forma espontânea, devendo ser continuamente construído. Assim, a qualidade do produto depende fortemente do seu respectivo processo de desenvolvimento.

A norma internacional ISO/IEC 25010, que é uma atualização da ISO/IEC 9126, define oito características e 30 subcaracterísticas de qualidade para produtos de software. Com base nessas características e nas respectivas subcaracterísticas, identifique as subcaracterísticas que sua equipe utilizará como base para nortear o desenvolvimento do projeto de software, considerando alguns aspectos simples de qualidade. Justifique as subcaracterísticas escolhidas pelo time e elenque as métricas que permitirão à equipe avaliar os objetos de interesse.

> **Links úteis**:
> - [ISO/IEC 25010:2011 - Systems and Software Engineering — Systems and Software Quality Requirements and Evaluation (SQuaRE) — System and Software Quality Models](https://www.iso.org/standard/35733.html/)
> - [Análise sobre a ISO 9126 – NBR 13596](https://www.tiespecialistas.com.br/analise-sobre-iso-9126-nbr-13596/)
> - [Qualidade de software - Engenharia de Software](https://www.devmedia.com.br/qualidade-de-software-engenharia-de-software-29/18209)
