-- Update admin user with proper bcrypt password
DELETE FROM `user` WHERE email = 'admin@example.com';

INSERT INTO `user` (`id`, `email`, `password`, `name`, `role`, `createdAt`, `updatedAt`) VALUES
('usr_admin', 'admin@example.com', '$2b$10$hg/3Na5XtFiYzZTo4AXOaOirjxXeznfObN/ulqwwBhwMAiv8uzAcO', 'Admin User', 'admin', NOW(), NOW());
