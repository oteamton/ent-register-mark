<?php
// Handle registration logic here
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // You should add code here to securely store the user's information in a database.
    // For simplicity, we'll just print the received data.
    echo "Registration successful! Username: $username";
}
?>
