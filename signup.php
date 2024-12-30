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
$username = "root";
$password = "";
$dbname = "restaurant";

// Create database connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check database connection
if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Database connection failed"]);
    exit;
}

// Get POST data
$username = isset($_POST['username']) ? trim($_POST['username']) : '';
$password = isset($_POST['password']) ? trim($_POST['password']) : '';

// Validate input
if (!preg_match('/^[a-zA-Z0-9]{8,15}$/', $username)) {
    echo json_encode(["success" => false, "message" => "Invalid username format"]);
    exit;
}
if (!preg_match('/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,15}$/', $password)) {
    echo json_encode(["success" => false, "message" => "Invalid password format"]);
    exit;
}

// Hash the password
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

// Check if username already exists
$checkQuery = "SELECT * FROM users WHERE username = '$username'";
$result = $conn->query($checkQuery);
if ($result->num_rows > 0) {
    echo json_encode(["success" => false, "message" => "Username already exists"]);
    exit;
}

// Insert the user into the database
$sql = "INSERT INTO users (username, password) VALUES ('$username', '$password')";
if ($conn->query($sql) === TRUE) {
    echo json_encode(["success" => true, "message" => "Signup successful"]);
} else {
    echo json_encode(["success" => false, "message" => "Signup failed"]);
}

$conn->close();
?>
