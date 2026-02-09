<?php
header('Content-Type: text/html; charset=utf-8');
require_once __DIR__ . '/config/database.php';

echo "<h2>Database Connection Test</h2>";

try {
    $db = new Database();
    $conn = $db->getConnection();
    
    if ($conn) {
        echo "✅ <strong>Database connected successfully!</strong><br><br>";
        
        // Check industries
        $stmt = $conn->query("SELECT id, name, slug, featured FROM Industry ORDER BY featured DESC, name ASC");
        $industries = $stmt->fetchAll();
        
        echo "<h3>Industries in Database (" . count($industries) . " total):</h3>";
        echo "<table border='1' cellpadding='10' style='border-collapse: collapse;'>";
        echo "<tr><th>ID</th><th>Name</th><th>Slug</th><th>Featured</th><th>URL</th></tr>";
        
        foreach ($industries as $ind) {
            $featured = $ind['featured'] ? '⭐ Yes' : 'No';
            $url = "http://localhost:3000/industries/" . $ind['slug'];
            echo "<tr>";
            echo "<td>" . htmlspecialchars($ind['id']) . "</td>";
            echo "<td>" . htmlspecialchars($ind['name']) . "</td>";
            echo "<td>" . htmlspecialchars($ind['slug']) . "</td>";
            echo "<td>" . $featured . "</td>";
            echo "<td><a href='" . $url . "' target='_blank'>View Page</a></td>";
            echo "</tr>";
        }
        echo "</table>";
        
        // Check database info
        echo "<br><h3>Database Info:</h3>";
        echo "Database: <strong>jas_consulting</strong><br>";
        echo "Host: <strong>localhost</strong><br>";
        echo "User: <strong>root</strong><br>";
        
    } else {
        echo "❌ <strong>Failed to connect to database</strong>";
    }
    
} catch (Exception $e) {
    echo "❌ <strong>Error:</strong> " . $e->getMessage();
}
?>
