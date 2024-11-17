-- CreateTable
CREATE TABLE `OtpToken` (
    `id` VARCHAR(191) NOT NULL,
    `phoneNumber` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `OtpToken_token_key`(`token`),
    UNIQUE INDEX `OtpToken_phoneNumber_token_key`(`phoneNumber`, `token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
