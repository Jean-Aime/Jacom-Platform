-- Rate limiting table for persistent storage
-- This replaces the ineffective in-memory rate limiting

CREATE TABLE IF NOT EXISTS rate_limit (
    id VARCHAR(255) PRIMARY KEY,
    ip_address VARCHAR(45) NOT NULL,
    endpoint VARCHAR(255) NOT NULL,
    request_count INT NOT NULL DEFAULT 1,
    window_start TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_ip_endpoint (ip_address, endpoint),
    INDEX idx_window (window_start)
);

-- Clean up old rate limit entries (older than 24 hours)
DELETE FROM rate_limit WHERE window_start < DATE_SUB(NOW(), INTERVAL 24 HOUR);
