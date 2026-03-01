<?php
require_once __DIR__ . '/config/config.php';
require_once __DIR__ . '/middleware/Security.php';

Security::headers();
Security::cors();

// Only validate session, don't exit if invalid - let upload.php handle it
$token = $_COOKIE['session-token'] ?? $_SERVER['HTTP_X_SESSION_TOKEN'] ?? null;
$isAuthenticated = false;

if ($token) {
    require_once __DIR__ . '/config/database.php';
    $db = Database::getInstance();
    $conn = $db->getConnection();
    
    $stmt = $conn->prepare("SELECT * FROM session WHERE token = ? AND expiresAt > NOW()");
    $stmt->execute([$token]);
    $session = $stmt->fetch();
    
    if ($session) {
        $isAuthenticated = true;
    }
}

if (!$isAuthenticated) {
    http_response_code(401);
    echo json_encode(['success' => false, 'error' => 'Unauthorized - Please login']);
    exit;
}

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['file'])) {
    $folder = $_POST['folder'] ?? $_POST['type'] ?? $_GET['type'] ?? 'general';
    
    // Sanitize folder to prevent path traversal
    $allowedFolders = ['general', 'events', 'case-studies', 'services', 'industries', 'insights', 'community-category', 'partners'];
    if (!in_array($folder, $allowedFolders)) {
        echo json_encode(['success' => false, 'error' => 'Invalid upload folder']);
        exit;
    }
    
    $uploadDir = __DIR__ . '/uploads/' . $folder . '/';
    
    if (!file_exists($uploadDir)) {
        mkdir($uploadDir, 0755, true);
    }
    
    $file = $_FILES['file'];
    $fileName = uniqid() . '_' . basename($file['name']);
    $targetPath = $uploadDir . $fileName;
    
    $allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/jpg'];
    if (!in_array($file['type'], $allowedMimeTypes)) {
        echo json_encode(['success' => false, 'error' => 'Invalid file type']);
        exit;
    }
    
    if ($file['size'] > 5000000) {
        echo json_encode(['success' => false, 'error' => 'File too large']);
        exit;
    }
    
    if (move_uploaded_file($file['tmp_name'], $targetPath)) {
        $url = 'http://localhost/Jacom-Platform/backend/uploads/' . $folder . '/' . $fileName;
        echo json_encode(['success' => true, 'url' => $url]);
    } else {
        echo json_encode(['success' => false, 'error' => 'Upload failed']);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'No file uploaded']);
}
