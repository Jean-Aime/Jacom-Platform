<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../middleware/Security.php';

class FileUploadController {
    private $db;
    private $conn;
    private $uploadDir;
    private $allowedTypes = [
        'pdf' => ['application/pdf'],
        'video' => ['video/mp4', 'video/mpeg', 'video/quicktime', 'video/x-msvideo', 'video/webm'],
        'document' => ['application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'],
        'image' => ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
    ];
    private $maxFileSize = 100 * 1024 * 1024; // 100MB
    
    public function __construct() {
        $this->db = Database::getInstance();
        $this->conn = $this->db->getConnection();
        $this->uploadDir = __DIR__ . '/../uploads/course-materials/';
        
        // Create upload directory if it doesn't exist
        if (!file_exists($this->uploadDir)) {
            mkdir($this->uploadDir, 0755, true);
        }
    }
    
    public function uploadFile() {
        Security::validateSession(['admin', 'instructor']);
        
        try {
            // Validate file upload
            if (!isset($_FILES['file']) || $_FILES['file']['error'] !== UPLOAD_ERR_OK) {
                http_response_code(400);
                echo json_encode(['error' => 'File upload failed']);
                return;
            }
            
            $file = $_FILES['file'];
            $resourceId = $_POST['resourceId'] ?? null;
            $fileType = $_POST['fileType'] ?? 'document';
            
            if (!$resourceId) {
                http_response_code(400);
                echo json_encode(['error' => 'Resource ID is required']);
                return;
            }
            
            // Validate file size
            if ($file['size'] > $this->maxFileSize) {
                http_response_code(400);
                echo json_encode(['error' => 'File size exceeds 100MB limit']);
                return;
            }
            
            // CRITICAL: Server-side MIME type validation
            $finfo = finfo_open(FILEINFO_MIME_TYPE);
            $mimeType = finfo_file($finfo, $file['tmp_name']);
            finfo_close($finfo);
            
            // Validate against allowed types
            $isValidType = false;
            $detectedCategory = null;
            foreach ($this->allowedTypes as $category => $types) {
                if (in_array($mimeType, $types)) {
                    $isValidType = true;
                    $detectedCategory = $category;
                    break;
                }
            }
            
            if (!$isValidType) {
                error_log('File upload rejected - Invalid MIME type: ' . $mimeType . ' for file: ' . $file['name']);
                http_response_code(400);
                echo json_encode(['error' => 'Invalid file type. Allowed: PDF, Video, Documents, Images']);
                return;
            }
            
            // Additional security checks based on file type
            if ($detectedCategory === 'image') {
                // Verify it's actually an image by reading it
                $imageInfo = @getimagesize($file['tmp_name']);
                if ($imageInfo === false) {
                    error_log('File upload rejected - File claims to be image but is not: ' . $file['name']);
                    http_response_code(400);
                    echo json_encode(['error' => 'Invalid image file']);
                    return;
                }
            }
            
            // Check for dangerous file extensions
            $extension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
            $dangerousExtensions = ['php', 'phtml', 'php3', 'php4', 'php5', 'pht', 'exe', 'bat', 'cmd', 'com', 'sh', 'cgi', 'pl', 'jar', 'jsp', 'asp', 'aspx'];
            
            if (in_array($extension, $dangerousExtensions)) {
                error_log('File upload rejected - Dangerous extension: ' . $extension . ' for file: ' . $file['name']);
                http_response_code(400);
                echo json_encode(['error' => 'File type not allowed for security reasons']);
                return;
            }
            
            // Sanitize filename to prevent directory traversal
            $originalName = basename($file['name']);
            $safeName = preg_replace('/[^a-zA-Z0-9._-]/', '_', $originalName);
            
            // Generate unique filename with safe extension
            $filename = uniqid('file_', true) . '.' . $extension;
            $filepath = $this->uploadDir . $filename;
            
            // Ensure upload directory exists and is secure
            if (!file_exists($this->uploadDir)) {
                mkdir($this->uploadDir, 0750, true);
                // Create .htaccess to prevent direct execution
                file_put_contents($this->uploadDir . '.htaccess', "php_flag engine off\nOptions -Indexes\n");
            }
            
            // Move uploaded file
            if (!move_uploaded_file($file['tmp_name'], $filepath)) {
                http_response_code(500);
                echo json_encode(['error' => 'Failed to save file']);
                return;
            }
            
            // Update resource with file information
            $stmt = $this->conn->prepare("UPDATE course_resources SET 
                filePath = ?, 
                fileName = ?, 
                fileSize = ?, 
                mimeType = ?,
                updatedAt = NOW() 
                WHERE id = ?");
            
            $stmt->execute([
                'uploads/course-materials/' . $filename,
                $file['name'],
                $file['size'],
                $mimeType,
                $resourceId
            ]);
            
            // Log successful upload
            error_log('File uploaded successfully: ' . $filename . ' (original: ' . $safeName . ') by user');
            
            echo json_encode([
                'success' => true,
                'filename' => $filename,
                'originalName' => $safeName,
                'size' => $file['size'],
                'mimeType' => $mimeType,
                'path' => 'uploads/course-materials/' . $filename
            ]);
            
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Upload failed: ' . $e->getMessage()]);
        }
    }
    
    public function deleteFile($resourceId) {
        Security::validateSession(['admin', 'instructor']);
        
        try {
            // Get file path from database
            $stmt = $this->conn->prepare("SELECT filePath FROM course_resources WHERE id = ?");
            $stmt->execute([$resourceId]);
            $resource = $stmt->fetch();
            
            if ($resource && $resource['filePath']) {
                $fullPath = __DIR__ . '/../' . $resource['filePath'];
                if (file_exists($fullPath)) {
                    unlink($fullPath);
                }
                
                // Clear file info from database
                $stmt = $this->conn->prepare("UPDATE course_resources SET 
                    filePath = NULL, 
                    fileName = NULL, 
                    fileSize = NULL, 
                    mimeType = NULL,
                    updatedAt = NOW() 
                    WHERE id = ?");
                $stmt->execute([$resourceId]);
            }
            
            echo json_encode(['success' => true]);
            
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Delete failed: ' . $e->getMessage()]);
        }
    }
    
    public function downloadFile($resourceId) {
        try {
            // Get file info from database
            $stmt = $this->conn->prepare("SELECT filePath, fileName, mimeType FROM course_resources WHERE id = ?");
            $stmt->execute([$resourceId]);
            $resource = $stmt->fetch();
            
            if (!$resource || !$resource['filePath']) {
                http_response_code(404);
                echo json_encode(['error' => 'File not found']);
                return;
            }
            
            $fullPath = __DIR__ . '/../' . $resource['filePath'];
            
            if (!file_exists($fullPath)) {
                http_response_code(404);
                echo json_encode(['error' => 'File not found on server']);
                return;
            }
            
            // Sanitize filename to prevent header injection
            $safeFilename = preg_replace('/[^a-zA-Z0-9._-]/', '_', basename($resource['fileName']));
            
            // Set secure headers for download
            header('Content-Type: ' . $resource['mimeType']);
            header('Content-Disposition: attachment; filename="' . $safeFilename . '"');
            header('Content-Length: ' . filesize($fullPath));
            header('Cache-Control: no-cache, must-revalidate');
            header('Pragma: public');
            header('X-Content-Type-Options: nosniff');
            
            // Clear output buffer to prevent corruption
            if (ob_get_level()) {
                ob_end_clean();
            }
            
            // Output file
            readfile($fullPath);
            exit;
            
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Download failed: ' . $e->getMessage()]);
        }
    }
}
