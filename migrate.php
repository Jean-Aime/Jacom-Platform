<!DOCTYPE html>
<html>
<head>
    <title>Run Migration</title>
</head>
<body>
    <h1>Subscriber Table Migration</h1>
    <?php
    require_once __DIR__ . '/backend/config/database.php';

    try {
        $db = Database::getInstance();
        $conn = $db->getConnection();
        
        $sql = file_get_contents(__DIR__ . '/backend/migrations/create_subscribers.sql');
        $conn->exec($sql);
        
        echo "<p style='color: green;'>✓ Subscriber table created successfully</p>";
        echo "<p><a href='http://localhost:3000/admin/subscribers'>Go to Subscribers Page</a></p>";
    } catch (Exception $e) {
        echo "<p style='color: red;'>✗ Error: " . htmlspecialchars($e->getMessage()) . "</p>";
    }
    ?>
</body>
</html>
