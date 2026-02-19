<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once __DIR__ . '/backend/controllers/SolutionsController.php';

try {
    $controller = new SolutionsController();
    $result = $controller->getAll();
    echo json_encode($result, JSON_PRETTY_PRINT);
} catch (Exception $e) {
    echo "ERROR: " . $e->getMessage() . "\n";
    echo "Trace: " . $e->getTraceAsString();
}
