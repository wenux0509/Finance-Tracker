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

// Get user_id from query parameter
$user_id = isset($_GET['user_id']) ? intval($_GET['user_id']) : 0;
$transaction_id = isset($_GET['transaction_id']) ? intval($_GET['transaction_id']) : 0;

// Validate user_id (optional)
if ($user_id === 0 && $transaction_id === 0) {
    echo json_encode(array('success' => false, 'error' => 'Invalid user ID and transaction ID'));
    exit;
}

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Construct SQL query with user_id
if ($transaction_id !== 0) {
    $sql = "SELECT * FROM transactions WHERE id = $transaction_id";
} else {
    $sql = "SELECT * FROM transactions WHERE user_id = $user_id";
}

$result = $conn->query($sql);

if ($result === false) {
    echo json_encode(array('success' => false, 'error' => 'Query error: ' . $conn->error));
    exit;
}

$transactions = [];
while ($row = $result->fetch_assoc()) {
    $transactions[] = $row;
}

$conn->close();

echo json_encode($transactions);
?>