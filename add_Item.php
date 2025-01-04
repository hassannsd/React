<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once("./config.php");

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data["name"]) || !isset($data["type"]) || !isset($data["price"])) {
    echo json_encode(["success" => false, "message" => "Invalid input"]);
    exit;
}

$name = $conn->real_escape_string($data["name"]);
$type = $conn->real_escape_string($data["type"]);
$price = floatval($data["price"]); 

$sql = "INSERT INTO items (Name, type, price) VALUES ('$name', '$type', $price)";
if ($conn->query($sql) === TRUE) {
    echo json_encode(["success" => true, "message" => "Item added successfully"]);
} else {
    echo json_encode(["success" => false, "message" => "Failed to add item"]);
}

$conn->close();
?>
