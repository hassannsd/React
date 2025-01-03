<?php
// fetch_items.php

header("Access-Control-Allow-Origin: *");  // Allow all origins (you can specify 'http://localhost:3000' for stricter control)
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");  // Allow the necessary methods
header("Access-Control-Allow-Headers: Content-Type, Authorization");  // Allow the necessary headers
  

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "restaurant";

// Create a connection
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Database connection failed"]);
    exit;
}

$sql = "SELECT * FROM items";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $items = [];
    while($row = $result->fetch_assoc()) {
        $items[] = $row;
    }
    echo json_encode(["success" => true, "items" => $items]);
} else {
    echo json_encode(["success" => false, "message" => "No items found"]);
}

$conn->close();
?>