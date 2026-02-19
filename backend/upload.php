<?php
require_once __DIR__ . '/config/config.php';
require_once __DIR__ . '/middleware/Security.php';

Security::headers();
Security::cors();
Security::validateSession();

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['file'])) {
    $type = $_GET['type'] ?? 'general';
    
    // Sanitize type to prevent path traversal
    $allowedTypes = ['general', 'events', 'case-studies', 'services', 'industries', 'insights'];
    if (!in_array($type, $allowedTypes)) {
        echo json_encode(['success' => false, 'error' => 'Invalid upload type']);
        exit;
    }
    
    $uploadDir = __DIR__ . '/uploads/' . $type . '/';
    
    if (!file_exists($uploadDir)) {
        mkdir($uploadDir, 0755, true);
    }
    
    $file = $_FILES['file'];
    $fileName = uniqid() . '_' . basename($file['name']);
    $targetPath = $uploadDir . $fileName;
    
    $allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!in_array($file['type'], $allowedTypes)) {
        echo json_encode(['success' => false, 'error' => 'Invalid file type']);
        exit;
    }
    
    if ($file['size'] > 5000000) {
        echo json_encode(['success' => false, 'error' => 'File too large']);
        exit;
    }
    
    if (move_uploaded_file($file['tmp_name'], $targetPath)) {
        $url = 'http://localhost/Jacom-Platform/backend/uploads/' . $type . '/' . $fileName;
        echo json_encode(['success' => true, 'url' => $url]);
    } else {
        echo json_encode(['success' => false, 'error' => 'Upload failed']);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'No file uploaded']);
}
