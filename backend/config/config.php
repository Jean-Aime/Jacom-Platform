<?php
// Database Configuration
define('DB_HOST', 'localhost');
define('DB_NAME', 'jas_consulting');
define('DB_USER', 'root');
define('DB_PASS', '');

// Security
define('SESSION_LIFETIME', 86400); // 24 hours
define('RATE_LIMIT', 100);
define('RATE_WINDOW', 3600);

// CORS
define('ALLOWED_ORIGINS', [
    'http://localhost:3000',
    'https://yourdomain.com'
]);

// Environment
define('ENV', 'development'); // production, development
define('DEBUG', ENV === 'development');
