<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

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

// Check if email and password are provided
if(isset($input['email']) && isset($input['password'])) {
    $email = $input['email'];
    $password = $input['password'];

    // Prepare SQL statement to fetch user data
    $stmt = $conn->prepare("SELECT id, email, password FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $hashed_password = $row['password'];

        // Verify password
        if (password_verify($password, $hashed_password)) {
            // Login successful
            echo json_encode(array('success' => true, 'username' => $row['email'], 'user_id' => $row['id']));
        } else {
            // Login failed: incorrect password
            echo json_encode(array('success' => false, 'error' => 'Incorrect password'));
        }
    } else {
        // Login failed: user not found
        echo json_encode(array('success' => false, 'error' => 'User not found'));
    }
} else {
    // Invalid request: email and password not provided
    echo json_encode(array('success' => false, 'error' => 'Email and password are required fields.'));
}

// Close database connection
$stmt->close();
$conn->close();
?>

