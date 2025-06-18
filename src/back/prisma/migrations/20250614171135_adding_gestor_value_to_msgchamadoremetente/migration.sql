-- AlterTable
ALTER TABLE `msgchamado` MODIFY `remetente` ENUM('usuario', 'analista', 'gestor') NOT NULL;
