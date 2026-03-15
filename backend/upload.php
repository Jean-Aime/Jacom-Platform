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
        mkdir($uploadDir, 0750, true);
        // Prevent PHP execution in upload directory
        file_put_contents($uploadDir . '.htaccess', "php_flag engine off\nOptions -Indexes\n");
    }
    
    $file = $_FILES['file'];
    
    // Validate file size BEFORE processing
    if ($file['size'] > 5000000) {
        echo json_encode(['success' => false, 'error' => 'File too large (max 5MB)']);
        exit;
    }
    
    // CRITICAL: Server-side MIME type detection (not client-provided)
    $finfo = finfo_open(FILEINFO_MIME_TYPE);
    $detectedMimeType = finfo_file($finfo, $file['tmp_name']);
    finfo_close($finfo);
    
    $allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!in_array($detectedMimeType, $allowedMimeTypes)) {
        error_log('Upload rejected - Invalid MIME type: ' . $detectedMimeType . ' for file: ' . $file['name']);
        echo json_encode(['success' => false, 'error' => 'Invalid file type. Only images allowed.']);
        exit;
    }
    
    // Verify it's actually a valid image
    $imageInfo = @getimagesize($file['tmp_name']);
    if ($imageInfo === false) {
        error_log('Upload rejected - Not a valid image: ' . $file['name']);
        echo json_encode(['success' => false, 'error' => 'Invalid image file']);
        exit;
    }
    
    // Check for dangerous extensions
    $extension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
    $dangerousExtensions = ['php', 'phtml', 'php3', 'php4', 'php5', 'pht', 'exe', 'bat', 'sh'];
    if (in_array($extension, $dangerousExtensions)) {
        error_log('Upload rejected - Dangerous extension: ' . $extension);
        echo json_encode(['success' => false, 'error' => 'File type not allowed']);
        exit;
    }
    
    // Sanitize filename
    $safeName = preg_replace('/[^a-zA-Z0-9._-]/', '_', basename($file['name']));
    $fileName = uniqid('img_', true) . '_' . $safeName;
    $targetPath = $uploadDir . $fileName;
    
    if (move_uploaded_file($file['tmp_name'], $targetPath)) {
        // Set restrictive permissions
        chmod($targetPath, 0640);
        
        $url = 'http://localhost/Jacom-Platform/backend/uploads/' . $folder . '/' . $fileName;
        
        error_log('Image uploaded successfully: ' . $fileName . ' to folder: ' . $folder);
        
        echo json_encode([
            'success' => true, 
            'url' => $url,
            'filename' => $fileName,
            'size' => $file['size'],
            'mimeType' => $detectedMimeType
        ]);
    } else {
        error_log('Upload failed - Could not move file: ' . $file['name']);
        echo json_encode(['success' => false, 'error' => 'Upload failed']);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'No file uploaded']);
}
