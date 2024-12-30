<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$host = "localhost";
$username = "root"; // Replace with your DB username
$password = ""; // Replace with your DB password
$database = "restaurant";

// Create connection
$conn = new mysqli($host, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch data from the 'items' table
$query = "SELECT * FROM items";
$result = $conn->query($query);

if ($result->num_rows > 0) {
    $menuItems = [];
    while ($row = $result->fetch_assoc()) {
        $menuItems[] = $row;
    }
    // Return JSON response
    echo json_encode($menuItems);
} else {
    echo json_encode([]);
}

// Close connection
$conn->close();
?>
