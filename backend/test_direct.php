<?php
// Direct test to see the actual error
error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/controllers/CoursesController.php';

header('Content-Type: application/json');

try {
    $controller = new CoursesController();
    $controller->getBySlug('ai-powered-app-development');
} catch (Exception $e) {
    echo json_encode([
        'error' => $e->getMessage(),
        'file' => $e->getFile(),
        'line' => $e->getLine(),
        'trace' => $e->getTraceAsString()
    ]);
}
