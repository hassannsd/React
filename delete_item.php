<?php 
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once("./config.php");

$item_id = isset($_POST['Id']) ? (int) $_POST['Id'] : null;

if (!$item_id) {
    echo json_encode(["success" => false, "message" => "Item ID is missing or invalid"]);
    exit;
}

$conn->begin_transaction();

try {
    $stmt = $conn->prepare("DELETE FROM cart WHERE item_id = ?");
    $stmt->bind_param("i", $item_id);
    if (!$stmt->execute()) {
        throw new Exception("Failed to delete from cart: " . $stmt->error);
    }
    $stmt->close();

    $stmt = $conn->prepare("DELETE FROM items WHERE Id = ?");
    $stmt->bind_param("i", $item_id);
    if (!$stmt->execute()) {
        throw new Exception("Failed to delete from items: " . $stmt->error);
    }
    $stmt->close();

    $conn->commit();
    echo json_encode(["success" => true, "message" => "Item deleted successfully"]);

} catch (Exception $e) {
    $conn->rollback();
    echo json_encode(["success" => false, "message" => "Failed to delete item: " . $e->getMessage()]);
}

$conn->close();
?>
