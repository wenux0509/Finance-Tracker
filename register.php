<?php
// Allow from any origin
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
}

// Respond to preflight requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
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

// Decode JSON input from Angular
$input = json_decode(file_get_contents('php://input'), true);

// Check if username and password are provided
if(isset($input['username']) && isset($input['password'])) {
    $username = $input['username'];
    $password = $input['password'];

    // Hash the password (recommended for security)
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    // Prepare SQL statement to insert user data
    $sql = "INSERT INTO users (username, password) VALUES ('$username', '$hashed_password')";

    // Execute SQL statement
    if ($conn->query($sql) === TRUE) {
        // Registration successful
        echo json_encode(array('success' => true));
    } else {
        // Registration failed
        echo json_encode(array('success' => false, 'error' => $conn->error));
    }
} else {
    // Invalid request
    echo json_encode(array('success' => false, 'error' => 'Username and password are required fields.'));
}

// Close database connection
$conn->close();
?>
