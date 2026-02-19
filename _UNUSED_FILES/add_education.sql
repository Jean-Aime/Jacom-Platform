-- Add Education Industry
USE jas_consulting;

INSERT INTO Industry (id, name, slug, description, overview, challenges, trends, featured, image, createdAt, updatedAt) VALUES
('ind6', 'Education & Training', 'education', 'Professional development and technical training programs', 'JACOM offers customized training programs including web development bootcamps, technical skills training, and professional certifications.', '["Digital literacy gaps", "Curriculum relevance", "Student engagement", "Certification standards", "Access to quality education"]', '["EdTech platforms", "Hybrid learning models", "Micro-credentials", "Personalized learning paths", "Industry-aligned curricula"]', 0, 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800', NOW(), NOW());

INSERT INTO _IndustryToService (A, B) VALUES ('ind6', 'srv4');
