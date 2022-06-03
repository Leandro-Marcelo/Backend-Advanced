/*
  Warnings:

  - You are about to drop the column `ownerId` on the `file` table. All the data in the column will be lost.
  - You are about to drop the column `ownerId` on the `folder` table. All the data in the column will be lost.
  - Added the required column `fileName` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `folderName` to the `Folder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Folder` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `file` DROP FOREIGN KEY `File_ownerId_fkey`;

-- DropForeignKey
ALTER TABLE `folder` DROP FOREIGN KEY `Folder_ownerId_fkey`;

-- AlterTable
ALTER TABLE `file` DROP COLUMN `ownerId`,
    ADD COLUMN `fileName` VARCHAR(191) NOT NULL,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `folder` DROP COLUMN `ownerId`,
    ADD COLUMN `folderName` VARCHAR(191) NOT NULL,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Folder` ADD CONSTRAINT `Folder_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `File` ADD CONSTRAINT `File_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
