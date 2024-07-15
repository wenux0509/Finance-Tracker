<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}
// Database connection parameters
$servername = "localhost";
$username = "root";
$password = ""; // Password for your MySQL database
$dbname = "expensedb";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get transaction_id from query parameter
$transaction_id = isset($_GET['transaction_id']) ? intval($_GET['transaction_id']) : 0;

// Validate transaction_id
if ($transaction_id === 0) {
    echo json_encode(array('success' => false, 'error' => 'Invalid transaction ID'));
    exit;
}

// Construct SQL query
$sql = "DELETE FROM transactions WHERE id = $transaction_id";

if ($conn->query($sql) === TRUE) {
    echo json_encode(array('success' => true));
} else {
    echo json_encode(array('success' => false, 'error' => 'Query error: ' . $conn->error));
}

// Close connection
$conn->close();
?>
