<?php
// Database Configuration - Secure: No fallback defaults
// In production, these MUST be set via environment variables
$dbHost = getenv('DB_HOST');
$dbName = getenv('DB_NAME');
$dbUser = getenv('DB_USER');
$dbPass = getenv('DB_PASS');

// For local development only - remove in production
// Check if running in local XAMPP environment
if (!$dbHost) {
    // Local development fallback
    $dbHost = 'localhost';
    $dbName = 'jas_consulting';
    $dbUser = 'root';
    $dbPass = '';
    
    error_log('WARNING: Using local development database credentials. Set environment variables for production.');
}

// Validate required configuration (only fail if completely missing)
if (!$dbHost || !$dbName || !$dbUser) {
    error_log('CRITICAL: Database credentials not configured. Set DB_HOST, DB_NAME, DB_USER, DB_PASS environment variables.');
    http_response_code(503);
    die(json_encode(['error' => 'Service temporarily unavailable']));
}

define('DB_HOST', $dbHost);
define('DB_NAME', $dbName);
define('DB_USER', $dbUser);
define('DB_PASS', $dbPass);

// Security
define('SESSION_LIFETIME', 86400);
define('RATE_LIMIT', 100);
define('RATE_WINDOW', 3600);

// CORS
define('ALLOWED_ORIGINS', [
    'http://localhost:3000',
    'https://jacom-platform.vercel.app',
    'https://jacom-platform-fowhg2rv2-baraime450-gmailcoms-projects.vercel.app',
    'https://jacom-platform-plsaf1r52-baraime450-gmailcoms-projects.vercel.app'
]);

// Environment
define('ENV', getenv('ENV') ?: 'production');
define('DEBUG', ENV === 'development');
