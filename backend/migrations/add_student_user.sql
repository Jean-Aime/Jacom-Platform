-- Add student user with proper bcrypt password
INSERT INTO `user` (`id`, `email`, `password`, `name`, `role`, `createdAt`, `updatedAt`) VALUES
('usr_student', 'student@example.com', '$2b$10$hg/3Na5XtFiYzZTo4AXOaOirjxXeznfObN/ulqwwBhwMAiv8uzAcO', 'Student User', 'student', NOW(), NOW());