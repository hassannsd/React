<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once("./config.php");

$data = json_decode(file_get_contents("php://input"), true); // Decode JSON input

if (!isset($data["username"]) || !isset($data["password"])) {
    echo json_encode(["success" => false, "message" => "Invalid input"]);
    exit;
}

$username = $conn->real_escape_string($data["username"]);
$password = $data["password"];

$sql = "SELECT * FROM users WHERE username = '$username'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    if ($password === $user["password"]) { // Ensure the password check works correctly
        echo json_encode([ // Success
            "success" => true,
            "message" => "Login successful",
            "user" => [
                "id" => $user["userId"],
                "username" => $user["username"],
                "name" => $user["name"],
                "email" => $user["email"],
                "address" => $user["address"],
                "isAdmin" => $user["isAdmin"]
            ]
        ]);
    } else {
        echo json_encode(["success" => false, "message" => "Invalid password"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "User not found"]);
}

$conn->close();
?>
