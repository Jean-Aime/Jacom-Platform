USE jas_consulting;

ALTER TABLE `expert` ADD COLUMN `status` varchar(191) NOT NULL DEFAULT 'published' AFTER `featured`;

SELECT 'Expert status field added successfully!' as status;
