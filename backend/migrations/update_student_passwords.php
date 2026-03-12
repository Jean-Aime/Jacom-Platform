<?php
/**
 * Update Student Passwords with Real Argon2ID Hashes
 * This script updates all student passwords to use proper Argon2ID hashing
 * Password: Student123!
 */

require_once __DIR__ . '/../config/database.php';

try {
    $db = Database::getInstance();
    $conn = $db->getConnection();
    
    if (!$conn) {
        die("Database connection failed\n");
    }
    
    // Password for all students
    $password = 'Student123!';
    
    // Generate Argon2ID hash with the same settings as AuthController
    $hashedPassword = password_hash($password, PASSWORD_ARGON2ID, [
        'memory_cost' => 65536,
        'time_cost' => 4,
        'threads' => 3
    ]);
    
    echo "Generated password hash: " . substr($hashedPassword, 0, 50) . "...\n\n";
    
    // Get all student accounts
    $stmt = $conn->prepare("SELECT id, email, name FROM user WHERE role = 'student'");
    $stmt->execute();
    $students = $stmt->fetchAll();
    
    echo "Found " . count($students) . " student accounts\n\n";
    
    // Update each student's password
    $updateStmt = $conn->prepare("UPDATE user SET password = ? WHERE id = ?");
    
    $updated = 0;
    foreach ($students as $student) {
        $updateStmt->execute([$hashedPassword, $student['id']]);
        echo "✓ Updated password for: {$student['name']} ({$student['email']})\n";
        $updated++;
    }
    
    echo "\n" . str_repeat("=", 60) . "\n";
    echo "SUCCESS! Updated {$updated} student passwords\n";
    echo str_repeat("=", 60) . "\n\n";
    
    echo "You can now login with:\n";
    echo "Email: sarah.johnson@email.com\n";
    echo "Password: Student123!\n\n";
    
    echo "Or any other student email from the seed data.\n";
    
} catch (Exception $e) {
    echo "ERROR: " . $e->getMessage() . "\n";
    exit(1);
}
