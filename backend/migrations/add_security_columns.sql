-- Add security columns to user table
ALTER TABLE `user` 
ADD COLUMN `failed_attempts` INT DEFAULT 0,
ADD COLUMN `locked_until` DATETIME NULL;

-- Add security columns to session table
ALTER TABLE `session` 
ADD COLUMN `ipAddress` VARCHAR(45) NULL,
ADD COLUMN `userAgent` TEXT NULL;