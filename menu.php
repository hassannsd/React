<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once("./config.php");

$query = "SELECT * FROM items";
$result = $conn->query($query);

if ($result->num_rows > 0) {
    $menuItems = [];
    while ($row = $result->fetch_assoc()) {
        $menuItems[] = $row;
    }
    echo json_encode($menuItems);
} else {
    echo json_encode([]);
}

$conn->close();
?>
