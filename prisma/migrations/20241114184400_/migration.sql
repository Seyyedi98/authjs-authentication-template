-- AlterTable
ALTER TABLE `users` ADD COLUMN `isTwoFactorEnabled` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `twofactorConfiramtionId` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `TwoFactorToken` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `TwoFactorToken_token_key`(`token`),
    UNIQUE INDEX `TwoFactorToken_email_token_key`(`email`, `token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TwofactorConfiramtion` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `TwofactorConfiramtion_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TwofactorConfiramtion` ADD CONSTRAINT `TwofactorConfiramtion_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
