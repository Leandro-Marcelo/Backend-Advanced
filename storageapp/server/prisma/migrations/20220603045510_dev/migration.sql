/*
  Warnings:

  - You are about to drop the column `name` on the `file` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `folder` table. All the data in the column will be lost.
  - Added the required column `originalName` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `originalName` to the `Folder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `file` DROP COLUMN `name`,
    ADD COLUMN `originalName` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `folder` DROP COLUMN `name`,
    ADD COLUMN `originalName` VARCHAR(191) NOT NULL;
