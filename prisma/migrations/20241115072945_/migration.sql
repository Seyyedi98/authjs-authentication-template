/*
  Warnings:

  - You are about to drop the `twofactorconfiramtion` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `twofactorconfiramtion` DROP FOREIGN KEY `TwofactorConfiramtion_userId_fkey`;

-- DropTable
DROP TABLE `twofactorconfiramtion`;

-- CreateTable
CREATE TABLE `twoFactorConfirmation` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `twoFactorConfirmation_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `twoFactorConfirmation` ADD CONSTRAINT `twoFactorConfirmation_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
