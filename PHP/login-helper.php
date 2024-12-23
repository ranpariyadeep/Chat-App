<?php
require("start.php"); // Include the initialization script

// Test login with predefined credentials
$username = "Tom";         // Replace with your test username
$password = "12345678";    // Replace with your test password

try {
    if ($service->login($username, $password)) {
        $_SESSION['user'] = $username; // Save the username in session
        echo "Login successful for user: " . htmlspecialchars($username);
    } else {
        echo "Login failed. Please check the credentials.";
    }
} catch (Exception $e) {
    error_log("Login error: " . $e->getMessage());
    echo "An error occurred during login.";
}
?>