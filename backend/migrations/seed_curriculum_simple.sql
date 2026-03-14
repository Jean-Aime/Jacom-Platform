-- ============================================================================
-- SIMPLE CURRICULUM SEED DATA
-- ============================================================================
-- This creates curriculum for the AI-Powered Application Development course
-- matching the screenshot structure
-- ============================================================================

-- Insert Weeks for Phase 1 (using phase IDs from seed_academy_data.sql)
INSERT INTO `course_weeks` (`id`, `phaseId`, `weekNumber`, `title`, `description`, `taskList`, `practicalExercises`) VALUES
('week_p1_w1', 'phase_001', 1, 'Introduction to BI, Power BI, and Data Extraction', 'Learn the fundamentals of Business Intelligence and Power BI', 'Week 1 - TASK LIST of the week', 'Practical Exercises - Introduction to BI, Power BI, and Data Extraction'),
('week_p1_w2', 'phase_001', 2, 'Extract, Transform and Load (ETL) in Power BI', 'Master the ETL process in Power BI', NULL, NULL),
('week_p1_w3', 'phase_001', 3, 'Data Modeling Fundamentals', 'Understand data modeling concepts and best practices', NULL, NULL);

-- Insert Topics for Week 1
INSERT INTO `course_topics` (`id`, `weekId`, `title`, `orderIndex`) VALUES
('topic_w1_intro', 'week_p1_w1', '1. Introduction to Business Intelligence & Power BI', 1),
('topic_w1_etl', 'week_p1_w1', '2. Extract, Transform, and Load (ETL) in Power BI', 2);

-- Insert Resources for Topic 1 (Introduction to BI & Power BI)
INSERT INTO `course_resources` (`id`, `topicId`, `type`, `title`, `url`, `orderIndex`) VALUES
('res_t1_vs', 'topic_w1_intro', 'video_syllabus', 'Video Syllabus', '#', 1),
('res_t1_vc', 'topic_w1_intro', 'video_curriculum', 'Video Curriculum', '#', 2),
('res_t1_vn', 'topic_w1_intro', 'video_notes', 'Video Notes', '#', 3),
('res_t1_wa', 'topic_w1_intro', 'webaccess', 'WebAccess', '#', 4);

-- Insert Resources for Topic 2 (ETL in Power BI)
INSERT INTO `course_resources` (`id`, `topicId`, `type`, `title`, `url`, `orderIndex`) VALUES
('res_t2_vs', 'topic_w1_etl', 'video_syllabus', 'Video Syllabus', '#', 1),
('res_t2_vc', 'topic_w1_etl', 'video_curriculum', 'Video Curriculum', '#', 2),
('res_t2_vn', 'topic_w1_etl', 'video_notes', 'Video Notes', '#', 3),
('res_t2_wa', 'topic_w1_etl', 'webaccess', 'WebAccess', '#', 4);

-- Insert Topics for Week 2
INSERT INTO `course_topics` (`id`, `weekId`, `title`, `orderIndex`) VALUES
('topic_w2_advanced_etl', 'week_p1_w2', '1. Advanced ETL Techniques', 1),
('topic_w2_data_sources', 'week_p1_w2', '2. Connecting Multiple Data Sources', 2);

-- Insert Resources for Week 2 Topics
INSERT INTO `course_resources` (`id`, `topicId`, `type`, `title`, `url`, `orderIndex`) VALUES
('res_w2t1_vs', 'topic_w2_advanced_etl', 'video_syllabus', 'Video Syllabus', '#', 1),
('res_w2t1_vc', 'topic_w2_advanced_etl', 'video_curriculum', 'Video Curriculum', '#', 2),
('res_w2t1_vn', 'topic_w2_advanced_etl', 'video_notes', 'Video Notes', '#', 3),
('res_w2t1_wa', 'topic_w2_advanced_etl', 'webaccess', 'WebAccess', '#', 4);

-- Insert Topics for Week 3
INSERT INTO `course_topics` (`id`, `weekId`, `title`, `orderIndex`) VALUES
('topic_w3_relationships', 'week_p1_w3', '1. Creating Table Relationships', 1),
('topic_w3_star_schema', 'week_p1_w3', '2. Star Schema Design', 2);

-- Insert Resources for Week 3 Topics
INSERT INTO `course_resources` (`id`, `topicId`, `type`, `title`, `url`, `orderIndex`) VALUES
('res_w3t1_vs', 'topic_w3_relationships', 'video_syllabus', 'Video Syllabus', '#', 1),
('res_w3t1_vc', 'topic_w3_relationships', 'video_curriculum', 'Video Curriculum', '#', 2),
('res_w3t1_vn', 'topic_w3_relationships', 'video_notes', 'Video Notes', '#', 3),
('res_w3t1_wa', 'topic_w3_relationships', 'webaccess', 'WebAccess', '#', 4);

-- Insert Weeks for Phase 2
INSERT INTO `course_weeks` (`id`, `phaseId`, `weekNumber`, `title`, `description`) VALUES
('week_p2_w1', 'phase_002', 1, 'JavaScript Fundamentals', 'Learn core JavaScript concepts and syntax'),
('week_p2_w2', 'phase_002', 2, 'DOM Manipulation and Events', 'Master DOM manipulation and event handling'),
('week_p2_w3', 'phase_002', 3, 'Async JavaScript and APIs', 'Learn promises, async/await, and API integration');

-- Insert Topics for Phase 2, Week 1
INSERT INTO `course_topics` (`id`, `weekId`, `title`, `orderIndex`) VALUES
('topic_p2w1_basics', 'week_p2_w1', '1. Variables, Data Types, and Operators', 1),
('topic_p2w1_functions', 'week_p2_w1', '2. Functions and Scope', 2);

-- Insert Resources for Phase 2, Week 1
INSERT INTO `course_resources` (`id`, `topicId`, `type`, `title`, `url`, `orderIndex`) VALUES
('res_p2w1t1_vs', 'topic_p2w1_basics', 'video_syllabus', 'Video Syllabus', '#', 1),
('res_p2w1t1_vc', 'topic_p2w1_basics', 'video_curriculum', 'Video Curriculum', '#', 2),
('res_p2w1t1_vn', 'topic_p2w1_basics', 'video_notes', 'Video Notes', '#', 3),
('res_p2w1t1_wa', 'topic_p2w1_basics', 'webaccess', 'WebAccess', '#', 4);

COMMIT;
