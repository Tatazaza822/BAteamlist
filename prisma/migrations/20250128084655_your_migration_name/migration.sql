/*
  Warnings:

  - Made the column `Skill1` on table `student` required. This step will fail if there are existing NULL values in that column.
  - Made the column `Skill2` on table `student` required. This step will fail if there are existing NULL values in that column.
  - Made the column `Skill3` on table `student` required. This step will fail if there are existing NULL values in that column.
  - Made the column `Skill4` on table `student` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `student` MODIFY `Skill1` VARCHAR(191) NOT NULL,
    MODIFY `Skill2` VARCHAR(191) NOT NULL,
    MODIFY `Skill3` VARCHAR(191) NOT NULL,
    MODIFY `Skill4` VARCHAR(191) NOT NULL,
    MODIFY `Star` VARCHAR(191) NOT NULL,
    MODIFY `Level` VARCHAR(191) NOT NULL,
    MODIFY `E1` VARCHAR(191) NOT NULL,
    MODIFY `E2` VARCHAR(191) NOT NULL,
    MODIFY `E3` VARCHAR(191) NOT NULL;
