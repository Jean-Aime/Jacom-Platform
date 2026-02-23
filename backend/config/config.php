<?php
// Database Configuration
define('DB_HOST', getenv('DB_HOST') ?: 'localhost');
define('DB_NAME', getenv('DB_NAME') ?: 'jas_consulting');
define('DB_USER', getenv('DB_USER') ?: 'root');
define('DB_PASS', getenv('DB_PASS') ?: '');

// Security
define('SESSION_LIFETIME', 86400);
define('RATE_LIMIT', 100);
define('RATE_WINDOW', 3600);

// CORS
define('ALLOWED_ORIGINS', [
    'http://localhost:3000',
    'https://your-vercel-domain.vercel.app'
]);

// Environment
define('ENV', getenv('ENV') ?: 'production');
define('DEBUG', ENV === 'development');
