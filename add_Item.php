<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Database configuration
$servername = "localhost";
$username = "root"; // Update if necessary
$password = ""; // Update if necessary
$dbname = "restaurant";

// Create database connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check database connection
if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Database connection failed"]);
    exit;
}

// Get POST data
$data = json_decode(file_get_contents("php://input"), true);

// Validate input
if (!isset($data["name"]) || !isset($data["type"]) || !isset($data["price"])) {
    echo json_encode(["success" => false, "message" => "Invalid input"]);
    exit;
}

$name = $conn->real_escape_string($data["name"]);
$type = $conn->real_escape_string($data["type"]);
$price = floatval($data["price"]); // Ensure price is numeric

// Insert the item into the database
$sql = "INSERT INTO items (Name, type, price) VALUES ('$name', '$type', $price)";
if ($conn->query($sql) === TRUE) {
    echo json_encode(["success" => true, "message" => "Item added successfully"]);
} else {
    echo json_encode(["success" => false, "message" => "Failed to add item"]);
}

$conn->close();
?>
