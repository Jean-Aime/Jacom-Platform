-- Create partner_logo table
CREATE TABLE IF NOT EXISTS partner_logo (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    logo VARCHAR(500) NOT NULL,
    website VARCHAR(500),
    displayOrder INT DEFAULT 0,
    status ENUM('active', 'inactive') DEFAULT 'active',
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create index for ordering (only if not exists)
CREATE INDEX IF NOT EXISTS idx_partner_logo_order ON partner_logo(displayOrder, status);
