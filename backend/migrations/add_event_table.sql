USE jas_consulting;

CREATE TABLE IF NOT EXISTS `event` (
  `id` varchar(191) NOT NULL,
  `title` varchar(500) NOT NULL,
  `slug` varchar(191) NOT NULL UNIQUE,
  `date` date NOT NULL,
  `time` varchar(191) NOT NULL,
  `type` varchar(191) NOT NULL DEFAULT 'webinar',
  `description` text,
  `image` varchar(500),
  `registerUrl` varchar(500),
  `featured` tinyint(1) NOT NULL DEFAULT 0,
  `status` varchar(191) NOT NULL DEFAULT 'published',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT current_timestamp(3) ON UPDATE current_timestamp(3),
  PRIMARY KEY (`id`),
  KEY `Event_slug_key` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `event` (`id`, `title`, `slug`, `date`, `time`, `type`, `description`, `image`, `registerUrl`, `featured`, `status`) VALUES
('evt1', 'Mastering AI-Prep: Step-by-Step for Japan', 'mastering-ai-prep', '2025-01-24', '2:00 PM JST', 'webinar', 'Learn how to prepare for AI implementation in Japanese business context', 'https://images.unsplash.com/photo-1591453089816-0fbb971b454c?w=800', '#', 1, 'published'),
('evt2', '2025 Manufacturing Tech Roundtable', 'manufacturing-tech-roundtable', '2025-02-08', '10:00 AM JST', 'roundtable', 'Industry leaders discuss the future of manufacturing technology', 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800', '#', 1, 'published');

SELECT 'Event table created successfully!' as status;
