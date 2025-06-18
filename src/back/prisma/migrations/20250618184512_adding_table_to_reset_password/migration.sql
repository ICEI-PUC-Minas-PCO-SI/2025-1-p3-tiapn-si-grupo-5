-- CreateTable
CREATE TABLE `verificacao` (
    `idVerificacao` INTEGER NOT NULL AUTO_INCREMENT,
    `idUsuario` INTEGER NOT NULL,
    `token` CHAR(36) NOT NULL,
    `tipo` VARCHAR(30) NULL,
    `criadoEm` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `expiraEm` DATETIME(3) NULL,

    UNIQUE INDEX `verificacao_token_key`(`token`),
    INDEX `idUsuario_verificacao`(`idUsuario`),
    PRIMARY KEY (`idVerificacao`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `verificacao` ADD CONSTRAINT `verificacao_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuario`(`idUsuario`) ON DELETE CASCADE ON UPDATE NO ACTION;
