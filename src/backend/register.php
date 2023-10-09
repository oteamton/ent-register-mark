<?php
require './vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$secretKey = $_ENV['RE_CAPTCHA_SECRET_KEY'];
$rawData = file_get_contents("php://input");
// error_log("Received data: " . $rawData);
$data = json_decode(file_get_contents("php://input"), true);
$token = $data['token'] ?? null;

if (!$token) {
    error_log("Token not provided.");
    echo json_encode(["error" => "Token not provided"]);
    exit();
}

$secretKey = $_ENV['RE_CAPTCHA_SECRET_KEY'];
$verifyResponse = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret={$secretKey}&response={$token}");
$responseKeys = json_decode($verifyResponse, true);

if (intval($responseKeys["success"]) === 1) {
    error_log("reCAPTCHA verification successful.");
    echo json_encode(["success" => true, "message" => "Registration successful"]);
} else {
    error_log("reCAPTCHA verification failed.");
    echo json_encode(["success" => false, "message" => "reCAPTCHA verification failed"]);
}
