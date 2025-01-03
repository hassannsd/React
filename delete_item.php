<?php
// delete_item.php

header("Access-Control-Allow-Origin: *");  // Allow all origins (you can specify 'http://localhost:3000' for stricter control)
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");  // Allow the necessary methods
header("Access-Control-Allow-Headers: Content-Type");  // Allow the necessary headers
  

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

$data = json_decode(file_get_contents("php://input"), true);
$itemId = $data['id'];

if (isset($itemId)) {
    $sql = "DELETE FROM items WHERE id = $itemId";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["success" => true, "message" => "Item deleted successfully"]);
    } else {
        echo json_encode(["success" => false, "message" => "Error deleting item"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Item ID is missing"]);
}

$conn->close();
?>