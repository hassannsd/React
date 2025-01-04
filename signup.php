<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once("./config.php");

$username = isset($_POST['username']) ? trim($_POST['username']) : '';
$password = isset($_POST['password']) ? trim($_POST['password']) : '';
$name = isset($_POST['name']) ? trim($_POST['name']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$address = isset($_POST['address']) ? trim($_POST['address']) : '';

if (!preg_match('/^[a-zA-Z0-9]{8,15}$/', $username)) {
    echo json_encode(["success" => false, "message" => "Invalid username format"]);
    exit;
}

if (!preg_match('/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,15}$/', $password)) {
    echo json_encode(["success" => false, "message" => "Invalid password format"]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(["success" => false, "message" => "Invalid email format"]);
    exit;
}

$checkQuery = "SELECT * FROM users WHERE username = '$username'";
$result = $conn->query($checkQuery);
if ($result->num_rows > 0) {
    echo json_encode(["success" => false, "message" => "Username already exists"]);
    exit;
}

$sql = "INSERT INTO users (username, password, name, email, address) 
        VALUES ('$username', '$hashedPassword', '$name', '$email', '$address')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["success" => true, "message" => "Signup successful"]);
} else {
    echo json_encode(["success" => false, "message" => "Signup failed"]);
}

$conn->close();
?>
