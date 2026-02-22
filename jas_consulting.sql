-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 20, 2026 at 07:56 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

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
-- Table structure for table `academy_batch`
--

CREATE TABLE `academy_batch` (
  `id` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `startDate` datetime(3) NOT NULL,
  `endDate` datetime(3) NOT NULL,
  `capacity` int(11) NOT NULL,
  `enrolled` int(11) NOT NULL DEFAULT 0,
  `status` varchar(191) NOT NULL DEFAULT 'active',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT current_timestamp(3) ON UPDATE current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `academy_student`
--

CREATE TABLE `academy_student` (
  `id` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `batch` varchar(191) NOT NULL,
  `progress` int(11) NOT NULL DEFAULT 0,
  `status` varchar(191) NOT NULL DEFAULT 'active',
  `enrolledAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT current_timestamp(3) ON UPDATE current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `academy_student`
--

INSERT INTO `academy_student` (`id`, `name`, `email`, `batch`, `progress`, `status`, `enrolledAt`, `createdAt`, `updatedAt`) VALUES
('stu1', 'Satoshi Nakamoto', 'sat@bitcoin.org', 'Feb 2023 - Core', 65, 'active', '2026-02-17 12:00:47.000', '2026-02-17 12:00:47.000', '2026-02-17 12:04:02.000'),
('stu2', 'Yuki Kimura', 'yuki.k@example.com', 'June 2023 - Adv', 32, 'active', '2026-02-17 12:00:47.000', '2026-02-17 12:00:47.000', '2026-02-17 12:04:02.000'),
('stu3', 'Hina Sato', 'hina.s@example.com', 'Feb 2023 - Core', 92, 'completed', '2026-02-17 12:00:47.000', '2026-02-17 12:00:47.000', '2026-02-17 12:04:02.000');

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
  `coverLetter` text DEFAULT NULL,
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
  `description` text NOT NULL,
  `requirements` text NOT NULL,
  `benefits` text NOT NULL,
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
('car1', 'Senior Consultant', 'senior-consultant', 'Consulting', 'New York, NY', 'Full-time', '5-7 years', 'Join our team as a Senior Consultant and help leading organizations solve their most complex challenges.', 'MBA or equivalent, 5+ years consulting experience, strong analytical skills', 'Competitive salary, health insurance, 401k, flexible work', 1, '2026-02-16 13:51:57.000', '2026-05-17 13:51:57.000', '2026-02-16 13:51:57.000', '2026-02-16 13:51:57.000'),
('car2', 'Data Scientist', 'data-scientist', 'Analytics', 'San Francisco, CA', 'Full-time', '3-5 years', 'We are seeking a talented Data Scientist to join our analytics practice.', 'MS in Data Science or related field, Python/R proficiency, ML experience', 'Competitive salary, stock options, health benefits, remote work', 1, '2026-02-16 13:51:57.000', '2026-05-17 13:51:57.000', '2026-02-16 13:51:57.000', '2026-02-16 13:51:57.000');

-- --------------------------------------------------------

--
-- Table structure for table `casestudy`
--

CREATE TABLE `casestudy` (
  `id` varchar(50) NOT NULL,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `company` varchar(255) NOT NULL,
  `industry` varchar(255) DEFAULT NULL,
  `challenge` text NOT NULL,
  `solution` text NOT NULL,
  `results` text NOT NULL,
  `quote` text DEFAULT NULL,
  `author` varchar(255) DEFAULT NULL,
  `authorRole` varchar(255) DEFAULT NULL,
  `image` text DEFAULT NULL,
  `featured` tinyint(1) DEFAULT 0,
  `status` enum('draft','published') DEFAULT 'published',
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `casestudy`
--

INSERT INTO `casestudy` (`id`, `title`, `slug`, `company`, `industry`, `challenge`, `solution`, `results`, `quote`, `author`, `authorRole`, `image`, `featured`, `status`, `createdAt`, `updatedAt`) VALUES
('cs1', 'Smart Factory Implementation', 'smart-factory-implementation', 'Manufacturing Company', 'Manufacturing', 'Low production efficiency, high defect rates, frequent equipment downtime, and limited real-time visibility were major challenges affecting operational performance.', 'Deployed IoT sensor network, implemented real-time monitoring system, predictive maintenance, quality control automation, and data analytics platform.', '40% efficiency improvement, 30% reduction in defects, 25% decrease in downtime, $2M annual cost savings. Technologies: Industrial IoT sensors, SCADA systems, Machine learning algorithms, Cloud-based analytics.', 'The IoT implementation transformed our operations. Real-time visibility and predictive maintenance have been game-changers for our production efficiency.', 'Operations Director', 'Manufacturing Company', 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800', 1, 'published', '2026-02-19 11:20:16', '2026-02-19 11:20:16'),
('cs2', 'Renewable Energy System Design', 'renewable-energy-system', 'Energy Company', 'Energy & Utilities', 'High energy costs, unreliable grid power, carbon emission targets, and limited technical expertise posed significant challenges for sustainable operations.', 'Designed solar power systems, integrated battery storage, implemented energy management system, grid integration, and comprehensive staff training program.', '500+ installations completed, 50% energy cost reduction, 60% carbon footprint reduction, energy independence achieved. Technologies: Solar PV systems, Li-ion battery storage, Smart inverters, IoT monitoring platform.', 'JACOM helped us achieve energy independence while significantly reducing our carbon footprint. The training program ensured our team could maintain the systems effectively.', 'Sustainability Manager', 'Energy Company', 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800', 1, 'published', '2026-02-19 11:20:16', '2026-02-19 11:20:16'),
('cs3', 'Nepal-Japan Recruitment Program', 'nepal-japan-recruitment', 'Hospitality Group', 'Hospitality & Tourism', 'Staff shortages, high turnover rates, language barriers, and cultural adaptation issues were impacting service quality and operational efficiency.', 'Established recruitment pipeline from Nepal, provided Japanese language training (JLPT N3/N4), cultural orientation program, cooking training for chefs, and ongoing support services.', '200+ successful placements, 95% retention rate, enhanced service quality, improved guest satisfaction. Program: 8-day intensive cooking training, 6-month language preparation, Cultural orientation workshops, Visa processing support.', 'The comprehensive training and support from JACOM has been exceptional. Our staff are well-prepared and the retention rate speaks for itself.', 'HR Director', 'Hospitality Group', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', 1, 'published', '2026-02-19 11:20:16', '2026-02-19 11:20:16'),
('cs4', 'Tax Management Empowerment', 'tax-management-empowerment', 'Public Sector Organization', 'Financial Services', 'Complex tax regulations, compliance gaps, limited staff capacity, and manual processes were creating inefficiencies and compliance risks.', 'Implemented tax management framework, staff training program, process automation, compliance monitoring system, and ongoing advisory support.', '100% compliance achieved, 60% reduction in processing time, enhanced staff capabilities, improved revenue collection.', 'The tax management framework and training transformed our operations. We now have full compliance and significantly improved efficiency.', 'Finance Director', 'Public Sector Organization', 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800', 0, 'published', '2026-02-19 11:20:16', '2026-02-19 11:20:16'),
('cs5', 'Web Development Training Program', 'web-development-bootcamp', 'Career Transition Candidates', 'Education & Training', 'Career change aspirations, limited technical skills, need for practical experience, and job market competitiveness were barriers to career transformation.', 'Delivered 12-week intensive bootcamp covering HTML, CSS, JavaScript, React, Node.js, Express, portfolio development, and job placement support.', '85% course completion rate, 90% job placement rate, average salary increase of 150%, career transformation achieved. Program Phases: HTML/CSS/Bootstrap, JavaScript fundamentals, Full-stack development.', 'The bootcamp completely transformed my career. The hands-on approach and job placement support made all the difference.', 'Program Graduate', 'Career Transition Candidate', 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800', 0, 'published', '2026-02-19 11:20:16', '2026-02-19 11:20:16');

-- --------------------------------------------------------

--
-- Table structure for table `case_study`
--

CREATE TABLE `case_study` (
  `id` varchar(191) NOT NULL,
  `title` varchar(191) NOT NULL,
  `slug` varchar(191) NOT NULL,
  `client` varchar(191) NOT NULL,
  `industry` varchar(191) NOT NULL,
  `challenge` text NOT NULL,
  `solution` text NOT NULL,
  `results` text NOT NULL,
  `metrics` text DEFAULT NULL,
  `image` varchar(191) DEFAULT NULL,
  `featured` tinyint(1) NOT NULL DEFAULT 0,
  `publishedAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT current_timestamp(3) ON UPDATE current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `communitycategory`
--

CREATE TABLE `communitycategory` (
  `id` varchar(50) NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `icon` text DEFAULT NULL,
  `content` longtext DEFAULT NULL,
  `articles` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`articles`)),
  `featured` tinyint(1) DEFAULT 0,
  `order` int(11) DEFAULT 0,
  `status` enum('draft','published') DEFAULT 'published',
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `communitycategory`
--

INSERT INTO `communitycategory` (`id`, `name`, `slug`, `description`, `icon`, `content`, `articles`, `featured`, `order`, `status`, `createdAt`, `updatedAt`) VALUES
('cc1', 'Job Market & Career Development', 'job-market', 'Navigate your career journey with expert guidance on job markets, visa processes, and professional development', 'briefcase', 'Expert insights on navigating the Japanese job market, visa processes, and career development strategies. Our comprehensive guides cover everything from J-Find visa applications to interview preparation and understanding Japanese corporate culture.', '[\r\n  {\"title\": \"The Evolving Japanese Consulting Market and Digital Transformation\", \"description\": \"Industry overview and trends, essential skills for consultants, career paths and compensation, impact of AI on consulting\"},\r\n  {\"title\": \"Ultimate Guide to Job Searching with J-Find Visa\", \"description\": \"J-Find visa overview and application, job search strategies, interview preparation, life in Japan\"},\r\n  {\"title\": \"Navigating the Interview Process in Japanese Companies for Sogo-Shoku Positions\", \"description\": \"Interview etiquette, common questions, cultural considerations, success strategies\"},\r\n  {\"title\": \"Employment Opportunities in Specific Industries\", \"description\": \"IT industry opportunities, manufacturing sector, education industry, trade and logistics, financial services\"},\r\n  {\"title\": \"Understanding Japanese Corporate Culture\", \"description\": \"Workplace etiquette, communication styles, Hō-Ren-Sō (Reporting, Contacting, Consulting), teamwork and individual roles\"}\r\n]', 1, 1, 'published', '2026-02-19 09:26:33', '2026-02-19 09:26:33'),
('cc2', 'Technology & Innovation', 'technology-innovation', 'Explore cutting-edge technologies and innovation strategies transforming industries', 'cpu', 'Discover the latest in IoT, AI, smart factories, and renewable energy systems. Our technology insights help you stay ahead of digital transformation trends and implement cutting-edge solutions.', '[\r\n  {\"title\": \"IoT Platform Integration: Best Practices and Implementation\", \"description\": \"Platform architecture, device integration, security frameworks, case studies\"},\r\n  {\"title\": \"Smart Factory Implementation: A Complete Guide\", \"description\": \"Industry 4.0 technologies, automation strategies, ROI calculation, implementation roadmap\"},\r\n  {\"title\": \"Renewable Energy Systems: Design and Integration\", \"description\": \"Solar power systems, wind energy solutions, energy storage, grid integration\"},\r\n  {\"title\": \"Embedded Systems Development for IoT Applications\", \"description\": \"Hardware design, firmware development, communication protocols, security considerations\"},\r\n  {\"title\": \"AI and Machine Learning in Business Applications\", \"description\": \"Use cases across industries, implementation strategies, data requirements, ROI expectations\"}\r\n]', 1, 2, 'published', '2026-02-19 09:26:33', '2026-02-19 09:26:33'),
('cc3', 'Business Strategy & Consulting', 'business-strategy', 'Strategic insights for business growth, transformation, and competitive advantage', 'chart-bar', 'Comprehensive business strategy frameworks, digital transformation methodologies, and consulting best practices. Learn how to develop winning strategies and drive organizational change.', '[\r\n  {\"title\": \"Digital Transformation Strategy: A Practical Framework\", \"description\": \"Assessment and planning, technology selection, change management, measuring success\"},\r\n  {\"title\": \"Economic Development and Physical Regeneration\", \"description\": \"Regional development strategies, infrastructure planning, investment attraction, impact measurement\"},\r\n  {\"title\": \"Business Case Development: From Concept to Approval\", \"description\": \"Market research methods, financial modeling, risk assessment, stakeholder engagement\"},\r\n  {\"title\": \"Monitoring and Evaluation: Demonstrating Impact\", \"description\": \"Evaluation frameworks, data collection methods, impact assessment, continuous improvement\"},\r\n  {\"title\": \"Securing Funding in a Competitive Environment\", \"description\": \"Funding sources, proposal development, bid writing strategies, success factors\"}\r\n]', 1, 3, 'published', '2026-02-19 09:26:33', '2026-02-19 09:26:33'),
('cc4', 'Financial Management & Risk', 'financial-management', 'Expert guidance on financial strategy, risk management, and compliance', 'currency-dollar', 'Master financial advisory, risk management, and tax optimization strategies. Our expert insights help you navigate complex financial landscapes and ensure compliance.', '[\r\n  {\"title\": \"Risk Management Framework: Credit, Market, and Operational Risk\", \"description\": \"Risk identification, assessment methodologies, mitigation strategies, monitoring and reporting\"},\r\n  {\"title\": \"Tax Management and Optimization Strategies\", \"description\": \"Tax planning approaches, compliance requirements, international considerations, case studies\"},\r\n  {\"title\": \"Financial Advisory for Growth Companies\", \"description\": \"Capital structure optimization, funding strategies, M&A considerations, valuation methods\"},\r\n  {\"title\": \"Asset Management Best Practices\", \"description\": \"Portfolio optimization, performance management, lifecycle management, technology enablement\"}\r\n]', 0, 4, 'published', '2026-02-19 09:26:33', '2026-02-19 09:26:33'),
('cc5', 'Recruitment & Training', 'recruitment-training', 'Insights on talent acquisition, training programs, and workforce development', 'users', 'Comprehensive recruitment strategies and training programs connecting talent across borders. From Nepal to Japan recruitment to professional development programs.', '[\r\n  {\"title\": \"Nepal to Japan Recruitment: Complete Guide\", \"description\": \"Recruitment process, training programs, visa processing, success stories\"},\r\n  {\"title\": \"Japanese Language Training for Professionals\", \"description\": \"JLPT preparation (N3/N4), business Japanese, cultural communication, learning resources\"},\r\n  {\"title\": \"Cooking Training Program: From Nepal to Japanese Kitchens\", \"description\": \"Program overview, curriculum details, success metrics, career opportunities\"},\r\n  {\"title\": \"Web Development Bootcamp: Career Transformation\", \"description\": \"Program structure, technologies covered, portfolio development, job placement support\"},\r\n  {\"title\": \"Executive Coaching: Leadership Development\", \"description\": \"Coaching methodologies, leadership competencies, team effectiveness, measuring impact\"}\r\n]', 0, 5, 'published', '2026-02-19 09:26:33', '2026-02-19 09:26:33'),
('cc6', 'Sustainability & Social Impact', 'sustainability', 'Driving positive change through sustainable practices and social innovation', 'globe', 'Explore SDGs, Society 5.0, renewable energy, and social innovation strategies. Learn how to create sustainable business models and drive positive social impact.', '[\r\n  {\"title\": \"SDGs and Society 5.0: Building a Sustainable Future\", \"description\": \"SDG framework, Society 5.0 vision, technology enablers, implementation strategies\"},\r\n  {\"title\": \"Renewable Energy: Path to Carbon Neutrality\", \"description\": \"Technology options, economic viability, policy frameworks, case studies\"},\r\n  {\"title\": \"Social Innovation and Economic Development\", \"description\": \"Community development, inclusive growth, impact measurement, success stories\"},\r\n  {\"title\": \"Equalities and Inclusion in the Workplace\", \"description\": \"Diversity strategies, inclusion practices, measuring progress, business benefits\"}\r\n]', 0, 6, 'published', '2026-02-19 09:26:33', '2026-02-19 09:26:33');

-- --------------------------------------------------------

--
-- Table structure for table `content`
--

CREATE TABLE `content` (
  `id` varchar(191) NOT NULL,
  `key` varchar(191) NOT NULL,
  `title` varchar(191) NOT NULL,
  `type` varchar(191) NOT NULL,
  `content` longtext NOT NULL,
  `status` varchar(191) NOT NULL DEFAULT 'published',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT current_timestamp(3) ON UPDATE current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `content`
--

INSERT INTO `content` (`id`, `key`, `title`, `type`, `content`, `status`, `createdAt`, `updatedAt`) VALUES
('cnt1', 'about_hero', 'About Hero Section', 'hero', 'JACOM Consulting empowers businesses globally', 'published', '2026-02-17 12:00:47.000', '2026-02-17 12:04:03.000'),
('cnt2', 'about_mission', 'Our Mission', 'text', 'To deliver world-class consulting services', 'published', '2026-02-17 12:00:47.000', '2026-02-17 12:04:03.000');

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
('cb1', 'hero.title', 'home', 'hero', 'text', 'Transform Your Business with Expert Consulting', NULL, 1, 1, '2026-02-16 13:51:57.000', '2026-02-16 13:51:57.000'),
('cb2', 'hero.subtitle', 'home', 'hero', 'text', 'Strategic solutions that drive growth and innovation', NULL, 2, 1, '2026-02-16 13:51:57.000', '2026-02-16 13:51:57.000'),
('cb3', 'industry.title', 'home', 'industry', 'text', 'Industries We Serve', NULL, 1, 1, '2026-02-16 13:51:57.000', '2026-02-16 13:51:57.000'),
('cb4', 'stories.title', 'home', 'stories', 'text', 'Success Stories', NULL, 1, 1, '2026-02-16 13:51:57.000', '2026-02-16 13:51:57.000'),
('cb5', 'video.title', 'home', 'video', 'text', 'See How We Work', NULL, 1, 1, '2026-02-16 13:51:57.000', '2026-02-16 13:51:57.000'),
('cb6', 'cta.title', 'home', 'cta', 'text', 'Ready to Transform Your Business?', NULL, 1, 1, '2026-02-16 13:51:57.000', '2026-02-16 13:51:57.000'),
('cb7', 'cta.description', 'home', 'cta', 'text', 'Let us help you achieve your goals', NULL, 2, 1, '2026-02-16 13:51:57.000', '2026-02-16 13:51:57.000');

-- --------------------------------------------------------

--
-- Table structure for table `event`
--

CREATE TABLE `event` (
  `id` varchar(191) NOT NULL,
  `title` varchar(500) NOT NULL,
  `slug` varchar(191) NOT NULL,
  `date` date NOT NULL,
  `time` varchar(191) NOT NULL,
  `type` varchar(191) NOT NULL DEFAULT 'webinar',
  `description` text DEFAULT NULL,
  `image` varchar(500) DEFAULT NULL,
  `registerUrl` varchar(500) DEFAULT NULL,
  `featured` tinyint(1) NOT NULL DEFAULT 0,
  `status` varchar(191) NOT NULL DEFAULT 'published',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT current_timestamp(3) ON UPDATE current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `event`
--

INSERT INTO `event` (`id`, `title`, `slug`, `date`, `time`, `type`, `description`, `image`, `registerUrl`, `featured`, `status`, `createdAt`, `updatedAt`) VALUES
('evt1', 'Mastering AI-Prep: Step-by-Step for Japan', 'mastering-ai-prep', '2025-01-24', '2:00 PM JST', 'webinar', 'Learn how to prepare for AI implementation in Japanese business context AI implementation in Japanese business context AI implementation in Japanese business context', 'http://localhost/Jacom-Platform/backend/uploads/events/6996b0af409e7_playstation-blue-3840x2160-24671.jpg', '#', 1, 'published', '2026-02-19 08:18:20.276', '2026-02-19 08:43:11.000'),
('evt2', '2025 Manufacturing Tech Roundtable', 'manufacturing-tech-roundtable', '2025-02-08', '10:00 AM JST', 'roundtable', 'Industry leaders discuss  the future of manufacturing technology the future of manufacturing technology the future of manufacturing technologythe future of manufacturing technology', 'http://localhost/Jacom-Platform/backend/uploads/events/6996b0d07d86c_xiaomi-pad-7-pro-3840x2160-19801.jpg', '#', 1, 'published', '2026-02-19 08:18:20.276', '2026-02-19 08:42:24.000');

-- --------------------------------------------------------

--
-- Table structure for table `expert`
--

CREATE TABLE `expert` (
  `id` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `slug` varchar(191) NOT NULL,
  `role` varchar(191) NOT NULL,
  `bio` text NOT NULL,
  `expertise` text NOT NULL,
  `locations` text NOT NULL,
  `image` varchar(191) DEFAULT NULL,
  `email` varchar(191) DEFAULT NULL,
  `linkedin` varchar(191) DEFAULT NULL,
  `featured` tinyint(1) NOT NULL DEFAULT 0,
  `status` varchar(191) NOT NULL DEFAULT 'published',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `expert`
--

INSERT INTO `expert` (`id`, `name`, `slug`, `role`, `bio`, `expertise`, `locations`, `image`, `email`, `linkedin`, `featured`, `status`, `createdAt`, `updatedAt`) VALUES
('exp1', 'John Smith', 'john-smith', 'Senior Partner', 'Leading expert in digital transformation with 20+ years of experience', 'Digital Transformation, AI, Cloud', 'New York, London', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400', 'john.smith@example.com', 'https://linkedin.com/in/johnsmith', 1, 'published', '2026-02-16 13:51:57.000', '2026-02-16 13:51:57.000'),
('exp2', 'Sarah Johnson', 'sarah-johnson', 'Managing Director', 'Specializes in healthcare and life sciences consulting', 'Healthcare, Life Sciences, Strategy', 'Boston, San Francisco', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400', 'sarah.johnson@example.com', 'https://linkedin.com/in/sarahjohnson', 1, 'published', '2026-02-16 13:51:57.000', '2026-02-16 13:51:57.000');

-- --------------------------------------------------------

--
-- Table structure for table `industry`
--

CREATE TABLE `industry` (
  `id` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `slug` varchar(191) NOT NULL,
  `description` text NOT NULL,
  `overview` text NOT NULL,
  `challenges` text NOT NULL,
  `trends` text NOT NULL,
  `featured` tinyint(1) NOT NULL DEFAULT 0,
  `image` varchar(191) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `industry`
--

INSERT INTO `industry` (`id`, `name`, `slug`, `description`, `overview`, `challenges`, `trends`, `featured`, `image`, `createdAt`, `updatedAt`) VALUES
('ind1', 'Management Consulting', 'management-consulting', 'Strategic consulting for digital transformation and business growth in Japan', 'JACOM provides comprehensive management consulting services focusing on digital transformation (DX), ESG initiatives, and PMO services. We support Japanese companies in developing growth strategies and navigating the evolving consulting market with expertise in AI, IoT, and system integration.', '[\"Digital transformation adoption\", \"ESG compliance and reporting\", \"Project management efficiency\", \"Generative AI integration\", \"Global expansion strategies\"]', '[\"AI-driven consulting\", \"Sustainability focus\", \"Remote consulting models\", \"Data-driven decision making\", \"Cross-border collaboration\"]', 1, 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800', '2026-02-18 03:23:11.000', '2026-02-18 03:23:11.000'),
('ind10', 'Healthcare', 'healthcare', 'Digital health transformation and patient-centric solutions', '', '', '', 0, NULL, '2026-02-18 05:35:59.000', '2026-02-18 05:35:59.000'),
('ind11', 'Retail & E-commerce', 'retail', 'Transform retail operations through digital platforms', '', '', '', 0, NULL, '2026-02-18 05:35:59.000', '2026-02-18 05:35:59.000'),
('ind12', 'Agriculture & Agribusiness', 'agriculture', 'Modernize agricultural operations through technology', '', '', '', 0, NULL, '2026-02-18 05:35:59.000', '2026-02-18 05:35:59.000'),
('ind13', 'Telecommunications', 'telecommunications', 'Build robust communication infrastructure', '', '', '', 0, NULL, '2026-02-18 05:35:59.000', '2026-02-18 05:35:59.000'),
('ind14', 'Public Sector & Government', 'public-sector', 'Support public sector transformation and capacity building', '', '', '', 0, NULL, '2026-02-18 05:35:59.000', '2026-02-18 05:35:59.000'),
('ind2', 'Technology & IoT Solutions', 'technology-iot', 'IoT platform and electromechanical system integration services', 'JACOM specializes in IoT e-commerce platforms and electromechanical system integration. We provide innovative solutions for smart devices, system standardization, and engineering consulting for consumers and manufacturers. Our platform infrastructure enables low-cost system integration with secured IoT software applications.', '[\"System integration complexity\", \"IoT security standards\", \"Device interoperability\", \"Cost optimization\", \"Technology adoption barriers\"]', '[\"Smart device proliferation\", \"Edge computing\", \"5G connectivity\", \"AI-powered automation\", \"Cloud-native architectures\"]', 1, 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800', '2026-02-18 03:23:11.000', '2026-02-18 03:23:11.000'),
('ind3', 'Hospitality & Tourism', 'hospitality-tourism', 'Recruitment and training services for hospitality professionals', 'Through our partnership with Nepal recruitment agencies, JACOM facilitates the deployment of qualified hospitality professionals to Japan. We provide comprehensive training including Japanese language proficiency (JLPT N3/N4), cultural orientation, and industry-specific technical skills for hotel services, culinary arts, and hospitality management.', '[\"Skilled labor shortage\", \"Cultural adaptation\", \"Language barriers\", \"Quality standards maintenance\", \"Visa and immigration processes\"]', '[\"International workforce mobility\", \"Digital hospitality services\", \"Sustainable tourism\", \"Experience-driven services\", \"Health and safety protocols\"]', 1, 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', '2026-02-18 03:23:11.000', '2026-02-18 03:23:11.000'),
('ind4', 'IT Services & Software Development', 'it-services', 'Software development and IT professional recruitment for Japanese market', 'JACOM connects IT professionals with opportunities in Japan, focusing on software engineers, data scientists, and cybersecurity experts. We support J-Find visa holders and provide training in programming (Java, Python, C++), database management, and cloud computing to meet Japan\'s growing demand for digital talent.', '[\"Tech talent shortage\", \"Rapid technology evolution\", \"Cybersecurity threats\", \"Legacy system modernization\", \"Remote work infrastructure\"]', '[\"AI and machine learning\", \"Cloud-first strategies\", \"DevOps automation\", \"Low-code platforms\", \"Quantum computing readiness\"]', 0, 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800', '2026-02-18 03:23:11.000', '2026-02-18 03:23:11.000'),
('ind5', 'Manufacturing & Industry 4.0', 'manufacturing', 'Smart factory solutions and industrial automation consulting', 'JACOM delivers Industry 4.0 transformation through IoT integration, predictive maintenance, and smart factory design. We specialize in production management, quality control systems, and mechanical design with expertise in sensors, actuators, robotics, and embedded systems for manufacturing excellence.', '[\"Supply chain disruptions\", \"Automation investment costs\", \"Skills gap in workforce\", \"Quality control consistency\", \"Sustainability requirements\"]', '[\"Smart factories\", \"Digital twins\", \"Predictive maintenance\", \"Collaborative robots\", \"Sustainable manufacturing\"]', 0, 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800', '2026-02-18 03:23:11.000', '2026-02-18 03:23:11.000'),
('ind6', 'Education & Training', 'education', 'Professional development and technical training programs', 'JACOM offers customized training programs including web development bootcamps, technical skills training, and professional certifications. We provide both online live sessions and face-to-face training in HTML, CSS, JavaScript, React, and Node.js, supporting career development for international professionals seeking opportunities in Japan.', '[\"Digital literacy gaps\", \"Curriculum relevance\", \"Student engagement\", \"Certification standards\", \"Access to quality education\"]', '[\"EdTech platforms\", \"Hybrid learning models\", \"Micro-credentials\", \"Personalized learning paths\", \"Industry-aligned curricula\"]', 0, 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800', '2026-02-18 03:23:11.000', '2026-02-18 03:23:11.000'),
('ind7', 'Energy & Utilities', 'energy', 'Renewable energy systems and smart grid solutions', 'JACOM provides renewable energy consulting including solar and wind power generation equipment design, VPP and EMS system innovation, and smart grid infrastructure. We specialize in energy management systems, remote monitoring, and control automation for sustainable energy transition.', '[\"Grid modernization costs\", \"Renewable integration\", \"Energy storage solutions\", \"Regulatory compliance\", \"Asset optimization\"]', '[\"Clean energy transition\", \"Smart grids\", \"Energy storage systems\", \"Carbon neutrality goals\", \"Distributed energy resources\"]', 0, 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800', '2026-02-18 03:23:11.000', '2026-02-18 03:23:11.000'),
('ind8', 'Real Estate & Infrastructure', 'real-estate', 'Smart building systems and infrastructure development', 'JACOM designs intelligent building systems including access control, security surveillance, electrical equipment, and utility systems. We provide comprehensive infrastructure solutions for hotels, hospitals, and commercial facilities with focus on energy efficiency, safety, and operational excellence.', '[\"Aging infrastructure\", \"Smart building integration\", \"Energy efficiency standards\", \"Security requirements\", \"Maintenance costs\"]', '[\"Smart buildings\", \"Green construction\", \"IoT-enabled facilities\", \"Predictive maintenance\", \"Sustainable design\"]', 0, 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800', '2026-02-18 03:23:11.000', '2026-02-18 03:23:11.000'),
('ind9', 'Financial Services', 'financial-services', 'Financial advisory and investment consulting', 'JACOM offers financial consulting services including tax management, asset management, risk assessment, and investment policy development. We provide expertise in banking services, portfolio management, and ESG investment strategies to support business growth and financial sustainability.', '[\"Regulatory complexity\", \"Market volatility\", \"Digital disruption\", \"Risk management\", \"ESG compliance\"]', '[\"Fintech innovation\", \"ESG investing\", \"Digital currencies\", \"Robo-advisory\", \"Open banking\"]', 0, 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800', '2026-02-18 03:23:11.000', '2026-02-18 03:23:11.000');

-- --------------------------------------------------------

--
-- Table structure for table `insight`
--

CREATE TABLE `insight` (
  `id` varchar(191) NOT NULL,
  `title` varchar(191) NOT NULL,
  `slug` varchar(191) NOT NULL,
  `type` varchar(191) NOT NULL,
  `content` longtext NOT NULL,
  `excerpt` text NOT NULL,
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
  `topics` text NOT NULL,
  `regions` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `insight`
--

INSERT INTO `insight` (`id`, `title`, `slug`, `type`, `content`, `excerpt`, `featured`, `trending`, `gated`, `downloadUrl`, `image`, `readTime`, `status`, `scheduledAt`, `publishedAt`, `createdAt`, `updatedAt`, `authorId`, `topics`, `regions`) VALUES
('ins1', 'The Future of AI in Business', 'future-of-ai-in-business', 'Article', 'Artificial Intelligence is transforming how businesses operate. This comprehensive guide explores the latest trends and practical applications of AI in modern enterprises.', 'Discover how AI is reshaping business operations and creating new opportunities for growth.', 1, 1, 0, NULL, 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800', 8, 'published', NULL, '2026-02-16 13:51:57.000', '2026-02-16 13:51:57.000', '2026-02-16 13:51:57.000', 'exp1', 'AI,Technology,Innovation', 'Global,North America'),
('ins2', 'Healthcare Digital Transformation Guide', 'healthcare-digital-transformation', 'Report', 'A complete guide to digital transformation in healthcare, covering telemedicine, AI diagnostics, and patient data management.', 'Learn how healthcare organizations are leveraging technology to improve patient outcomes.', 1, 0, 0, NULL, 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800', 12, 'published', NULL, '2026-02-16 13:51:57.000', '2026-02-16 13:51:57.000', '2026-02-16 13:51:57.000', 'exp2', 'Healthcare,Digital,Innovation', 'Global,Europe');

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
  `status` varchar(191) NOT NULL DEFAULT 'new',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT current_timestamp(3) ON UPDATE current_timestamp(3)
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
  `content` longtext NOT NULL,
  `excerpt` text NOT NULL,
  `featured` tinyint(1) NOT NULL DEFAULT 0,
  `image` varchar(191) DEFAULT NULL,
  `attachments` text NOT NULL,
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
  `location` varchar(191) GENERATED ALWAYS AS (concat(`city`,', ',`country`)) STORED,
  `image` varchar(191) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `office`
--

INSERT INTO `office` (`id`, `name`, `slug`, `region`, `country`, `city`, `address`, `phone`, `email`, `lat`, `lng`, `image`, `createdAt`, `updatedAt`) VALUES
('off1', 'New York Office', 'new-york', 'North America', 'United States', 'New York', '123 Fifth Avenue, New York, NY 10001', '+1 (212) 555-0100', 'newyork@example.com', 40.7484, -73.9857, 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800', '2026-02-16 13:51:57.000', '2026-02-16 13:51:57.000'),
('off2', 'London Office', 'london', 'Europe', 'United Kingdom', 'London', '1 Canary Wharf, London E14 5AB', '+44 20 7946 0958', 'london@example.com', 51.5074, -0.1278, 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800', '2026-02-16 13:51:57.000', '2026-02-16 13:51:57.000'),
('off3', 'Singapore Office', 'singapore', 'Asia Pacific', 'Singapore', 'Singapore', '1 Marina Boulevard, Singapore 018989', '+65 6123 4567', 'singapore@example.com', 1.2789, 103.8508, 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800', '2026-02-16 13:51:57.000', '2026-02-16 13:51:57.000');

-- --------------------------------------------------------

--
-- Table structure for table `partnership`
--

CREATE TABLE `partnership` (
  `id` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `type` varchar(191) NOT NULL,
  `location` varchar(191) NOT NULL,
  `status` varchar(191) NOT NULL DEFAULT 'active',
  `description` text DEFAULT NULL,
  `startDate` datetime(3) NOT NULL,
  `endDate` datetime(3) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT current_timestamp(3) ON UPDATE current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `partnership`
--

INSERT INTO `partnership` (`id`, `name`, `type`, `location`, `status`, `description`, `startDate`, `endDate`, `createdAt`, `updatedAt`) VALUES
('part1', 'JICA', 'Strategic', 'Japan (Global)', 'active', 'Strategic partnership for international development', '2026-02-17 12:00:47.000', NULL, '2026-02-17 12:00:47.000', '2026-02-17 12:04:03.000'),
('part2', 'Nippon Foundation', 'Strategic', 'Japan (Global)', 'renewing', 'Strategic partnership for social innovation', '2026-02-17 12:00:47.000', NULL, '2026-02-17 12:00:47.000', '2026-02-17 12:04:03.000'),
('part3', 'Washocook', 'Academic', 'Online/Japan', 'active', 'Academic partnership for culinary training', '2026-02-17 12:00:47.000', NULL, '2026-02-17 12:00:47.000', '2026-02-17 12:04:03.000');

-- --------------------------------------------------------

--
-- Table structure for table `service`
--

CREATE TABLE `service` (
  `id` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `slug` varchar(191) NOT NULL,
  `description` text NOT NULL,
  `overview` text NOT NULL,
  `methodologies` text NOT NULL,
  `tools` text NOT NULL,
  `featured` tinyint(1) NOT NULL DEFAULT 0,
  `image` varchar(191) DEFAULT NULL,
  `status` varchar(191) NOT NULL DEFAULT 'published',
  `type` enum('consulting','technical','training','financial') DEFAULT 'consulting',
  `category` varchar(50) DEFAULT NULL,
  `upcoming` tinyint(1) DEFAULT 0,
  `startDate` datetime DEFAULT NULL,
  `duration` varchar(50) DEFAULT NULL,
  `price` varchar(50) DEFAULT NULL,
  `capacity` int(11) DEFAULT NULL,
  `enrollmentStatus` enum('open','closed','full') DEFAULT 'open',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `service`
--

INSERT INTO `service` (`id`, `name`, `slug`, `description`, `overview`, `methodologies`, `tools`, `featured`, `image`, `status`, `type`, `category`, `upcoming`, `startDate`, `duration`, `price`, `capacity`, `enrollmentStatus`, `createdAt`, `updatedAt`) VALUES
('srv1', 'Digital Transformation', 'digital-transformation', 'End-to-end digital transformation consulting', 'We help organizations modernize their operations through technology adoption and process optimization.', '[\"Agile\", \"Design Thinking\", \"Lean\"]', '[\"Cloud Platforms\", \"AI/ML Tools\", \"Analytics\"]', 1, 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800', 'published', 'consulting', NULL, 0, NULL, NULL, NULL, NULL, 'open', '2026-02-18 03:23:11.000', '2026-02-18 03:23:11.000'),
('srv10', 'Software Development', 'software-development', 'Custom application and mobile app development', 'Full-stack software development including web applications, mobile apps (iOS/Android), e-commerce platforms, and API development.', '', '', 1, NULL, 'published', 'consulting', NULL, 0, NULL, NULL, NULL, NULL, 'open', '2026-02-18 05:35:59.000', '2026-02-18 05:35:59.000'),
('srv11', 'Cloud & Infrastructure', 'cloud-infrastructure', 'Cloud migration and infrastructure design', 'Cloud migration strategy, infrastructure design, data center development, network architecture, and disaster recovery planning.', '', '', 1, NULL, 'published', 'consulting', NULL, 0, NULL, NULL, NULL, NULL, 'open', '2026-02-18 05:35:59.000', '2026-02-18 05:35:59.000'),
('srv12', 'Cybersecurity', 'cybersecurity', 'Security assessment, architecture, and monitoring', 'Comprehensive cybersecurity including security assessment, architecture design, penetration testing, monitoring, and compliance management.', '', '', 0, NULL, 'published', 'consulting', NULL, 0, NULL, NULL, NULL, NULL, 'open', '2026-02-18 05:35:59.000', '2026-02-18 05:35:59.000'),
('srv13', 'Banking Technology', 'banking-technology', 'Core banking and digital banking platforms', 'Modernize banking operations with core banking systems, digital banking platforms, payment integration, mobile banking, and open banking APIs.', '', '', 0, NULL, 'published', 'consulting', NULL, 0, NULL, NULL, NULL, NULL, 'open', '2026-02-18 05:35:59.000', '2026-02-18 05:35:59.000'),
('srv14', 'Risk Management', 'risk-management', 'Credit, market, and operational risk solutions', 'Comprehensive risk management including credit risk assessment, market risk modeling, operational risk management, and compliance frameworks.', '', '', 0, NULL, 'published', 'consulting', NULL, 0, NULL, NULL, NULL, NULL, 'open', '2026-02-18 05:35:59.000', '2026-02-18 05:35:59.000'),
('srv15', 'Financial Advisory', 'financial-advisory', 'Investment strategy and portfolio management', 'Expert financial advisory covering investment strategy, portfolio management, asset allocation, tax optimization, and wealth management.', '', '', 0, NULL, 'published', 'consulting', NULL, 0, NULL, NULL, NULL, NULL, 'open', '2026-02-18 05:35:59.000', '2026-02-18 05:35:59.000'),
('srv16', 'Renewable Energy Systems', 'renewable-energy', 'Solar, wind, and hybrid renewable energy design', 'Design and implement renewable energy systems including solar power (500+ installations), wind generation, hybrid systems, and energy storage.', '', '', 1, NULL, 'published', 'consulting', NULL, 0, NULL, NULL, NULL, NULL, 'open', '2026-02-18 05:35:59.000', '2026-02-18 05:35:59.000'),
('srv17', 'Smart Grid Solutions', 'smart-grid', 'Smart meter deployment and grid automation', 'Modernize energy grids with smart meter deployment, grid monitoring, demand response systems, distribution automation, and outage management.', '', '', 0, NULL, 'published', 'consulting', NULL, 0, NULL, NULL, NULL, NULL, 'open', '2026-02-18 05:35:59.000', '2026-02-18 05:35:59.000'),
('srv18', 'Energy Management Systems', 'energy-management', 'Real-time monitoring and optimization', 'Advanced EMS solutions with real-time monitoring, load forecasting, energy optimization, peak demand management, and analytics.', '', '', 0, NULL, 'published', 'consulting', NULL, 0, NULL, NULL, NULL, NULL, 'open', '2026-02-18 05:35:59.000', '2026-02-18 05:35:59.000'),
('srv19', 'E-commerce Platform Development', 'ecommerce-platform', 'Custom e-commerce and mobile commerce solutions', 'Build powerful e-commerce platforms with custom websites, mobile apps, payment integration, inventory management, and order fulfillment.', '', '', 1, NULL, 'published', 'consulting', NULL, 0, NULL, NULL, NULL, NULL, 'open', '2026-02-18 05:35:59.000', '2026-02-18 05:35:59.000'),
('srv2', 'IoT Solutions', 'iot-solutions', 'Custom IoT platform development', 'Build scalable IoT ecosystems for connected devices and smart systems.', '[\"Rapid Prototyping\", \"Iterative Development\"]', '[\"AWS IoT\", \"Azure IoT\", \"MQTT\"]', 1, 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=800', 'published', 'consulting', NULL, 0, NULL, NULL, NULL, NULL, 'open', '2026-02-18 03:23:11.000', '2026-02-18 03:23:11.000'),
('srv20', 'Digital Marketing', 'digital-marketing', 'SEO, social media, and conversion optimization', 'Drive online growth through SEO, content marketing, social media marketing, email automation, conversion optimization, and analytics.', '', '', 0, NULL, 'published', 'consulting', NULL, 0, NULL, NULL, NULL, NULL, 'open', '2026-02-18 05:35:59.000', '2026-02-18 05:35:59.000'),
('srv21', 'Smart Building Solutions', 'smart-building', 'Building automation and energy management', 'Intelligent building systems including automation, HVAC optimization, lighting control, access control, security, and energy management.', '', '', 0, NULL, 'published', 'consulting', NULL, 0, NULL, NULL, NULL, NULL, 'open', '2026-02-18 05:35:59.000', '2026-02-18 05:35:59.000'),
('srv22', 'Infrastructure Development', 'infrastructure-development', 'Physical and electrical system design', 'Comprehensive infrastructure design including physical systems, electrical equipment, gas/water systems, security surveillance, and network infrastructure.', '', '', 0, NULL, 'published', 'consulting', NULL, 0, NULL, NULL, NULL, NULL, 'open', '2026-02-18 05:35:59.000', '2026-02-18 05:35:59.000'),
('srv23', 'Web Development Training', 'web-dev-training', 'Full-stack bootcamp with job placement', 'Comprehensive web development bootcamp covering HTML, CSS, JavaScript, React, Node.js with portfolio development and job placement support.', '', '', 1, NULL, 'published', 'consulting', NULL, 0, NULL, NULL, NULL, NULL, 'open', '2026-02-18 05:35:59.000', '2026-02-18 05:35:59.000'),
('srv24', 'Professional Skills Training', 'professional-skills', 'Japanese language and business communication', 'Professional development including Japanese language (JLPT N3/N4), business communication, cultural orientation, and interview preparation.', '', '', 0, NULL, 'published', 'consulting', NULL, 0, NULL, NULL, NULL, NULL, 'open', '2026-02-18 05:35:59.000', '2026-02-18 05:35:59.000'),
('srv25', 'Agricultural Technology', 'agri-tech', 'Precision farming and IoT monitoring', 'Modernize agriculture with precision farming, IoT sensors, weather forecasting, crop management platforms, and irrigation automation.', '', '', 0, NULL, 'published', 'consulting', NULL, 0, NULL, NULL, NULL, NULL, 'open', '2026-02-18 05:35:59.000', '2026-02-18 05:35:59.000'),
('srv26', 'Network Infrastructure', 'network-infrastructure', 'Mobile network and fiber optic deployment', 'Build robust communication infrastructure including mobile network design, base station deployment, fiber optics, and network optimization.', '', '', 0, NULL, 'published', 'consulting', NULL, 0, NULL, NULL, NULL, NULL, 'open', '2026-02-18 05:35:59.000', '2026-02-18 05:35:59.000'),
('srv27', 'Policy Development', 'policy-development', 'Policy research and strategy development', 'Support public sector transformation through policy research, strategy development, stakeholder consultation, and implementation planning.', '', '', 0, NULL, 'published', 'consulting', NULL, 0, NULL, NULL, NULL, NULL, 'open', '2026-02-18 05:35:59.000', '2026-02-18 05:35:59.000'),
('srv28', 'Project Delivery', 'project-delivery', 'Project design and management for public sector', 'Deliver public sector projects with project design, funding development, partnership facilitation, capacity building, and impact assessment.', '', '', 0, NULL, 'published', 'consulting', NULL, 0, NULL, NULL, NULL, NULL, 'open', '2026-02-18 05:35:59.000', '2026-02-18 05:35:59.000'),
('srv3', 'Talent Acquisition', 'talent-acquisition', 'Global talent recruitment services', 'Connect with skilled professionals across technology and hospitality sectors.', '[\"Competency-Based\", \"Cultural Fit\"]', '[\"ATS Systems\", \"LinkedIn\", \"Assessment Tools\"]', 1, 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800', 'published', 'consulting', NULL, 0, NULL, NULL, NULL, NULL, 'open', '2026-02-18 03:23:11.000', '2026-02-18 03:23:11.000'),
('srv4', 'Training & Development', 'training-development', 'Professional skills training programs', 'Upskill your workforce with technical and soft skills training.', '[\"Blended Learning\", \"Hands-on Practice\"]', '[\"LMS Platforms\", \"Virtual Labs\", \"Certifications\"]', 0, 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800', 'published', 'consulting', NULL, 0, NULL, NULL, NULL, NULL, 'open', '2026-02-18 03:23:11.000', '2026-02-18 03:23:11.000'),
('srv5', 'Smart Factory Implementation', 'smart-factory', 'Factory automation design and deployment with real-time monitoring', 'Transform manufacturing operations with Industry 4.0 technologies including production line optimization, predictive maintenance, and digital twin technology.', '', '', 1, NULL, 'published', 'consulting', NULL, 0, NULL, NULL, NULL, NULL, 'open', '2026-02-18 05:33:30.000', '2026-02-18 05:33:30.000'),
('srv6', 'Operational Excellence', 'operational-excellence', 'Lean manufacturing and Six Sigma programs', 'Drive continuous improvement through lean manufacturing, Six Sigma programs, process optimization, and performance management systems.', '', '', 0, NULL, 'published', 'consulting', NULL, 0, NULL, NULL, NULL, NULL, 'open', '2026-02-18 05:33:30.000', '2026-02-18 05:33:30.000'),
('srv7', 'System Integration', 'system-integration', 'MES, ERP, and supply chain management integration', 'Integrate Manufacturing Execution Systems, ERP platforms, supply chain management, and IoT sensor networks for seamless operations.', '', '', 0, NULL, 'published', 'consulting', NULL, 0, NULL, NULL, NULL, NULL, 'open', '2026-02-18 05:33:30.000', '2026-02-18 05:33:30.000'),
('srv8', 'Digital Health Solutions', 'digital-health', 'EHR systems, telemedicine, and patient engagement platforms', 'Improve patient outcomes through Electronic Health Records, telemedicine platforms, remote patient monitoring, and health data analytics.', '', '', 1, NULL, 'published', 'consulting', NULL, 0, NULL, NULL, NULL, NULL, 'open', '2026-02-18 05:33:30.000', '2026-02-18 05:33:30.000'),
('srv9', 'Healthcare IT Systems', 'healthcare-it', 'Hospital information and laboratory management systems', 'Comprehensive healthcare IT including hospital information systems, laboratory management, pharmacy systems, and medical imaging integration.', '', '', 0, NULL, 'published', 'consulting', NULL, 0, NULL, NULL, NULL, NULL, 'open', '2026-02-18 05:33:30.000', '2026-02-18 05:33:30.000');

-- --------------------------------------------------------

--
-- Table structure for table `servicecapability`
--

CREATE TABLE `servicecapability` (
  `id` varchar(191) NOT NULL,
  `serviceId` varchar(191) NOT NULL,
  `title` varchar(500) NOT NULL,
  `description` text NOT NULL,
  `icon` varchar(191) NOT NULL DEFAULT 'integration',
  `order` int(11) NOT NULL DEFAULT 0,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT current_timestamp(3) ON UPDATE current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `servicecapability`
--

INSERT INTO `servicecapability` (`id`, `serviceId`, `title`, `description`, `icon`, `order`, `createdAt`, `updatedAt`) VALUES
('cap1', 'srv2', 'System Integration', 'Seamlessly connect IoT devices with existing enterprise systems', 'integration', 1, '2026-02-19 07:57:43.709', '2026-02-19 07:57:43.709'),
('cap2', 'srv2', 'Predictive Analytics', 'Leverage AI/ML for predictive maintenance and optimization', 'predictive', 2, '2026-02-19 07:57:43.709', '2026-02-19 07:57:43.709'),
('cap3', 'srv2', 'Robotics & Automation', 'Deploy intelligent robotics for manufacturing excellence', 'robotics', 3, '2026-02-19 07:57:43.709', '2026-02-19 07:57:43.709'),
('cap4', 'srv2', 'Digital Twins', 'Create virtual replicas for simulation and optimization', 'twins', 4, '2026-02-19 07:57:43.709', '2026-02-19 07:57:43.709');

-- --------------------------------------------------------

--
-- Table structure for table `servicemetric`
--

CREATE TABLE `servicemetric` (
  `id` varchar(191) NOT NULL,
  `serviceId` varchar(191) NOT NULL,
  `label` varchar(500) NOT NULL,
  `value` varchar(191) NOT NULL,
  `change` varchar(191) DEFAULT NULL,
  `order` int(11) NOT NULL DEFAULT 0,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT current_timestamp(3) ON UPDATE current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `servicemetric`
--

INSERT INTO `servicemetric` (`id`, `serviceId`, `label`, `value`, `change`, `order`, `createdAt`, `updatedAt`) VALUES
('metric1', 'srv2', 'Efficiency Gain', '45%', '+12%', 1, '2026-02-19 07:57:43.807', '2026-02-19 07:57:43.807'),
('metric2', 'srv2', 'Cost Reduction', '30%', '+8%', 2, '2026-02-19 07:57:43.807', '2026-02-19 07:57:43.807'),
('metric3', 'srv2', 'Uptime', '99.5%', '+2.5%', 3, '2026-02-19 07:57:43.807', '2026-02-19 07:57:43.807');

-- --------------------------------------------------------

--
-- Table structure for table `serviceprocessstep`
--

CREATE TABLE `serviceprocessstep` (
  `id` varchar(191) NOT NULL,
  `serviceId` varchar(191) NOT NULL,
  `step` int(11) NOT NULL,
  `title` varchar(500) NOT NULL,
  `description` text NOT NULL,
  `order` int(11) NOT NULL DEFAULT 0,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT current_timestamp(3) ON UPDATE current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `serviceprocessstep`
--

INSERT INTO `serviceprocessstep` (`id`, `serviceId`, `step`, `title`, `description`, `order`, `createdAt`, `updatedAt`) VALUES
('step1', 'srv2', 1, 'Assessment', 'Evaluate current infrastructure and identify opportunities', 1, '2026-02-19 07:57:43.757', '2026-02-19 07:57:43.757'),
('step2', 'srv2', 2, 'Design', 'Architect scalable IoT solutions tailored to your needs', 2, '2026-02-19 07:57:43.757', '2026-02-19 07:57:43.757'),
('step3', 'srv2', 3, 'Implementation', 'Deploy and integrate IoT systems with minimal disruption', 3, '2026-02-19 07:57:43.757', '2026-02-19 07:57:43.757');

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
('c69948a9ed3ea7c8a26ce7483a32e3', '02af5b84796c1f7ad94e1e3293716b81c8f82ee0cf2bf4e0a714051c1fbcb8fa', 'usr_admin', '2026-02-18 16:34:54.000', '2026-02-17 07:34:54.000'),
('c69948affce5a7fd43175262f0cd03', '2695054157ce9122700a525fe74b7513b6cde38b22b1a3bac82e5ed289b6efad', 'usr_admin', '2026-02-18 16:36:31.000', '2026-02-17 07:36:31.000'),
('c6994b588a26f666aba8c8af000aad', '368109bc966541c0c31307582959142e3b2039a7a49394b6c21c5e09eb596ad6', 'usr_admin', '2026-02-18 19:38:00.000', '2026-02-17 10:38:00.000'),
('c6994c5155828813483e605273d7e4', '0410092f74c8f18447fff143a727c52808590ab3a13e80b8bb6a633e020fc54e', 'usr_admin', '2026-02-18 20:44:21.000', '2026-02-17 11:44:21.000'),
('c6995752ddfc58d5c637e8c78937d1', '2754f35b4f8fdd57671e29bf6654beb746ed4e5802cd0786b9f57b779b40b74e', 'usr_admin', '2026-02-19 09:15:41.000', '2026-02-18 00:15:41.000'),
('c69957bf02d0b6c714e1e4e8bbbb38', '2a905e1380e36f5e4c9f949e9836490a12e68ecb334a5b6f4365627a2d18fd94', 'usr_admin', '2026-02-19 09:44:32.000', '2026-02-18 00:44:32.000'),
('c6996c0db7a899ba88295bd6268cd7', '1cf98a557d6f5a9b084806c8c1e21a6f28550ae3b42f7caf3859a47aa555bb4c', 'usr_admin', '2026-02-20 08:50:51.000', '2026-02-19 09:50:51.000'),
('c6996f47c0d967a1b3dc3c791cbc76', '210a5053db864929452fe1f08cecae61161b505ab3f106ec0ea1dbcba8b8c8c0', 'usr_admin', '2026-02-20 12:31:08.000', '2026-02-19 13:31:08.000'),
('cmlqdncg90001digewhklzue8', 'bef26d294c51b0a83878ca3fe4c20553e278f4241113a1449e1d7d2090165b1f', 'usr_admin', '2026-02-18 09:04:43.969', '2026-02-17 09:04:43.972');

-- --------------------------------------------------------

--
-- Table structure for table `solution`
--

CREATE TABLE `solution` (
  `id` varchar(191) NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `tagline` text DEFAULT NULL,
  `description` text NOT NULL,
  `challenge` text DEFAULT NULL,
  `approach` text DEFAULT NULL,
  `outcomes` text DEFAULT NULL,
  `image` varchar(500) DEFAULT NULL,
  `featured` tinyint(1) DEFAULT 0,
  `status` enum('draft','published','archived') DEFAULT 'published',
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `benefits` text DEFAULT NULL COMMENT 'JSON array of 4 benefits: [{icon, title, description}]',
  `implementationSteps` text DEFAULT NULL COMMENT 'JSON array of 4 steps: [{number, title, description}]'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `solution`
--

INSERT INTO `solution` (`id`, `name`, `slug`, `tagline`, `description`, `challenge`, `approach`, `outcomes`, `image`, `featured`, `status`, `createdAt`, `updatedAt`, `benefits`, `implementationSteps`) VALUES
('sol1', 'Manufacturing Digital Transformation', 'manufacturing-digital-transformation', 'Industry 4.0 Excellence', 'Complete digital transformation solution for manufacturing enterprises', 'Legacy systems, manual processes, data silos', 'IoT integration, automation, real-time analytics', 'Increased efficiency by 40%, reduced downtime by 60%', NULL, 1, 'published', '2026-02-18 07:51:20', '2026-02-18 07:51:20', NULL, NULL),
('sol2', 'Healthcare System Integration', 'healthcare-system-integration', 'Connected Care Solutions', 'Integrated healthcare management and patient care systems', 'Fragmented systems, compliance challenges, data security', 'HIPAA-compliant integration, secure data exchange, workflow automation', 'Improved patient outcomes, 50% faster processing', NULL, 1, 'published', '2026-02-18 07:51:20', '2026-02-18 07:51:20', NULL, NULL),
('sol3', 'Financial Services Modernization', 'financial-services-modernization', 'Next-Gen Banking', 'Modern banking and financial services platform', 'Outdated infrastructure, regulatory compliance, security risks', 'Cloud migration, API-first architecture, advanced security', 'Enhanced customer experience, 99.9% uptime', NULL, 1, 'published', '2026-02-18 07:51:20', '2026-02-18 07:51:20', NULL, NULL),
('sol4', 'Smart Factory Implementation', 'smart-factory-implementation', 'Automated Production', 'End-to-end smart factory automation solution', 'Manual operations, quality inconsistency, high costs', 'Robotics, AI-powered QC, predictive maintenance', 'Reduced costs by 35%, improved quality by 45%', NULL, 0, 'published', '2026-02-18 07:51:20', '2026-02-18 07:51:20', NULL, NULL),
('sol5', 'Enterprise Risk Management', 'enterprise-risk-management', 'Comprehensive Risk Control', 'Integrated risk assessment and mitigation platform', 'Compliance gaps, financial risks, operational vulnerabilities', 'Real-time monitoring, automated reporting, predictive analytics', 'Reduced risk exposure by 60%, full compliance', NULL, 0, 'published', '2026-02-18 07:51:20', '2026-02-18 07:51:20', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `subscriber`
--

CREATE TABLE `subscriber` (
  `id` varchar(36) NOT NULL DEFAULT uuid(),
  `email` varchar(255) NOT NULL,
  `status` enum('active','unsubscribed') DEFAULT 'active',
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `subscriber`
--

INSERT INTO `subscriber` (`id`, `email`, `status`, `createdAt`, `updatedAt`) VALUES
('sub_44ba05eff23033d001dee4d9', 'test3@example.com', 'active', '2026-02-19 11:52:01', '2026-02-19 11:52:01'),
('sub_462864c6384d9c92acc2f14c', 'test2@example.com', 'active', '2026-02-19 11:52:00', '2026-02-19 11:52:00'),
('sub_70326e4d54150e25b2f8c3c5', 'test1@example.com', 'active', '2026-02-19 11:52:00', '2026-02-19 11:52:00');

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
('usr_admin', 'admin@jacom.com', '$2b$10$8oOjLLRy5nmXPimRtqMehOvONFc4k0RjGi.PX.K1M34ppKg/p1EuG', 'JACOM Admin', 'admin', '2026-02-16 13:51:57.000', '2026-02-17 09:03:03.120'),
('usr1', 'admin@jas.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Admin User', 'admin', '2026-02-18 02:51:38.000', '2026-02-18 02:51:38.000');

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
-- Table structure for table `_experttosolution`
--

CREATE TABLE `_experttosolution` (
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

--
-- Dumping data for table `_industrytoservice`
--

INSERT INTO `_industrytoservice` (`A`, `B`) VALUES
('ind1', 'srv1'),
('ind1', 'srv4'),
('ind10', 'srv1'),
('ind10', 'srv8'),
('ind10', 'srv9'),
('ind11', 'srv1'),
('ind11', 'srv19'),
('ind11', 'srv20'),
('ind12', 'srv1'),
('ind12', 'srv2'),
('ind12', 'srv25'),
('ind13', 'srv11'),
('ind13', 'srv12'),
('ind13', 'srv26'),
('ind14', 'srv1'),
('ind14', 'srv27'),
('ind14', 'srv28'),
('ind2', 'srv1'),
('ind2', 'srv2'),
('ind3', 'srv3'),
('ind3', 'srv4'),
('ind4', 'srv1'),
('ind4', 'srv10'),
('ind4', 'srv11'),
('ind4', 'srv12'),
('ind4', 'srv3'),
('ind5', 'srv1'),
('ind5', 'srv2'),
('ind5', 'srv5'),
('ind5', 'srv6'),
('ind5', 'srv7'),
('ind6', 'srv23'),
('ind6', 'srv24'),
('ind6', 'srv4'),
('ind7', 'srv1'),
('ind7', 'srv16'),
('ind7', 'srv17'),
('ind7', 'srv18'),
('ind7', 'srv2'),
('ind8', 'srv1'),
('ind8', 'srv21'),
('ind8', 'srv22'),
('ind9', 'srv1'),
('ind9', 'srv13'),
('ind9', 'srv14'),
('ind9', 'srv15');

-- --------------------------------------------------------

--
-- Table structure for table `_industrytosolution`
--

CREATE TABLE `_industrytosolution` (
  `A` varchar(191) NOT NULL,
  `B` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `_industrytosolution`
--

INSERT INTO `_industrytosolution` (`A`, `B`) VALUES
('ind12', 'sol1'),
('ind2', 'sol1'),
('ind7', 'sol1'),
('ind8', 'sol1');

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

-- --------------------------------------------------------

--
-- Table structure for table `_servicetosolution`
--

CREATE TABLE `_servicetosolution` (
  `A` varchar(191) NOT NULL,
  `B` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `_servicetosolution`
--

INSERT INTO `_servicetosolution` (`A`, `B`) VALUES
('srv25', 'sol1');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `academy_batch`
--
ALTER TABLE `academy_batch`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `academy_student`
--
ALTER TABLE `academy_student`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

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
-- Indexes for table `casestudy`
--
ALTER TABLE `casestudy`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Indexes for table `case_study`
--
ALTER TABLE `case_study`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Indexes for table `communitycategory`
--
ALTER TABLE `communitycategory`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD KEY `idx_slug` (`slug`),
  ADD KEY `idx_status` (`status`),
  ADD KEY `idx_featured` (`featured`);

--
-- Indexes for table `content`
--
ALTER TABLE `content`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `key` (`key`);

--
-- Indexes for table `contentblock`
--
ALTER TABLE `contentblock`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `ContentBlock_key_key` (`key`),
  ADD KEY `ContentBlock_page_section_idx` (`page`,`section`);

--
-- Indexes for table `event`
--
ALTER TABLE `event`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD KEY `Event_slug_key` (`slug`);

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
-- Indexes for table `partnership`
--
ALTER TABLE `partnership`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `service`
--
ALTER TABLE `service`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Service_slug_key` (`slug`);

--
-- Indexes for table `servicecapability`
--
ALTER TABLE `servicecapability`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ServiceCapability_serviceId_fkey` (`serviceId`);

--
-- Indexes for table `servicemetric`
--
ALTER TABLE `servicemetric`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ServiceMetric_serviceId_fkey` (`serviceId`);

--
-- Indexes for table `serviceprocessstep`
--
ALTER TABLE `serviceprocessstep`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ServiceProcessStep_serviceId_fkey` (`serviceId`);

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
-- Indexes for table `solution`
--
ALTER TABLE `solution`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Indexes for table `subscriber`
--
ALTER TABLE `subscriber`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `idx_email` (`email`),
  ADD KEY `idx_status` (`status`);

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
-- Indexes for table `_experttosolution`
--
ALTER TABLE `_experttosolution`
  ADD UNIQUE KEY `_ExpertToSolution_AB_unique` (`A`,`B`),
  ADD KEY `_ExpertToSolution_B_index` (`B`);

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
-- Indexes for table `_industrytosolution`
--
ALTER TABLE `_industrytosolution`
  ADD UNIQUE KEY `_IndustryToSolution_AB_unique` (`A`,`B`),
  ADD KEY `_IndustryToSolution_B_index` (`B`);

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
-- Indexes for table `_servicetosolution`
--
ALTER TABLE `_servicetosolution`
  ADD UNIQUE KEY `_ServiceToSolution_AB_unique` (`A`,`B`),
  ADD KEY `_ServiceToSolution_B_index` (`B`);

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
-- Constraints for table `servicecapability`
--
ALTER TABLE `servicecapability`
  ADD CONSTRAINT `ServiceCapability_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `service` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `servicemetric`
--
ALTER TABLE `servicemetric`
  ADD CONSTRAINT `ServiceMetric_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `service` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `serviceprocessstep`
--
ALTER TABLE `serviceprocessstep`
  ADD CONSTRAINT `ServiceProcessStep_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `service` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

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
