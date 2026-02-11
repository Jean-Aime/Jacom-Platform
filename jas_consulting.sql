-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 11, 2026 at 12:44 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `jas_consulting`
--

-- --------------------------------------------------------

--
-- Table structure for table `application`
--

CREATE TABLE `application` (
  `id` varchar(191) NOT NULL,
  `careerId` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `phone` varchar(191) DEFAULT NULL,
  `linkedin` varchar(191) DEFAULT NULL,
  `resumeUrl` varchar(191) NOT NULL,
  `coverLetter` varchar(191) DEFAULT NULL,
  `status` varchar(191) NOT NULL DEFAULT 'pending',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `career`
--

CREATE TABLE `career` (
  `id` varchar(191) NOT NULL,
  `title` varchar(191) NOT NULL,
  `slug` varchar(191) NOT NULL,
  `department` varchar(191) NOT NULL,
  `location` varchar(191) NOT NULL,
  `type` varchar(191) NOT NULL,
  `experience` varchar(191) NOT NULL,
  `description` varchar(191) NOT NULL,
  `requirements` varchar(191) NOT NULL,
  `benefits` varchar(191) NOT NULL,
  `featured` tinyint(1) NOT NULL DEFAULT 0,
  `publishedAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `expiresAt` datetime(3) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `career`
--

INSERT INTO `career` (`id`, `title`, `slug`, `department`, `location`, `type`, `experience`, `description`, `requirements`, `benefits`, `featured`, `publishedAt`, `expiresAt`, `createdAt`, `updatedAt`) VALUES
('car1', 'Senior Consultant', 'senior-consultant', 'Consulting', 'New York, NY', 'Full-time', '5-7 years', 'Join our team as a Senior Consultant and help leading organizations solve their most complex challenges.', 'MBA or equivalent, 5+ years consulting experience, strong analytical skills', 'Competitive salary, health insurance, 401k, flexible work', 1, '2026-02-11 09:36:14.000', '2026-05-12 09:36:14.000', '2026-02-11 09:36:14.000', '2026-02-11 09:36:14.000'),
('car2', 'Data Scientist', 'data-scientist', 'Analytics', 'San Francisco, CA', 'Full-time', '3-5 years', 'We are seeking a talented Data Scientist to join our analytics practice.', 'MS in Data Science or related field, Python/R proficiency, ML experience', 'Competitive salary, stock options, health benefits, remote work', 1, '2026-02-11 09:36:14.000', '2026-05-12 09:36:14.000', '2026-02-11 09:36:14.000', '2026-02-11 09:36:14.000');

-- --------------------------------------------------------

--
-- Table structure for table `contentblock`
--

CREATE TABLE `contentblock` (
  `id` varchar(191) NOT NULL,
  `key` varchar(191) NOT NULL,
  `page` varchar(191) NOT NULL,
  `section` varchar(191) NOT NULL,
  `type` varchar(191) NOT NULL DEFAULT 'text',
  `content` text NOT NULL,
  `image` varchar(191) DEFAULT NULL,
  `order` int(11) NOT NULL DEFAULT 0,
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `contentblock`
--

INSERT INTO `contentblock` (`id`, `key`, `page`, `section`, `type`, `content`, `image`, `order`, `active`, `createdAt`, `updatedAt`) VALUES
('cb1', 'hero.title', 'home', 'hero', 'text', 'Transform Your Business with Expert Consulting', NULL, 1, 1, '2026-02-11 09:48:51.000', '2026-02-11 09:48:51.000'),
('cb2', 'hero.subtitle', 'home', 'hero', 'text', 'Strategic solutions that drive growth and innovation', NULL, 2, 1, '2026-02-11 09:48:51.000', '2026-02-11 09:48:51.000'),
('cb3', 'industry.title', 'home', 'industry', 'text', 'Industries We Serve', NULL, 1, 1, '2026-02-11 09:48:51.000', '2026-02-11 09:48:51.000'),
('cb4', 'stories.title', 'home', 'stories', 'text', 'Success Stories', NULL, 1, 1, '2026-02-11 09:48:51.000', '2026-02-11 09:48:51.000'),
('cb5', 'video.title', 'home', 'video', 'text', 'See How We Work', NULL, 1, 1, '2026-02-11 09:48:51.000', '2026-02-11 09:48:51.000'),
('cb6', 'cta.title', 'home', 'cta', 'text', 'Ready to Transform Your Business?', NULL, 1, 1, '2026-02-11 09:48:51.000', '2026-02-11 09:48:51.000'),
('cb7', 'cta.description', 'home', 'cta', 'text', 'Let us help you achieve your goals', NULL, 2, 1, '2026-02-11 09:48:51.000', '2026-02-11 09:48:51.000');

-- --------------------------------------------------------

--
-- Table structure for table `expert`
--

CREATE TABLE `expert` (
  `id` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `slug` varchar(191) NOT NULL,
  `role` varchar(191) NOT NULL,
  `bio` varchar(191) NOT NULL,
  `expertise` varchar(191) NOT NULL,
  `locations` varchar(191) NOT NULL,
  `image` varchar(191) DEFAULT NULL,
  `email` varchar(191) DEFAULT NULL,
  `linkedin` varchar(191) DEFAULT NULL,
  `featured` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `expert`
--

INSERT INTO `expert` (`id`, `name`, `slug`, `role`, `bio`, `expertise`, `locations`, `image`, `email`, `linkedin`, `featured`, `createdAt`, `updatedAt`) VALUES
('exp1', 'John Smith', 'john-smith', 'Senior Partner', 'Leading expert in digital transformation with 20+ years of experience', 'Digital Transformation, AI, Cloud', 'New York, London', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400', 'john.smith@example.com', 'https://linkedin.com/in/johnsmith', 1, '2026-02-11 09:36:14.000', '2026-02-11 09:36:14.000'),
('exp2', 'Sarah Johnson', 'sarah-johnson', 'Managing Director', 'Specializes in healthcare and life sciences consulting', 'Healthcare, Life Sciences, Strategy', 'Boston, San Francisco', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400', 'sarah.johnson@example.com', 'https://linkedin.com/in/sarahjohnson', 1, '2026-02-11 09:36:14.000', '2026-02-11 09:36:14.000');

-- --------------------------------------------------------

--
-- Table structure for table `industry`
--

CREATE TABLE `industry` (
  `id` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `slug` varchar(191) NOT NULL,
  `description` varchar(191) NOT NULL,
  `overview` varchar(191) NOT NULL,
  `challenges` varchar(191) NOT NULL,
  `trends` varchar(191) NOT NULL,
  `featured` tinyint(1) NOT NULL DEFAULT 0,
  `image` varchar(191) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `industry`
--

INSERT INTO `industry` (`id`, `name`, `slug`, `description`, `overview`, `challenges`, `trends`, `featured`, `image`, `createdAt`, `updatedAt`) VALUES
('ind1', 'Technology', 'technology', 'Leading technology companies through digital transformation', 'We help technology companies scale, innovate, and stay ahead of market disruption.', 'Rapid innovation cycles, talent acquisition, market competition', 'AI adoption, cloud migration, cybersecurity', 1, 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800', '2026-02-11 09:36:14.000', '2026-02-11 09:36:14.000'),
('ind2', 'Healthcare', 'healthcare', 'Transforming healthcare delivery and patient outcomes', 'Our healthcare practice helps organizations improve patient care while managing costs.', 'Regulatory compliance, cost management, digital adoption', 'Telemedicine, AI diagnostics, value-based care', 1, 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800', '2026-02-11 09:36:14.000', '2026-02-11 09:36:14.000'),
('ind3', 'Financial Services', 'financial-services', 'Modernizing financial services for the digital age', 'We partner with financial institutions to drive innovation and operational excellence.', 'Digital disruption, regulatory changes, customer expectations', 'Fintech, blockchain, open banking', 1, 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800', '2026-02-11 09:36:14.000', '2026-02-11 09:36:14.000'),
('ind4', 'IT Services & Software Development', 'it-services', 'Software development and IT professional recruitment for Japanese market', 'JACOM connects IT professionals with opportunities in Japan, focusing on software engineers, data scientists, and cybersecurity experts. We support J-Find visa holders and provide training in', '[\"Tech talent shortage\", \"Rapid technology evolution\", \"Cybersecurity threats\", \"Legacy system modernization\", \"Remote work infrastructure\"]', '[\"AI and machine learning\", \"Cloud-first strategies\", \"DevOps automation\", \"Low-code platforms\", \"Quantum computing readiness\"]', 0, 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800', '2026-02-11 09:48:51.000', '2026-02-11 09:48:51.000'),
('ind5', 'Manufacturing & Industry 4.0', 'manufacturing', 'Smart factory solutions and industrial automation consulting', 'JACOM delivers Industry 4.0 transformation through IoT integration, predictive maintenance, and smart factory design. We specialize in production management, quality control systems, and mech', '[\"Supply chain disruptions\", \"Automation investment costs\", \"Skills gap in workforce\", \"Quality control consistency\", \"Sustainability requirements\"]', '[\"Smart factories\", \"Digital twins\", \"Predictive maintenance\", \"Collaborative robots\", \"Sustainable manufacturing\"]', 0, 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800', '2026-02-11 09:48:51.000', '2026-02-11 09:48:51.000'),
('ind6', 'Education & Training', 'education-training', 'Professional development and technical training programs', 'JACOM offers customized training programs including web development bootcamps, technical skills training, and professional certifications. We provide both online live sessions and face-to-fac', '[\"Digital literacy gaps\", \"Curriculum relevance\", \"Student engagement\", \"Certification standards\", \"Access to quality education\"]', '[\"EdTech platforms\", \"Hybrid learning models\", \"Micro-credentials\", \"Personalized learning paths\", \"Industry-aligned curricula\"]', 0, 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800', '2026-02-11 09:48:51.000', '2026-02-11 09:48:51.000'),
('ind7', 'Energy & Utilities', 'energy-utilities', 'Renewable energy systems and smart grid solutions', 'JACOM provides renewable energy consulting including solar and wind power generation equipment design, VPP and EMS system innovation, and smart grid infrastructure. We specialize in energy ma', '[\"Grid modernization costs\", \"Renewable integration\", \"Energy storage solutions\", \"Regulatory compliance\", \"Asset optimization\"]', '[\"Clean energy transition\", \"Smart grids\", \"Energy storage systems\", \"Carbon neutrality goals\", \"Distributed energy resources\"]', 0, 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800', '2026-02-11 09:48:51.000', '2026-02-11 09:48:51.000'),
('ind8', 'Real Estate & Infrastructure', 'real-estate-infrastructure', 'Smart building systems and infrastructure development', 'JACOM designs intelligent building systems including access control, security surveillance, electrical equipment, and utility systems. We provide comprehensive infrastructure solutions for ho', '[\"Aging infrastructure\", \"Smart building integration\", \"Energy efficiency standards\", \"Security requirements\", \"Maintenance costs\"]', '[\"Smart buildings\", \"Green construction\", \"IoT-enabled facilities\", \"Predictive maintenance\", \"Sustainable design\"]', 0, 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800', '2026-02-11 09:48:51.000', '2026-02-11 09:48:51.000');

-- --------------------------------------------------------

--
-- Table structure for table `insight`
--

CREATE TABLE `insight` (
  `id` varchar(191) NOT NULL,
  `title` varchar(191) NOT NULL,
  `slug` varchar(191) NOT NULL,
  `type` varchar(191) NOT NULL,
  `content` varchar(191) NOT NULL,
  `excerpt` varchar(191) NOT NULL,
  `featured` tinyint(1) NOT NULL DEFAULT 0,
  `trending` tinyint(1) NOT NULL DEFAULT 0,
  `gated` tinyint(1) NOT NULL DEFAULT 0,
  `downloadUrl` varchar(191) DEFAULT NULL,
  `image` varchar(191) DEFAULT NULL,
  `readTime` int(11) NOT NULL,
  `status` varchar(191) NOT NULL DEFAULT 'draft',
  `scheduledAt` datetime(3) DEFAULT NULL,
  `publishedAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `authorId` varchar(191) NOT NULL,
  `topics` varchar(191) NOT NULL,
  `regions` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `insight`
--

INSERT INTO `insight` (`id`, `title`, `slug`, `type`, `content`, `excerpt`, `featured`, `trending`, `gated`, `downloadUrl`, `image`, `readTime`, `status`, `scheduledAt`, `publishedAt`, `createdAt`, `updatedAt`, `authorId`, `topics`, `regions`) VALUES
('ins1', 'The Future of AI in Business', 'future-of-ai-in-business', 'Article', 'Artificial Intelligence is transforming how businesses operate. This comprehensive guide explores the latest trends and practical applications of AI in modern enterprises.', 'Discover how AI is reshaping business operations and creating new opportunities for growth.', 1, 1, 0, NULL, 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800', 8, 'published', NULL, '2026-02-11 09:36:14.000', '2026-02-11 09:36:14.000', '2026-02-11 09:36:14.000', 'exp1', 'AI,Technology,Innovation', 'Global,North America'),
('ins2', 'Healthcare Digital Transformation Guide', 'healthcare-digital-transformation', 'Report', 'A complete guide to digital transformation in healthcare, covering telemedicine, AI diagnostics, and patient data management.', 'Learn how healthcare organizations are leveraging technology to improve patient outcomes.', 1, 0, 0, NULL, 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800', 12, 'published', NULL, '2026-02-11 09:36:14.000', '2026-02-11 09:36:14.000', '2026-02-11 09:36:14.000', 'exp2', 'Healthcare,Digital,Innovation', 'Global,Europe');

-- --------------------------------------------------------

--
-- Table structure for table `lead`
--

CREATE TABLE `lead` (
  `id` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `company` varchar(191) DEFAULT NULL,
  `phone` varchar(191) DEFAULT NULL,
  `message` varchar(191) DEFAULT NULL,
  `source` varchar(191) NOT NULL,
  `metadata` varchar(191) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `mediaitem`
--

CREATE TABLE `mediaitem` (
  `id` varchar(191) NOT NULL,
  `title` varchar(191) NOT NULL,
  `slug` varchar(191) NOT NULL,
  `type` varchar(191) NOT NULL,
  `content` varchar(191) NOT NULL,
  `excerpt` varchar(191) NOT NULL,
  `featured` tinyint(1) NOT NULL DEFAULT 0,
  `image` varchar(191) DEFAULT NULL,
  `attachments` varchar(191) NOT NULL,
  `status` varchar(191) NOT NULL DEFAULT 'draft',
  `scheduledAt` datetime(3) DEFAULT NULL,
  `publishedAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `office`
--

CREATE TABLE `office` (
  `id` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `slug` varchar(191) NOT NULL,
  `region` varchar(191) NOT NULL,
  `country` varchar(191) NOT NULL,
  `city` varchar(191) NOT NULL,
  `address` varchar(191) NOT NULL,
  `phone` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `lat` double NOT NULL,
  `lng` double NOT NULL,
  `image` varchar(191) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `office`
--

INSERT INTO `office` (`id`, `name`, `slug`, `region`, `country`, `city`, `address`, `phone`, `email`, `lat`, `lng`, `image`, `createdAt`, `updatedAt`) VALUES
('off1', 'New York Office', 'new-york', 'North America', 'United States', 'New York', '123 Fifth Avenue, New York, NY 10001', '+1 (212) 555-0100', 'newyork@example.com', 40.7484, -73.9857, 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800', '2026-02-11 09:36:14.000', '2026-02-11 09:36:14.000'),
('off2', 'London Office', 'london', 'Europe', 'United Kingdom', 'London', '1 Canary Wharf, London E14 5AB', '+44 20 7946 0958', 'london@example.com', 51.5074, -0.1278, 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800', '2026-02-11 09:36:14.000', '2026-02-11 09:36:14.000'),
('off3', 'Singapore Office', 'singapore', 'Asia Pacific', 'Singapore', 'Singapore', '1 Marina Boulevard, Singapore 018989', '+65 6123 4567', 'singapore@example.com', 1.2789, 103.8508, 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800', '2026-02-11 09:36:14.000', '2026-02-11 09:36:14.000');

-- --------------------------------------------------------

--
-- Table structure for table `service`
--

CREATE TABLE `service` (
  `id` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `slug` varchar(191) NOT NULL,
  `description` varchar(191) NOT NULL,
  `overview` varchar(191) NOT NULL,
  `methodologies` varchar(191) NOT NULL,
  `tools` varchar(191) NOT NULL,
  `featured` tinyint(1) NOT NULL DEFAULT 0,
  `image` varchar(191) DEFAULT NULL,
  `status` varchar(191) NOT NULL DEFAULT 'published',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `service`
--

INSERT INTO `service` (`id`, `name`, `slug`, `description`, `overview`, `methodologies`, `tools`, `featured`, `image`, `status`, `createdAt`, `updatedAt`) VALUES
('srv1', 'Digital Transformation', 'digital-transformation', 'End-to-end digital transformation services', 'We help organizations reimagine their business models and operations for the digital age.', 'Agile, Design Thinking, Lean', 'Cloud platforms, AI/ML, Analytics', 1, 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800', 'published', '2026-02-11 09:36:14.000', '2026-02-11 09:36:14.000'),
('srv2', 'Strategy Consulting', 'strategy-consulting', 'Strategic planning and execution', 'Our strategy practice helps leaders make bold decisions and achieve sustainable growth.', 'Strategic Planning, Market Analysis, Competitive Intelligence', 'Business Intelligence, Analytics, Forecasting', 1, 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800', 'published', '2026-02-11 09:36:14.000', '2026-02-11 09:36:14.000'),
('srv3', 'Operations Excellence', 'operations-excellence', 'Operational efficiency and optimization', 'We help organizations streamline operations and maximize efficiency.', 'Lean Six Sigma, Process Mining, Automation', 'RPA, Process Analytics, Workflow Tools', 1, 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800', 'published', '2026-02-11 09:36:14.000', '2026-02-11 09:36:14.000'),
('srv4', 'Smart Factory & Industry 4.0', 'smart-factory', 'Industrial automation and smart manufacturing solutions', 'Design and implementation of smart factory systems with IoT integration, predictive maintenance, and production optimization. Expertise in sensors, actuators, robotics, and embedded systems.', '[\"Factory automation\", \"Process optimization\", \"Quality control\", \"Predictive analytics\"]', '[\"Industrial IoT\", \"Robotics\", \"SCADA systems\", \"MES platforms\"]', 0, 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=800', 'published', '2026-02-11 09:48:52.000', '2026-02-11 09:48:52.000'),
('srv5', 'Renewable Energy Systems', 'renewable-energy', 'Solar, wind power generation and smart grid solutions', 'Renewable energy consulting including equipment design, VPP and EMS system innovation, remote monitoring, and control automation for sustainable energy transition.', '[\"Energy assessment\", \"System design\", \"Grid integration\", \"Performance monitoring\"]', '[\"Solar PV systems\", \"Wind turbines\", \"Energy storage\", \"Smart meters\"]', 0, 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800', 'published', '2026-02-11 09:48:52.000', '2026-02-11 09:48:52.000'),
('srv6', 'Smart Building & Infrastructure', 'smart-building', 'Intelligent building systems and security solutions', 'Design of smart building systems including access control, security surveillance, electrical equipment, and utility systems for hotels, hospitals, and commercial facilities.', '[\"Building automation\", \"Security design\", \"Energy management\", \"Facility optimization\"]', '[\"Access control systems\", \"CCTV\", \"BMS platforms\", \"IoT sensors\"]', 0, 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800', 'published', '2026-02-11 09:48:52.000', '2026-02-11 09:48:52.000'),
('srv7', 'Web Development Training', 'web-development-training', 'Professional web development bootcamps and certifications', 'Comprehensive training programs in HTML, CSS, JavaScript, React, and Node.js. Both online live sessions and face-to-face training for career development in Japan.', '[\"Project-based learning\", \"Hands-on coding\", \"Portfolio development\", \"Job placement support\"]', '[\"VS Code\", \"Git/GitHub\", \"React\", \"Node.js\", \"MongoDB\"]', 0, 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800', 'published', '2026-02-11 09:48:52.000', '2026-02-11 09:48:52.000'),
('srv8', 'Financial Advisory & Investment', 'financial-advisory', 'Tax management, asset management, and ESG investment consulting', 'Financial consulting services including tax management, asset management, risk assessment, and ESG investment strategies to support business growth and sustainability.', '[\"Financial planning\", \"Risk assessment\", \"Portfolio management\", \"ESG analysis\"]', '[\"Financial modeling tools\", \"Risk management software\", \"Portfolio trackers\", \"ESG metrics\"]', 0, 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800', 'published', '2026-02-11 09:48:52.000', '2026-02-11 09:48:52.000'),
('srv9', 'Project Management Office (PMO)', 'pmo-services', 'PMO setup and project management consulting', 'Establish and optimize Project Management Offices for Japanese enterprises. Support for project planning, progress tracking, resource allocation, and risk management.', '[\"PMO framework\", \"Agile/Scrum\", \"Risk management\", \"Stakeholder management\"]', '[\"Project management software\", \"Collaboration tools\", \"Reporting dashboards\", \"Resource planning\"]', 0, 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800', 'published', '2026-02-11 09:48:52.000', '2026-02-11 09:48:52.000');

-- --------------------------------------------------------

--
-- Table structure for table `session`
--

CREATE TABLE `session` (
  `id` varchar(191) NOT NULL,
  `token` varchar(191) NOT NULL,
  `userId` varchar(191) NOT NULL,
  `expiresAt` datetime(3) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `session`
--

INSERT INTO `session` (`id`, `token`, `userId`, `expiresAt`, `createdAt`) VALUES
('cmlhqkkvd0001d7kp7kj6xdp2', '7086bb4f54380981c0a3f3b324c6353460671d2ea5372a545f2a49764591da03', 'usr_admin', '2026-02-12 07:56:34.334', '2026-02-11 07:56:34.337');

-- --------------------------------------------------------

--
-- Table structure for table `subservice`
--

CREATE TABLE `subservice` (
  `id` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `description` varchar(191) NOT NULL,
  `serviceId` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `role` varchar(191) NOT NULL DEFAULT 'admin',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `email`, `password`, `name`, `role`, `createdAt`, `updatedAt`) VALUES
('usr_admin', 'admin@jacom.com', '$2y$10$YY42CQHid/i3WShSdz4j9eOjkpldtMM12QNHMj3AVtsRUFRd4k/UK', 'JACOM Admin', 'admin', '2026-02-11 09:55:53.000', '2026-02-11 09:55:53.000');

-- --------------------------------------------------------

--
-- Table structure for table `_experttoindustry`
--

CREATE TABLE `_experttoindustry` (
  `A` varchar(191) NOT NULL,
  `B` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `_experttoservice`
--

CREATE TABLE `_experttoservice` (
  `A` varchar(191) NOT NULL,
  `B` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `_industrytoinsight`
--

CREATE TABLE `_industrytoinsight` (
  `A` varchar(191) NOT NULL,
  `B` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `_industrytoservice`
--

CREATE TABLE `_industrytoservice` (
  `A` varchar(191) NOT NULL,
  `B` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `_insighttoservice`
--

CREATE TABLE `_insighttoservice` (
  `A` varchar(191) NOT NULL,
  `B` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('b2b0baaa-6025-4426-b71c-b3726e4c17b1', 'b5e7a060137442d0f2a7d641ae5acd2d560b3afdfe0942d5dee23f22e57f74eb', '2026-01-29 20:39:46.994', '20260129203938_add_workflow_fields', NULL, NULL, '2026-01-29 20:39:38.157', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `application`
--
ALTER TABLE `application`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Application_careerId_fkey` (`careerId`);

--
-- Indexes for table `career`
--
ALTER TABLE `career`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Career_slug_key` (`slug`);

--
-- Indexes for table `contentblock`
--
ALTER TABLE `contentblock`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `ContentBlock_key_key` (`key`),
  ADD KEY `ContentBlock_page_section_idx` (`page`,`section`);

--
-- Indexes for table `expert`
--
ALTER TABLE `expert`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Expert_slug_key` (`slug`);

--
-- Indexes for table `industry`
--
ALTER TABLE `industry`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Industry_slug_key` (`slug`);

--
-- Indexes for table `insight`
--
ALTER TABLE `insight`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Insight_slug_key` (`slug`),
  ADD KEY `Insight_authorId_fkey` (`authorId`);

--
-- Indexes for table `lead`
--
ALTER TABLE `lead`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mediaitem`
--
ALTER TABLE `mediaitem`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `MediaItem_slug_key` (`slug`);

--
-- Indexes for table `office`
--
ALTER TABLE `office`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Office_slug_key` (`slug`);

--
-- Indexes for table `service`
--
ALTER TABLE `service`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Service_slug_key` (`slug`);

--
-- Indexes for table `session`
--
ALTER TABLE `session`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Session_token_key` (`token`),
  ADD KEY `Session_token_idx` (`token`),
  ADD KEY `Session_userId_idx` (`userId`),
  ADD KEY `Session_userId_fkey` (`userId`);

--
-- Indexes for table `subservice`
--
ALTER TABLE `subservice`
  ADD PRIMARY KEY (`id`),
  ADD KEY `SubService_serviceId_fkey` (`serviceId`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `User_email_key` (`email`);

--
-- Indexes for table `_experttoindustry`
--
ALTER TABLE `_experttoindustry`
  ADD UNIQUE KEY `_ExpertToIndustry_AB_unique` (`A`,`B`),
  ADD KEY `_ExpertToIndustry_B_index` (`B`);

--
-- Indexes for table `_experttoservice`
--
ALTER TABLE `_experttoservice`
  ADD UNIQUE KEY `_ExpertToService_AB_unique` (`A`,`B`),
  ADD KEY `_ExpertToService_B_index` (`B`);

--
-- Indexes for table `_industrytoinsight`
--
ALTER TABLE `_industrytoinsight`
  ADD UNIQUE KEY `_IndustryToInsight_AB_unique` (`A`,`B`),
  ADD KEY `_IndustryToInsight_B_index` (`B`);

--
-- Indexes for table `_industrytoservice`
--
ALTER TABLE `_industrytoservice`
  ADD UNIQUE KEY `_IndustryToService_AB_unique` (`A`,`B`),
  ADD KEY `_IndustryToService_B_index` (`B`);

--
-- Indexes for table `_insighttoservice`
--
ALTER TABLE `_insighttoservice`
  ADD UNIQUE KEY `_InsightToService_AB_unique` (`A`,`B`),
  ADD KEY `_InsightToService_B_index` (`B`);

--
-- Indexes for table `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `application`
--
ALTER TABLE `application`
  ADD CONSTRAINT `Application_careerId_fkey` FOREIGN KEY (`careerId`) REFERENCES `career` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `insight`
--
ALTER TABLE `insight`
  ADD CONSTRAINT `Insight_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `expert` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `session`
--
ALTER TABLE `session`
  ADD CONSTRAINT `Session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `subservice`
--
ALTER TABLE `subservice`
  ADD CONSTRAINT `SubService_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `service` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `_experttoindustry`
--
ALTER TABLE `_experttoindustry`
  ADD CONSTRAINT `_ExpertToIndustry_A_fkey` FOREIGN KEY (`A`) REFERENCES `expert` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `_ExpertToIndustry_B_fkey` FOREIGN KEY (`B`) REFERENCES `industry` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `_experttoservice`
--
ALTER TABLE `_experttoservice`
  ADD CONSTRAINT `_ExpertToService_A_fkey` FOREIGN KEY (`A`) REFERENCES `expert` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `_ExpertToService_B_fkey` FOREIGN KEY (`B`) REFERENCES `service` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `_industrytoinsight`
--
ALTER TABLE `_industrytoinsight`
  ADD CONSTRAINT `_IndustryToInsight_A_fkey` FOREIGN KEY (`A`) REFERENCES `industry` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `_IndustryToInsight_B_fkey` FOREIGN KEY (`B`) REFERENCES `insight` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `_industrytoservice`
--
ALTER TABLE `_industrytoservice`
  ADD CONSTRAINT `_IndustryToService_A_fkey` FOREIGN KEY (`A`) REFERENCES `industry` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `_IndustryToService_B_fkey` FOREIGN KEY (`B`) REFERENCES `service` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `_insighttoservice`
--
ALTER TABLE `_insighttoservice`
  ADD CONSTRAINT `_InsightToService_A_fkey` FOREIGN KEY (`A`) REFERENCES `insight` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `_InsightToService_B_fkey` FOREIGN KEY (`B`) REFERENCES `service` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
