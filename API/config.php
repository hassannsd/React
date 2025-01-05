<?php
$host = "sql103.infinityfree.com";
$username = "if0_38037638";
$password = "1Sx5fDlKr4";
$dbname = "if0_38037638_cheasysnacks";

$conn = new mysqli($host, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>