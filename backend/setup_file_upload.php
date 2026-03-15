<?php
// Setup script for file upload system
error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once __DIR__ . '/config/database.php';

echo "=== FILE UPLOAD SYSTEM SETUP ===\n\n";

try {
    $db = Database::getInstance();
    $conn = $db->getConnection();
    
    // 1. Add file fields to course_resources table
    echo "1. Adding file fields to course_resources table...\n";
    
    $alterQueries = [
        "ALTER TABLE course_resources ADD COLUMN IF NOT EXISTS filePath VARCHAR(500)",
        "ALTER TABLE course_resources ADD COLUMN IF NOT EXISTS fileName VARCHAR(255)",
        "ALTER TABLE course_resources ADD COLUMN IF NOT EXISTS fileSize BIGINT",
        "ALTER TABLE course_resources ADD COLUMN IF NOT EXISTS mimeType VARCHAR(100)"
    ];
    
    foreach ($alterQueries as $query) {
        try {
            $conn->exec($query);
            echo "   ✓ Executed: " . substr($query, 0, 50) . "...\n";
        } catch (PDOException $e) {
            if (strpos($e->getMessage(), 'Duplicate column') !== false) {
                echo "   - Column already exists, skipping\n";
            } else {
                throw $e;
            }
        }
    }
    
    // 2. Create index
    echo "\n2. Creating index for faster file lookups...\n";
    try {
        $conn->exec("CREATE INDEX IF NOT EXISTS idx_resources_filepath ON course_resources(filePath)");
        echo "   ✓ Index created\n";
    } catch (PDOException $e) {
        echo "   - Index may already exist\n";
    }
    
    // 3. Create uploads directory
    echo "\n3. Creating uploads directory...\n";
    $uploadDir = __DIR__ . '/uploads/course-materials/';
    if (!file_exists($uploadDir)) {
        mkdir($uploadDir, 0755, true);
        echo "   ✓ Directory created: $uploadDir\n";
    } else {
        echo "   - Directory already exists\n";
    }
    
    // 4. Create .htaccess for uploads directory
    echo "\n4. Creating .htaccess for security...\n";
    $htaccessContent = "# Prevent directory listing\nOptions -Indexes\n\n# Allow file downloads\n<FilesMatch \"\\.(pdf|mp4|mpeg|mov|avi|webm|doc|docx|txt|jpg|jpeg|png|gif|webp)$\">\n    Order Allow,Deny\n    Allow from all\n</FilesMatch>";
    
    file_put_contents($uploadDir . '.htaccess', $htaccessContent);
    echo "   ✓ .htaccess created\n";
    
    // 5. Test database connection
    echo "\n5. Testing database connection...\n";
    $stmt = $conn->query("SELECT COUNT(*) as count FROM course_resources");
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    echo "   ✓ Found {$result['count']} resources in database\n";
    
    echo "\n=== SETUP COMPLETE ===\n";
    echo "\nFile upload system is ready!\n";
    echo "- Upload endpoint: /upload\n";
    echo "- Download endpoint: /upload/:resourceId\n";
    echo "- Max file size: 100MB\n";
    echo "- Allowed types: PDF, Video, Documents, Images\n";
    
} catch (Exception $e) {
    echo "\n✗ ERROR: " . $e->getMessage() . "\n";
    echo "File: " . $e->getFile() . "\n";
    echo "Line: " . $e->getLine() . "\n";
    exit(1);
}
