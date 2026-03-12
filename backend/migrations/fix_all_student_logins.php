<?php
/**
 * COMPREHENSIVE FIX FOR STUDENT LOGIN ISSUES
 * This script will:
 * 1. Reset all failed login attempts
 * 2. Generate proper Argon2ID password hashes
 * 3. Update all student accounts
 * 4. Test login functionality
 */

require_once __DIR__ . '/../config/database.php';

echo str_repeat("=", 70) . "\n";
echo "JACOM ACADEMY - STUDENT LOGIN FIX SCRIPT\n";
echo str_repeat("=", 70) . "\n\n";

try {
    $db = Database::getInstance();
    $conn = $db->getConnection();
    
    if (!$conn) {
        die("❌ ERROR: Database connection failed\n");
    }
    
    echo "✓ Database connected successfully\n\n";
    
    // Step 1: Reset all failed attempts and locks
    echo "Step 1: Resetting failed login attempts...\n";
    $resetStmt = $conn->prepare("UPDATE user SET failed_attempts = 0, locked_until = NULL WHERE role = 'student'");
    $resetStmt->execute();
    echo "✓ Reset " . $resetStmt->rowCount() . " student accounts\n\n";
    
    // Step 2: Generate proper password hash
    $password = 'Student123!';
    echo "Step 2: Generating Argon2ID password hash...\n";
    echo "Password: {$password}\n";
    
    // Check if Argon2ID is available
    if (!defined('PASSWORD_ARGON2ID')) {
        echo "❌ ERROR: Argon2ID is not available in this PHP installation\n";
        echo "Falling back to PASSWORD_DEFAULT (bcrypt)\n";
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    } else {
        $hashedPassword = password_hash($password, PASSWORD_ARGON2ID, [
            'memory_cost' => 65536,
            'time_cost' => 4,
            'threads' => 3
        ]);
    }
    
    echo "✓ Hash generated: " . substr($hashedPassword, 0, 60) . "...\n\n";
    
    // Step 3: Verify the hash works
    echo "Step 3: Verifying password hash...\n";
    if (password_verify($password, $hashedPassword)) {
        echo "✓ Password verification: SUCCESS\n\n";
    } else {
        echo "❌ Password verification: FAILED\n";
        die("Cannot proceed - password hashing is not working correctly\n");
    }
    
    // Step 4: Update all student passwords
    echo "Step 4: Updating all student passwords...\n";
    $stmt = $conn->prepare("SELECT id, email, name FROM user WHERE role = 'student' ORDER BY id");
    $stmt->execute();
    $students = $stmt->fetchAll();
    
    $updateStmt = $conn->prepare("UPDATE user SET password = ?, failed_attempts = 0, locked_until = NULL WHERE id = ?");
    
    $count = 0;
    foreach ($students as $student) {
        $updateStmt->execute([$hashedPassword, $student['id']]);
        echo "  ✓ {$student['name']} ({$student['email']})\n";
        $count++;
    }
    
    echo "\n✓ Updated {$count} student passwords\n\n";
    
    // Step 5: Test login with first student
    echo "Step 5: Testing login functionality...\n";
    $testEmail = 'sarah.johnson@email.com';
    
    $testStmt = $conn->prepare("SELECT id, email, name, password FROM user WHERE email = ?");
    $testStmt->execute([$testEmail]);
    $testUser = $testStmt->fetch();
    
    if ($testUser) {
        echo "Test user: {$testUser['name']}\n";
        echo "Email: {$testUser['email']}\n";
        
        if (password_verify($password, $testUser['password'])) {
            echo "✓ Login test: SUCCESS\n";
        } else {
            echo "❌ Login test: FAILED\n";
        }
    }
    
    echo "\n" . str_repeat("=", 70) . "\n";
    echo "✓ ALL FIXES COMPLETED SUCCESSFULLY!\n";
    echo str_repeat("=", 70) . "\n\n";
    
    echo "LOGIN CREDENTIALS:\n";
    echo str_repeat("-", 70) . "\n";
    echo "Email: sarah.johnson@email.com (or any student email)\n";
    echo "Password: Student123!\n";
    echo str_repeat("-", 70) . "\n\n";
    
    echo "ALL 20 STUDENTS:\n";
    echo str_repeat("-", 70) . "\n";
    foreach ($students as $i => $student) {
        echo ($i + 1) . ". {$student['email']}\n";
    }
    echo str_repeat("-", 70) . "\n\n";
    
    echo "You can now login at: http://localhost:3000/login\n\n";
    
} catch (Exception $e) {
    echo "\n❌ ERROR: " . $e->getMessage() . "\n";
    echo $e->getTraceAsString() . "\n";
    exit(1);
}
