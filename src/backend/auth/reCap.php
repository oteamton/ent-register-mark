<?php
require '../vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$secretKey = $_SERVER['RE_CAPTCHA_SECRET_KEY']; // Using getenv instead of $_ENV
$rawData = file_get_contents("php://input");
$data = json_decode($rawData, true);
$token = sanitize($data['token'] ?? '');

if (!$token) {
    sendErrorResponse("Token not provided.");
    exit();
}

$verifyResponse = @file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret={$secretKey}&response={$token}");

if ($verifyResponse === false) {
    sendErrorResponse("Failed to verify reCAPTCHA. Please try again later.");
    exit();
}

$responseKeys = json_decode($verifyResponse, true);

if (intval($responseKeys["success"]) === 1) {
    echo json_encode(["success" => true, "message" => "reCAPTCHA verification successful."]);
} else {
    sendErrorResponse("reCAPTCHA verification failed.");
}

function sendErrorResponse($message) {
    error_log($message);
    echo json_encode(["success" => false, "message" => $message]);
}

function sanitize($data) {
    return htmlspecialchars(strip_tags(trim($data)));
}
