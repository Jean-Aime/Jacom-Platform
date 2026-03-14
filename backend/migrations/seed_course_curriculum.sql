-- Seed data for course curriculum (phases, weeks, topics, resources)
-- This creates a comprehensive curriculum structure matching the screenshot

-- First, let's add curriculum data for the AI-Powered Application Development course
-- Assuming the course ID from previous seed data

-- Insert Phases for AI-Powered Application Development
INSERT INTO course_phases (courseId, phaseNumber, title, description, duration, materialPrice, materialDiscountedPrice, classPrice) VALUES
('course_ai_app_dev', 1, 'Phase 1: Comprehensive Power BI Essentials: Data Extraction, Transformation, and Modeling', 'This course covers the core aspects of Power BI, including extracting data from various sources, transforming it for analysis, and building data models using DAX for more powerful insights.', '4 weeks', 300.00, 118.00, 600.00),
('course_ai_app_dev', 2, 'Phase 2: Data Visualization and Advanced Modeling with Digital Storytelling', 'This course introduces the fundamentals of data visualization, advanced data modeling techniques, and guidance on communication strategies to communicate insights effectively.', '4 weeks', 300.00, 149.00, 600.00);

-- Create tables for curriculum structure if they don't exist
CREATE TABLE IF NOT EXISTS course_weeks (
    id VARCHAR(50) PRIMARY KEY,
    phaseId VARCHAR(50) NOT NULL,
    weekNumber INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    taskList VARCHAR(255),
    practicalExercises VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (phaseId) REFERENCES course_phases(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS course_topics (
    id VARCHAR(50) PRIMARY KEY,
    weekId VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    orderIndex INT DEFAULT 0,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (weekId) REFERENCES course_weeks(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS course_resources (
    id VARCHAR(50) PRIMARY KEY,
    topicId VARCHAR(50) NOT NULL,
    type ENUM('video_syllabus', 'video_curriculum', 'video_notes', 'webaccess') NOT NULL,
    title VARCHAR(255) NOT NULL,
    url VARCHAR(500),
    content TEXT,
    orderIndex INT DEFAULT 0,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (topicId) REFERENCES course_topics(id) ON DELETE CASCADE
);

-- Get the phase IDs (we'll use generated IDs)
SET @phase1_id = 'phase_ai_dev_1';
SET @phase2_id = 'phase_ai_dev_2';

-- Update the phase IDs in course_phases
UPDATE course_phases SET id = @phase1_id WHERE courseId = 'course_ai_app_dev' AND phaseNumber = 1;
UPDATE course_phases SET id = @phase2_id WHERE courseId = 'course_ai_app_dev' AND phaseNumber = 2;

-- Insert Weeks for Phase 1
INSERT INTO course_weeks (id, phaseId, weekNumber, title, description, taskList, practicalExercises) VALUES
('week_p1_w1', @phase1_id, 1, 'Introduction to BI, Power BI, and Data Extraction', 'Learn the fundamentals of Business Intelligence and Power BI', 'Week 1 - TASK LIST of the week', 'Practical Exercises - Introduction to BI, Power BI, and Data Extraction'),
('week_p1_w2', @phase1_id, 2, 'Extract, Transform and Load (ETL) in Power BI', 'Master the ETL process in Power BI', NULL, NULL),
('week_p1_w3', @phase1_id, 3, 'Data Modeling Fundamentals', 'Understand data modeling concepts and best practices', NULL, NULL),
('week_p1_w4', @phase1_id, 4, 'Data Modeling with DAX', 'Learn DAX formulas for advanced data modeling', NULL, NULL);

-- Insert Topics for Week 1
INSERT INTO course_topics (id, weekId, title, orderIndex) VALUES
('topic_w1_intro', 'week_p1_w1', '1. Introduction to Business Intelligence & Power BI', 1),
('topic_w1_etl', 'week_p1_w1', '2. Extract, Transform, and Load (ETL) in Power BI', 2);

-- Insert Resources for Topic 1 (Introduction to BI & Power BI)
INSERT INTO course_resources (id, topicId, type, title, url, orderIndex) VALUES
('res_t1_vs', 'topic_w1_intro', 'video_syllabus', 'Video Syllabus', '#', 1),
('res_t1_vc', 'topic_w1_intro', 'video_curriculum', 'Video Curriculum', '#', 2),
('res_t1_vn', 'topic_w1_intro', 'video_notes', 'Video Notes', '#', 3),
('res_t1_wa', 'topic_w1_intro', 'webaccess', 'WebAccess', '#', 4);

-- Insert Resources for Topic 2 (ETL in Power BI)
INSERT INTO course_resources (id, topicId, type, title, url, orderIndex) VALUES
('res_t2_vs', 'topic_w1_etl', 'video_syllabus', 'Video Syllabus', '#', 1),
('res_t2_vc', 'topic_w1_etl', 'video_curriculum', 'Video Curriculum', '#', 2),
('res_t2_vn', 'topic_w1_etl', 'video_notes', 'Video Notes', '#', 3),
('res_t2_wa', 'topic_w1_etl', 'webaccess', 'WebAccess', '#', 4);

-- Insert Topics for Week 2
INSERT INTO course_topics (id, weekId, title, orderIndex) VALUES
('topic_w2_advanced_etl', 'week_p1_w2', '1. Advanced ETL Techniques', 1),
('topic_w2_data_sources', 'week_p1_w2', '2. Connecting Multiple Data Sources', 2);

-- Insert Resources for Week 2 Topics
INSERT INTO course_resources (id, topicId, type, title, url, orderIndex) VALUES
('res_w2t1_vs', 'topic_w2_advanced_etl', 'video_syllabus', 'Video Syllabus', '#', 1),
('res_w2t1_vc', 'topic_w2_advanced_etl', 'video_curriculum', 'Video Curriculum', '#', 2),
('res_w2t1_vn', 'topic_w2_advanced_etl', 'video_notes', 'Video Notes', '#', 3),
('res_w2t1_wa', 'topic_w2_advanced_etl', 'webaccess', 'WebAccess', '#', 4),
('res_w2t2_vs', 'topic_w2_data_sources', 'video_syllabus', 'Video Syllabus', '#', 1),
('res_w2t2_vc', 'topic_w2_data_sources', 'video_curriculum', 'Video Curriculum', '#', 2),
('res_w2t2_vn', 'topic_w2_data_sources', 'video_notes', 'Video Notes', '#', 3),
('res_w2t2_wa', 'topic_w2_data_sources', 'webaccess', 'WebAccess', '#', 4);

-- Insert Topics for Week 3
INSERT INTO course_topics (id, weekId, title, orderIndex) VALUES
('topic_w3_relationships', 'week_p1_w3', '1. Creating Table Relationships', 1),
('topic_w3_star_schema', 'week_p1_w3', '2. Star Schema Design', 2);

-- Insert Resources for Week 3 Topics
INSERT INTO course_resources (id, topicId, type, title, url, orderIndex) VALUES
('res_w3t1_vs', 'topic_w3_relationships', 'video_syllabus', 'Video Syllabus', '#', 1),
('res_w3t1_vc', 'topic_w3_relationships', 'video_curriculum', 'Video Curriculum', '#', 2),
('res_w3t1_vn', 'topic_w3_relationships', 'video_notes', 'Video Notes', '#', 3),
('res_w3t1_wa', 'topic_w3_relationships', 'webaccess', 'WebAccess', '#', 4),
('res_w3t2_vs', 'topic_w3_star_schema', 'video_syllabus', 'Video Syllabus', '#', 1),
('res_w3t2_vc', 'topic_w3_star_schema', 'video_curriculum', 'Video Curriculum', '#', 2),
('res_w3t2_vn', 'topic_w3_star_schema', 'video_notes', 'Video Notes', '#', 3),
('res_w3t2_wa', 'topic_w3_star_schema', 'webaccess', 'WebAccess', '#', 4);

-- Insert Topics for Week 4
INSERT INTO course_topics (id, weekId, title, orderIndex) VALUES
('topic_w4_dax_basics', 'week_p1_w4', '1. DAX Fundamentals', 1),
('topic_w4_calculated_columns', 'week_p1_w4', '2. Calculated Columns and Measures', 2),
('topic_w4_time_intelligence', 'week_p1_w4', '3. Time Intelligence Functions', 3);

-- Insert Resources for Week 4 Topics
INSERT INTO course_resources (id, topicId, type, title, url, orderIndex) VALUES
('res_w4t1_vs', 'topic_w4_dax_basics', 'video_syllabus', 'Video Syllabus', '#', 1),
('res_w4t1_vc', 'topic_w4_dax_basics', 'video_curriculum', 'Video Curriculum', '#', 2),
('res_w4t1_vn', 'topic_w4_dax_basics', 'video_notes', 'Video Notes', '#', 3),
('res_w4t1_wa', 'topic_w4_dax_basics', 'webaccess', 'WebAccess', '#', 4),
('res_w4t2_vs', 'topic_w4_calculated_columns', 'video_syllabus', 'Video Syllabus', '#', 1),
('res_w4t2_vc', 'topic_w4_calculated_columns', 'video_curriculum', 'Video Curriculum', '#', 2),
('res_w4t2_vn', 'topic_w4_calculated_columns', 'video_notes', 'Video Notes', '#', 3),
('res_w4t2_wa', 'topic_w4_calculated_columns', 'webaccess', 'WebAccess', '#', 4),
('res_w4t3_vs', 'topic_w4_time_intelligence', 'video_syllabus', 'Video Syllabus', '#', 1),
('res_w4t3_vc', 'topic_w4_time_intelligence', 'video_curriculum', 'Video Curriculum', '#', 2),
('res_w4t3_vn', 'topic_w4_time_intelligence', 'video_notes', 'Video Notes', '#', 3),
('res_w4t3_wa', 'topic_w4_time_intelligence', 'webaccess', 'WebAccess', '#', 4);

-- Insert Weeks for Phase 2
INSERT INTO course_weeks (id, phaseId, weekNumber, title, description) VALUES
('week_p2_w1', @phase2_id, 1, 'Introduction to Data Visualization', 'Learn visualization best practices and chart types'),
('week_p2_w2', @phase2_id, 2, 'Advanced Visualizations and Custom Visuals', 'Create custom and advanced visualizations'),
('week_p2_w3', @phase2_id, 3, 'Interactive Dashboards', 'Build interactive and dynamic dashboards'),
('week_p2_w4', @phase2_id, 4, 'Digital Storytelling with Data', 'Master the art of storytelling with data');

-- Insert Topics for Phase 2, Week 1
INSERT INTO course_topics (id, weekId, title, orderIndex) VALUES
('topic_p2w1_charts', 'week_p2_w1', '1. Chart Types and When to Use Them', 1),
('topic_p2w1_formatting', 'week_p2_w1', '2. Visual Formatting and Themes', 2);

-- Insert Resources for Phase 2, Week 1
INSERT INTO course_resources (id, topicId, type, title, url, orderIndex) VALUES
('res_p2w1t1_vs', 'topic_p2w1_charts', 'video_syllabus', 'Video Syllabus', '#', 1),
('res_p2w1t1_vc', 'topic_p2w1_charts', 'video_curriculum', 'Video Curriculum', '#', 2),
('res_p2w1t1_vn', 'topic_p2w1_charts', 'video_notes', 'Video Notes', '#', 3),
('res_p2w1t1_wa', 'topic_p2w1_charts', 'webaccess', 'WebAccess', '#', 4),
('res_p2w1t2_vs', 'topic_p2w1_formatting', 'video_syllabus', 'Video Syllabus', '#', 1),
('res_p2w1t2_vc', 'topic_p2w1_formatting', 'video_curriculum', 'Video Curriculum', '#', 2),
('res_p2w1t2_vn', 'topic_p2w1_formatting', 'video_notes', 'Video Notes', '#', 3),
('res_p2w1t2_wa', 'topic_p2w1_formatting', 'webaccess', 'WebAccess', '#', 4);

COMMIT;
