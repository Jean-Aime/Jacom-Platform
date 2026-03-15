-- Add file upload fields to course_resources table
ALTER TABLE course_resources 
ADD COLUMN IF NOT EXISTS filePath VARCHAR(500),
ADD COLUMN IF NOT EXISTS fileName VARCHAR(255),
ADD COLUMN IF NOT EXISTS fileSize BIGINT,
ADD COLUMN IF NOT EXISTS mimeType VARCHAR(100);

-- Create index for faster file lookups
CREATE INDEX IF NOT EXISTS idx_resources_filepath ON course_resources(filePath);
