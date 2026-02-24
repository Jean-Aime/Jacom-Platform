<?php
echo "Environment Debug:\n\n";
echo "getenv('DATABASE_URL'): " . (getenv('DATABASE_URL') ? 'EXISTS' : 'NOT FOUND') . "\n";
echo "\$_ENV['DATABASE_URL']: " . (isset($_ENV['DATABASE_URL']) ? 'EXISTS' : 'NOT FOUND') . "\n";
echo "\$_SERVER['DATABASE_URL']: " . (isset($_SERVER['DATABASE_URL']) ? 'EXISTS' : 'NOT FOUND') . "\n";

echo "\n\nAll environment variables:\n";
foreach ($_ENV as $key => $value) {
    if (strpos($key, 'DATABASE') !== false) {
        echo "$key = " . substr($value, 0, 50) . "...\n";
    }
}

echo "\n\nTrying to connect...\n";
$dbUrl = getenv('DATABASE_URL') ?: $_ENV['DATABASE_URL'] ?? $_SERVER['DATABASE_URL'] ?? null;

if ($dbUrl) {
    echo "DATABASE_URL found: " . substr($dbUrl, 0, 30) . "...\n";
    try {
        $conn = new PDO($dbUrl);
        echo "✓ Connection successful!\n";
    } catch (PDOException $e) {
        echo "✗ Connection failed: " . $e->getMessage() . "\n";
    }
} else {
    echo "✗ DATABASE_URL not found in any source\n";
}
