<?php
// cart.php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Content-Type: application/json");
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
  http_response_code(200);
  exit;
}

// Database connection
$host = "localhost";
$db_name = "restaurant";
$username = "root";
$password = "";

$conn = new PDO("mysql:host=$host;dbname=$db_name", $username, $password);
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$requestMethod = $_SERVER['REQUEST_METHOD'];

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  $query = "SELECT c.cart_id, c.quantity, i.Name, i.price 
            FROM cart c
            JOIN items i ON c.item_id = i.id";
  $stmt = $conn->prepare($query);
  $stmt->execute();
  $cartItems = $stmt->fetchAll(PDO::FETCH_ASSOC);

  // Always return an array
  if (!$cartItems) {
      $cartItems = [];
  }

  echo json_encode($cartItems);
}


if ($requestMethod === 'POST') {
    // Handle adding an item to the cart
    $data = json_decode(file_get_contents("php://input"), true);

    $item_id = $data['item_id'];
    $quantity = $data['quantity'];

    try {
        // Check if the item already exists in the cart
        $query = "SELECT * FROM cart WHERE item_id = :item_id";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':item_id', $item_id);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            // If the item exists, increment the quantity
            $updateQuery = "UPDATE cart SET quantity = quantity + :quantity WHERE item_id = :item_id";
            $updateStmt = $conn->prepare($updateQuery);
            $updateStmt->bindParam(':quantity', $quantity);
            $updateStmt->bindParam(':item_id', $item_id);
            $updateStmt->execute();
        } else {
            // If the item doesn't exist, insert it into the cart
            $insertQuery = "INSERT INTO cart (item_id, quantity) VALUES (:item_id, :quantity)";
            $insertStmt = $conn->prepare($insertQuery);
            $insertStmt->bindParam(':item_id', $item_id);
            $insertStmt->bindParam(':quantity', $quantity);
            $insertStmt->execute();
        }

        echo json_encode(["message" => "Item added to cart successfully"]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(["error" => $e->getMessage()]);
    }
}
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
  // Update quantity
  $data = json_decode(file_get_contents("php://input"), true);
  $cart_id = $data['cart_id'];
  $quantity = $data['quantity'];

  if (!empty($cart_id) && !empty($quantity)) {
      $query = "UPDATE cart SET quantity = :quantity WHERE cart_id = :cart_id";
      $stmt = $conn->prepare($query);
      $stmt->bindParam(':cart_id', $cart_id);
      $stmt->bindParam(':quantity', $quantity);
      $stmt->execute();

      echo json_encode(["success" => true]);
  } else {
      http_response_code(400);
      echo json_encode(["success" => false, "message" => "Invalid cart_id or quantity"]);
  }
}

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
  // Delete an item from the cart
  $data = json_decode(file_get_contents("php://input"), true);
  $cart_id = $data['cart_id'];

  if (!empty($cart_id)) {
      $query = "DELETE FROM cart WHERE cart_id = :cart_id";
      $stmt = $conn->prepare($query);
      $stmt->bindParam(':cart_id', $cart_id);
      $stmt->execute();

      echo json_encode(["success" => true]);
  } else {
      http_response_code(400);
      echo json_encode(["success" => false, "message" => "Invalid cart_id"]);
  }
}

