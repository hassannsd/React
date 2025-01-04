<?php
// fetch_items.php

header("Access-Control-Allow-Origin: *");  
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");  
header("Access-Control-Allow-Headers: Content-Type, Authorization");  
  

require_once("./config.php");

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