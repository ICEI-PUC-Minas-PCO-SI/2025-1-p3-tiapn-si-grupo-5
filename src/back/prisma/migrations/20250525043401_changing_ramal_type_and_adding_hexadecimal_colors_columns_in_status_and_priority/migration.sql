/*
  Warnings:

  - Added the required column `hexCorPrimaria` to the `prioridadechamado` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hexCorSecundaria` to the `prioridadechamado` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hexCorPrimaria` to the `statuschamado` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hexCorSecundaria` to the `statuschamado` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `prioridadechamado` ADD COLUMN `hexCorPrimaria` VARCHAR(7) NOT NULL,
    ADD COLUMN `hexCorSecundaria` VARCHAR(7) NOT NULL;

-- AlterTable
ALTER TABLE `statuschamado` ADD COLUMN `hexCorPrimaria` VARCHAR(7) NOT NULL,
    ADD COLUMN `hexCorSecundaria` VARCHAR(7) NOT NULL;

-- AlterTable
ALTER TABLE `usuario` MODIFY `ramal` VARCHAR(10) NULL;
