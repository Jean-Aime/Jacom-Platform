<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once __DIR__ . '/config/database.php';

echo "<h1>Backend Test</h1>";

// Test 1: Database Connection
echo "<h2>1. Database Connection</h2>";
try {
    $db = new Database();
    $conn = $db->getConnection();
    echo "✅ Database connected<br>";
} catch (Exception $e) {
    echo "❌ Database error: " . $e->getMessage() . "<br>";
    exit;
}

// Test 2: User Table
echo "<h2>2. User Table</h2>";
try {
    $stmt = $conn->query("SELECT * FROM User LIMIT 1");
    $user = $stmt->fetch();
    if ($user) {
        echo "✅ User table exists<br>";
        echo "Email: " . $user['email'] . "<br>";
    } else {
        echo "❌ No users found<br>";
    }
} catch (Exception $e) {
    echo "❌ User table error: " . $e->getMessage() . "<br>";
}

// Test 3: Session Table
echo "<h2>3. Session Table</h2>";
try {
    $stmt = $conn->query("SELECT COUNT(*) as count FROM Session");
    $result = $stmt->fetch();
    echo "✅ Session table exists (" . $result['count'] . " sessions)<br>";
} catch (Exception $e) {
    echo "❌ Session table error: " . $e->getMessage() . "<br>";
}

// Test 4: Test Login
echo "<h2>4. Test Login</h2>";
$email = 'admin@jacom.com';
$password = 'admin123';

$stmt = $conn->prepare("SELECT * FROM User WHERE email = ?");
$stmt->execute([$email]);
$user = $stmt->fetch();

if ($user) {
    echo "✅ User found: " . $user['email'] . "<br>";
    if (password_verify($password, $user['password'])) {
        echo "✅ Password correct<br>";
    } else {
        echo "❌ Password incorrect<br>";
        echo "Hash in DB: " . substr($user['password'], 0, 20) . "...<br>";
    }
} else {
    echo "❌ User not found<br>";
}

echo "<h2>5. CORS Config</h2>";
require_once __DIR__ . '/config/config.php';
echo "Allowed Origins: " . implode(', ', ALLOWED_ORIGINS) . "<br>";
