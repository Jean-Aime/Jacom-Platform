-- Update admin credentials
-- Email: admin@jacom.com
-- Password: Jacom123@

DELETE FROM `user` WHERE email IN ('admin@example.com', 'admin@jacom.com');

INSERT INTO `user` (`id`, `email`, `password`, `name`, `role`, `createdAt`, `updatedAt`) VALUES
('usr_admin', 'admin@jacom.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'JACOM Admin', 'admin', NOW(), NOW());
