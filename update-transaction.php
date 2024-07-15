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

// Get input data
$data = json_decode(file_get_contents("php://input"), true);
$transaction_id = isset($data['id']) ? intval($data['id']) : 0;
$amount = isset($data['amount']) ? floatval($data['amount']) : 0;
$category = isset($data['category']) ? $conn->real_escape_string($data['category']) : null;
$date = isset($data['date']) ? $conn->real_escape_string($data['date']) : null;
$notes = isset($data['notes']) ? $conn->real_escape_string($data['notes']) : null;
$location = isset($data['location']) ? $conn->real_escape_string($data['location']) : null;
$user_id = isset($data['user_id']) ? intval($data['user_id']) : 0;

// Validate input
if ($transaction_id === 0 || $amount === 0 || $category === null || $date === null || $user_id === 0) {
    echo json_encode(array('success' => false, 'error' => 'Invalid input data'));
    exit;
}

// Construct SQL query
$sql = "UPDATE transactions SET amount = $amount, category = '$category', date = '$date', notes = '$notes', location = '$location' WHERE id = $transaction_id AND user_id = $user_id";

if ($conn->query($sql) === TRUE) {
    echo json_encode(array('success' => true));
} else {
    echo json_encode(array('success' => false, 'error' => 'Query error: ' . $conn->error));
}

// Close connection
$conn->close();
?>

