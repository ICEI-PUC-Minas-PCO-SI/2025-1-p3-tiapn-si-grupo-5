-- CreateTable
CREATE TABLE `chamado` (
    `idChamado` INTEGER NOT NULL AUTO_INCREMENT,
    `protocolo` VARCHAR(8) NOT NULL,
    `assunto` VARCHAR(100) NOT NULL,
    `descricao` LONGTEXT NOT NULL,
    `dataAbertura` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `dataAtualizacao` DATETIME(0) NULL,
    `dataFechamento` DATETIME(0) NULL,
    `idSolicitante` INTEGER NULL,
    `idAnalista` INTEGER NULL,
    `idTipoChamado` INTEGER NULL,
    `idStatus` INTEGER NULL,
    `idPrioridade` INTEGER NULL,

    UNIQUE INDEX `protocolo_UNIQUE`(`protocolo`),
    INDEX `idAnalista`(`idAnalista`),
    INDEX `idPrioridade`(`idPrioridade`),
    INDEX `idSolicitante`(`idSolicitante`),
    INDEX `idStatus`(`idStatus`),
    INDEX `idTipoChamado`(`idTipoChamado`),
    PRIMARY KEY (`idChamado`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `gerencia` (
    `idGerencia` INTEGER NOT NULL AUTO_INCREMENT,
    `nomeGerencia` VARCHAR(50) NOT NULL,
    `ativo` TINYINT NOT NULL DEFAULT 1,

    PRIMARY KEY (`idGerencia`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `logatividade` (
    `idLog` INTEGER NOT NULL AUTO_INCREMENT,
    `descricao` TEXT NOT NULL,
    `dataHora` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `idUsuario` INTEGER NULL,

    INDEX `idUsuario`(`idUsuario`),
    PRIMARY KEY (`idLog`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `msgchamado` (
    `idMensagem` INTEGER NOT NULL AUTO_INCREMENT,
    `mensagem` TEXT NOT NULL,
    `timestamp` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `remetente` ENUM('usuario', 'analista') NOT NULL,
    `urlAnexo` TEXT NULL,
    `nomeArquivo` VARCHAR(255) NULL,
    `idChamado` INTEGER NOT NULL,
    `idRemetente` INTEGER NOT NULL,

    INDEX `idChamado`(`idChamado`),
    INDEX `idRemetente`(`idRemetente`),
    PRIMARY KEY (`idMensagem`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notificacao` (
    `idNotificacao` INTEGER NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR(100) NOT NULL,
    `mensagem` TEXT NOT NULL,
    `lida` TINYINT NOT NULL DEFAULT 0,
    `dataHora` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `idUsuario` INTEGER NOT NULL,
    `idChamado` INTEGER NULL,

    INDEX `idChamado`(`idChamado`),
    INDEX `idUsuario`(`idUsuario`),
    PRIMARY KEY (`idNotificacao`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `prioridadechamado` (
    `idPrioridade` INTEGER NOT NULL AUTO_INCREMENT,
    `nomePrioridade` VARCHAR(50) NOT NULL,
    `ativo` TINYINT NOT NULL DEFAULT 1,

    PRIMARY KEY (`idPrioridade`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `statuschamado` (
    `idStatus` INTEGER NOT NULL AUTO_INCREMENT,
    `nomeStatus` VARCHAR(50) NOT NULL,
    `ativo` TINYINT NOT NULL DEFAULT 1,

    PRIMARY KEY (`idStatus`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tipochamado` (
    `idTipoChamado` INTEGER NOT NULL AUTO_INCREMENT,
    `nomeTipo` VARCHAR(50) NOT NULL,
    `ativo` TINYINT NOT NULL DEFAULT 1,

    PRIMARY KEY (`idTipoChamado`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tipousuario` (
    `idTipoUsuario` INTEGER NOT NULL AUTO_INCREMENT,
    `tipoUsuario` VARCHAR(20) NOT NULL,

    PRIMARY KEY (`idTipoUsuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuario` (
    `idUsuario` INTEGER NOT NULL AUTO_INCREMENT,
    `matricula` VARCHAR(15) NOT NULL,
    `nomeUsuario` VARCHAR(50) NOT NULL,
    `email` VARCHAR(75) NOT NULL,
    `senha` VARCHAR(255) NOT NULL,
    `dataCadastro` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `ativo` TINYINT NOT NULL DEFAULT 1,
    `ramal` INTEGER NULL,
    `fotoPerfil` TEXT NULL,
    `idGerencia` INTEGER NULL,
    `idTipoUsuario` INTEGER NULL,

    UNIQUE INDEX `matricula_UNIQUE`(`matricula`),
    UNIQUE INDEX `email_UNIQUE`(`email`),
    INDEX `idGerencia`(`idGerencia`),
    INDEX `idTipoUsuario`(`idTipoUsuario`),
    PRIMARY KEY (`idUsuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `chamado` ADD CONSTRAINT `chamado_ibfk_1` FOREIGN KEY (`idSolicitante`) REFERENCES `usuario`(`idUsuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `chamado` ADD CONSTRAINT `chamado_ibfk_2` FOREIGN KEY (`idAnalista`) REFERENCES `usuario`(`idUsuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `chamado` ADD CONSTRAINT `chamado_ibfk_3` FOREIGN KEY (`idTipoChamado`) REFERENCES `tipochamado`(`idTipoChamado`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `chamado` ADD CONSTRAINT `chamado_ibfk_4` FOREIGN KEY (`idStatus`) REFERENCES `statuschamado`(`idStatus`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `chamado` ADD CONSTRAINT `chamado_ibfk_5` FOREIGN KEY (`idPrioridade`) REFERENCES `prioridadechamado`(`idPrioridade`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `logatividade` ADD CONSTRAINT `logatividade_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuario`(`idUsuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `msgchamado` ADD CONSTRAINT `msgchamado_ibfk_1` FOREIGN KEY (`idChamado`) REFERENCES `chamado`(`idChamado`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `msgchamado` ADD CONSTRAINT `msgchamado_ibfk_2` FOREIGN KEY (`idRemetente`) REFERENCES `usuario`(`idUsuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `notificacao` ADD CONSTRAINT `notificacao_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuario`(`idUsuario`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `notificacao` ADD CONSTRAINT `notificacao_ibfk_2` FOREIGN KEY (`idChamado`) REFERENCES `chamado`(`idChamado`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `usuario` ADD CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`idGerencia`) REFERENCES `gerencia`(`idGerencia`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `usuario` ADD CONSTRAINT `usuario_ibfk_2` FOREIGN KEY (`idTipoUsuario`) REFERENCES `tipousuario`(`idTipoUsuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;
