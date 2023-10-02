<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Validate and process data from the first form
    $username = $_POST['username'];
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Store data in session or database, depending on your application logic

    // Redirect to the second registration form
    header('Location: second_form.php');
    exit();
}
?>